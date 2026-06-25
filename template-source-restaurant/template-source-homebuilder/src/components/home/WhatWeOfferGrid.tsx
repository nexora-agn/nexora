import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import { getServiceIcon } from "@template-restaurant/lib/serviceIcons";

const WhatWeOfferGrid = () => {
  const { capabilities } = useSiteContent();

  return (
    <section className="hb-section-pad bg-[hsl(var(--hb-sage))]/50">
      <div className="container-custom container-inset">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))]">
            Design-Build Services
          </h2>
          <p className="mt-3 text-muted-foreground font-sans-brand max-w-xl mx-auto">
            Custom homes, additions, ADUs, and whole-home remodeling — one accountable team from concept to completion.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map(cap => {
            const Icon = getServiceIcon(cap.icon);
            return (
              <Link
                key={cap.id}
                to={cap.to || "/services"}
                className="group rounded-xl bg-white border border-border p-6 hb-card-hover"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground)] mb-5 group-hover:bg-[hsl(var(--secondary))] group-hover:text-[hsl(var(--secondary-foreground))] transition-colors">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="font-display text-lg font-bold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors flex items-center justify-between gap-2">
                  {cap.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </h3>
                <p className="mt-2 text-sm text-muted-foreground font-sans-brand leading-relaxed">{cap.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOfferGrid;
