import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-minhs/contexts/SiteContentContext";
import { getServiceIcon } from "@template-minhs/lib/serviceIcons";

const ServicesRibbon = () => {
  const { services } = useSiteContent();
  const items = services ?? [];
  if (!items.length) return null;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.28em] font-display">
            Our Services
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase text-[hsl(var(--primary))]">
            European Auto Repair & Maintenance
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Factory-scheduled maintenance, diagnostics, and repairs — dealer-level quality without dealer-level prices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map(item => {
            const Icon = getServiceIcon(item.icon);
            return (
              <Link
                key={item.id}
                to={`/services/${item.id}`}
                className="group minhs-card flex flex-col items-center text-center px-5 py-8 bg-white hover:border-[hsl(var(--secondary))]/50 transition-colors"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-sm border-2 border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] mb-4 group-hover:bg-[hsl(var(--secondary))] group-hover:text-[hsl(var(--secondary-foreground))] transition-colors">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-base font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--secondary))] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesRibbon;
