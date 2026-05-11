// GET or POST /api/paysera-callback — Paysera server notification (no CORS; plain-text OK).
import { handlePayseraCallback } from "../server/paysera-callback.mjs";

function setPlainCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function flattenVercelQuery(q) {
  if (!q || typeof q !== "object") return {};
  /** @type {Record<string, string | undefined>} */
  const out = {};
  for (const [k, v] of Object.entries(q)) {
    if (Array.isArray(v)) out[k] = v[0] != null ? String(v[0]) : undefined;
    else if (v != null) out[k] = String(v);
  }
  return out;
}

export default async function handler(req, res) {
  setPlainCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(405).send("METHOD");
  }

  const query = flattenVercelQuery(req.query);
  /** @type {Record<string, string | undefined>} */
  let form = {};

  if (req.method === "POST") {
    const ct = String(req.headers["content-type"] || "");
    if (typeof req.body === "string" && ct.includes("application/x-www-form-urlencoded")) {
      const sp = new URLSearchParams(req.body);
      for (const [k, v] of sp) form[k] = v;
    } else if (req.body && typeof req.body === "object" && !Array.isArray(req.body)) {
      for (const [k, v] of Object.entries(req.body)) {
        if (v != null && v !== "") form[k] = typeof v === "string" ? v : String(v);
      }
    }
  }

  const result = await handlePayseraCallback({
    query,
    form,
    env: process.env,
  });

  res.setHeader("Content-Type", result.contentType || "text/plain; charset=utf-8");
  return res.status(result.status).send(result.body);
}
