import { Link } from "react-router-dom";
import { useSiteContent } from "@template-luxury-real-estate/contexts/SiteContentContext";
import { getServiceIcon } from "@template-luxury-real-estate/lib/serviceIcons";

const SEASONAL_IDS = [
  "seasonal-cleanup",
  "mulching",
  "snow-removal",
  "irrigation-systems",
  "hedge-trimming",
] as const;

const SeasonalServicesBand = () => {
  const { servicesRibbon, services } = useSiteContent();
  const seasonal = SEASONAL_IDS.map(id => services.find(s => s.id === id)).filter(Boolean);
  const ribbon = servicesRibbon.length ? servicesRibbon : seasonal;

  return (
    <section className="py-14 lg:py-20 bg-[hsl(var(--flow-sage))]/60 border-y border-border">
      <div className="container-custom container-inset">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[11px] font-sans-brand font-bold tracking-[0.24em] uppercase text-[hsl(var(--flow-moss))] mb-2">
            Year-Round Care
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-[hsl(var(--primary))]">
            Seasonal Services That Keep Properties Sharp
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {(ribbon.length ? ribbon : seasonal).map(item => {
            const Icon = getServiceIcon("icon" in item ? (item as { icon?: string }).icon : "Leaf");
            const to = "to" in item ? item.to : `/services/${(item as { id: string }).id}`;
            const label = "label" in item ? item.label : (item as { title: string }).title;
            const desc = "description" in item ? item.description : "";
            return (
              <Link
                key={to}
                to={to}
                className="group flex flex-col items-center text-center w-[140px] sm:w-[160px] rounded-2xl bg-white border border-border px-4 py-5 card-lift hover:border-[hsl(var(--secondary))]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] mb-3 group-hover:bg-[hsl(var(--secondary))] group-hover:text-[hsl(var(--secondary-foreground))] transition-colors">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-sans-brand font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
                  {label}
                </span>
                {desc && (
                  <span className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{desc}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SeasonalServicesBand;
