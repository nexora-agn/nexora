// POST /api/start-project-stripe — save project request, return Stripe Checkout URL (browser should redirect).
import { handlePublicStartProjectStripeRedirect } from "../server/public-start-project-stripe.mjs";

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
  const reqOrigin =
    typeof req.headers.origin === "string"
      ? req.headers.origin
      : req.headers.host
        ? `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`
        : undefined;
  const result = await handlePublicStartProjectStripeRedirect(body, process.env, reqOrigin);
  const code = result.status ?? (result.ok ? 200 : 500);
  return res.status(code).json(result);
}
