rsync -av --progress /Users/timurito/dev/skeleton/skeleton-frontend . --exclude .git

update build

## Selectel: static deployment

Build with Node.js 24 LTS:

```bash
npm ci
# Set the public payment domain/prices in .env.local when available.
npm run build:static
```

The deployable site is `out/`, including sitemap and robots files. Copy its
contents to `/srv/update/frontend` on the new server. Nginx serves these files;
there is no frontend Node.js process. The existing `build`/`start` commands still
support a Next.js server when `STATIC_EXPORT` is unset.

API calls use `/api` on the current origin, so an IP preview never submits forms
to the old host. The backend Nginx config proxies this path to loopback port 3001.
Without `NEXT_PUBLIC_PRODAMUS_PAYFORM_DOMAIN`, payment buttons fall back to the
lead form. Email requires backend SMTP configuration; do not switch the production
domain before checking both integrations and HTTPS.

On Selectel, `update-frontend-deploy.timer` checks GitHub `main` one minute after
each run. A new revision is built as `update-frontend-build` and promoted only
after the static export succeeds. The deploy service swaps the document root
atomically, checks the landing page, level test, JavaScript and API, and restores
the previous release if those checks fail. It keeps the five most recent
automated releases and their backups, separate from older manual releases.

The scripts and units are in `deploy/selectel/`. Install the scripts under
`/usr/local/libexec/update-frontend/` and the units under `/etc/systemd/system/`.
The build user is a system account with no login and uses
`/var/lib/update-frontend-build/`. The server requires Git, Node.js 24, npm,
Python 3, curl and rsync. Put the public build settings from
`deploy/frontend.env.example` in `/etc/update/frontend-build.env`, including the
active payment domain. The next timer run rebuilds
the current commit if those settings change.

```bash
systemctl daemon-reload
systemctl enable --now update-frontend-deploy.timer
systemctl list-timers update-frontend-deploy.timer
journalctl -u update-frontend-build.service -u update-frontend-deploy.service -n 60
```
