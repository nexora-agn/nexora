/**
 * Hostinger Node.js — set **Entry file** to `server.js` (Websites → Settings → Build).
 * If `/api/*` returns 404 HTML from LiteSpeed, hPanel is serving static `dist/` only.
 * Fix: change framework type to **Other**, keep build `npm run build`, entry `server.js`, start `npm start`.
 */
import "./server/hostinger.mjs";
