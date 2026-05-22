import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { SERVICE_CATEGORY_TABS } from "@template-homebuilder/data/siteData";
import { Button } from "@/components/ui/button";

const ServiceCategoryTabs = () => {
  const [active, setActive] = useState(0);
  const tab = SERVICE_CATEGORY_TABS[active];

  return (
    <section className="hb-section-pad bg-white">
      <div className="container-custom container-inset">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[11px] font-sans-brand font-bold uppercase tracking-[0.22em] text-[hsl(var(--secondary))] mb-2">
            What We Offer
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))]">
            Complete Outdoor Services
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SERVICE_CATEGORY_TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-sans-brand font-semibold transition-all ${
                i === active
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-md"
                  : "bg-[hsl(var(--muted))] text-muted-foreground hover:bg-[hsl(var(--hb-sage))]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-2xl border border-border overflow-hidden bg-[hsl(var(--hb-cream))]">
          <div className="relative min-h-[280px] lg:min-h-[400px]">
            <img src={tab.image} alt={tab.label} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hb-navy-dark))]/50 to-transparent lg:hidden" />
          </div>
          <div className="p-8 lg:p-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[hsl(var(--primary))] mb-6">
              {tab.label}
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {tab.items.map((item, idx) => (
                <li key={item} className="flex items-start gap-2 text-sm font-sans-brand text-foreground">
                  <span className="font-display text-xs font-bold text-[hsl(var(--secondary))] mt-0.5">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[hsl(var(--primary))] shrink-0" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Button asChild className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] font-display font-bold uppercase tracking-wide">
              <Link to={tab.to}>
                Explore {tab.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoryTabs;
