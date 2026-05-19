import { Link } from "react-router-dom";
import {
  Zap,
  Plug,
  Lightbulb,
  Flame,
  Home,
  CloudLightning,
  FileCheck,
  Search,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const iconMap = {
  Zap,
  Plug,
  Lightbulb,
  Flame,
  Home,
  CloudLightning,
  FileCheck,
  Search,
  Wrench,
} as const;
type IconKey = keyof typeof iconMap;

/**
 * 3-column services grid — icon, title, short description.
 * Uses `servicesRibbon` content (first 3 items).
 */
const ServicesRibbon = () => {
  const { servicesRibbon } = useSiteContent();
  const items = (servicesRibbon ?? []).slice(0, 3);
  if (!items.length) return null;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">
            What We Do
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase text-[hsl(var(--primary))]">
            Core Electrical Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[hsl(var(--border))] divide-y md:divide-y-0 md:divide-x divide-[hsl(var(--border))]">
          {items.map(item => {
            const Icon = iconMap[item.icon as IconKey] ?? Zap;
            return (
              <Link
                key={item.id}
                to={item.to}
                className="group flex flex-col items-center text-center px-6 py-10 sm:py-12 hover:bg-[hsl(var(--volt-surface))] transition-colors"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-sm border-2 border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] mb-5 group-hover:bg-[hsl(var(--secondary))] group-hover:text-[hsl(var(--secondary-foreground))] transition-colors">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-2">
                  {item.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-4">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[hsl(var(--secondary))] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" />
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
