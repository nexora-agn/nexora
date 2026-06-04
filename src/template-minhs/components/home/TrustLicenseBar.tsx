import { ShieldCheck, Award, Heart, Tag, Wrench } from "lucide-react";
import { TRUST_BAR_ITEMS } from "@template-minhs/data/siteData";

const ICON_MAP = {
  ShieldCheck,
  Award,
  Heart,
  Tag,
  Wrench,
} as const;

const TrustLicenseBar = () => (
  <section className="bg-[hsl(var(--background))] py-6 sm:py-8 border-b border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-0 border border-[hsl(var(--border))] bg-white rounded-sm overflow-hidden divide-x divide-y lg:divide-y-0 divide-[hsl(var(--border))]">
        {TRUST_BAR_ITEMS.map(({ icon, label }, i) => {
          const Icon = ICON_MAP[icon] ?? ShieldCheck;
          return (
            <div
              key={label}
              className={`flex items-center gap-3 sm:gap-4 py-5 sm:py-6 px-3 sm:px-5 ${i >= 2 ? "border-t lg:border-t-0 border-[hsl(var(--border))]" : ""}`}
            >
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-sm bg-[hsl(var(--primary))] text-[hsl(var(--secondary))]">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wide text-[hsl(var(--primary))] leading-snug">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TrustLicenseBar;
