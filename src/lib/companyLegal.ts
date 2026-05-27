/**
 * Registered legal entity for Nexora (website, policies, and correspondence).
 *
 * The company is registered in Bahrain (commercial registration shown below)
 * and operates from an office in Kosovo. The Bahrain commercial address
 * fields on the CR are intentionally not set, so we publish the registered
 * jurisdiction only and surface the Kosovo office as the contact address.
 */
export const COMPANY_LEGAL = {
  brand: "Nexora",
  legalName: "NEXORA SOLUTION W.L.L",
  /** Bahraini "With Limited Liability" form (equivalent to L.L.C. in other jurisdictions). */
  legalForm: "With Limited Liability Company (W.L.L.)",
  commercialRegistration: "196260-1",
  registrationDate: "22 April 2026",
  /** Country of legal registration (Bahrain CR). */
  registeredJurisdiction: "Kingdom of Bahrain",
  /** Operating office (where the team works). Shown publicly as the contact address. */
  operatingOffice: {
    label: "Operating office",
    addressLines: [
      "Rruga Ali Aliu Kelmendi",
      "Prishtina 10000",
      "Republic of Kosovo",
    ] as string[],
  },
  /** Governing law for Terms, Privacy, and Refund policies. */
  governingLaw: "Kingdom of Bahrain",
  /** Primary public contact email (on the company domain). */
  contactEmail: "info@nexora-agn.com",
} as const;

/** Multi-line operating office address for display (Contact page, footer, etc.). */
export function companyAddressDisplay(): string {
  return COMPANY_LEGAL.operatingOffice.addressLines.join("\n");
}

/** One-line registered entity summary (footer credit, policy pages). */
export function registeredEntitySummary(): string {
  return `${COMPANY_LEGAL.legalName} · ${COMPANY_LEGAL.legalForm} · CR ${COMPANY_LEGAL.commercialRegistration} · Registered in the ${COMPANY_LEGAL.registeredJurisdiction}`;
}
