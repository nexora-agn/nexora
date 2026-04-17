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

ZIP export: a Node server (`server/export-api.mjs`) fetches the client's draft via the service-role key, bakes it into a clone of the construction template, and returns a downloadable ZIP.

## One-time setup

### 1. Install

```bash
npm install
```

### 2. Clone the construction template (required for ZIP export)

```bash
git clone https://github.com/andisbajrami/construction-template tmp/construction-template
```

`tmp/` is gitignored and only used at export time as the source tree that gets zipped.

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

- The front-end (`dist/`) deploys to any static host (Vercel, Netlify, Hostinger, Cloudflare Pages).
- The ZIP export server (`server/export-api.mjs`) needs a Node host (Railway, Render, Fly, or a small VPS). It requires `SUPABASE_SERVICE_ROLE_KEY` as an environment variable and must be reachable at `/api/export-site` from the front-end origin (configure `SITE_ALLOWED_ORIGIN`).

## Tests

```bash
npm test
npm run test:watch
```
