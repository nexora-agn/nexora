// GET /api/paysera-payment-methods — staff-only; proxies Paysera checkout methods list.
import { handleListPayseraPaymentMethods } from "../server/paysera-payment-methods.mjs";

export const config = {
  api: {},
  maxDuration: 30,
};

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const authorization = typeof req.headers.authorization === "string" ? req.headers.authorization : undefined;
  const query =
    typeof req.query === "object" && req.query !== null ? /** @type {Record<string, string>} */ (req.query) : {};

  const result = await handleListPayseraPaymentMethods(query, authorization, process.env);
  const code = result.status ?? (result.ok ? 200 : 500);
  return res.status(code).json(result);
}
