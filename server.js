/**
 * Hostinger / Node: Start command must be **npm start** (this file), not `vite preview`.
 * vite preview only serves dist/ static files — POST /api/send-form-emails will never run.
 * hPanel: Entry file `server.js`, Build `npm run build`, Start `npm start`.
 */
import "./server/hostinger.mjs";
