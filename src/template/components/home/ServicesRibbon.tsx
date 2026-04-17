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
  <section className="border-y border-border bg-card py-8">
    <div className="container-custom px-4 md:px-8">
      <div className="flex flex-wrap justify-center md:justify-between gap-6 md:gap-4">
        {SERVICES_RIBBON.map(item => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Compass;
          const featured = "featured" in item && item.featured;
          return (
            <div
              key={item.id}
              className={`flex flex-col items-center gap-2 min-w-[100px] ${
                featured ? "text-secondary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors ${
                  featured
                    ? "border-secondary bg-secondary/15 text-secondary"
                    : "border-border bg-background text-foreground"
                }`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} />
                {featured && (
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-widest">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default ServicesRibbon;
