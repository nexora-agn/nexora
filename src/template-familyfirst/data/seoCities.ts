/** SEO city landing pages — Monmouth & Ocean County service area. */
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
    slug: "freehold-nj",
    name: "Freehold",
    county: "Monmouth County",
    headline: "Plumbing Services in Freehold, NJ",
    intro:
      "Family First Plumbing provides emergency plumbing, drain cleaning, water heater service, boiler repair, and full residential plumbing in Freehold and nearby Monmouth County communities.",
    neighborhoods: ["Freehold Borough", "Freehold Township", "Colts Neck border", "Route 9 corridor"],
  },
  {
    slug: "toms-river-nj",
    name: "Toms River",
    county: "Ocean County",
    headline: "Trusted Plumbers in Toms River, NJ",
    intro:
      "From main line drain cleaning to water heater replacement and sewer backups, our licensed team serves Toms River homes with honest communication and code-compliant work.",
    neighborhoods: ["Downtown Toms River", "Silverton", "Pleasant Plains", "Beachwood border"],
  },
  {
    slug: "red-bank-nj",
    name: "Red Bank",
    county: "Monmouth County",
    headline: "Red Bank Plumbing Repair & Installation",
    intro:
      "Serving Red Bank with emergency plumbing, leak detection, hydronic heating, and fixture installs — call or text a photo for faster help.",
    neighborhoods: ["Broad Street area", "Riverside", "Fair Haven border", "Little Silver border"],
  },
  {
    slug: "brick-nj",
    name: "Brick",
    county: "Ocean County",
    headline: "Brick, NJ Plumbing Contractors",
    intro:
      "Premium plumbing for Brick homeowners — water heaters, boilers, leak detection, and responsive emergency service when you need it most.",
    neighborhoods: ["Brick Township", "Laurelton", "Adamston", "Herbertsville"],
  },
  {
    slug: "point-pleasant-nj",
    name: "Point Pleasant",
    county: "Ocean County",
    headline: "Point Pleasant Plumbing — Local Experts",
    intro:
      "Family First dispatches licensed technicians to Point Pleasant for burst pipes, sewer issues, and routine plumbing maintenance along the shore.",
    neighborhoods: ["Point Pleasant Beach", "Point Pleasant Borough", "Bay Head border", "Manasquan border"],
  },
  {
    slug: "howell-nj",
    name: "Howell",
    county: "Monmouth County",
    headline: "Howell & Monmouth County Plumbers",
    intro:
      "Complete plumbing solutions for Howell — sump pumps, water heaters, pipe repair, and emergency service from a fully licensed New Jersey contractor.",
    neighborhoods: ["Ramtown", "Landmark", "Adelphia", "Collingwood Park"],
  },
];

export function getSeoCity(slug: string): SeoCity | undefined {
  return SEO_CITIES.find(c => c.slug === slug);
}
