import { HOME_HERO as ROOFIX_HOME_HERO } from "../data/siteData";

/** Current default from Roofix `HOME_HERO.image` in `siteData`. */
export const ROOFIX_CANONICAL_HERO_IMAGE = ROOFIX_HOME_HERO.image;

function inferUnsplashPhotoId(url: string): string | null {
  const m = url.match(/photo-[a-zA-Z0-9-]+/i);
  return m ? m[0].toLowerCase() : null;
}

const STALE_PHOTO_IDS = new Set(
  [
    "photo-1579847188804-ecba0e2ea330",
    "photo-1613490493576-7fde63acd811",
    "photo-1599809275671-b5942cabc7a2",
    "photo-1560518883-ce09059eeffa",
    "photo-1644604120663-4e5fcdf33104",
    "photo-1503387762-592deb58ef4e",
  ].map(id => id.toLowerCase()),
);

const CANONICAL_ID = inferUnsplashPhotoId(ROOFIX_CANONICAL_HERO_IMAGE);

export function normalizeRoofixHeroImageUrl(stored: unknown): string {
  const canon = ROOFIX_CANONICAL_HERO_IMAGE;
  if (typeof stored !== "string" || !stored.trim()) return canon;
  const u = stored.trim();
  const id = inferUnsplashPhotoId(u);
  if (!id) return u;
  if (CANONICAL_ID && id === CANONICAL_ID) return canon;
  if (STALE_PHOTO_IDS.has(id)) return canon;
  return u;
}

export function withCanonicalRoofixHeroImage<T extends { homeHero: { image?: string } & Record<string, unknown> }>(
  content: T,
): T {
  const next = normalizeRoofixHeroImageUrl(content.homeHero?.image);
  if (content.homeHero?.image === next) return content;
  return {
    ...content,
    homeHero: {
      ...content.homeHero,
      image: next,
    },
  };
}
