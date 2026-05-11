import type { PackageOnboardingPayload, ProjectRequestType } from "@/lib/supabase";
import { payseraPayApiUrl } from "@/lib/payseraPayApiUrl";

function startProjectPayseraEndpoint(): string {
  const explicit = (import.meta.env.VITE_FORM_API_URL as string | undefined)?.trim().replace(/\/$/, "");
  if (explicit) return `${explicit}/api/start-project-paysera`;
  return payseraPayApiUrl("/api/start-project-paysera");
}

/**
 * Saves the start-project submission on the server and returns the signed Paysera pay URL.
 * The browser should assign `window.location.href` to this URL (redirect to paysera.com/pay).
 */
export async function submitStartProjectAndGetPayseraRedirect(input: {
  requestType: ProjectRequestType;
  payload: PackageOnboardingPayload;
}): Promise<{ payment_URL: string }> {
  const url = startProjectPayseraEndpoint();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formType: "start_project",
      requestType: input.requestType,
      payload: input.payload,
    }),
  });

  const raw = await res.text();
  let data: { ok?: boolean; error?: string; payment_URL?: string } = {};
  try {
    data = JSON.parse(raw) as typeof data;
  } catch {
    /* non-JSON = proxy/HTML error */
  }

  if (!res.ok || !data.ok || typeof data.payment_URL !== "string" || !data.payment_URL.startsWith("http")) {
    const msg =
      typeof data.error === "string"
        ? data.error
        : res.ok && raw.trimStart().startsWith("<")
          ? "Checkout unavailable: the site returned HTML instead of the payment API (check hosting or VITE_FORM_API_URL)."
          : `Could not start checkout (HTTP ${res.status}).`;
    throw new Error(msg);
  }

  return { payment_URL: data.payment_URL };
}
