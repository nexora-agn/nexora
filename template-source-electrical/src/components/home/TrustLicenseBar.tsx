import { ShieldCheck, BadgeCheck, Zap, Award } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Licensed", sub: "State certified" },
  { icon: BadgeCheck, label: "Insured", sub: "Fully bonded" },
  { icon: Zap, label: "Master Electrician", sub: "Expert crew" },
  { icon: Award, label: "BBB A+", sub: "Accredited business" },
] as const;

const TrustLicenseBar = () => {
  const { certifications } = useSiteContent();
  const bbbCert = certifications?.find(c => c.id === "bbb");

  return (
    <section className="border-y border-[hsl(var(--border))] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[hsl(var(--border))]">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }, i) => {
            const displaySub =
              label === "BBB A+" && bbbCert?.sub ? bbbCert.sub : sub;
            return (
              <div
                key={label}
                className={`flex items-center gap-3 sm:gap-4 py-5 sm:py-6 px-3 sm:px-6 ${i >= 2 ? "border-t lg:border-t-0 border-[hsl(var(--border))]" : ""}`}
              >
                <span className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-sm bg-[hsl(var(--primary))] text-[hsl(var(--secondary))]">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <span className="block font-display text-sm sm:text-base font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
                    {label}
                  </span>
                  <span className="block text-[11px] sm:text-xs text-muted-foreground truncate">
                    {displaySub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustLicenseBar;
