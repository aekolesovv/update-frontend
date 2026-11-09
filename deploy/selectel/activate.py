#!/usr/bin/env python3
"""Activate static files without executing the build user's code as root."""

import ctypes
from datetime import datetime, timezone
import fcntl
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import stat
import subprocess
import tempfile

BASE = Path('/srv/update')
ROOT = BASE / 'frontend'
RELEASES = BASE / 'frontend-releases'
BACKUPS = BASE / 'frontend-backups'
METADATA = BASE / 'deployment.json'
CANDIDATE = Path('/var/lib/update-frontend-build/candidate')
BUILD_CONFIG = Path('/etc/update/frontend-build.env')
AUTO_RELEASE = re.compile(r'auto-\d{8}T\d{6}Z-[a-f0-9]{12}')
LANDING_CHUNK = re.compile(rb'src="(/_next/static/chunks/pages/index-[a-zA-Z0-9]+\.js)"')


def exchange(first, second):
    """Swap two directories atomically on the same Linux filesystem."""
    rename = ctypes.CDLL(None, use_errno=True).renameat2
    rename.argtypes = (ctypes.c_int, ctypes.c_char_p, ctypes.c_int, ctypes.c_char_p, ctypes.c_uint)
    rename.restype = ctypes.c_int
    at_fdcwd, rename_exchange = -100, 2
    if rename(at_fdcwd, os.fsencode(first), at_fdcwd, os.fsencode(second), rename_exchange):
        error = ctypes.get_errno()
        raise OSError(error, os.strerror(error))


def fetch(path):
    return subprocess.check_output([
        'curl', '--fail', '--silent', '--show-error', '--max-time', '8',
        '--resolve', 'updateyou.ru:443:127.0.0.1', f'https://updateyou.ru{path}',
    ])


def static_tree(path):
    if not path.is_dir() or path.is_symlink():
        raise RuntimeError(f'Invalid static root: {path}')
    for item in path.rglob('*'):
        mode = item.lstat().st_mode
        if not (stat.S_ISREG(mode) or stat.S_ISDIR(mode)):
            raise RuntimeError(f'Non-static entry in build: {item}')


def activate(sha, config_hash, metadata):
    if not ROOT.is_dir() or ROOT.is_symlink() or fetch('/') != (ROOT / 'index.html').read_bytes():
        raise RuntimeError('Nginx does not serve the expected document root')
    if shutil.disk_usage(BASE).free < 512 * 1024 * 1024:
        raise RuntimeError('Less than 512 MiB free for release and rollback')
    static_tree(CANDIDATE / 'out')
    now = datetime.now(timezone.utc)
    name = f'auto-{now:%Y%m%dT%H%M%SZ}-{sha[:12]}'
    release, backup = RELEASES / name, BACKUPS / name
    original = ROOT.stat()
    if release.exists() or backup.exists():
        raise RuntimeError('Release path already exists')
    try:
        publish(sha, config_hash, metadata, release, backup, now)
    except BaseException:
        current = ROOT.stat()
        if (current.st_dev, current.st_ino) == (original.st_dev, original.st_ino):
            # The old document root is live, so these only contain failed staging files.
            shutil.rmtree(release, ignore_errors=True)
            shutil.rmtree(backup, ignore_errors=True)
        raise
    prune_releases(name)


def publish(sha, config_hash, metadata, release, backup, now):
    out = release / 'out'
    release.mkdir(mode=0o755)
    shutil.copytree(CANDIDATE / 'out', out)
    index = (out / 'index.html').read_bytes()
    chunk_url = LANDING_CHUNK.search(index)
    if chunk_url is None:
        raise RuntimeError('Landing page is missing its script')
    chunk_path = chunk_url[1].decode()
    chunk = (out / chunk_path.lstrip('/')).read_bytes()
    frontend = metadata['frontend']
    payform = frontend.get('payformDomain', '')
    if payform and payform.encode() not in chunk:
        raise RuntimeError('Build would drop the active payment form')
    test_html = (out / 'test.html').read_bytes()
    if not test_html or not (out / 'sitemap.xml').is_file():
        raise RuntimeError('Static export is incomplete')
    shutil.copytree(out, backup)
    previous_assets = Path(frontend['release']) / 'out' / '_next'
    if previous_assets.is_dir():
        # Keep content-addressed files available to clients on the previous release.
        subprocess.run(['rsync', '-rt', '--ignore-existing', f'{previous_assets}/',
                        f'{backup}/_next/'], check=True)
    shutil.copy2(METADATA, release / 'deployment-before.json')
    frontend.update(branch='main', commit=sha, managedBy='systemd', builtAt=now.isoformat(),
                    buildConfigSha256=config_hash,
                    source=f'https://github.com/aekolesovv/update-frontend/tree/{sha}',
                    release=str(release), rollbackDocumentRoot=str(backup))
    (release / 'release.json').write_text(json.dumps(frontend, indent=2) + '\n')
    with tempfile.NamedTemporaryFile(mode='w', dir=BASE, prefix='.deployment-', delete=False) as file:
        json.dump(metadata, file, indent=2, ensure_ascii=False)
        file.write('\n')
        pending = Path(file.name)
    pending.chmod(stat.S_IMODE(METADATA.stat().st_mode))
    switched = False
    try:
        exchange(ROOT, backup)
        switched = True
        if fetch('/') != index or fetch('/test') != test_html or fetch(chunk_path) != chunk:
            raise RuntimeError('Nginx did not return the new release files')
        if json.loads(fetch('/api/health')).get('status') != 'ok':
            raise RuntimeError('API health check failed')
        os.replace(pending, METADATA)
    except BaseException:
        if switched:
            exchange(ROOT, backup)
            print('Restored the previous frontend after failed health checks.', flush=True)
        raise
    finally:
        pending.unlink(missing_ok=True)
    print(f'Deployed main at {sha}. Previous document root: {backup}', flush=True)


def prune_releases(active):
    names = sorted((entry.name for entry in RELEASES.iterdir()
                    if AUTO_RELEASE.fullmatch(entry.name) and entry.is_dir() and not entry.is_symlink()),
                   reverse=True)
    for name in names[5:]:
        if name == active:
            continue
        for directory in (RELEASES / name, BACKUPS / name):
            if directory.is_dir() and not directory.is_symlink():
                try:
                    shutil.rmtree(directory)
                except OSError as error:
                    print(f'Could not prune {directory}: {error}', flush=True)


def main():
    if not CANDIDATE.exists():
        return
    commit_file = CANDIDATE / 'commit'
    if CANDIDATE.is_symlink() or not stat.S_ISREG(commit_file.lstat().st_mode):
        raise RuntimeError('Invalid build candidate')
    candidate = re.fullmatch(r'([a-f0-9]{40}) ([a-f0-9]{64})\n', commit_file.read_text())
    if candidate is None:
        raise RuntimeError('Invalid candidate revision')
    sha, config_hash = candidate.groups()
    with (BASE / '.frontend-deploy.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        metadata = json.loads(METADATA.read_text())
        if hashlib.sha256(BUILD_CONFIG.read_bytes()).hexdigest() != config_hash:
            raise RuntimeError('Build settings changed during the build')
        frontend = metadata['frontend']
        if frontend['commit'] == sha and frontend.get('buildConfigSha256') == config_hash:
            return
        activate(sha, config_hash, metadata)


if __name__ == '__main__':
    main()
