# Chirps template chatbots

How Nexora aligns with [Chirps](https://chirps.cc) multi-assistant setup (one bot per template route on the same domain).

## Public template URLs (for Chirps training)

Each template is served at a **real path** (not `#/hash` routes) so Chirps can scan subpages:

| Template | Chirps slug | Scan base URL |
|----------|-------------|---------------|
| Constructo | `constructo` | `https://nexora-agn.com/templates/constructo` |
| Summit Construction | `summit` | `https://nexora-agn.com/templates/summit` |
| RidgePeak Roofing (nexora) | `roofing` | `https://nexora-agn.com/templates/roofing` |
| Roofix Roofing | `roofix` | `https://nexora-agn.com/templates/roofix` |
| VoltCurrent Electrical | `electrician` | `https://nexora-agn.com/templates/electrician` |
| ClearCurrent Plumbing | `plumber` | `https://nexora-agn.com/templates/plumber` |
| BrushHouse Painting | `painting` | `https://nexora-agn.com/templates/painting` |
| VerdeField Landscaping | `landscaping` | `https://nexora-agn.com/templates/landscaping` |
| HarborStone Design-Build | `homebuilder` | `https://nexora-agn.com/templates/homebuilder` |
| Crestline Remodeling | `remodeler` | `https://nexora-agn.com/templates/remodeler` |

Example pages Chirps can learn:

- `https://nexora-agn.com/templates/plumber`
- `https://nexora-agn.com/templates/plumber/about`
- `https://nexora-agn.com/templates/plumber/services`
- `https://nexora-agn.com/templates/plumber/contact`

**Marketing site** (separate assistant): `https://nexora-agn.com/`

Admin client previews (`/preview-plumbing.html?c=…`) stay **noindex** and are for the editor only — do **not** use those URLs in Chirps.

---

## 1. Create an assistant in Chirps

For each template:

1. Create a new assistant in Chirps.
2. Set **website address** to the scan base URL, e.g.  
   `https://nexora-agn.com/templates/plumber`
3. Under **Website addresses to scan**, add the same base (and any extra paths if needed).
4. Complete training from the live site after deploy.

For the **Nexora marketing** bot, use `https://nexora-agn.com` (homepage, pricing, contact, etc.).

---

## 2. Page visibility (Appearance)

In Chirps → **Appearance** → **Page Visibility**:

- Choose **“Only these pages”**
- Add the template base path, e.g. `/templates/plumber` or full URLs under that prefix
- Save

Repeat per assistant so each bot only appears on its template.

---

## 3. Connect assistant IDs in Nexora

After you create bots, add their IDs in **one** of these ways:

### Option A — `.env.local` (build time)

```env
VITE_CHIRPS_MARKETING_ASSISTANT_ID=your-marketing-assistant-uuid
VITE_CHIRPS_ASSISTANT_PLUMBING=plumber-bot-uuid
VITE_CHIRPS_ASSISTANT_ELECTRICAL=electrician-bot-uuid
VITE_CHIRPS_ASSISTANT_NEXORA=roofing-bot-uuid
# … VITE_CHIRPS_ASSISTANT_<TEMPLATE_ID> for each template id (see src/lib/templates.ts)
```

Template id → env suffix: `plumbing` → `VITE_CHIRPS_ASSISTANT_PLUMBING`, `nexora` → `VITE_CHIRPS_ASSISTANT_NEXORA`.

### Option B — `public/nexora-runtime-config.js` (no rebuild)

```js
window.__NEXORA_CHIRPS_ASSISTANTS__ = {
  marketing: "marketing-assistant-uuid",
  plumbing: "plumber-assistant-uuid",
  electrical: "electrician-assistant-uuid",
  nexora: "roofing-assistant-uuid",
  // keys = template id from src/lib/templates.ts
};
```

Redeploy or refresh after editing. The widget loads only when an ID is set for that route.

---

## 4. Verify after deploy

1. Open `https://nexora-agn.com/templates/plumber/about` — page loads with default demo content.
2. With `VITE_CHIRPS_ASSISTANT_PLUMBING` set, the Chirps widget appears on that route only.
3. Marketing homepage uses the marketing assistant ID.
4. `/admin/*` never loads Chirps.

---

## Code map

| Piece | Location |
|-------|----------|
| Slug registry | `src/lib/templates.ts` → `chirpsSlug`, `CHIRPS_TEMPLATE_SLUG_BY_ID` |
| Assistant ID resolution | `src/lib/chirpsConfig.ts` |
| Marketing embed | `src/components/ChirpsEmbed.tsx` in `src/App.tsx` |
| Template showcase entry | `templates/index.html` → `/templates/{slug}/…` |
| Per-template showcase | `src/template-*/showcase.tsx` |
| Production routing | `server/hostinger.mjs` → SPA fallback to `dist/templates/index.html` |

When you have all assistant UUIDs, share them and they can be wired into env or runtime config in one pass.
