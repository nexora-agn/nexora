import { Link } from "react-router-dom";
import {
  Flame,
  Home,
  CloudLightning,
  FileCheck,
  Search,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";
import { useTheme } from "@template-nexora/contexts/ThemeContext";

const iconMap = { Flame, Home, CloudLightning, FileCheck, Search, Wrench } as const;
type IconKey = keyof typeof iconMap;

const FALLBACK_THUMB =
  "https://images.unsplash.com/photo-1570690732090-275b8807dd76?auto=format&fit=crop&w=800&h=500&q=85";

/**
 * Homepage service cards driven by `services`. Each tile shows roofing photography
 * from the catalog (+ theme overrides) and links to a real `/services/:id` route.
 */
const ServicesRibbon = () => {
  const { services } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  if (!services?.length) return null;

  return (
    <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(svc => {
            const Icon = iconMap[svc.icon as IconKey] ?? Flame;
            const thumbSrc = resolveServiceImage(svc.id, svc.image || FALLBACK_THUMB);
            return (
              <Link
                key={svc.id}
                to={`/services/${svc.id}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 shrink-0">
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
                  <span className="absolute top-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white shadow-md ring-2 ring-white/30">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6 lg:p-7">
                  <h3 className="text-base lg:text-lg font-extrabold uppercase tracking-wide text-[hsl(var(--primary))] mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">{svc.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                    Learn More
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
