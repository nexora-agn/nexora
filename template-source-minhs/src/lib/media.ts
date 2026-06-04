import {
  MINHS_IMAGES,
  PROJECTS,
  SERVICE_DEEP_DIVES,
  SERVICES,
  SERVICE_SECTION_IMAGES,
} from "@template-minhs/data/siteData";

/** Unsplash photo slugs allowed for MINHS (automotive registry only). */
const ALLOWED_UNSPLASH_IDS = new Set(
  Object.values(MINHS_IMAGES)
    .map(url => url.match(/photo-([0-9]+-[a-z0-9]+)/)?.[1])
    .filter((id): id is string => Boolean(id)),
);

/** Electrical-template service ids that must never appear on MINHS. */
const LEGACY_ELECTRICAL_SERVICE_IDS = new Set([
  "emergency-electrical",
  "electrical-inspections",
  "panel-upgrades",
  "residential-electrical",
  "commercial-electrical",
  "ev-charger-installation",
  "surge-protection",
  "outdoor-lighting",
  "smart-home-wiring",
  "backup-power",
  "commercial-fitouts",
]);

export const MINHS_SERVICE_IMAGE_BY_ID: Record<string, string> = Object.fromEntries(
  SERVICES.map(s => [s.id, s.image]),
);

export const MINHS_SERVICE_SECTION_IMAGE_BY_ID: Record<string, string> = {
  ...SERVICE_SECTION_IMAGES,
  ...Object.fromEntries(SERVICE_DEEP_DIVES.map(s => [s.id, s.image])),
};

export function isAllowedMinhsImage(url: string | undefined | null): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (!trimmed.includes("images.unsplash.com")) return true;
  const id = trimmed.match(/photo-([0-9]+-[a-z0-9]+)/)?.[1];
  if (!id) return true;
  return ALLOWED_UNSPLASH_IDS.has(id);
}

export function resolveMinhsServiceImage(serviceId: string, candidate?: string | null): string {
  const canonical = MINHS_SERVICE_IMAGE_BY_ID[serviceId] ?? MINHS_IMAGES.generalRepairs;
  if (candidate && isAllowedMinhsImage(candidate)) return candidate;
  return canonical;
}

export function resolveMinhsServiceSectionImage(sectionId: string, candidate?: string | null): string {
  const canonical =
    MINHS_SERVICE_SECTION_IMAGE_BY_ID[sectionId] ??
    MINHS_SERVICE_IMAGE_BY_ID[sectionId] ??
    MINHS_IMAGES.generalRepairs;
  if (candidate && isAllowedMinhsImage(candidate)) return candidate;
  return canonical;
}

export function sanitizeMinhsImageMap(map: Record<string, string> | undefined): Record<string, string> {
  if (!map) return {};
  const out: Record<string, string> = {};
  for (const [id, url] of Object.entries(map)) {
    if (isAllowedMinhsImage(url)) out[id] = url;
  }
  return out;
}

type RowWithImage = { id: string; image?: string; [key: string]: unknown };

function hydrateImageRows<T extends RowWithImage>(
  defaults: T[],
  partial: T[] | undefined,
  imageById: Record<string, string>,
): T[] {
  const pmap = new Map((partial ?? []).map(row => [row.id, row]));
  return defaults.map(def => {
    const saved = pmap.get(def.id);
    if (!saved) return def;
    const canonical = imageById[def.id] ?? def.image;
    const image = isAllowedMinhsImage(saved.image) ? saved.image : canonical;
    return { ...def, ...saved, image };
  });
}

/** Reset services/projects to automotive defaults; strip legacy trade images from drafts. */
export function hydrateMinhsSiteContent<T extends Record<string, unknown>>(content: T): T {
  const services = hydrateImageRows(
    SERVICES as RowWithImage[],
    (content.services as RowWithImage[] | undefined)?.filter(
      s => !LEGACY_ELECTRICAL_SERVICE_IDS.has(s.id),
    ),
    MINHS_SERVICE_IMAGE_BY_ID,
  );

  const projectImageById = Object.fromEntries(PROJECTS.map(p => [p.id, p.image]));
  const partialProjects = content.projects as typeof PROJECTS | undefined;
  const projects = PROJECTS.map(def => {
    const saved = partialProjects?.find(p => p.id === def.id);
    const base = hydrateImageRows([def as RowWithImage], saved ? [saved as RowWithImage] : undefined, projectImageById)[0];
    return {
      ...base,
      beforeImage: isAllowedMinhsImage(saved?.beforeImage) ? saved!.beforeImage : def.beforeImage,
      afterImage: isAllowedMinhsImage(saved?.afterImage) ? saved!.afterImage : def.afterImage,
      gallery: (saved?.gallery?.length ? saved.gallery : def.gallery).filter(isAllowedMinhsImage),
    };
  });

  const sectionImageById = MINHS_SERVICE_SECTION_IMAGE_BY_ID;
  const serviceSections = hydrateImageRows(
    SERVICE_DEEP_DIVES as RowWithImage[],
    content.serviceSections as RowWithImage[] | undefined,
    sectionImageById,
  );

  return {
    ...content,
    services,
    projects,
    serviceSections,
  };
}

export function hydrateMinhsThemeConfig<T extends { serviceImages?: Record<string, string>; projectImages?: Record<string, string> }>(
  theme: T,
): T {
  return {
    ...theme,
    serviceImages: sanitizeMinhsImageMap(theme.serviceImages),
    serviceSectionImages: sanitizeMinhsImageMap(theme.serviceSectionImages),
    projectImages: sanitizeMinhsImageMap(theme.projectImages),
  };
}
