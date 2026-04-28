import nexoraLogo from "@/assets/nexora-logo.png";

/** Nexora wordmark for header, footer, and inline brand use (Vite-resolved URL). */
export const NEXORA_LOGO_SRC = nexoraLogo;

function envPublicOrigin(): string {
  return (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "";
}

/** Open Graph / social preview image — `public/og-image-nexora.png` (served as `/og-image-nexora.png`). */
export const NEXORA_OG_IMAGE_PATH = "/og-image-nexora.png";

/**
 * Full URL to the OG image for the *current* public site. Uses `VITE_PUBLIC_SITE_URL` at build
 * time, then `window.location.origin` in the browser when the env is not set.
 */
export function getNexoraOgImageUrl(): string {
  const b = envPublicOrigin();
  if (b) return `${b}/og-image-nexora.png`;
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}/og-image-nexora.png`;
  }
  return NEXORA_OG_IMAGE_PATH;
}

/** Site favicon (`public/favicon.svg`). */
export const NEXORA_FAVICON_PATH = "/favicon.svg";
