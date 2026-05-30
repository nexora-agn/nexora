/**
 * Submit the start-project form, create a Stripe Checkout Session on the
 * server, then redirect the browser to Stripe's hosted checkout page.
 *
 * The server returns:
 *   { ok: true, checkout_url: string | null, order_id: string, session_id: string | null }
 *
 * checkout_url is null only for the "custom" / Enterprise plan (contact-sales
 * flow), in which case we redirect to /payment/complete directly.
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
  /** "redirect" — browser navigated away to Stripe; "contact" — Enterprise enquiry saved */
  mode: "redirect" | "contact";
};

/**
 * Saves the start-project submission, creates a Stripe Checkout Session on the
 * server, then redirects the user to Stripe Checkout.
 *
 * This function never resolves normally on success — the browser navigates
 * away. It only throws on error.
 */
export async function submitStartProjectAndRedirectToStripe(input: {
  requestType: "new_website" | "migrate";
  payload: Record<string, unknown>;
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
    error?: string;
  };

  if (!res.ok || !data.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : `Checkout failed (HTTP ${res.status})`);
  }

  // Enterprise / custom plan — no checkout URL, just confirmed
  if (!data.checkout_url) {
    return { order_id: data.order_id ?? "", session_id: null, mode: "contact" };
  }

  // Redirect to Stripe Checkout (browser navigates away)
  window.location.href = data.checkout_url;

  // This return is never reached in practice but satisfies TypeScript
  return { order_id: data.order_id ?? "", session_id: data.session_id ?? null, mode: "redirect" };
}
