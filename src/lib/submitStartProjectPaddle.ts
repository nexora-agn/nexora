import { paddlePayApiUrl } from "@/lib/paddlePayApiUrl";

function startProjectPaddleEndpoint(): string {
  const explicit = (import.meta.env.VITE_FORM_API_URL as string | undefined)?.trim().replace(/\/$/, "");
  if (explicit) return `${explicit}/api/start-project-paddle`;
  return paddlePayApiUrl("/api/start-project-paddle");
}

/**
 * Saves the start-project submission on the server and returns the Paddle checkout URL.
 * The browser should assign `window.location.href` to this URL.
 */
export async function submitStartProjectAndGetPaddleRedirect(input: {
  requestType: "new_website" | "migrate";
  payload: Record<string, unknown>;
}): Promise<{ payment_URL: string; order_id?: string }> {
  const url = startProjectPaddleEndpoint();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await res.json()) as {
    ok?: boolean;
    payment_URL?: string;
    order_id?: string;
    error?: string;
  };
  if (!res.ok || !data?.payment_URL) {
    throw new Error(typeof data?.error === "string" ? data.error : `Checkout failed (HTTP ${res.status})`);
  }
  return { payment_URL: data.payment_URL, order_id: data.order_id };
}
