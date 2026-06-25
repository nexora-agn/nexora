import { Link } from "react-router-dom";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { getServiceIcon } from "@template-truck-repair/lib/serviceIcons";

/** Staggered service mosaic — not a horizontal ribbon. */
const ServicesRibbon = () => {
  const { servicesRibbon: RIBBON, services: ALL_SERVICES } = useSiteContent();
  const items = RIBBON.length ? RIBBON : ALL_SERVICES.slice(0, 6).map(s => ({
    id: s.id, label: s.title, icon: s.icon, description: s.description, to: `/services/${s.id}`,
  }));

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-sans-brand tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-3">
              Services
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
              Every Surface,
              <span className="block italic text-[hsl(var(--secondary))]">Every Finish</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="text-sm font-sans-brand font-semibold text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--secondary))] pb-0.5 hover:text-[hsl(var(--secondary))] transition-colors self-start"
          >
            View all services
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((item, i) => {
            const Icon = getServiceIcon(item.icon);
            const tall = i === 0 || i === 4;
            return (
              <Link
                key={item.id}
                to={item.to}
                className={`group relative overflow-hidden rounded-sm border border-border bg-card p-8 hover:border-[hsl(var(--secondary)/0.5)] transition-all paint-shadow-soft hover:paint-shadow-card ${
                  tall ? "sm:row-span-2 flex flex-col justify-end min-h-[280px]" : "min-h-[200px]"
                }`}
              >
                <span className="absolute top-6 right-6 text-[hsl(var(--secondary)/0.2)] group-hover:text-[hsl(var(--secondary)/0.45)] transition-colors">
                  <Icon className="h-12 w-12" strokeWidth={1} />
                </span>
                <div className="relative mt-auto">
                  <p className="text-[10px] font-sans-brand tracking-[0.22em] uppercase text-muted-foreground mb-2">
                    0{String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-2xl text-foreground group-hover:text-[hsl(var(--secondary))] transition-colors mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans-brand line-clamp-2">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesRibbon;
