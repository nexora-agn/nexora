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
import { useSiteContent } from "@/contexts/SiteContentContext";

const iconMap = { Flame, Home, CloudLightning, FileCheck, Search, Wrench } as const;
type IconKey = keyof typeof iconMap;

const ServicesRibbon = () => {
  const { servicesRibbon } = useSiteContent();
  if (!servicesRibbon?.length) return null;

  return (
    <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesRibbon.map(svc => {
            const Icon = iconMap[(svc.icon as IconKey)] || Flame;
            const desc = (svc as any).description as string | undefined;
            const to = (svc as any).to as string | undefined;
            return (
              <Link
                key={svc.id}
                to={to || `/services/${svc.id}`}
                className="group relative bg-white rounded-lg border border-slate-100 p-6 lg:p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white mb-5">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base lg:text-lg font-extrabold uppercase tracking-wide text-[hsl(var(--primary))] mb-2">
                  {svc.label}
                </h3>
                {desc && (
                  <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                    {desc}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
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
