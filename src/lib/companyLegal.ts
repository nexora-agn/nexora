/**
 * Registered legal entity for Nexora (website, policies, and correspondence).
 * Update `addressLines` when the final Bahrain office address is confirmed.
 */
export const COMPANY_LEGAL = {
  brand: "Nexora",
  legalName: "NEXORA SOLUTION W.L.L",
  /** Bahrain W.L.L. = With Limited Liability (aligned with Sh.p.k. in Albanian). */
  legalForm: "With Limited Liability Company (W.L.L. / Sh.p.k.)",
  commercialRegistration: "196260-1",
  jurisdiction: "Kingdom of Bahrain",
  /** Street and building; empty until a full address is available. */
  addressLines: [] as string[],
} as const;

export function companyAddressDisplay(): string {
  const parts = [...COMPANY_LEGAL.addressLines, COMPANY_LEGAL.jurisdiction].filter(
    (s): s is string => typeof s === "string" && s.trim().length > 0,
  );
  return parts.join("\n");
}
