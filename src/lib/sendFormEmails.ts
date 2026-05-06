import type { ProjectRequestPayload, ProjectRequestType } from "@/lib/supabase";

export type NexoraContactEmailBody = {
  formType: "contact";
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export type NexoraDemoEmailBody = {
  formType: "demo";
  name: string;
  email: string;
  company?: string;
  industry: string;
  phone: string;
  hasWebsite: "yes" | "no";
  marketingOptIn?: boolean;
};

export type NexoraStartProjectEmailBody = {
  formType: "start_project";
  requestType: ProjectRequestType;
  payload: ProjectRequestPayload;
};

export type NexoraFormEmailBody = NexoraContactEmailBody | NexoraDemoEmailBody | NexoraStartProjectEmailBody;

/**
 * Sends team notification + client confirmation via Resend (POST /api/send-form-emails).
 * Set VITE_FORM_API_URL when the UI is static-only and the API runs on another origin.
 */
export async function sendNexoraFormEmail(body: NexoraFormEmailBody): Promise<void> {
  const base = (import.meta.env.VITE_FORM_API_URL as string | undefined)?.trim().replace(/\/$/, "");
  const url = base ? `${base}/api/send-form-emails` : "/api/send-form-emails";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const ct = res.headers.get("content-type") || "";
  const raw = await res.text();
  const looksLikeHtml =
    ct.includes("text/html") || raw.trimStart().startsWith("<") || raw.includes("<!DOCTYPE");
  let data: { ok?: boolean; error?: string } = {};
  if (ct.includes("application/json")) {
    try {
      data = JSON.parse(raw) as typeof data;
    } catch {
      /* ignore */
    }
  }
  // SPA hosts often return 200 + index.html for /api/* — treat as failure even when status is OK.
  if (looksLikeHtml || !res.ok || !data.ok) {
    const fallback = looksLikeHtml
      ? "Form service unavailable: /api/send-form-emails returned your site's HTML (SPA fallback), not the Node API. Fix hosting so /api/* is handled by Node (npm start + server.js), nginx/Caddy must proxy /api to Node before try_files → index.html, or use VITE_FORM_API_URL to a host that only runs the API."
      : "Could not send email. Please try again or write to info@nexora-agn.com.";
    throw new Error(data.error || fallback);
  }
}
