import LegalPolicyLinks from "@/components/legal/LegalPolicyLinks";
import { COMPANY_LEGAL } from "@/lib/companyLegal";

/** Standard footer block on Terms, Privacy notice, and Refund policy pages (Paddle domain review). */
const PolicyPageFooter = () => (
  <footer className="mt-10 border-t border-border/70 pt-8 space-y-4">
    <p className="text-sm font-medium text-foreground">Related policies</p>
    <LegalPolicyLinks variant="inline" className="justify-start" linkClassName="text-foreground" />
    <p className="text-xs leading-relaxed text-muted-foreground">
      {COMPANY_LEGAL.legalName} ({COMPANY_LEGAL.legalForm}, CR no. {COMPANY_LEGAL.commercialRegistration}), doing
      business as {COMPANY_LEGAL.brand}. Questions:{" "}
      <a href="mailto:info@nexora-agn.com" className="font-medium text-foreground underline-offset-4 hover:underline">
        info@nexora-agn.com
      </a>
      .
    </p>
  </footer>
);

export default PolicyPageFooter;
