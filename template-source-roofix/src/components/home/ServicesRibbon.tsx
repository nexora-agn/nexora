import { Link } from "react-router-dom";
import { useMemo } from "react";
import {
  Building2,
  Home,
  HardHat,
  DraftingCompass,
  Hammer,
  Compass,
  Palette,
  Ruler,
  Leaf,
  Wrench,
  ClipboardList,
  ClipboardCheck,
  Paintbrush,
  CloudLightning,
  Droplets,
  Zap,
  PanelTop,
  Shield,
  ShieldCheck,
  Award,
  ArrowRight,
  Flame,
  FileCheck,
  Search,
} from "lucide-react";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { useTheme } from "@template-roofix/contexts/ThemeContext";

const iconMap = {
  Building2,
  Home,
  HardHat,
  DraftingCompass,
  Hammer,
  Compass,
  Palette,
  Ruler,
  Leaf,
  Wrench,
  ClipboardList,
  ClipboardCheck,
  Paintbrush,
  CloudLightning,
  Droplets,
  Zap,
  PanelTop,
  Shield,
  ShieldCheck,
  Award,
  Flame,
  FileCheck,
  Search,
} as const;

const FALLBACK_THUMB =
  "https://images.unsplash.com/photo-1570690732090-275b8807dd76?auto=format&fit=crop&w=800&h=500&q=85";

/**
 * Same pattern as RidgePeak: every catalog service gets a photographic tile +
 * `/services/:id` link (theme overrides via resolveServiceImage).
 */
const ServicesRibbon = () => {
  const { services, servicesRibbon: SERVICES_ORDER } = useSiteContent();
  const { resolveServiceImage } = useTheme();

  const sortedServices = useMemo(() => {
    const order = SERVICES_ORDER.map(s => s.id);
    return [...services].sort((a, b) => {
      const ia = order.indexOf(a.id);
      const ib = order.indexOf(b.id);
      if (ia === -1 && ib === -1) return 0;
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }, [services, SERVICES_ORDER]);

  if (!sortedServices.length) return null;

  return (
    <section id="services" className="bg-muted/50 py-14 sm:py-16 lg:py-20">
      <div className="container-custom px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              OUR SERVICES
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black text-primary tracking-tight uppercase leading-[1.05]">
              Roofing & Exterior Services
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Inspections through full replacements — every line item links to a
              detailed scope page with real roofing photography.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-extrabold tracking-widest text-primary hover:text-secondary transition-colors self-start md:self-end uppercase"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedServices.map(svc => {
            const Icon =
              iconMap[svc.icon as keyof typeof iconMap] || Building2;
            const thumbSrc = resolveServiceImage(
              svc.id,
              svc.image || FALLBACK_THUMB,
            );
            return (
              <Link
                key={svc.id}
                to={`/services/${svc.id}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card hover:border-secondary/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted shrink-0">
                  <img
                    src={thumbSrc}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                  />
                  <span className="absolute top-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-2 ring-white/30">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6 lg:p-7">
                  <h3 className="text-base lg:text-lg font-extrabold uppercase tracking-wide text-primary mb-2 leading-tight">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {svc.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-secondary group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
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

export default ServicesRibbon;
