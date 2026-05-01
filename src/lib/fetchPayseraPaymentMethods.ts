import { payseraPayApiUrl } from "@/lib/payseraPayApiUrl";

export type PayseraPaymentMethodItem = {
  key: string;
  title: string;
  description: string | null;
  type: string;
  flow: string;
  available_countries: string[];
  available_currencies: Record<string, { main?: boolean }>;
};

function buildMethodsUrl(filters?: { amount?: number; currency?: string }): string {
  const qs = new URLSearchParams();
  const hasAmt = filters?.amount != null && Number.isFinite(filters.amount) && filters.amount >= 1;
  const cur = filters?.currency?.trim().toUpperCase();
  const hasCur = /^[A-Z]{3}$/.test(cur ?? "");
  if (hasAmt && hasCur && cur) {
    qs.set("amount", String(Math.round(filters.amount!)));
    qs.set("currency", cur);
  }
  const q = qs.toString();
  return payseraPayApiUrl(`/api/paysera-payment-methods${q ? `?${q}` : ""}`);
}

export type FetchPayseraPaymentMethodsOk = { ok: true; items: PayseraPaymentMethodItem[] };
export type FetchPayseraPaymentMethodsFail = { ok: false; error?: string };

/**
 * Staff-only GET proxy to Paysera checkout methods (`PAYSERA_ACCESS_TOKEN` on server).
 */
export async function fetchPayseraPaymentMethods(
  accessToken: string | undefined,
  filters?: { amount?: number; currency?: string },
): Promise<FetchPayseraPaymentMethodsOk | FetchPayseraPaymentMethodsFail> {
  if (!accessToken?.trim()) {
    return { ok: false, error: "You need to be signed in to load payment methods." };
  }

  const url = buildMethodsUrl(filters);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken.trim()}`,
        Accept: "application/json",
      },
    });
    const data = (await res.json()) as FetchPayseraPaymentMethodsOk | FetchPayseraPaymentMethodsFail;
    if (res.ok && data && typeof data === "object" && "ok" in data && data.ok && Array.isArray((data as FetchPayseraPaymentMethodsOk).items)) {
      return data as FetchPayseraPaymentMethodsOk;
    }
    const errMsg =
      typeof (data as FetchPayseraPaymentMethodsFail).error === "string"
        ? (data as FetchPayseraPaymentMethodsFail).error
        : `HTTP ${res.status}`;
    return { ok: false, error: errMsg };
  } catch {
    return { ok: false, error: "Network error while loading payment methods." };
  }
}
