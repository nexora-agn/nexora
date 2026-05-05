/**
 * Template registry — every selectable template in the admin.
 *
 * To add a new template later:
 * 1. Add an entry to `TEMPLATES` below (with `paths` metadata).
 * 2. Add a matching `preview-<id>.html` if it has its own preview entry,
 *    and register it in `vite.config.ts` build inputs.
 * 3. The export server (`server/export-api.mjs` + `api/export-site.mjs`)
 *    uses `paths.scaffoldDir` and `paths.liveTemplateDir` automatically
 *    via this registry — no manual wiring needed.
 * 4. The New Client dialog and the clients list pick up the new entry
 *    automatically.
 */
export interface TemplateOption {
  /** Stable identifier persisted on the `clients.template_id` column. */
  id: string;
  /** Human-readable name shown in the picker. */
  name: string;
  /** Short tagline / one-liner shown under the name. */
  tagline: string;
  /** Longer description shown in the picker card. */
  description: string;
  /** Preview thumbnail image URL (any reachable URL works). */
  thumbnail: string;
  /** Brand accent color shown on the card chrome. */
  accent: string;
  /** When false, card is shown but cannot be selected. */
  available: boolean;
  /** Bullet list of marquee features for the picker card. */
  features: string[];
  /**
   * Filesystem + URL paths used by the editor preview iframe and by the
   * export server to assemble the client ZIP.
   */
  paths: {
    /** Path under `/` for the iframe preview entry HTML. */
    previewHtml: string;
    /** Repo-relative directory of the standalone scaffold (template source). */
    scaffoldDir: string;
    /** Repo-relative directory of the live admin template overlay. */
    liveTemplateDir: string;
  };
}

export const TEMPLATES: TemplateOption[] = [
  {
    id: "constructo",
    name: "Constructo (classic)",
    tagline: "Design-build studio · navy + gold",
    description:
      "The original Nexora construction template. Hero with featured project badge, capabilities grid, process timeline, projects, team, and contact. Best fit for design-build firms and general contractors.",
    thumbnail:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=520&fit=crop",
    accent: "#e4b012",
    available: true,
    features: [
      "Navy + gold brand",
      "Capabilities + process timeline",
      "Projects with detail pages",
      "Team + about with stats",
      "Contact with map embed",
      "Editable nav + footer",
    ],
    paths: {
      previewHtml: "/preview.html",
      scaffoldDir: "template-source",
      liveTemplateDir: "src/template",
    },
  },
  {
    id: "summit",
    name: "Summit Construction (new)",
    tagline: "Trust-bar + reviews · brown announcement",
    description:
      "Newer construction template with an announcement bar, Google reviews strip, big hero, services ribbon, signature projects, and a dark estimate CTA. Built for general contractors leaning into trust + bookings.",
    thumbnail:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=520&fit=crop",
    accent: "#8c4f1f",
    available: true,
    features: [
      "Trust + reviews announcement bar",
      "Big hero with services ribbon",
      "Why-choose-us with stats",
      "Signature projects gallery",
      "Dark estimate / lead CTA",
      "Editable nav + footer",
    ],
    paths: {
      previewHtml: "/preview-summit.html",
      scaffoldDir: "template-source-summit",
      liveTemplateDir: "src/template-summit",
    },
  },
];

export const DEFAULT_TEMPLATE_ID = TEMPLATES[0].id;

/**
 * Best-effort lookup. Falls back to the first template when an unknown id is
 * passed (e.g. legacy `summit-construction` rows from before the registry
 * split — those used to render the Constructo files anyway).
 */
export function getTemplate(id: string | null | undefined): TemplateOption {
  if (!id) return TEMPLATES[0];
  return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0];
}
