import { Check } from "lucide-react";
import {
  Compass,
  HardHat,
  Palette,
  Hammer,
  Ruler,
} from "lucide-react";
import { useSiteContent } from "@template/contexts/SiteContentContext";

const iconMap = {
  Compass,
  HardHat,
  Palette,
  Hammer,
  Ruler,
} as const;

const ServicesRibbon = () => {
  const { servicesRibbon: SERVICES_RIBBON } = useSiteContent();
  return (
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
          <p className="text-sm text-muted-foreground md:max-w-sm">
            One accountable partner for every phase, from initial drawings to
            final walkthrough.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {SERVICES_RIBBON.map(item => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Compass;
            const featured = "featured" in item && item.featured;
            return (
              <div
                key={item.id}
                className={`group flex flex-col items-center text-center gap-3 rounded-xl border p-5 transition-all ${
                  featured
                    ? "border-secondary/50 bg-secondary/5 shadow-sm"
                    : "border-transparent hover:border-border hover:bg-muted/60"
                }`}
              >
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:-translate-y-0.5 ${
                    featured
                      ? "border-secondary bg-secondary/15 text-secondary"
                      : "border-border bg-background text-foreground group-hover:border-secondary/60 group-hover:text-secondary"
                  }`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                  {featured && (
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs font-bold tracking-widest uppercase ${
                    featured ? "text-secondary" : "text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesRibbon;
