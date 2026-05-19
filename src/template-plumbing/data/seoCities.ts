/** SEO city landing pages — Central NJ service area. */
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
    slug: "hillsborough-nj",
    name: "Hillsborough",
    county: "Somerset County",
    headline: "Plumbing Services in Hillsborough, NJ",
    intro:
      "ClearCurrent Plumbing provides 24/7 emergency plumbing, drain cleaning, water heater service, and full residential & commercial plumbing in Hillsborough and surrounding Somerset County communities.",
    neighborhoods: ["Autumn Hill", "Royce Brook", "Woods Road area", "Duke Farms vicinity"],
  },
  {
    slug: "bridgewater-nj",
    name: "Bridgewater",
    county: "Somerset County",
    headline: "Trusted Plumbers in Bridgewater, NJ",
    intro:
      "From main line drain cleaning to water heater replacement, our licensed master plumbers serve Bridgewater homes and businesses with honest pricing and warrantied workmanship.",
    neighborhoods: ["Bradley Gardens", "Finderne", "Martinsville", "Green Knoll"],
  },
  {
    slug: "morristown-nj",
    name: "Morristown",
    county: "Morris County",
    headline: "Morristown Plumbing Repair & Installation",
    intro:
      "Serving Morristown with emergency plumbing, leak detection, boiler service, and fixture installs — phones answered 24/7 by our own dispatch team.",
    neighborhoods: ["Morristown Green", "Speedwell", "Washington Valley", "Morris Plains border"],
  },
  {
    slug: "summit-nj",
    name: "Summit",
    county: "Union County",
    headline: "Summit, NJ Plumbing Contractors",
    intro:
      "Premium plumbing for Summit homeowners — water heaters, boilers, leak detection, and same-day emergency service when you need it most.",
    neighborhoods: ["Downtown Summit", "New England Hill", "Oakwood", "Canoe Brook area"],
  },
  {
    slug: "westfield-nj",
    name: "Westfield",
    county: "Union County",
    headline: "Westfield Plumbing — 24/7 Emergency Service",
    intro:
      "ClearCurrent dispatches licensed technicians to Westfield for burst pipes, sewer backups, and routine plumbing maintenance across Union County.",
    neighborhoods: ["Downtown Westfield", "Wychwood", "Garden State area", "Brightwood"],
  },
  {
    slug: "flemington-nj",
    name: "Flemington",
    county: "Hunterdon County",
    headline: "Flemington & Hunterdon County Plumbers",
    intro:
      "Complete plumbing solutions for Flemington — wells, water heaters, gas lines, and emergency repairs with NJ Master Plumber #7359 credentials.",
    neighborhoods: ["Flemington Borough", "Raritan Township", "Hunterdon Medical Center area"],
  },
];

export function getSeoCity(slug: string): SeoCity | undefined {
  return SEO_CITIES.find(c => c.slug === slug);
}
