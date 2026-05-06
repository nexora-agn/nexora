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
  let data: { ok?: boolean; error?: string } = {};
  if (ct.includes("application/json")) {
    try {
      data = JSON.parse(raw) as typeof data;
    } catch {
      /* ignore */
    }
  }
  if (!res.ok || !data.ok) {
    const fallback =
      raw.trimStart().startsWith("<") || raw.includes("<!DOCTYPE")
        ? "Form service unavailable: the server returned a web page instead of the email API. On Hostinger, open Websites → your site → Settings and set Start command to npm start (not vite preview). Entry file: server.js. Redeploy. Or set VITE_FORM_API_URL to a URL where Node runs server.js."
        : "Could not send email. Please try again or write to info@nexora-agn.com.";
    throw new Error(data.error || fallback);
  }
}
