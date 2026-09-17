import { COMPANY_LEGAL, COMPANY_OFFICES } from "@/lib/companyLegal";

export const CANONICAL_ORIGIN = "https://nexora-agn.com";

export const SITE_NAME = "Nexora";

export const DEFAULT_TITLE = "Nexora | We build your website, you preview it, then you decide.";

export const DEFAULT_DESCRIPTION =
  "Nexora builds hosted websites for local businesses. Preview your live site, then subscribe from $99 a month. Hosting, updates, and an AI assistant included.";

export const COMPANY_PHONE_DISPLAY = "+1 (888) 535-9177";
export const COMPANY_PHONE_TEL = "+18885359177";

export const ORGANIZATION_ID = `${CANONICAL_ORIGIN}/#organization`;
export const WEBSITE_ID = `${CANONICAL_ORIGIN}/#website`;

export function publicSiteOrigin(): string {
  const fromEnv = (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined)?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return CANONICAL_ORIGIN;
}

/** Canonical URL without a trailing slash, except for the homepage. */
export function canonicalUrl(path: string, origin = publicSiteOrigin()): string {
  const trimmed = path.split("?")[0].split("#")[0];
  if (!trimmed || trimmed === "/") return `${origin}/`;
  const normalized = trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
  return `${origin}${normalized.startsWith("/") ? normalized : `/${normalized}`}`;
}

export function absoluteUrl(path: string, origin = publicSiteOrigin()): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export const US_POSTAL_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: COMPANY_OFFICES[0].addressLines[0],
  addressLocality: "Sheridan",
  addressRegion: "WY",
  postalCode: "82801",
  addressCountry: "US",
};

export const ORGANIZATION_ENTITY = {
  brand: COMPANY_LEGAL.brand,
  legalName: COMPANY_LEGAL.legalName,
  email: COMPANY_LEGAL.contactEmail,
  telephone: COMPANY_PHONE_DISPLAY,
};

export const INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex, nofollow";
export const NOINDEX_FOLLOW_ROBOTS = "noindex, follow";
