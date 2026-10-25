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

Public environment variables are documented in `deploy/frontend.env.example`;
changing them requires another build. The existing GitHub deployment workflow
targets the previous PM2 setup and is not the new server's deployment mechanism.
Do not point its secrets at Selectel until that workflow has been adapted.
