// POST /api/paddle-payment-link — staff-only; creates Paddle checkout URL for a project request.
import { handleCreatePaddlePaymentLink } from "../server/paddle-payment-link.mjs";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const auth = typeof req.headers.authorization === "string" ? req.headers.authorization : undefined;
  const result = await handleCreatePaddlePaymentLink(body, auth, process.env);
  const code = result.status ?? (result.ok ? 200 : 500);
  return res.status(code).json(result);
}
