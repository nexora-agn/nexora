/**
 * Resend email bundle for marketing forms: internal notification + client confirmation.
 * Used by Vite dev middleware and Vercel `api/send-form-emails.mjs`.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/** `public/nexora-logo.png` — used in the custom email header banner (inline CID) and as remote fallback. */
const LOGO_ON_DISK = path.join(__dirname, "..", "public", "nexora-logo.png");
const LOGO_CID = "nexora-logo-email";

/** Team inbox: all three forms (contact, demo, start project) send a copy here. Override with NEXORA_INTERNAL_EMAIL. */
const DEFAULT_INTERNAL_NOTIFY = "info@nexora-agn.com";

/**
 * `from` must use an address on a domain you verify at resend.com/domains (e.g. nexora-agn.com).
 * Resend’s *@resend.dev* sender can only send test mail to your own address — not to customers.
 */
const DEFAULT_RESEND_FROM = "Nexora <info@nexora-agn.com>";

/**
 * Set `NEXORA_PUBLIC_URL` or `VITE_PUBLIC_SITE_URL` for remote logo URL fallback if the file cannot be read on disk.
 */
function getPublicSiteOrigin(env) {
  const explicit = String(env.NEXORA_PUBLIC_URL || env.VITE_PUBLIC_SITE_URL || "")
    .trim()
    .replace(/\/$/, "");
  if (explicit) return explicit;
  const v = String(env.VERCEL_URL || "").trim().replace(/\/$/, "");
  if (v) return `https://${v}`;
  return "";
}

function getEmailLogoUrl(env) {
  const o = getPublicSiteOrigin(env);
  if (!o) return "";
  return `${o}/nexora-logo.png`;
}

/**
 * @returns {Promise<import("resend").Attachment | null>}
 */
async function loadLogoInlineAttachment() {
  try {
    const content = await fs.readFile(LOGO_ON_DISK);
    if (!content.length) return null;
    return {
      filename: "nexora-logo.png",
      content,
      contentType: "image/png",
      inlineContentId: LOGO_CID,
    };
  } catch (e) {
    console.warn("[form-email] Could not read logo file for inline CID:", e?.message ?? e);
    return null;
  }
}

/**
 * Logo for the custom header banner (CID preferred; else `https://…/nexora-logo.png`).
 * @param {Record<string, string | undefined>} env
 */
async function resolveEmailImages(env) {
  const logoAtt = await loadLogoInlineAttachment();
  if (logoAtt) {
    return {
      logoImgSrc: `cid:${LOGO_CID}`,
      attachments: [logoAtt],
    };
  }
  const remoteL = getEmailLogoUrl(env);
  return {
    logoImgSrc: remoteL || "",
    attachments: undefined,
  };
}

const DEFAULT_SITE_ORIGIN = "https://nexora-agn.com";

function siteHomeHref(ctx) {
  return ctx?.siteOrigin || DEFAULT_SITE_ORIGIN;
}

const FOOTER_TAGLINE = "Custom websites, delivered fast";

/**
 * Custom email banner: gradient strip + `nexora-logo.png` (same file as the site) + tagline. Replaces the old full-bleed PNG hero.
 */
function brandHeaderWithLogo(logoSrc, siteOrigin) {
  if (!logoSrc) return "";
  const home = siteHomeHref({ siteOrigin });
  return `<tr>
    <td style="padding:0;margin:0;background:#0a0f1a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(165deg,#0a0f1a 0%,#1e293b 42%,#0f172a 100%);">
        <tr>
          <td style="padding:28px 24px 24px 24px;text-align:center;border-bottom:3px solid #334155;">
            <a href="${escapeHtml(home)}" style="text-decoration:none;border:0;display:inline-block;" target="_blank" rel="noopener noreferrer">
              <img src="${escapeHtml(logoSrc)}" width="200" alt="Nexora" style="display:block;max-width:200px;width:100%;height:auto;margin:0 auto;border:0;outline:none;"/>
            </a>
            <p style="margin:16px 0 0 0;padding:0;font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#94a3b8;">${escapeHtml(FOOTER_TAGLINE)}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

/** Headline under banner — slate strip, aligned with a premium B2B look */
function documentTitleRow(title) {
  return `<tr>
    <td style="padding:20px 28px 18px 28px;background:#f1f5f9;border-left:4px solid #0f172a;border-bottom:1px solid #e2e8f0;">
      <h1 style="margin:0;font-size:18px;font-weight:600;letter-spacing:-0.02em;color:#0f172a;line-height:1.35;">${escapeHtml(title)}</h1>
    </td>
  </tr>`;
}

/** If no public URL for the PNG, use a compact branded header (no image). */
function fallbackHeaderNoBanner(title) {
  return `<tr>
    <td style="background:linear-gradient(180deg,#0c1222 0%,#1e293b 100%);padding:22px 28px;border-bottom:2px solid #334155;">
      <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#94a3b8;">Nexora</p>
      <h1 style="margin:0;font-size:19px;font-weight:700;letter-spacing:-0.02em;color:#f8fafc;">${escapeHtml(title)}</h1>
    </td>
  </tr>`;
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidEmail(v) {
  if (typeof v !== "string" || !v.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/** Footer text only — logo lives in the top `brandHeaderWithLogo` strip. */
function emailFooterRows() {
  return `<tr>
    <td style="padding:20px 28px 22px 28px;background:#fafafa;border-top:1px solid #e2e8f0;">
      <p style="margin:0 0 6px 0;font-size:12px;line-height:1.5;color:#64748b;text-align:center;">
        <strong style="color:#0f172a;font-weight:600;">Nexora</strong> · ${escapeHtml(FOOTER_TAGLINE)}
      </p>
      <p style="margin:0;font-size:11px;line-height:1.45;color:#94a3b8;text-align:center;">NEXORA SOLUTION L.L.C. · Kingdom of Bahrain</p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 16px 24px 16px;text-align:center;">
      <p style="margin:0;font-size:10px;line-height:1.4;color:#94a3b8;max-width:520px;">This message was sent because you submitted a form on our site. If you did not expect it, you can ignore this email.</p>
    </td>
  </tr>`;
}

/** Internal / team notifications — custom logo banner + title + field list */
function emailDocument({ preheader, title, blocks, siteOrigin, logoImgSrc }) {
  const pre = preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>` : "";
  const rows = blocks
    .map(
      b => `
  <tr>
    <td style="padding:10px 0 2px 0;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.09em;">${escapeHtml(
      b.label,
    )}</td>
  </tr>
  <tr>
    <td style="padding:0 0 18px 0;font-size:15px;line-height:1.55;color:#0f172a;white-space:pre-wrap;word-break:break-word;border-bottom:1px solid #f1f5f9;">${b.htmlValue}</td>
  </tr>`,
    )
    .join("");

  const headerBlock = logoImgSrc
    ? `${brandHeaderWithLogo(logoImgSrc, siteOrigin)}${documentTitleRow(title)}`
    : `${fallbackHeaderNoBanner(title)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="color-scheme" content="light"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#eceff2;font-family:'Segoe UI',system-ui,-apple-system,Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  ${pre}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eceff2;padding:28px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;border-radius:2px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 2px 8px rgba(15,23,42,0.06);">
          ${headerBlock}
          <tr>
            <td style="padding:24px 28px 8px 28px;background:#ffffff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${rows}
              </table>
            </td>
          </tr>
          ${emailFooterRows()}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Client confirmation letters — custom logo banner, prose body */
function clientLetterHtml({ preheader, innerHtml, siteOrigin, headline, logoImgSrc }) {
  const pre = preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>`
    : `<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml("Nexora")}</div>`;
  const headStrip = logoImgSrc
    ? `${brandHeaderWithLogo(logoImgSrc, siteOrigin)}<tr>
    <td style="padding:16px 28px 0 28px;background:#ffffff;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:16px;font-weight:600;letter-spacing:-0.02em;color:#0f172a;">${escapeHtml(headline)}</p>
    </td>
  </tr>`
    : `<tr>
    <td style="background:linear-gradient(180deg,#0c1222 0%,#1e293b 100%);padding:20px 28px 22px 28px;">
      <p style="margin:0 0 2px 0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#94a3b8;">Nexora</p>
      <p style="margin:0;font-size:16px;font-weight:600;letter-spacing:-0.02em;color:#f8fafc;">${escapeHtml(headline)}</p>
    </td>
  </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="color-scheme" content="light"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#eceff2;font-family:'Segoe UI',system-ui,-apple-system,Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  ${pre}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eceff2;padding:28px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;border-radius:2px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 2px 8px rgba(15,23,42,0.06);">
          ${headStrip}
          <tr>
            <td style="padding:22px 28px 8px 28px;background:#ffffff;">
              <div style="font-size:15px;line-height:1.65;color:#334155;">${innerHtml}</div>
            </td>
          </tr>
          ${emailFooterRows()}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// --- contact ---

function buildContactInternal({ name, email, subject, message }, ctx) {
  const blocks = [
    { label: "Name", htmlValue: escapeHtml(name) },
    {
      label: "Email",
      htmlValue: `<a href="mailto:${escapeHtml(email)}" style="color:#0f172a;font-weight:500;">${escapeHtml(email)}</a>`,
    },
    { label: "Subject", htmlValue: subject ? escapeHtml(subject) : "—" },
    { label: "Message", htmlValue: escapeHtml(message) },
  ];
  return emailDocument({
    preheader: `New contact from ${name}`,
    title: "New contact form submission",
    blocks,
    siteOrigin: ctx.siteOrigin,
    logoImgSrc: ctx.logoImgSrc,
  });
}

function buildContactClient({ name, email }, ctx) {
  return clientLetterHtml({
    preheader: `We received your message, ${name}`,
    headline: "Message received",
    innerHtml: `
    <p style="margin:0 0 14px 0;">Hi <strong style="color:#0f172a;">${escapeHtml(name)}</strong>,</p>
    <p style="margin:0 0 14px 0;">Thanks for contacting Nexora. We received your message and will reply within <strong>one business day</strong>.</p>
    <p style="margin:0 0 14px 0;">If you need to reach us sooner, write to <a href="mailto:info@nexora-agn.com" style="color:#0f172a;font-weight:500;">info@nexora-agn.com</a>.</p>
    <p style="margin:0;color:#64748b;font-size:14px;">— The Nexora team</p>
  `,
    siteOrigin: ctx.siteOrigin,
    logoImgSrc: ctx.logoImgSrc,
  });
}

// --- demo ---

const INDUSTRY_LABELS = {
  "e-commerce": "E-commerce",
  saas: "SaaS",
  agency: "Agency",
  restaurant: "Restaurant",
  "real-estate": "Real estate",
  construction: "Construction",
  other: "Other",
};

function buildDemoInternal(data, ctx) {
  const industry = INDUSTRY_LABELS[data.industry] || data.industry || "—";
  const blocks = [
    { label: "Name", htmlValue: escapeHtml(data.name) },
    {
      label: "Email",
      htmlValue: `<a href="mailto:${escapeHtml(data.email)}" style="color:#0f172a;font-weight:500;">${escapeHtml(data.email)}</a>`,
    },
    { label: "Company", htmlValue: data.company ? escapeHtml(data.company) : "—" },
    { label: "Industry", htmlValue: escapeHtml(industry) },
    { label: "Phone", htmlValue: escapeHtml(data.phone) },
    { label: "Has website", htmlValue: data.hasWebsite === "yes" ? "Yes" : data.hasWebsite === "no" ? "No" : "—" },
    {
      label: "Marketing opt-in",
      htmlValue: data.marketingOptIn ? "Yes" : "No",
    },
  ];
  return emailDocument({
    preheader: `Demo request from ${data.name}`,
    title: "New demo request",
    blocks,
    siteOrigin: ctx.siteOrigin,
    logoImgSrc: ctx.logoImgSrc,
  });
}

function buildDemoClient({ name, email }, ctx) {
  return clientLetterHtml({
    preheader: `Demo request confirmed for ${name}`,
    headline: "You’re on the list",
    innerHtml: `
    <p style="margin:0 0 14px 0;">Hi <strong style="color:#0f172a;">${escapeHtml(name)}</strong>,</p>
    <p style="margin:0 0 14px 0;">Thanks for your interest in Nexora. We received your <strong>demo request</strong> and will be in touch within <strong>24 hours</strong> to find a time that works for you.</p>
    <p style="margin:0 0 14px 0;">We sent this confirmation to <strong>${escapeHtml(email)}</strong>.</p>
    <p style="margin:0;color:#64748b;font-size:14px;">— The Nexora team</p>
  `,
    siteOrigin: ctx.siteOrigin,
    logoImgSrc: ctx.logoImgSrc,
  });
}

// --- start project ---

function boolLabel(v) {
  if (v === true) return "Yes";
  if (v === false) return "No";
  return "—";
}

function planLabel(id) {
  if (id === "starter") return "Starter";
  if (id === "growth") return "Growth";
  if (id === "custom") return "Custom";
  return String(id || "—");
}

function paymentLabel(p) {
  if (p === "stripe" || p === "card") return "Stripe (card)";
  if (p === "paypal") return "PayPal";
  return String(p || "—");
}

function buildStartProjectInternal({ requestType, payload }, ctx) {
  const common = [
    { label: "Name", htmlValue: escapeHtml(payload.full_name) },
    { label: "Email", htmlValue: `<a href="mailto:${escapeHtml(payload.contact_email)}">${escapeHtml(payload.contact_email)}</a>` },
    { label: "Phone", htmlValue: escapeHtml(payload.contact_phone) },
    { label: "Company", htmlValue: escapeHtml(payload.company) },
    { label: "Plan", htmlValue: escapeHtml(planLabel(payload.selected_plan)) },
    { label: "Payment (when ready)", htmlValue: escapeHtml(paymentLabel(payload.payment_preference)) },
  ];

  if (requestType === "new_website") {
    const feats = (payload.preferred_features || []).join(", ") || "—";
    const blocks = [
      ...common,
      { label: "Path", htmlValue: "New website" },
      { label: "Timeline", htmlValue: escapeHtml(payload.timeline) },
      { label: "Industry", htmlValue: escapeHtml(payload.industry) },
      { label: "ERP integration", htmlValue: boolLabel(payload.erp_integration) },
      {
        label: "Current ERP (if any)",
        htmlValue: payload.current_erp_system ? escapeHtml(payload.current_erp_system) : "—",
      },
      { label: "AI chatbot", htmlValue: boolLabel(payload.ai_chatbot) },
      {
        label: "Chatbot details",
        htmlValue: payload.ai_chatbot_requirements ? escapeHtml(payload.ai_chatbot_requirements) : "—",
      },
      { label: "Preferred features", htmlValue: escapeHtml(feats) },
      { label: "Other features", htmlValue: payload.other_preferred_features ? escapeHtml(payload.other_preferred_features) : "—" },
      { label: "Notes", htmlValue: payload.additional_notes ? escapeHtml(payload.additional_notes) : "—" },
    ];
    return emailDocument({
      preheader: `New project: ${payload.full_name}`,
      title: "New website — project request",
      blocks,
      siteOrigin: ctx.siteOrigin,
      logoImgSrc: ctx.logoImgSrc,
    });
  }

  const blocks = [
    ...common,
    { label: "Path", htmlValue: "Migration" },
    { label: "Timeline", htmlValue: escapeHtml(payload.timeline) },
    { label: "Existing site URL", htmlValue: `<a href="${escapeHtml(payload.website_url)}">${escapeHtml(payload.website_url)}</a>` },
    { label: "ERP / stack", htmlValue: escapeHtml(payload.erp_system) },
    { label: "ERP has API", htmlValue: boolLabel(payload.erp_has_api) },
    { label: "Build API (if no ERP API)", htmlValue: payload.build_api == null ? "—" : boolLabel(payload.build_api) },
    { label: "AI chatbot", htmlValue: boolLabel(payload.ai_chatbot) },
    {
      label: "Chatbot details",
      htmlValue: payload.ai_chatbot_requirements ? escapeHtml(payload.ai_chatbot_requirements) : "—",
    },
    { label: "Migration requirements", htmlValue: payload.migration_requirements ? escapeHtml(payload.migration_requirements) : "—" },
    { label: "Notes", htmlValue: payload.additional_notes ? escapeHtml(payload.additional_notes) : "—" },
  ];
  return emailDocument({
    preheader: `Migration request: ${payload.full_name}`,
    title: "Site migration — project request",
    blocks,
    siteOrigin: ctx.siteOrigin,
    logoImgSrc: ctx.logoImgSrc,
  });
}

function buildStartProjectClient({ requestType, payload }, ctx) {
  const path = requestType === "new_website" ? "new website" : "site migration";
  return clientLetterHtml({
    preheader: `We received your ${path} project request`,
    headline: "Project request received",
    innerHtml: `
    <p style="margin:0 0 14px 0;">Hi <strong style="color:#0f172a;">${escapeHtml(payload.full_name)}</strong>,</p>
    <p style="margin:0 0 14px 0;">Thanks for starting a <strong>${escapeHtml(path)}</strong> project with Nexora. We have your details and will review your request shortly.</p>
    <p style="margin:0 0 14px 0;">We sent this confirmation to <strong>${escapeHtml(payload.contact_email)}</strong>. If anything needs to change, reply to this email or contact <a href="mailto:info@nexora-agn.com" style="color:#0f172a;font-weight:500;">info@nexora-agn.com</a>.</p>
    <p style="margin:0;color:#64748b;font-size:14px;">— The Nexora team</p>
  `,
    siteOrigin: ctx.siteOrigin,
    logoImgSrc: ctx.logoImgSrc,
  });
}

function parseContact(body) {
  if (!isNonEmptyString(body.name)) return { error: "Missing name" };
  if (!isValidEmail(body.email)) return { error: "Invalid email" };
  if (!isNonEmptyString(body.message)) return { error: "Missing message" };
  return {
    data: {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: isNonEmptyString(body.subject) ? body.subject.trim() : "",
      message: body.message.trim(),
    },
  };
}

function parseDemo(body) {
  if (!isNonEmptyString(body.name)) return { error: "Missing name" };
  if (!isValidEmail(body.email)) return { error: "Invalid email" };
  if (!isNonEmptyString(body.phone)) return { error: "Missing phone" };
  if (!isNonEmptyString(body.industry)) return { error: "Missing industry" };
  if (body.hasWebsite !== "yes" && body.hasWebsite !== "no") return { error: "Invalid hasWebsite" };
  return {
    data: {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      company: body.company && String(body.company).trim() ? String(body.company).trim() : "",
      industry: body.industry,
      phone: body.phone.trim(),
      hasWebsite: body.hasWebsite,
      marketingOptIn: Boolean(body.marketingOptIn),
    },
  };
}

function parseStartProject(body) {
  if (body.requestType !== "new_website" && body.requestType !== "migrate") {
    return { error: "Invalid requestType" };
  }
  if (!body.payload || typeof body.payload !== "object") return { error: "Missing payload" };
  const p = body.payload;
  if (!isNonEmptyString(p.full_name)) return { error: "Invalid payload" };
  if (!isValidEmail(p.contact_email)) return { error: "Invalid contact_email" };
  return { data: { requestType: body.requestType, payload: p } };
}

/**
 * @param {Record<string, string>} env
 * @returns {Promise<{ ok: true } | { ok: false, error: string }>}
 */
export async function handleSendFormEmails(body, env) {
  const formType = body?.formType;
  if (formType !== "contact" && formType !== "demo" && formType !== "start_project") {
    return { ok: false, error: "Invalid or missing formType" };
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not set on the server" };
  }

  const notifyTo = (env.NEXORA_INTERNAL_EMAIL || env.VITE_NEXORA_INTERNAL_EMAIL || DEFAULT_INTERNAL_NOTIFY).trim();
  const fromRaw = (env.RESEND_FROM || env.VITE_RESEND_FROM || DEFAULT_RESEND_FROM).trim();

  const siteOrigin = getPublicSiteOrigin(env);
  const { logoImgSrc, attachments: emailAttachments } = await resolveEmailImages(env);
  const emailCtx = { logoImgSrc, siteOrigin };

  let internalHtml;
  let internalSubject;
  let clientHtml;
  let clientSubject;
  let clientTo;
  let replyTo;

  if (formType === "contact") {
    const parsed = parseContact(body);
    if (parsed.error) return { ok: false, error: parsed.error };
    const d = parsed.data;
    clientTo = d.email;
    replyTo = d.email;
    internalHtml = buildContactInternal(d, emailCtx);
    clientHtml = buildContactClient(d, emailCtx);
    internalSubject = `[Nexora] Contact: ${d.name}`;
    clientSubject = "We received your message — Nexora";
  } else if (formType === "demo") {
    const parsed = parseDemo(body);
    if (parsed.error) return { ok: false, error: parsed.error };
    const d = parsed.data;
    clientTo = d.email;
    replyTo = d.email;
    internalHtml = buildDemoInternal(d, emailCtx);
    clientHtml = buildDemoClient(d, emailCtx);
    internalSubject = `[Nexora] Demo request: ${d.name}`;
    clientSubject = "Demo request received — Nexora";
  } else {
    const parsed = parseStartProject(body);
    if (parsed.error) return { ok: false, error: parsed.error };
    const { requestType, payload } = parsed.data;
    clientTo = payload.contact_email;
    replyTo = payload.contact_email;
    internalHtml = buildStartProjectInternal({ requestType, payload }, emailCtx);
    clientHtml = buildStartProjectClient({ requestType, payload }, emailCtx);
    const short = requestType === "new_website" ? "New site" : "Migration";
    internalSubject = `[Nexora] ${short}: ${payload.full_name}`;
    clientSubject = "We received your project request — Nexora";
  }

  const resend = new Resend(apiKey);

  const sendOpts = {
    from: fromRaw,
    ...(emailAttachments ? { attachments: emailAttachments } : {}),
  };

  const [internalResult, clientResult] = await Promise.all([
    resend.emails.send({
      ...sendOpts,
      to: notifyTo,
      subject: internalSubject,
      html: internalHtml,
      replyTo,
    }),
    resend.emails.send({
      ...sendOpts,
      to: clientTo,
      subject: clientSubject,
      html: clientHtml,
    }),
  ]);

  if (internalResult.error) {
    console.error("[form-email] Internal notification error:", internalResult.error);
    return { ok: false, error: internalResult.error.message || "Failed to send team notification" };
  }
  if (clientResult.error) {
    console.error("[form-email] Client email error:", clientResult.error);
    return { ok: false, error: clientResult.error.message || "Failed to send confirmation email" };
  }

  return { ok: true };
}
