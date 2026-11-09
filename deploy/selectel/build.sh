#!/usr/bin/env bash
set -euo pipefail

state=${STATE_DIRECTORY:?Run through update-frontend-build.service}
repo=$state/repo.git
candidate=$state/candidate
upstream=https://github.com/aekolesovv/update-frontend.git
export NEXT_TELEMETRY_DISABLED=1

rm -rf -- "$candidate"
if [[ ! -d $repo ]]; then
    git init --bare --quiet "$repo"
fi
git -C "$repo" fetch --quiet --no-tags "$upstream" refs/heads/main:refs/heads/main
sha=$(git -C "$repo" rev-parse refs/heads/main)
read -r config_hash _ < <(sha256sum /etc/update/frontend-build.env)
read -r active active_config < <(python3 -c 'import json; f=json.load(open("/srv/update/deployment.json"))["frontend"]; print(f["commit"], f.get("buildConfigSha256", "-"))')
if [[ $sha == "$active" && $config_hash == "$active_config" ]]; then
    printf 'Already serving main at %s\n' "$sha"
    exit 0
fi
if ! git -C "$repo" merge-base --is-ancestor "$active" "$sha"; then
    printf 'Refusing to deploy main outside the active release history\n' >&2
    exit 1
fi

work=$(mktemp -d "$state/build.XXXXXXXX")
trap 'rm -rf -- "$work"' EXIT
git -C "$repo" archive "$sha" | tar -xf - -C "$work"
cd "$work"
npm ci --no-audit --no-fund
npm run build:static
read -r latest _ < <(git ls-remote --exit-code "$upstream" refs/heads/main)
if [[ $sha != "$latest" ]]; then
    printf 'main advanced during build. The next tick will build the new revision.\n'
    exit 0
fi
mkdir "$candidate"
printf '%s %s\n' "$sha" "$config_hash" > "$candidate/commit"
mv out "$candidate/out"
printf 'Built %s for activation\n' "$sha"
