import { payseraPayApiUrl } from "@/lib/payseraPayApiUrl";

/** Optional full POST URL override when the SPA and API live on different hosts (same pattern as export). */
function payseraPaymentLinkEndpoint(): string {
  const explicit = (import.meta.env.VITE_PAYSERA_PAYMENT_LINK_URL as string | undefined)?.trim().replace(/\/$/, "");
  if (explicit) return explicit.endsWith("/api/paysera-payment-link") ? explicit : `${explicit}/api/paysera-payment-link`;
  return payseraPayApiUrl("/api/paysera-payment-link");
}

export type CreatePayseraPaymentLinkPayload = {
  projectRequestId: string;
  /** Amount in minor units (e.g. cents). Omit to use server default `PAYSERA_PAYMENT_AMOUNT_MINOR`. */
  purchase?: { amount?: number };
  lifetime?: number;
  name?: string;
  experience?: { language?: string; payment_flow?: string };
  payment_details?: { key?: string; purpose?: string; country_code?: string };
  metadata?: Record<string, unknown>;
};

export type CreatePayseraPaymentLinkOk = {
  ok: true;
  payment_URL: string;
  link_id: string | null;
  order_id: string;
  expired_at: number | null;
  created_at: number | null;
  purchase?: { amount: number };
};

export type CreatePayseraPaymentLinkFail = {
  ok: false;
  error?: string;
};

/**
 * Calls the server-side Paysera Payment Link endpoint (OAuth token stays on the server).
 */
export async function createPayseraPaymentLink(
  accessToken: string | undefined,
  payload: CreatePayseraPaymentLinkPayload,
): Promise<CreatePayseraPaymentLinkOk | CreatePayseraPaymentLinkFail> {
  if (!accessToken?.trim()) {
    return { ok: false, error: "You need to be signed in to create a payment link." };
  }

  const url = payseraPaymentLinkEndpoint();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.trim()}`,
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as CreatePayseraPaymentLinkOk | CreatePayseraPaymentLinkFail;
    if (res.ok && data && typeof data === "object" && "ok" in data && data.ok) {
      return data as CreatePayseraPaymentLinkOk;
    }
    const errMsg =
      typeof (data as CreatePayseraPaymentLinkFail).error === "string"
        ? (data as CreatePayseraPaymentLinkFail).error
        : `HTTP ${res.status}`;
    return { ok: false, error: errMsg };
  } catch {
    return { ok: false, error: "Network error while contacting payment API." };
  }
}
