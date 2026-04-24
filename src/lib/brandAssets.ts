import nexoraLogo from "@/assets/nexora-logo.png";

/** Nexora wordmark for header, footer, and inline brand use (Vite-resolved URL). */
export const NEXORA_LOGO_SRC = nexoraLogo;

/** Public site origin (no trailing slash), same as `VITE_PUBLIC_SITE_URL` in `.env` / Vercel. */
const publicSiteBase = (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://nexora.com";

/** Open Graph / social preview image — `public/og-image.png` (served as `/og-image.png`). */
export const NEXORA_OG_IMAGE_PATH = "/og-image.png";

/** Full URL to OG image; keep in sync with `index.html` (built with the same `VITE_PUBLIC_SITE_URL`). */
export const NEXORA_OG_IMAGE_URL = `${publicSiteBase}/og-image.png`;

/** Site favicon (`public/favicon.svg`). */
export const NEXORA_FAVICON_PATH = "/favicon.svg";
