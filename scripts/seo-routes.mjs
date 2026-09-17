/**
 * Single source of truth for crawlable marketing URLs.
 * Used by sitemap generation and the Hostinger SPA 404 / robots headers.
 *
 * Keep in sync with React Router in src/App.tsx.
 */
export const CANONICAL_ORIGIN = "https://nexora-agn.com";

export const INDEXABLE_PATHS = [
  "/",
  "/about",
  "/services",
  "/services/websites",
  "/ai",
  "/industries",
  "/industries/construction",
  "/industries/roofing",
  "/industries/electrical",
  "/industries/plumbing",
  "/industries/painting",
  "/industries/landscaping",
  "/industries/automotive",
  "/industries/real-estate",
  "/industries/restaurants",
  "/industries/barbershops",
  "/industries/retail",
  "/work",
  "/examples",
  "/pricing",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/shipping-policy",
];

export const INDEXABLE_BLOG_SLUGS = [
  "construction-supply-catalog-erp-sync",
  "real-estate-development-lead-routing",
  "automotive-services-booking-erp",
  "preview-your-website-before-you-subscribe",
  "what-a-local-service-website-needs-to-generate-leads",
];

export const SPA_REDIRECT_PATHS = ["/services/ai-chatbots"];
export const PUBLIC_NOINDEX_PREFIXES = [
  "/start",
  "/client-checklist",
  "/thank-you",
  "/payment/",
  "/sales-deck",
  "/website-program",
  "/admin",
  "/templates",
];

export function normalizePathname(pathname) {
  if (!pathname) return "/";
  let p = pathname.split("?")[0].split("#")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

export function indexableUrls() {
  const urls = INDEXABLE_PATHS.map(path => `${CANONICAL_ORIGIN}${path === "/" ? "/" : path}`);
  for (const slug of INDEXABLE_BLOG_SLUGS) {
    urls.push(`${CANONICAL_ORIGIN}/blog/${slug}`);
  }
  return urls;
}

export function isIndexablePath(pathname) {
  const p = normalizePathname(pathname);
  if (INDEXABLE_PATHS.includes(p)) return true;
  if (p.startsWith("/blog/")) {
    return INDEXABLE_BLOG_SLUGS.includes(p.slice("/blog/".length));
  }
  return false;
}

export function isKnownSpaPath(pathname) {
  const p = normalizePathname(pathname);
  if (INDEXABLE_PATHS.includes(p)) return true;
  if (SPA_REDIRECT_PATHS.includes(p)) return true;
  if (p === "/start" || p === "/client-checklist" || p === "/sales-deck" || p === "/website-program") {
    return true;
  }
  if (p === "/thank-you" || p === "/payment/complete" || p === "/payment/cancelled") return true;
  if (p.startsWith("/admin")) return true;
  if (p.startsWith("/templates")) return true;
  if (p.startsWith("/blog/")) return INDEXABLE_BLOG_SLUGS.includes(p.slice("/blog/".length));
  if (p.startsWith("/industries/")) {
    return INDEXABLE_PATHS.includes(p);
  }
  return false;
}

export function xRobotsTagForPath(pathname) {
  const p = normalizePathname(pathname);
  if (p.startsWith("/admin") || p.startsWith("/payment/")) return "noindex, nofollow";
  if (p.startsWith("/templates") || p === "/sales-deck" || p === "/website-program") return "noindex, follow";
  if (p === "/start" || p === "/client-checklist" || p === "/thank-you") return "noindex, follow";
  return null;
}
