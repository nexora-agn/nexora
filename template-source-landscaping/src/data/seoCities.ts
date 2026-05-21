/**
 * SEO city landing pages — landscaping & tree service.
 */

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
    headline: "Premium Landscaping in Ridgewood, NJ",
    intro:
      "VerdeField Landscaping serves Ridgewood homeowners with design-build landscapes, certified tree care, and weekly lawn programs.",
    neighborhoods: ["Ridgewood Village", "Ho-Ho-Kus border", "Glen Rock border"],
  },
  {
    slug: "montclair-nj",
    name: "Montclair",
    county: "Essex County",
    headline: "Montclair Landscaping & Tree Service",
    intro:
      "From historic shade trees to modern backyard patios — full-service outdoor care for Montclair properties.",
    neighborhoods: ["Upper Montclair", "Watchung Plaza", "Frog Hollow"],
  },
  {
    slug: "paramus-nj",
    name: "Paramus",
    county: "Bergen County",
    headline: "Commercial & Residential Landscaping — Paramus",
    intro:
      "Grounds maintenance, seasonal color, and emergency tree response for Paramus homes and businesses.",
    neighborhoods: ["Paramus Park area", "Route 17 corridor", "Farview"],
  },
  {
    slug: "tenafly-nj",
    name: "Tenafly",
    county: "Bergen County",
    headline: "Tenafly Luxury Landscape Design",
    intro:
      "High-end hardscape, outdoor lighting, and estate lawn programs for Tenafly properties.",
    neighborhoods: ["Tenafly Crest", "Cresskill border", "Alpine border"],
  },
  {
    slug: "fair-lawn-nj",
    name: "Fair Lawn",
    county: "Bergen County",
    headline: "Fair Lawn Landscaping Contractors",
    intro:
      "Lawn maintenance, mulching, and tree trimming for Fair Lawn neighborhoods — licensed and insured.",
    neighborhoods: ["Radburn", "Broadway", "Morlot Avenue"],
  },
  {
    slug: "englewood-nj",
    name: "Englewood",
    county: "Bergen County",
    headline: "Englewood Tree & Landscape Service",
    intro:
      "ISA-certified tree care and full-property landscaping for Englewood homes and multi-family sites.",
    neighborhoods: ["Englewood Cliffs border", "Downtown", "Dean Street"],
  },
];

export function getCityBySlug(slug: string): SeoCity | undefined {
  return SEO_CITIES.find(c => c.slug === slug);
}
