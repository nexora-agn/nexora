import { paddlePayApiUrl } from "@/lib/paddlePayApiUrl";

function paddlePaymentLinkEndpoint(): string {
  const explicit = (import.meta.env.VITE_PADDLE_PAYMENT_LINK_URL as string | undefined)?.trim().replace(/\/$/, "");
  if (explicit) {
    return explicit.endsWith("/api/paddle-payment-link") ? explicit : `${explicit}/api/paddle-payment-link`;
  }
  return paddlePayApiUrl("/api/paddle-payment-link");
}

export type CreatePaddlePaymentLinkPayload = {
  projectRequestId: string;
  /** Amount in minor units (cents). Omit to use server plan defaults. */
  amount?: number;
  currency?: string;
};

export type CreatePaddlePaymentLinkOk = {
  ok: true;
  payment_URL: string;
  order_id: string;
  transaction_id?: string | null;
  purchase?: { mode?: string; amount?: number; currency?: string };
};

export type CreatePaddlePaymentLinkFail = {
  ok: false;
  error: string;
};

/**
 * Calls the server-side Paddle checkout endpoint (credentials stay on the server).
 */
export async function createPaddlePaymentLink(
  accessToken: string | undefined,
  payload: CreatePaddlePaymentLinkPayload,
): Promise<CreatePaddlePaymentLinkOk | CreatePaddlePaymentLinkFail> {
  if (!accessToken?.trim()) {
    return { ok: false, error: "You need to be signed in to create a payment link." };
  }

  const url = paddlePaymentLinkEndpoint();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.trim()}`,
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as CreatePaddlePaymentLinkOk | CreatePaddlePaymentLinkFail;
    if (res.ok && data && typeof data === "object" && "ok" in data && data.ok) {
      return data as CreatePaddlePaymentLinkOk;
    }
    const errMsg =
      typeof (data as CreatePaddlePaymentLinkFail).error === "string"
        ? (data as CreatePaddlePaymentLinkFail).error
        : `HTTP ${res.status}`;
    return { ok: false, error: errMsg };
  } catch {
    return { ok: false, error: "Network error while contacting payment API." };
  }
}
