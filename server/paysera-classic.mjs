/**
 * Paysera Checkout — classic custom integration (www.paysera.com/pay).
 * Outgoing: URL-safe base64 bundle + sign = md5(data + sign_password)
 * Callback: flat parameters + sign = md5(ksort values concatenated + sign_password)
 */
import crypto from "node:crypto";

/**
 * Build `data` + `sign` query pair for https://www.paysera.com/pay/
 * @param {Record<string, string | number | boolean>} params — must not include `sign`
 * @param {string} signPassword — project sign password (server-only)
 */
export function encodePayseraPayDataSign(params, signPassword) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    sp.set(k, String(v));
  }
  const query = sp.toString();
  const base64Encoded = Buffer.from(query, "utf8").toString("base64");
  const encodedData = base64Encoded.replace(/\//g, "_").replace(/\+/g, "-");
  const sign = crypto.createHash("md5").update(encodedData + signPassword).digest("hex");
  return { data: encodedData, sign };
}

export function buildPayseraClassicPaymentUrl(encodedData, sign) {
  const q = new URLSearchParams({ data: encodedData, sign }).toString();
  return `https://www.paysera.com/pay/?${q}`;
}

/**
 * Verify Paysera server callback (GET or POST body as flat fields).
 * @param {Record<string, string>} params — must include `sign`
 * @param {string} signPassword
 * @returns {{ ok: true, params: Record<string, string> } | { ok: false, error: string }}
 */
export function verifyPayseraCallbackParams(params, signPassword) {
  const copy = { ...params };
  const receivedSign = copy.sign;
  if (!receivedSign || typeof signPassword !== "string" || !signPassword) {
    return { ok: false, error: "missing_sign_or_password" };
  }
  delete copy.sign;
  const keys = Object.keys(copy).sort();
  const signString = keys.map(k => String(copy[k] ?? "")).join("") + signPassword;
  const calculated = crypto.createHash("md5").update(signString).digest("hex");
  if (calculated.toLowerCase() !== String(receivedSign).toLowerCase()) {
    return { ok: false, error: "invalid_signature" };
  }
  return { ok: true, params: copy };
}
