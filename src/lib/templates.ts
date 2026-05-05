/**
 * Template registry — every selectable template in the admin.
 *
 * To add a new template later:
 * 1. Add it to this list.
 * 2. Wire any template-specific source paths in `server/export-logic.mjs`
 *    if it ships with its own template source.
 * 3. The New Client dialog and the clients list pick up the new entry
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
}

export const TEMPLATES: TemplateOption[] = [
  {
    id: "summit-construction",
    name: "Summit Construction",
    tagline: "Premium full-service construction",
    description:
      "Bold dark-navy + gold construction template with hero image, services grid, why-choose-us, reviews, recent projects, and dark estimate form. Built for general contractors and design-build firms.",
    thumbnail:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=520&fit=crop",
    accent: "#e4b012",
    available: true,
    features: [
      "Dark navy + gold brand",
      "Big hero with trust pills",
      "5-card services grid",
      "Why-choose-us with stats",
      "Google-style reviews",
      "Dark estimate CTA section",
    ],
  },
];

export const DEFAULT_TEMPLATE_ID = TEMPLATES[0].id;

export function getTemplate(id: string | null | undefined): TemplateOption {
  if (!id) return TEMPLATES[0];
  return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0];
}
