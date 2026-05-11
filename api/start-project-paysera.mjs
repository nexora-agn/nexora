// POST /api/start-project-paysera — save project request, return signed Paysera pay URL (browser should redirect).
import { handlePublicStartProjectPayseraRedirect } from "../server/public-start-project-paysera.mjs";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const result = await handlePublicStartProjectPayseraRedirect(body, process.env);
  const code = result.status ?? (result.ok ? 200 : 500);
  return res.status(code).json(result);
}
