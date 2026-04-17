# Webready

Marketing website for Webready, a custom-branded website studio, plus a
sales-team admin dashboard that lets reps build a live preview of a
client's construction website during a sales call and export the final ZIP.

## Architecture

One Vite app, three zones:

| URL | Purpose |
| --- | --- |
| `/` `/privacy` `/terms` `/contact` | Webready marketing site (public) |
| `/admin/login` `/admin/clients` `/admin/clients/:id` | Sales-team dashboard (Supabase auth required) |
| `/preview.html?c=<clientId>` | Live preview of the construction template, driven by a Supabase draft (loaded in an iframe from the editor) |

Data: **Supabase** — auth, Postgres (`profiles`, `clients`, `drafts`), storage (`client-assets` bucket). Row Level Security ensures each sales rep only sees their own clients.

ZIP export: shared logic in `server/export-logic.mjs` builds the customized site. Two front-ends expose it:

- `server/export-api.mjs` — local Node dev server on port 8787.
- `api/export-site.mjs` — Vercel serverless function for production deployments.

Both fetch the draft via the service-role key, bake the customizations into a clone of the construction template (colors, logo, favicon, all copy + lists, etc.), and stream a ZIP back.

## One-time setup

### 1. Install

```bash
npm install
```

### 2. Construction template source

The template source lives in [`template-source/`](./template-source) and is committed so cloud deployments can bundle it. If you need to refresh it from the upstream repo:

```bash
rm -rf template-source
git clone --depth=1 https://github.com/andisbajrami/construction-template template-source
rm -rf template-source/.git template-source/node_modules template-source/dist
```

### 3. Supabase

1. Create a project at [supabase.com](https://supabase.com) (free tier).
2. Open **SQL Editor → New query** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
3. Copy the API keys from **Project Settings → API**.
4. Create your first sales user in **Authentication → Users → Add user** (confirm email automatically).

### 4. Environment

```bash
cp .env.example .env.local
# Fill in:
#   VITE_SUPABASE_URL
#   VITE_SUPABASE_ANON_KEY
#   SUPABASE_SERVICE_ROLE_KEY
```

## Development

Run these in two terminals:

```bash
npm run dev        # Vite on http://localhost:8080
npm run dev:api    # ZIP export API on http://localhost:8787
```

Then:

- Public marketing: `http://localhost:8080/`
- Sales dashboard: `http://localhost:8080/admin/login`

## Build

```bash
npm run build
npm run preview
```

`dist/` contains two HTML entries: `index.html` (marketing + admin) and `preview.html` (template iframe).

## Deployment

You have two production paths depending on what kind of host you want to use.

### Option A — Vercel (recommended, single deploy)

Vercel runs the Vite front-end AND the `api/export-site.mjs` serverless function together, so you don't need a separate Node server. [`vercel.json`](./vercel.json) is already configured.

1. Push this repo to GitHub (or import via the Vercel CLI).
2. In Vercel → New Project → import this repo. The build command (`vite build`) and output directory (`dist`) are picked up automatically.
3. Add the following **Environment Variables** (Production + Preview):

   | Name | Value |
   | --- | --- |
   | `VITE_SUPABASE_URL` | your Supabase project URL |
   | `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (server only) |

4. Deploy. The admin dashboard will call `/api/export-site` on the same origin — no extra config needed.

### Option B — Hostinger / static host + external export API

Hostinger's shared hosting can serve the static `dist/` output but cannot run Node, so you host the export API separately.

1. **Deploy the export API** (`server/export-api.mjs`) to any Node host (Railway, Render, Fly.io, a small VPS). Set:
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `SITE_ALLOWED_ORIGIN` = your Hostinger site URL (e.g. `https://linen-shark-973947.hostingersite.com`)
   - `SITE_API_PORT` if your host requires a specific port.

   Make sure `template-source/` is copied up alongside `server/` — the API resolves it as `../template-source` relative to the repo root.

2. **Build the front-end with the API URL baked in**:

   ```bash
   cp .env.example .env.production
   # Add your Supabase values + the export API origin you just deployed
   echo "VITE_EXPORT_API_URL=https://your-export-api.example.com/api/export-site" >> .env.production
   npm run build
   ```

3. Upload the contents of `dist/` to Hostinger (File Manager → `public_html`). Make sure SPA routing falls back to `index.html` (Hostinger → Website → Edit `.htaccess`):

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. In the admin dashboard, clicking **Download client ZIP** will now call `VITE_EXPORT_API_URL` directly instead of a co-located function.

### Production checklist

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set **only** on the server / function, never in a `VITE_*` var.
- [ ] `SITE_ALLOWED_ORIGIN` on the export API matches the deployed front-end origin exactly.
- [ ] `template-source/` is committed (no `.git`, no `node_modules`, no `dist`) so deployments can reach it.
- [ ] Supabase Storage bucket `client-assets` is public-read (or you've added a signed-URL policy) so exported sites can load logos/hero images.

## Tests

```bash
npm test
npm run test:watch
```
