import { Link } from "react-router-dom";
import { Phone, CreditCard, Zap, ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-minhs/contexts/SiteContentContext";

const EmergencyFinancingBand = () => {
  const { company: COMPANY, siteTop: SITE_TOP } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <section className="bg-[hsl(var(--minhs-surface))] py-10 sm:py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-lg bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] ring-1 ring-black/5 shadow-sm">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 12px)",
            }}
          />
          <div className="relative py-10 sm:py-12 px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-[hsl(var(--primary))] text-[hsl(var(--secondary))]">
                  <Zap className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide">
                    {SITE_TOP.line || "24/7 Emergency Service"}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base opacity-80 max-w-md">
                    Power out? Sparking panel? Our licensed electricians dispatch fast — day or night.
                  </p>
                  <a
                    href={phoneHref}
                    className="mt-3 inline-flex items-center gap-2 font-display text-xl sm:text-2xl font-bold hover:opacity-80 transition-opacity"
                  >
                    <Phone className="h-5 w-5" />
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:justify-end md:text-right">
                <div className="md:order-2">
                  <span className="flex h-14 w-14 items-center justify-center rounded-sm bg-[hsl(var(--primary))] text-[hsl(var(--secondary))]">
                    <CreditCard className="h-7 w-7" />
                  </span>
                </div>
                <div className="md:order-1">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide">
                    Flexible Financing
                  </h3>
                  <p className="mt-1 text-sm sm:text-base opacity-80 max-w-md md:ml-auto">
                    Spread panel upgrades and major installs over manageable monthly payments. Ask about
                    0% promo options.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
                  >
                    Explore Payment Options
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyFinancingBand;
