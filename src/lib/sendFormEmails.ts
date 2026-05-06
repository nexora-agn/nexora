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
 */
export async function sendNexoraFormEmail(body: NexoraFormEmailBody): Promise<void> {
  const res = await fetch("/api/send-form-emails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as { ok?: boolean; error?: string };
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Could not send email. Please try again or write to info@nexora-agn.com.");
  }
}
