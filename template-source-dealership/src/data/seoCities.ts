/**
 * SEO city landing pages — Nexora Motors dealership coverage in Central Texas.
 */
export const SEO_CITIES = [
  {
    slug: "austin-main",
    name: "Austin",
    state: "TX",
    county: "Travis County",
    headline: "Premium Auto Dealership in Austin, TX",
    intro:
      "Nexora Motors' flagship showroom on Auto Row Boulevard — new, used, and certified vehicles with transparent pricing and same-day test drives.",
    services: ["New Vehicles", "Used Vehicles", "Financing"],
    imageKey: "showroom" as const,
  },
  {
    slug: "round-rock",
    name: "Round Rock",
    state: "TX",
    county: "Williamson County",
    headline: "New & Used Cars in Round Rock, TX",
    intro:
      "Nexora Motors serves Round Rock drivers with expanded new and used inventory, transparent pricing, and same-day test drives north of Austin.",
    services: ["New Vehicles", "Used Vehicles", "Financing"],
    imageKey: "lot" as const,
  },
  {
    slug: "cedar-park",
    name: "Cedar Park",
    state: "TX",
    county: "Williamson County",
    headline: "EV & Certified Vehicles in Cedar Park, TX",
    intro:
      "Visit our Cedar Park EV center for electric and hybrid inventory, charging guidance, and factory-trained certified service.",
    services: ["Electric Vehicles", "Certified Pre-Owned", "Service Center"],
    imageKey: "evCharge" as const,
  },
  {
    slug: "san-marcos",
    name: "San Marcos",
    state: "TX",
    county: "Hays County",
    headline: "Value Cars & CPO in San Marcos, TX",
    intro:
      "Shop value-focused used and certified pre-owned vehicles in San Marcos — inspected inventory with clear pricing and finance options.",
    services: ["Used Vehicles", "Certified Pre-Owned", "Trade-In"],
    imageKey: "keys" as const,
  },
  {
    slug: "georgetown",
    name: "Georgetown",
    state: "TX",
    county: "Williamson County",
    headline: "Dealership Near Georgetown, TX",
    intro:
      "Georgetown drivers shop Nexora Motors for new models, CPO confidence, and competitive financing with specialists who know Central Texas.",
    services: ["New Vehicles", "Financing", "Trade-In"],
    imageKey: "showroom" as const,
  },
  {
    slug: "kyle",
    name: "Kyle",
    state: "TX",
    county: "Hays County",
    headline: "Cars & Trucks Near Kyle, TX",
    intro:
      "From daily drivers to work trucks, Kyle-area shoppers browse shared inventory across Austin Main, Round Rock, and San Marcos.",
    services: ["Used Vehicles", "New Vehicles", "Service Center"],
    imageKey: "customHome" as const,
  },
  {
    slug: "pflugerville",
    name: "Pflugerville",
    state: "TX",
    county: "Travis County",
    headline: "Auto Dealership Near Pflugerville, TX",
    intro:
      "Pflugerville drivers get transparent pricing, digital retail tools, and easy test-drive booking at Nexora Motors locations across Central Texas.",
    services: ["New Vehicles", "Certified Pre-Owned", "Parts & Accessories"],
    imageKey: "luxuryExterior" as const,
  },
] as const;

export type SeoCity = (typeof SEO_CITIES)[number];

export function getSeoCity(slug: string): SeoCity | undefined {
  return SEO_CITIES.find(c => c.slug === slug);
}
