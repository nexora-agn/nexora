/**
 * SEO city landing pages — design-build custom homes in Central NJ.
 */
export const SEO_CITIES = [
  {
    slug: "flemington",
    name: "Flemington",
    state: "NJ",
    county: "Hunterdon County",
    headline: "Custom Home Builder in Flemington, NJ",
    intro:
      "HarborStone Design-Build delivers luxury custom homes and additions for Flemington and Hunterdon County homeowners.",
    services: ["Custom Homes", "Home Additions", "Whole Home Remodeling"],
    imageKey: "customHome" as const,
  },
  {
    slug: "princeton",
    name: "Princeton",
    state: "NJ",
    county: "Mercer County",
    headline: "Design-Build Homes in Princeton, NJ",
    intro:
      "Architecturally sensitive design-build for Princeton estates, additions, and historic renovations.",
    services: ["Custom Homes", "Kitchen & Bath", "Design Consultation"],
    imageKey: "luxuryExterior" as const,
  },
  {
    slug: "hopewell",
    name: "Hopewell",
    state: "NJ",
    county: "Mercer County",
    headline: "Custom Home Builder in Hopewell, NJ",
    intro: "Ground-up custom homes and whole-home renovations throughout Hopewell Township.",
    services: ["Custom Homes", "Whole Home Remodeling", "ADUs & Garages"],
    imageKey: "customHome" as const,
  },
  {
    slug: "hillsborough",
    name: "Hillsborough",
    state: "NJ",
    county: "Somerset County",
    headline: "Design-Build in Hillsborough, NJ",
    intro: "Single-team delivery for Hillsborough custom homes, additions, and outdoor living spaces.",
    services: ["Home Additions", "Outdoor Living", "Basement Finishing"],
    imageKey: "homeAddition" as const,
  },
  {
    slug: "morristown",
    name: "Morristown",
    state: "NJ",
    county: "Morris County",
    headline: "Luxury Home Builder in Morristown, NJ",
    intro: "Morristown design-build projects with transparent budgeting and weekly site communication.",
    services: ["Whole Home Remodeling", "Kitchen & Bath", "Custom Homes"],
    imageKey: "wholeHomeRemodel" as const,
  },
  {
    slug: "doylestown",
    name: "Doylestown",
    state: "PA",
    county: "Bucks County",
    headline: "Custom Homes in Doylestown, PA",
    intro: "Cross-river design-build for Bucks County luxury residences and detached guest suites.",
    services: ["Custom Homes", "ADUs & Garages", "Design Consultation"],
    imageKey: "aduGarage" as const,
  },
] as const;

export type SeoCity = (typeof SEO_CITIES)[number];

export function getSeoCity(slug: string): SeoCity | undefined {
  return SEO_CITIES.find(c => c.slug === slug);
}
