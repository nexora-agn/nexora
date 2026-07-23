/**
 * SEO city landing pages — Nexora Tires service areas near Austin, TX.
 */
export const SEO_CITIES = [
  {
    slug: "round-rock",
    name: "Round Rock",
    state: "TX",
    county: "Williamson County",
    headline: "Tire Shop in Round Rock, TX",
    intro:
      "Nexora Tires Round Rock stocks truck, fleet, and passenger tires with same-day install and alignment for Williamson County drivers.",
    services: ["Tire Installation", "Alignment", "Fleet Service"],
    imageKey: "showroom" as const,
  },
  {
    slug: "cedar-park",
    name: "Cedar Park",
    state: "TX",
    county: "Williamson County",
    headline: "Tires Near Cedar Park, TX",
    intro: "Find tires by vehicle online and pick up install at The Domain or Round Rock — delivery and fleet mobile available.",
    services: ["All-Season", "EV Tires", "Rotation"],
    imageKey: "lot" as const,
  },
  {
    slug: "pflugerville",
    name: "Pflugerville",
    state: "TX",
    county: "Travis County",
    headline: "Tire Service in Pflugerville, TX",
    intro: "Central Texas drivers visit our Congress and Domain shops for fitment, flat repair, and seasonal storage.",
    services: ["Flat Repair", "TPMS", "Winter Tires"],
    imageKey: "customHome" as const,
  },
  {
    slug: "georgetown",
    name: "Georgetown",
    state: "TX",
    county: "Williamson County",
    headline: "Nexora Tires Serves Georgetown, TX",
    intro: "Match performance or all-terrain sets with specialists — commercial fleet orders welcome.",
    services: ["Fleet Accounts", "All-Terrain", "Alignment"],
    imageKey: "luxuryExterior" as const,
  },
  {
    slug: "lakeway",
    name: "Lakeway",
    state: "TX",
    county: "Travis County",
    headline: "Lake Travis Area Tire Shop",
    intro: "Order tires online from Nexora Tires and book install at South Lamar or Congress Avenue the same day.",
    services: ["Same-Day Install", "Performance", "Balancing"],
    imageKey: "waterfront" as const,
  },
  {
    slug: "san-marcos",
    name: "San Marcos",
    state: "TX",
    county: "Hays County",
    headline: "Tires for San Marcos, TX",
    intro: "Students and families shop all-season and budget-friendly sets with free mount & balance on qualifying packages.",
    services: ["All-Season", "Student Deals", "Flat Repair"],
    imageKey: "interior" as const,
  },
] as const;

export type SeoCity = (typeof SEO_CITIES)[number];

export function getSeoCity(slug: string): SeoCity | undefined {
  return SEO_CITIES.find(c => c.slug === slug);
}
