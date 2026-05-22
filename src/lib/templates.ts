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
import constructoThumbUrl from "@/assets/admin/constructo-thumb.svg?url";
import summitThumbUrl from "@/assets/admin/summit-thumb.svg?url";
import ridgepeakThumbUrl from "@/assets/admin/ridgepeak-thumb.svg?url";
import roofixThumbUrl from "@/assets/admin/roofix-thumb.svg?url";
import electricalThumbUrl from "@/assets/admin/electrical-thumb.svg?url";
import plumbingThumbUrl from "@/assets/admin/plumbing-thumb.svg?url";
import paintingThumbUrl from "@/assets/admin/painting-thumb.svg?url";
import landscapingThumbUrl from "@/assets/admin/landscaping-thumb.svg?url";
import homebuilderThumbUrl from "@/assets/admin/homebuilder-thumb.svg?url";
import remodelerThumbUrl from "@/assets/admin/remodeler-thumb.svg?url";

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
    name: "Constructo",
    tagline: "Design-build studio · navy + gold",
    description:
      "The original Nexora construction template. Hero with featured project badge, capabilities grid, process timeline, projects, team, and contact. Best fit for design-build firms and general contractors.",
    /** Vite resolves URL; avoids broken /public SVG in some setups. */
    thumbnail: constructoThumbUrl,
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
    name: "Summit Construction",
    tagline: "Trust-bar + reviews · brown announcement",
    description:
      "Newer construction template with an announcement bar, Google reviews strip, big hero, services ribbon, signature projects, and a dark estimate CTA. Built for general contractors leaning into trust + bookings.",
    thumbnail: summitThumbUrl,
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
  {
    id: "nexora",
    name: "RidgePeak Roofing",
    tagline: "Roofing contractor · navy + orange",
    description:
      "Premium roofing template with 24/7 emergency bar, Google rating header, hero with trust pills, 4-card service grid, why-choose-us with credentials, customer reviews carousel, before/after gallery, and a dark estimate CTA. Best fit for roofing companies and storm-damage specialists.",
    thumbnail: ridgepeakThumbUrl,
    accent: "#f97316",
    available: true,
    features: [
      "24/7 emergency bar",
      "Roofing services 4-card grid",
      "Why-homeowners-choose-us with stats",
      "Customer reviews carousel",
      "Before/after gallery",
      "Dark estimate CTA",
    ],
    paths: {
      previewHtml: "/preview-nexora.html",
      scaffoldDir: "template-source-nexora",
      liveTemplateDir: "src/template-nexora",
    },
  },
  {
    id: "roofix",
    name: "Roofix Roofing",
    tagline: "Premium roofing · navy + blue accent",
    description:
      "Premium roofing template with announcement bar, big hero on a dark navy backdrop, services grid, why-choose-us card stack, recent projects gallery, testimonials, pricing tiers, blog and contact. Built for roofing companies focused on lead generation.",
    thumbnail: roofixThumbUrl,
    accent: "#2563eb",
    available: true,
    features: [
      "Dark navy + blue accent brand",
      "Hero with trust pills and CTA",
      "Roofing services grid",
      "Why-choose-us with stats",
      "Recent roofing projects gallery",
      "Pricing tiers + lead form",
    ],
    paths: {
      previewHtml: "/preview-roofix.html",
      scaffoldDir: "template-source-roofix",
      liveTemplateDir: "src/template-roofix",
    },
  },
  {
    id: "electrical",
    name: "VoltCurrent Electrical",
    tagline: "Premium electrical contractor · charcoal + electric blue",
    description:
      "Premium electrical contractor template with 24/7 emergency bar, split hero, residential & commercial highlights, services grid, troubleshooting section, project gallery, reviews spotlight, emergency financing band, service areas, and estimate form. Built specifically for electricians.",
    thumbnail: electricalThumbUrl,
    accent: "#38bdf8",
    available: true,
    features: [
      "24/7 emergency + contact strip",
      "Split hero with emergency CTA",
      "Residential & commercial panels",
      "15+ electrical services",
      "Troubleshooting + why-choose sections",
      "Project gallery + reviews spotlight",
    ],
    paths: {
      previewHtml: "/preview-electrical.html",
      scaffoldDir: "template-source-electrical",
      liveTemplateDir: "src/template-electrical",
    },
  },
  {
    id: "plumbing",
    name: "ClearCurrent Plumbing",
    tagline: "Premium plumbing contractor · deep blue + white",
    description:
      "Premium plumbing contractor template with 24/7 emergency bar, white premium hero, service categories, process timeline, before/after projects, Google reviews, financing, service areas, SEO city pages, and lead forms. Built specifically for plumbing companies.",
    thumbnail: plumbingThumbUrl,
    accent: "#2b7cd3",
    available: true,
    features: [
      "24/7 emergency + contact strip",
      "Premium white hero with reviews card",
      "14+ plumbing services",
      "Process + capabilities sections",
      "Before/after project gallery",
      "Financing + SEO city landing pages",
    ],
    paths: {
      previewHtml: "/preview-plumbing.html",
      scaffoldDir: "template-source-plumbing",
      liveTemplateDir: "src/template-plumbing",
    },
  },
  {
    id: "painting",
    name: "BrushHouse Painting",
    tagline: "Premium painting contractor · navy + orange",
    description:
      "Luxury residential & commercial painting template with announcement strip, cinematic hero, interior/exterior showcase, premium finishes, before/after transformations, editorial why-choose, horizontal process timeline, gallery, quote wall testimonials, service areas, and free estimate form. Built specifically for painting companies.",
    thumbnail: paintingThumbUrl,
    accent: "#ea580c",
    available: true,
    features: [
      "Luxury warm neutral palette",
      "Cinematic hero + trust marquee",
      "15+ painting services",
      "Finishes & before/after gallery",
      "Editorial why-choose + process timeline",
      "SEO city landing pages",
    ],
    paths: {
      previewHtml: "/preview-painting.html",
      scaffoldDir: "template-source-painting",
      liveTemplateDir: "src/template-painting",
    },
  },
  {
    id: "landscaping",
    name: "VerdeField Landscaping",
    tagline: "Premium landscaping & tree service · forest green + warm stone",
    description:
      "Luxury landscaping and tree service template with emergency contact strip, cinematic nature hero, tree service highlights, lawn care showcase, outdoor transformations gallery, seasonal services, process timeline, and estimate form. Built specifically for landscaping contractors.",
    thumbnail: landscapingThumbUrl,
    accent: "#3d6b4f",
    available: true,
    features: [
      "Forest green + warm stone palette",
      "19+ landscaping & tree services",
      "Tree service + lawn + hardscape sections",
      "Outdoor transformation gallery",
      "Seasonal services + service areas",
      "Premium estimate lead form",
    ],
    paths: {
      previewHtml: "/preview-landscaping.html",
      scaffoldDir: "template-source-landscaping",
      liveTemplateDir: "src/template-landscaping",
    },
  },
  {
    id: "homebuilder",
    name: "HarborStone Design-Build",
    tagline: "Luxury design-build custom homes · navy + copper",
    description:
      "Central NJ design-build home builder template inspired by premium contractor IA: hero with trust pillars, design-build expertise, process timeline, portfolio preview, lead magnet guide, county service areas, testimonials, and consultation CTAs. Distinct from trade templates.",
    thumbnail: homebuilderThumbUrl,
    accent: "#a67c52",
    available: true,
    features: [
      "Navy + copper palette (Spectral + IBM Plex Sans)",
      "8 design-build services with detail pages",
      "Process page + portfolio with filters",
      "County accordion service areas",
      "Free custom home guide lead magnet",
      "SEO city landing pages",
    ],
    paths: {
      previewHtml: "/preview-homebuilder.html",
      scaffoldDir: "template-source-homebuilder",
      liveTemplateDir: "src/template-homebuilder",
    },
  },
  {
    id: "remodeler",
    name: "Crestline Home Remodeling",
    tagline: "NJ home improvement & remodeling · deep teal + coral",
    description:
      "New Jersey home remodeling template inspired by Magnolia Home Remodeling information architecture (estimate-led hero, broad services, portfolio, process, counties, reviews, resources) with an original visual system — not a clone of other Nexora trade templates.",
    thumbnail: remodelerThumbUrl,
    accent: "#e07a5f",
    available: true,
    features: [
      "DM Serif Display + Source Sans 3 (teal + coral)",
      "14 remodeling services with detail pages",
      "Before & after portfolio filters",
      "6-step process + county service areas",
      "2026 remodeling guide lead magnet",
      "SEO city landing pages",
    ],
    paths: {
      previewHtml: "/preview-remodeler.html",
      scaffoldDir: "template-source-remodeler",
      liveTemplateDir: "src/template-remodeler",
    },
  },
];

export const DEFAULT_TEMPLATE_ID = TEMPLATES[0].id;

/**
 * Maps legacy `template_id` strings (from before the registry split) onto the
 * canonical registry ids. Keep this aligned with `LEGACY_TEMPLATE_ALIASES` in
 * `server/export-logic.mjs`.
 */
const LEGACY_TEMPLATE_ALIASES: Record<string, string> = {
  "summit-construction": "summit",
  "summit construction": "summit",
  "summit_construction": "summit",
  "constructo-classic": "constructo",
  "construction": "constructo",
};

/**
 * Resolve any persisted template id (current, legacy, or unknown) to the
 * canonical registry id, or `null` if it can't be matched.
 */
export function canonicalTemplateId(id: string | null | undefined): string | null {
  if (!id) return null;
  const normalized = id.trim().toLowerCase();
  if (TEMPLATES.some(t => t.id === normalized)) return normalized;
  return LEGACY_TEMPLATE_ALIASES[normalized] ?? null;
}

/**
 * Best-effort lookup. Honors legacy aliases (e.g. `summit-construction` →
 * `summit`) before falling back to the first registered template.
 */
export function getTemplate(id: string | null | undefined): TemplateOption {
  const canonical = canonicalTemplateId(id);
  if (!canonical) return TEMPLATES[0];
  return TEMPLATES.find(t => t.id === canonical) ?? TEMPLATES[0];
}
