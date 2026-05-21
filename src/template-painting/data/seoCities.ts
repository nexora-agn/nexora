/** SEO city landing pages — North Jersey service area. */
export interface SeoCity {
  slug: string;
  name: string;
  county: string;
  headline: string;
  intro: string;
  neighborhoods: string[];
}

export const SEO_CITIES: SeoCity[] = [
  {
    slug: "ridgewood-nj",
    name: "Ridgewood",
    county: "Bergen County",
    headline: "Premium Painting in Ridgewood, NJ",
    intro:
      "BrushHouse Painting delivers interior, exterior, and cabinet refinishing for Ridgewood homeowners — meticulous prep, designer color guidance, and written warranties.",
    neighborhoods: ["Downtown Ridgewood", "Ridgewood Heights", "Graydon", "Ho-Ho-Kus border"],
  },
  {
    slug: "montclair-nj",
    name: "Montclair",
    county: "Essex County",
    headline: "Montclair Interior & Exterior Painting",
    intro:
      "From Victorian interiors to stucco exteriors, our crews serve Montclair with premium coatings, HEPA sanding, and respect for historic details.",
    neighborhoods: ["Upper Montclair", "Watchung Plaza", "Frog Hollow", "South End"],
  },
  {
    slug: "paramus-nj",
    name: "Paramus",
    county: "Bergen County",
    headline: "Commercial & Residential Painting — Paramus",
    intro:
      "BrushHouse handles medical offices, retail, and residential repaints across Paramus with phased schedules and minimal downtime.",
    neighborhoods: ["Route 17 corridor", "Ridgewood border", "Arcola", "Farview"],
  },
  {
    slug: "tenafly-nj",
    name: "Tenafly",
    county: "Bergen County",
    headline: "Tenafly Luxury Home Painting",
    intro:
      "Whole-home interior refreshes, exterior transformations, and color consultations for Tenafly estates and colonials.",
    neighborhoods: ["Tenafly Borough", "Alpine border", "Cresskill vicinity", "East Hill"],
  },
  {
    slug: "fair-lawn-nj",
    name: "Fair Lawn",
    county: "Bergen County",
    headline: "Fair Lawn Painting Contractors",
    intro:
      "Interior rooms, deck stains, and exterior siding systems for Fair Lawn — free estimates and line-item proposals.",
    neighborhoods: ["Radburn", "Morlot Avenue area", "Broadway", "River Road"],
  },
  {
    slug: "englewood-nj",
    name: "Englewood",
    county: "Bergen County",
    headline: "Englewood Painting Studio",
    intro:
      "Premium painting for Englewood homes and multi-family properties — prep-first crews and Sherwin-Williams / Benjamin Moore systems.",
    neighborhoods: ["Downtown Englewood", "Englewood Cliffs border", "Dean Street", "Palisade"],
  },
];

export function getSeoCity(slug: string): SeoCity | undefined {
  return SEO_CITIES.find(c => c.slug === slug);
}
