/**
 * SEO city landing pages — Nexora Mobile pickup & delivery zones near Austin, TX.
 */
export const SEO_CITIES = [
  {
    slug: "round-rock",
    name: "Round Rock",
    state: "TX",
    county: "Williamson County",
    headline: "Phone Store in Round Rock, TX",
    intro:
      "Nexora Mobile Round Rock stocks iPhones, Galaxy devices, and same-day repair appointments for Williamson County shoppers.",
    services: ["Smartphones", "Trade-In", "Repair Bar"],
    imageKey: "showroom" as const,
  },
  {
    slug: "cedar-park",
    name: "Cedar Park",
    state: "TX",
    county: "Williamson County",
    headline: "Mobile Shop Near Cedar Park, TX",
    intro: "Shop flagships online for pickup at The Domain or Round Rock — delivery available to Cedar Park.",
    services: ["Tablets", "Watches", "Accessories"],
    imageKey: "lot" as const,
  },
  {
    slug: "pflugerville",
    name: "Pflugerville",
    state: "TX",
    county: "Travis County",
    headline: "Phones & Repairs in Pflugerville, TX",
    intro: "Central Texas customers visit our Congress and Domain stores for upgrades, trade-ins, and certified refurb deals.",
    services: ["Refurbished", "Financing", "Data Transfer"],
    imageKey: "customHome" as const,
  },
  {
    slug: "georgetown",
    name: "Georgetown",
    state: "TX",
    county: "Williamson County",
    headline: "Nexora Mobile Serves Georgetown, TX",
    intro: "Compare iPhone and Galaxy models with specialists — business fleet orders welcome.",
    services: ["Business Fleet", "Smartphones", "Screen Repair"],
    imageKey: "luxuryExterior" as const,
  },
  {
    slug: "lakeway",
    name: "Lakeway",
    state: "TX",
    county: "Travis County",
    headline: "Lake Travis Area Phone Retail",
    intro: "Order online from Nexora Mobile and pick up at South Lamar or Congress Avenue the same day.",
    services: ["Same-Day Pickup", "Trade-In", "Apple Watch"],
    imageKey: "waterfront" as const,
  },
  {
    slug: "san-marcos",
    name: "San Marcos",
    state: "TX",
    county: "Hays County",
    headline: "Mobile Devices for San Marcos, TX",
    intro: "Students and families shop refurbished and new phones with 0% APR options on select models.",
    services: ["Student Deals", "Refurbished", "Accessories"],
    imageKey: "interior" as const,
  },
] as const;

export type SeoCity = (typeof SEO_CITIES)[number];

export function getSeoCity(slug: string): SeoCity | undefined {
  return SEO_CITIES.find(c => c.slug === slug);
}
