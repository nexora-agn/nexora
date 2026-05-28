/**
 * Registered legal entity for Nexora (website, policies, and correspondence).
 *
 * The selling entity is the US LLC (Wyoming). Kosovo and Bahrain are operating
 * offices that are listed publicly for trust and locality, but the contracting
 * party in Terms / Privacy / Refund is the US LLC.
 */
export const COMPANY_LEGAL = {
  brand: "Nexora",
  legalName: "NEXORA AGENCY 029 LLC",
  /** US legal form. */
  legalForm: "Limited Liability Company (LLC)",
  /** IRS Employer Identification Number, issued 28 May 2026. */
  ein: "37-2235275",
  /** State / country of legal registration. */
  registeredJurisdiction: "State of Wyoming, United States",
  /** Governing law for Terms, Privacy, and Refund policies. */
  governingLaw: "State of Wyoming, United States",
  /** Primary public contact email (on the company domain). */
  contactEmail: "info@nexora-agn.com",
} as const;

/** Office locations shown across the site (footer, contact page, policies). */
export const COMPANY_OFFICES = [
  {
    key: "us",
    label: "US Registered Company",
    addressLines: [
      "30 N Gould St, Ste R",
      "Sheridan, WY 82801",
      "United States",
    ] as string[],
  },
  {
    key: "kosovo",
    label: "Nexora Europe",
    addressLines: [
      "Rruga C Enver Maloku",
      "Prishtinë 10000",
      "Republic of Kosovo",
    ] as string[],
  },
  {
    key: "bahrain",
    label: "Nexora Middle East",
    addressLines: [
      "Office No. 451, Building 318",
      "Road 328, Block 357",
      "Kingdom of Bahrain",
    ] as string[],
  },
] as const;

/** The registered (legal) office — used in policy pages as the formal address. */
export const REGISTERED_OFFICE = COMPANY_OFFICES[0];

/** Multi-line registered (US) office address for display. */
export function companyAddressDisplay(): string {
  return REGISTERED_OFFICE.addressLines.join("\n");
}

/** One-line registered entity summary (footer credit, policy pages). */
export function registeredEntitySummary(): string {
  return `${COMPANY_LEGAL.legalName} · ${COMPANY_LEGAL.legalForm} · EIN ${COMPANY_LEGAL.ein} · Registered in the ${COMPANY_LEGAL.registeredJurisdiction}`;
}
