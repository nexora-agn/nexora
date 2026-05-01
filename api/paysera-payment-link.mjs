// POST /api/paysera-payment-link — staff-only; creates Paysera checkout payment URL for a project request.
import { handleCreatePayseraPaymentLink } from "../server/paysera-payment-link.mjs";

export const config = {
  api: {
    bodyParser: true,
  },
  maxDuration: 30,
};

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
  const auth = req.headers.authorization;
  const result = await handleCreatePayseraPaymentLink(body, auth, process.env);
  const code = result.status ?? (result.ok ? 200 : 500);

  return res.status(code).json(result);
}
