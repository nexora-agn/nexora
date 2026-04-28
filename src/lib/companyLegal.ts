/**
 * Registered legal entity for Nexora (website, policies, and correspondence).
 * Update `addressLines` when a full registered office address is available.
 */
export const COMPANY_LEGAL = {
  brand: "Nexora",
  legalName: "NEXORA SOLUTION L.L.C",
  /** Common abbreviation for a limited liability company in international contexts. */
  legalForm: "With Limited Liability Company (L.L.C.)",
  commercialRegistration: "196260-1",
  /** Street and building; empty until a full address is available. */
  addressLines: [] as string[],
} as const;

export function companyAddressDisplay(): string {
  const parts = [...COMPANY_LEGAL.addressLines].filter(
    (s): s is string => typeof s === "string" && s.trim().length > 0,
  );
  return parts.join("\n");
}
