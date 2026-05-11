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

/** Default when `RESEND_ADMIN_EMAIL` (and legacy `NEXORA_INTERNAL_EMAIL`) are unset. */
const DEFAULT_ADMIN_EMAIL = "info@nexora-agn.com";

/**
 * `from` must use an address on a domain you verify at resend.com/domains (e.g. nexora-agn.com).
 * Resend’s *@resend.dev* sender can only send test mail to your own address — not to customers.
 *
 * Env (same idea as other repos): `RESEND_FROM_EMAIL` preferred, then `RESEND_FROM` / `VITE_*`.
 */
const DEFAULT_RESEND_FROM = "info@nexora-agn.com";

/**
 * Team notifications use this **From** (or `RESEND_FROM_INTERNAL` / `NEXORA_TRANSACTIONAL_FROM`).
 * Avoid `no-reply@` (hurts trust with spam feedback). Use a real role on your verified domain.
 * Keep this different from the admin `to` (info@) — same mailbox as From+To is often hidden or filtered.
 *
 * You do **not** need a real mailbox or Google/Microsoft user for this address. Once `nexora-agn.com` is
 * verified in Resend, you may send from any `*@nexora-agn.com` as the envelope “From” — it is a label, not
 * an inbox you check. Override with `RESEND_FROM_INTERNAL` if you prefer another local part (e.g. `team@…`).
 */
const DEFAULT_INTERNAL_RESEND_FROM = "notifications@nexora-agn.com";

/** Canonical public site for links in outbound email when env does not override (see `getPublicSiteOrigin`). */
const DEFAULT_SITE_ORIGIN = "https://nexora-agn.com";

const EMAIL_IN_LABEL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Resend requires `from` as `email@x` or `Name <email@x>`. Env often includes extra wrapping
 * quotes (`"Nexora <…>"`) or whitespace from Vercel / .env — strip and validate.
 */
function normalizeResendFrom(raw) {
  let s = String(raw ?? "")
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, "");
  while (
    s.length >= 2 &&
    ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'")))
  ) {
    s = s.slice(1, -1).trim();
  }
  if (!s) return DEFAULT_RESEND_FROM;
  if (EMAIL_IN_LABEL.test(s)) return s;
  const m = s.match(/^(.+?)\s*<\s*([^\s>]+@[^\s>]+)\s*>$/);
  if (m) {
    const name = m[1].trim().replace(/^["']|["']$/g, "");
    const addr = m[2].trim();
    if (EMAIL_IN_LABEL.test(addr)) return `${name} <${addr}>`;
  }
  return DEFAULT_RESEND_FROM;
}

/**
 * @param {string} fromNormalized — output of `normalizeResendFrom`
 * @returns {string} lowercased bare email, or "" if not parseable
 */
function extractBareEmailFromFromHeader(fromNormalized) {
  const s = String(fromNormalized ?? "").trim();
  const m = s.match(/<([^>]+)>\s*$/);
  if (m) {
    const inner = m[1].trim();
    if (EMAIL_IN_LABEL.test(inner)) return inner.toLowerCase();
  }
  if (EMAIL_IN_LABEL.test(s)) return s.toLowerCase();
  return "";
}

/**
 * Team / admin inbox for form notifications. Matches `RESEND_ADMIN_EMAIL` pattern from sibling projects.
 * @param {Record<string, string | undefined>} env
 */
function resolveAdminEmail(env) {
  const raw =
    env.RESEND_ADMIN_EMAIL ||
    env.NEXORA_INTERNAL_EMAIL ||
    env.VITE_NEXORA_INTERNAL_EMAIL ||
    DEFAULT_ADMIN_EMAIL;
  const t = String(raw ?? "")
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, "");
  return t || DEFAULT_ADMIN_EMAIL;
}

/**
 * Where to send the **internal** notification. Contact can use `RESEND_CONTACT_EMAIL` (else admin), like
 * `RESEND_CONTACT_EMAIL || RESEND_ADMIN_EMAIL` in other codebases.
 * @param {Record<string, string | undefined>} env
 * @param {"contact" | "demo" | "start_project"} formType
 */
function resolveNotifyTo(env, formType) {
  const admin = resolveAdminEmail(env);
  if (formType === "contact") {
    const c = env.RESEND_CONTACT_EMAIL || env.VITE_RESEND_CONTACT_EMAIL;
    const t = String(c ?? "")
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, "");
    if (t) return t;
  }
  return admin;
}

/**
 * Public site origin for email links and remote logo URL.
 * Prefer `NEXORA_PUBLIC_URL` or `VITE_PUBLIC_SITE_URL` in Production (and Preview if you care).
 *
 * We intentionally do **not** fall back to `VERCEL_URL`: on Vercel it is always the deployment host
 * (`*.vercel.app`), not your production custom domain, so form emails looked broken.
 */
function getPublicSiteOrigin(env) {
  const explicit = String(env.NEXORA_PUBLIC_URL || env.VITE_PUBLIC_SITE_URL || "")
    .trim()
    .replace(/\/$/, "");
  if (explicit) return explicit;
  return DEFAULT_SITE_ORIGIN.replace(/\/$/, "");
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

function siteHomeHref(ctx) {
  return ctx?.siteOrigin || DEFAULT_SITE_ORIGIN;
}

/** Match landing Hero headline + `tailwind.config` brand (yellow underline on “Decide”). */
const HERO_TEXT_N950 = "#0A0A0A";
const HERO_TEXT_N600 = "#52525B";
const HERO_BRAND_GOLD = "#F5C517";

/**
 * Three-line hero headline (same copy as `Hero.tsx` / marketing).
 * @param {"header" | "footer"} variant
 * @param {"center" | "left"} [align] — footer only; center for header; left reads LTR, flush to the start edge.
 */
function heroTaglineEmailHtml(variant, align = "center") {
  const header = variant === "header";
  const fs1 = header ? "24px" : "14px";
  const fs23 = header ? "22px" : "13px";
  const mt = header ? "20px" : "12px";
  const isLeft = !header && align === "left";
  const boxAlign = isLeft
    ? "text-align:left;padding:0;max-width:100%;margin-left:0;margin-right:0"
    : "text-align:center;padding:0 4px;max-width:22rem;margin-left:auto;margin-right:auto";
  return `<div style="margin-top:${mt};${boxAlign};">
    <p style="margin:0 0 8px 0;padding:0;font-size:${fs1};font-weight:700;letter-spacing:-0.03em;line-height:1.12;color:${HERO_TEXT_N950};">We Build Your Website.</p>
    <p style="margin:0 0 8px 0;padding:0;font-size:${fs23};font-weight:600;letter-spacing:-0.02em;line-height:1.18;color:${HERO_TEXT_N600};">You Preview It.</p>
    <p style="margin:0;padding:0;font-size:${fs23};font-weight:600;letter-spacing:-0.02em;line-height:1.2;color:${HERO_TEXT_N600};">Then You
      <span style="font-weight:800;color:${HERO_TEXT_N950};border-bottom:3px solid ${HERO_BRAND_GOLD};padding-bottom:1px;">Decide</span>.
    </p>
  </div>`;
}

/**
 * Custom email banner: light background (dark-text logo) + `nexora-logo.png` + hero tagline.
 */
function brandHeaderWithLogo(logoSrc, siteOrigin) {
  if (!logoSrc) return "";
  const home = siteHomeHref({ siteOrigin });
  return `<tr>
    <td style="padding:0;margin:0;background:#f8fafc;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(180deg,#ffffff 0%,#f1f5f9 100%);">
        <tr>
          <td style="padding:28px 24px 24px 24px;text-align:center;border-bottom:1px solid #e2e8f0;">
            <a href="${escapeHtml(home)}" style="text-decoration:none;border:0;display:inline-block;" target="_blank" rel="noopener noreferrer">
              <img src="${escapeHtml(logoSrc)}" width="200" alt="Nexora" style="display:block;max-width:200px;width:100%;height:auto;margin:0 auto;border:0;outline:none;"/>
            </a>
            ${heroTaglineEmailHtml("header")}
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

/** If no logo available, use a light compact header (no image). */
function fallbackHeaderNoBanner(title) {
  return `<tr>
    <td style="background:#f8fafc;padding:20px 28px 22px 28px;border-bottom:1px solid #e2e8f0;">
      <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#64748b;">Nexora</p>
      <h1 style="margin:0;font-size:19px;font-weight:700;letter-spacing:-0.02em;color:#0f172a;">${escapeHtml(title)}</h1>
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

function escapeHtmlBreaks(text) {
  const t = String(text ?? "").trim();
  if (!t) return "—";
  return escapeHtml(t).replace(/\r\n|\r|\n/g, "<br>");
}

/** Lead email in **internal** team mail: plain text (no `mailto:`) so ESPs don’t flag off-domain links. */
function leadEmailInInternalHtml(email) {
  return `<span style="color:#0f172a;font-weight:500;word-break:break-all;">${escapeHtml(email)}</span>`;
}

/**
 * Third-party URLs in internal mail: show as text only (no off-site `href`) to match domain-trust checks.
 * If the URL is on the public site origin, a same-domain link is OK.
 */
function externalOrSiteUrlHtml(rawUrl, siteOrigin) {
  const u = String(rawUrl ?? "").trim();
  if (!u) return "—";
  const esc = escapeHtml(u);
  try {
    const base = new URL(u);
    const origin = (siteOrigin || DEFAULT_SITE_ORIGIN).replace(/\/$/, "");
    const site = new URL(origin);
    if (base.origin === site.origin) {
      return `<a href="${esc}" style="color:#0f172a;font-weight:500;">${esc}</a>`;
    }
  } catch {
    // not a valid URL — fall through to text
  }
  return `<span style="color:#0f172a;word-break:break-all;">${esc}</span>`;
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidEmail(v) {
  if (typeof v !== "string" || !v.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/**
 * @param {string} [logoSrc] — same `cid:` / URL as header (`nexora-logo.png`), or "" to use text "Nexora"
 * @param {string} [siteOrigin] — for logo link
 */
function emailFooterRows(logoSrc, siteOrigin) {
  const home = (siteOrigin || DEFAULT_SITE_ORIGIN).replace(/\/$/, "");
  const nameLine = logoSrc
    ? `<div style="margin:0 0 10px 0;">
        <a href="${escapeHtml(home)}/" style="text-decoration:none;border:0;display:inline-block;" target="_blank" rel="noopener noreferrer">
          <img src="${escapeHtml(logoSrc)}" width="100" alt="Nexora" style="display:block;max-width:100px;width:100px;height:auto;margin:0;border:0;"/>
        </a>
        ${heroTaglineEmailHtml("footer", "left")}
      </div>`
    : heroTaglineEmailHtml("footer", "left");

  return `<tr>
    <td style="padding:20px 28px 22px 28px;background:#fafafa;border-top:1px solid #e2e8f0;text-align:left;direction:ltr;">
      <div style="text-align:left;direction:ltr;">${nameLine}</div>
      <p style="margin:8px 0 0 0;font-size:11px;line-height:1.45;color:#94a3b8;text-align:left;direction:ltr;">NEXORA SOLUTION L.L.C.</p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 16px 24px 16px;text-align:left;direction:ltr;">
      <p style="margin:0;font-size:10px;line-height:1.4;color:#94a3b8;max-width:520px;text-align:left;">This message was sent because you submitted a form on our site. If you did not expect it, you can ignore this email.</p>
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
          ${emailFooterRows(logoImgSrc, siteOrigin)}
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
    <td style="background:#f8fafc;padding:20px 28px 22px 28px;border-bottom:1px solid #e2e8f0;">
      <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#64748b;">Nexora</p>
      <p style="margin:0;font-size:16px;font-weight:600;letter-spacing:-0.02em;color:#0f172a;">${escapeHtml(headline)}</p>
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
          ${emailFooterRows(logoImgSrc, siteOrigin)}
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
    { label: "Email", htmlValue: leadEmailInInternalHtml(email) },
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
    { label: "Email", htmlValue: leadEmailInInternalHtml(data.email) },
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
  if (p === "paysera") return "Paysera";
  if (p === "stripe" || p === "card") return "Stripe (legacy)";
  if (p === "paypal") return "PayPal (legacy)";
  return String(p || "—");
}

function buildStartProjectInternal({ requestType, payload }, ctx) {
  if (payload.onboarding_version === 2) {
    const isMigration = requestType === "migrate";
    const baseBlocks = [
      {
        label: "Path",
        htmlValue: isMigration ? "Migration" : "New website",
      },
      { label: "Plan", htmlValue: escapeHtml(planLabel(payload.selected_plan)) },
      { label: "Payment option", htmlValue: escapeHtml(paymentLabel(payload.payment_preference)) },
      { label: "Email", htmlValue: leadEmailInInternalHtml(payload.contact_email) },
    ];
    const flowBlocks = isMigration
      ? [
          { label: "Existing site URL", htmlValue: escapeHtmlBreaks(payload.current_website || "—") },
          { label: "Auto-extract", htmlValue: "Logo, brand colours, and copy will be pulled from the URL above." },
        ]
      : [
          { label: "Logo file", htmlValue: escapeHtml(payload.logo_file_name || "—") },
          { label: "Brand colors", htmlValue: escapeHtmlBreaks(payload.brand_colors || "—") },
          { label: "Preferred domain", htmlValue: escapeHtmlBreaks(payload.preferred_domain || "—") },
          { label: "Content / site copy", htmlValue: escapeHtmlBreaks(payload.content_text || "—") },
        ];
    const blocks = [
      ...baseBlocks,
      ...flowBlocks,
      { label: "Additional notes", htmlValue: escapeHtmlBreaks(payload.additional_notes || "—") },
    ];
    return emailDocument({
      preheader: `Package request: ${payload.contact_email}`,
      title: "Package onboarding — details",
      blocks,
      siteOrigin: ctx.siteOrigin,
      logoImgSrc: ctx.logoImgSrc,
    });
  }

  const common = [
    { label: "Name", htmlValue: escapeHtml(payload.full_name) },
    { label: "Email", htmlValue: leadEmailInInternalHtml(payload.contact_email) },
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
    {
      label: "Existing site URL",
      htmlValue: externalOrSiteUrlHtml(payload.website_url, ctx.siteOrigin),
    },
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
  if (payload.onboarding_version === 2) {
    const plan = planLabel(payload.selected_plan);
    const greetLocal = escapeHtml(payload.contact_email.split("@")[0] || "there");
    const pathSentence =
      requestType === "migrate"
        ? `Thank you for choosing the <strong>${escapeHtml(plan)}</strong> package for your <strong>site migration</strong>. We received the URL of your existing site — our team will pull your logo, brand colours, and content from there.`
        : `Thank you for choosing the <strong>${escapeHtml(plan)}</strong> package. We received your logo, brand colours, and any content notes you shared.`;
    return clientLetterHtml({
      preheader: `We received your ${plan} package request`,
      headline: "Request received — next: payment",
      innerHtml: `
    <p style="margin:0 0 14px 0;">Hi <strong style="color:#0f172a;">${greetLocal}</strong>,</p>
    <p style="margin:0 0 14px 0;">${pathSentence}</p>
    <p style="margin:0 0 14px 0;">You should now be on the secure Paysera checkout page in your browser to complete payment. Once payment is confirmed we move ahead with production.</p>
    <p style="margin:0 0 14px 0;">This confirmation goes to <strong>${escapeHtml(payload.contact_email)}</strong>. Reply here or reach <a href="mailto:info@nexora-agn.com" style="color:#0f172a;font-weight:500;">info@nexora-agn.com</a> if you need updates.</p>
    <p style="margin:0;color:#64748b;font-size:14px;">— The Nexora team</p>
  `,
      siteOrigin: ctx.siteOrigin,
      logoImgSrc: ctx.logoImgSrc,
    });
  }

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

export function parseStartProject(body) {
  if (body.requestType !== "new_website" && body.requestType !== "migrate") {
    return { error: "Invalid requestType" };
  }
  if (!body.payload || typeof body.payload !== "object") return { error: "Missing payload" };
  const p = body.payload;

  if (p.onboarding_version === 2) {
    if (body.requestType !== "new_website" && body.requestType !== "migrate") return { error: "Invalid requestType" };
    if (!isValidEmail(p.contact_email)) return { error: "Invalid contact_email" };

    // Field requirements diverge by flow (matches ProjectOnboardingWizard):
    //   • new_website → logo + brand colours + (optional) content / preferred domain
    //   • migrate     → only current_website is required; logo/colours/copy
    //                   are extracted from the live site post-submit.
    if (body.requestType === "new_website") {
      if (!isNonEmptyString(p.logo_file_name) || !isNonEmptyString(p.logo_mime_type)) {
        return { error: "Invalid payload" };
      }
      if (typeof p.logo_base64 !== "string" || p.logo_base64.length < 32) {
        return { error: "Invalid payload" };
      }
      if (!isNonEmptyString(p.brand_colors)) return { error: "Invalid payload" };
    } else {
      if (!isNonEmptyString(p.current_website)) return { error: "Invalid payload" };
    }

    const plan = String(p.selected_plan ?? "");
    if (plan !== "starter" && plan !== "growth" && plan !== "custom") return { error: "Invalid payload" };
    const pay = p.payment_preference;
    if (pay !== "paysera") {
      return { error: "Invalid payload" };
    }
    return { data: { requestType: body.requestType, payload: p } };
  }

  if (!isValidEmail(p.contact_email)) return { error: "Invalid contact_email" };
  if (!isNonEmptyString(p.full_name)) return { error: "Invalid payload" };
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

  const fromRaw = normalizeResendFrom(
    env.RESEND_FROM_EMAIL ||
      env.VITE_RESEND_FROM_EMAIL ||
      env.RESEND_FROM ||
      env.VITE_RESEND_FROM ||
      DEFAULT_RESEND_FROM
  );
  const notifyTo = resolveNotifyTo(env, formType);
  const internalFrom = normalizeResendFrom(
    env.RESEND_FROM_INTERNAL ||
      env.NEXORA_TRANSACTIONAL_FROM ||
      env.VITE_NEXORA_TRANSACTIONAL_FROM ||
      DEFAULT_INTERNAL_RESEND_FROM
  );

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
    const short =
      payload.onboarding_version === 2
        ? requestType === "migrate"
          ? "Migration (pkg)"
          : "New site (pkg)"
        : requestType === "new_website"
          ? "New site"
          : "Migration";
    const leadSubject =
      payload.onboarding_version === 2 ? payload.contact_email : payload.full_name;
    internalSubject = `[Nexora] ${short}: ${leadSubject}`;
    clientSubject = "We received your project request — Nexora";
  }

  const resend = new Resend(apiKey);

  const internalAddr = extractBareEmailFromFromHeader(internalFrom);
  const notifyAddr = String(notifyTo).trim().toLowerCase();
  if (internalAddr && notifyAddr && internalAddr === notifyAddr) {
    console.warn(
      "[form-email] Team email uses the same From and To; many providers hide or filter these. Set RESEND_FROM_INTERNAL to a different address on your verified domain (e.g. notifications@…).",
    );
  }

  const clientSendOpts = {
    from: fromRaw,
    ...(emailAttachments ? { attachments: emailAttachments } : {}),
  };

  const [internalResult, clientResult] = await Promise.all([
    resend.emails.send({
      from: internalFrom,
      ...(emailAttachments ? { attachments: emailAttachments } : {}),
      to: [notifyTo],
      subject: internalSubject,
      html: internalHtml,
      replyTo,
    }),
    resend.emails.send({
      ...clientSendOpts,
      to: [clientTo],
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
