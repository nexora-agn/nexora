import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useTheme } from "@/contexts/ThemeContext";

/** Horizontal service cards with real photos — distinct from landscaping tabs/ribbons */
const ServicesShowcase = () => {
  const { services } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const featured = services.slice(0, 4);

  return (
    <section className="py-16 md:py-20 bg-[hsl(var(--rm-linen))] border-y border-border">
      <div className="container-custom container-inset">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-2">
              Our Services
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))] uppercase">
              Design-Build Services
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))]"
          >
            All services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map(svc => {
            const img = resolveServiceImage(svc.id, svc.image);
            return (
              <Link
                key={svc.id}
                to={`/services/${svc.id}`}
                className="group bg-white border border-border overflow-hidden hb-card-hover flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img}
                    alt={svc.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-base font-bold text-[hsl(var(--primary))] uppercase tracking-wide group-hover:text-[hsl(var(--secondary))] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground font-sans-brand leading-relaxed flex-1">
                    {svc.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-display font-semibold uppercase tracking-wider text-[hsl(var(--secondary))]">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
