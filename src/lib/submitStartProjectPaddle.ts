import { openPaddleCheckout } from "@/lib/paddleJs";
import { paddlePayApiUrl } from "@/lib/paddlePayApiUrl";

function startProjectPaddleEndpoint(): string {
  const explicit = (import.meta.env.VITE_FORM_API_URL as string | undefined)?.trim().replace(/\/$/, "");
  if (explicit) return `${explicit}/api/start-project-paddle`;
  return paddlePayApiUrl("/api/start-project-paddle");
}

export type StartProjectPaddleResult = {
  order_id?: string;
  transaction_id?: string | null;
  mode: "overlay" | "redirect";
};

/**
 * Saves the start-project submission, creates a Paddle transaction on the server,
 * then opens checkout via Paddle.js overlay (or redirects to hosted checkout as fallback).
 */
export async function submitStartProjectAndOpenPaddleCheckout(input: {
  requestType: "new_website" | "migrate";
  payload: Record<string, unknown>;
}): Promise<StartProjectPaddleResult> {
  const url = startProjectPaddleEndpoint();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await res.json()) as {
    ok?: boolean;
    payment_URL?: string;
    transaction_id?: string | null;
    order_id?: string;
    error?: string;
  };
  if (!res.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : `Checkout failed (HTTP ${res.status})`);
  }

  const mode = await openPaddleCheckout({
    transactionId: data.transaction_id,
    paymentUrl: data.payment_URL,
  });

  return {
    order_id: data.order_id,
    transaction_id: data.transaction_id,
    mode,
  };
}
