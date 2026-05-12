import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import {
  Compass,
  HardHat,
  Palette,
  Hammer,
  Ruler,
} from "lucide-react";
import { SERVICES, SERVICES_RIBBON } from "@/data/siteData";

const iconMap = {
  Compass,
  HardHat,
  Palette,
  Hammer,
  Ruler,
} as const;

function ribbonLinkTo(item: { id: string; to?: string }): string {
  if (typeof item.to === "string" && item.to.length > 0) return item.to;
  return "/services";
}

const ServicesRibbon = () => (
  <section className="relative border-y border-border bg-card">
    <div className="container-custom px-4 md:px-8 py-10 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold tracking-[0.22em] text-secondary">
            WHAT WE DO
          </p>
          <h2 className="mt-1.5 text-xl md:text-2xl font-bold text-primary">
            Full-spectrum construction &amp; design expertise
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
          <p className="text-sm text-muted-foreground md:max-w-sm">
            One accountable partner for every phase, from initial drawings to
            final walkthrough.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-secondary hover:gap-2.5 transition-all shrink-0 uppercase"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {SERVICES_RIBBON.map(item => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Compass;
          const featured = "featured" in item && item.featured;
          const linkTo = ribbonLinkTo(item);
          const slug = linkTo.startsWith("/services/") ? linkTo.slice("/services/".length) : "";
          const matchingService = slug ? SERVICES.find(s => s.id === slug) : undefined;

          return (
            <Link
              key={item.id}
              to={linkTo}
              className={`group block rounded-xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                featured
                  ? "border-secondary/50 bg-secondary/5 shadow-sm"
                  : "border-transparent bg-background hover:border-border hover:bg-muted/60"
              }`}
            >
              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:scale-105 ${
                  featured
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-secondary/30 bg-secondary text-secondary-foreground"
                }`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} />
                {featured && (
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold ring-2 ring-card">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                )}
              </div>
              <h3
                className={`mt-4 text-sm font-bold tracking-widest uppercase leading-tight ${
                  featured ? "text-secondary" : "text-foreground"
                }`}
              >
                {item.label}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[3.25rem]">
                {matchingService?.description ??
                  "Explore how we deliver this capability across our portfolio."}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-secondary group-hover:gap-2.5 transition-all uppercase">
                LEARN MORE
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesRibbon;
