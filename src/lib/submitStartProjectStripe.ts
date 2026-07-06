/**
 * Submit the start-project form, create a Stripe Checkout Session on the
 * server, then redirect the browser to Stripe's hosted checkout page.
 *
 * The server returns:
 *   { ok: true, checkout_url: string | null, order_id: string, session_id: string | null }
 *
 * checkout_url is null only when the server uses email delivery (no redirect).
 */

function startProjectStripeEndpoint(): string {
  const explicit = (import.meta.env.VITE_FORM_API_URL as string | undefined)?.trim().replace(/\/$/, "");
  if (explicit) return `${explicit}/api/start-project-stripe`;
  // Default: same origin (production server serves both static + API)
  return "/api/start-project-stripe";
}

export type StartProjectStripeResult = {
  order_id: string;
  session_id: string | null;
  /**
   * "redirect"    — browser navigated away to Stripe Checkout.
   * "email_link"  — a secure payment link was emailed to the client (no redirect).
   */
  mode: "redirect" | "email_link";
};

/**
 * Saves the start-project submission and creates a Stripe Checkout Session on
 * the server.
 *
 * Delivery modes:
 * - "redirect" (default): the browser navigates straight to Stripe Checkout and
 *   this function never resolves normally on success.
 * - "email": the server emails the secure checkout link to the client instead.
 *   The function resolves with mode "email_link" (no redirect).
 *
 * Throws on error.
 */
export async function submitStartProjectAndRedirectToStripe(input: {
  requestType: "new_website" | "migrate";
  payload: Record<string, unknown>;
  delivery?: "redirect" | "email";
}): Promise<StartProjectStripeResult> {
  const url = startProjectStripeEndpoint();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = (await res.json()) as {
    ok?: boolean;
    checkout_url?: string | null;
    order_id?: string;
    session_id?: string | null;
    delivery?: "email" | "redirect";
    error?: string;
  };

  if (!res.ok || !data.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : `Checkout failed (HTTP ${res.status})`);
  }

  // Email delivery — the link was sent to the client's inbox; no redirect.
  if (data.delivery === "email") {
    return { order_id: data.order_id ?? "", session_id: data.session_id ?? null, mode: "email_link" };
  }

  if (!data.checkout_url) {
    throw new Error("Checkout URL missing from server response.");
  }

  // Redirect to Stripe Checkout (browser navigates away)
  window.location.href = data.checkout_url;

  // This return is never reached in practice but satisfies TypeScript
  return { order_id: data.order_id ?? "", session_id: data.session_id ?? null, mode: "redirect" };
}
