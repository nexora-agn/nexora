/**
 * Paysera classic checkout — payment notification (callbackurl).
 * Must respond with plain-text "OK" when the signature is valid (Paysera may retry otherwise).
 *
 * Env:
 * - PAYSERA_SIGN_PASSWORD (or PAYSERA_PROJECT_PASSWORD) — same as project password for signing
 * - SUPABASE_URL / VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from "@supabase/supabase-js";
import { verifyPayseraCallbackParams } from "./paysera-classic.mjs";
import { resolveSupabaseEnv } from "./paysera-staff.mjs";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(s) {
  return typeof s === "string" && UUID_RE.test(s.trim());
}

function coerceStringRecord(raw) {
  /** @type {Record<string, string>} */
  const out = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw)) {
    if (v === undefined || v === null) continue;
    out[k] = typeof v === "string" ? v : String(v);
  }
  return out;
}

/**
 * @param {{ query: Record<string, string | undefined>; form?: Record<string, string | undefined>; env: NodeJS.ProcessEnv }}
 */
export async function handlePayseraCallback({ query, form = {}, env }) {
  const signPassword = String(env.PAYSERA_SIGN_PASSWORD || env.PAYSERA_PROJECT_PASSWORD || "").trim();
  if (!signPassword) {
    console.error("[paysera-callback] Missing PAYSERA_SIGN_PASSWORD");
    return { status: 500, body: "FAIL", contentType: "text/plain; charset=utf-8" };
  }

  const merged = coerceStringRecord({
    ...Object.fromEntries(Object.entries(query).filter(([, v]) => v != null)),
    ...Object.fromEntries(Object.entries(form).filter(([, v]) => v != null)),
  });

  const verified = verifyPayseraCallbackParams(merged, signPassword);
  if (!verified.ok) {
    console.warn("[paysera-callback] Signature failed:", verified.error);
    return { status: 400, body: "INVALID", contentType: "text/plain; charset=utf-8" };
  }

  const p = verified.params;
  const orderId = String(p.orderid || "").trim();
  if (!isUuid(orderId)) {
    console.warn("[paysera-callback] Bad orderid:", orderId);
    return { status: 400, body: "BAD_ORDER", contentType: "text/plain; charset=utf-8" };
  }

  const statusCode = Number.parseInt(String(p.status ?? ""), 10);
  const notification = {
    received_at: new Date().toISOString(),
    status: Number.isFinite(statusCode) ? statusCode : null,
    amount: p.amount != null ? String(p.amount) : null,
    currency: p.currency || null,
    payment: p.payment || null,
    paytext: p.paytext || null,
    ss1: p.ss1 || null,
    ss2: p.ss2 || null,
  };

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = resolveSupabaseEnv(env);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[paysera-callback] Supabase service role not configured");
    return { status: 500, body: "FAIL", contentType: "text/plain; charset=utf-8" };
  }

  const adminSb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data: row, error: loadErr } = await adminSb
    .from("project_requests")
    .select("id, payload, status")
    .eq("id", orderId)
    .maybeSingle();

  if (loadErr) {
    console.error("[paysera-callback] DB load:", loadErr.message);
    return { status: 500, body: "FAIL", contentType: "text/plain; charset=utf-8" };
  }
  if (!row) {
    console.warn("[paysera-callback] Unknown order / project_request:", orderId);
    return { status: 404, body: "UNKNOWN", contentType: "text/plain; charset=utf-8" };
  }

  const prevPayload =
    row.payload && typeof row.payload === "object" && !Array.isArray(row.payload) ? { ...row.payload } : {};
  const prevNotes = Array.isArray(prevPayload.paysera_callbacks) ? [...prevPayload.paysera_callbacks] : [];
  prevNotes.push(notification);

  const nextPayload = {
    ...prevPayload,
    paysera_callbacks: prevNotes,
    paysera_last_callback: notification,
  };

  /** Status 1 = paid per Paysera classic examples */
  const paid = statusCode === 1;
  if (paid) {
    nextPayload.paysera_paid_at = notification.received_at;
    nextPayload.paysera_payment_status = "paid";
  }

  const nextRowStatus =
    paid && row.status === "new" ? "in_progress" : row.status;

  const { error: upErr } = await adminSb
    .from("project_requests")
    .update({
      status: nextRowStatus,
      payload: nextPayload,
    })
    .eq("id", orderId);

  if (upErr) {
    console.error("[paysera-callback] DB update:", upErr.message);
    return { status: 500, body: "FAIL", contentType: "text/plain; charset=utf-8" };
  }

  return { status: 200, body: "OK", contentType: "text/plain; charset=utf-8" };
}
