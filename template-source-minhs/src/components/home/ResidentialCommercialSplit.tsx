import { Link } from "react-router-dom";
import { ArrowRight, Building2, Car } from "lucide-react";
import { useSiteContent } from "@template-minhs/contexts/SiteContentContext";
import { useTheme } from "@template-minhs/contexts/ThemeContext";
import { MINHS_IMAGES } from "@template-minhs/data/siteData";

const ResidentialCommercialSplit = () => {
  const { services } = useSiteContent();
  const { resolveServiceImage } = useTheme();

  const maintenanceSvc = services.find(s => s.id === "factory-scheduled-maintenance");
  const performanceSvc = services.find(s => s.id === "performance-services");

  const maintenanceImg = maintenanceSvc
    ? resolveServiceImage(maintenanceSvc.id, maintenanceSvc.image || MINHS_IMAGES.residentialSplit)
    : MINHS_IMAGES.residentialSplit;
  const performanceImg = performanceSvc
    ? resolveServiceImage(performanceSvc.id, performanceSvc.image || MINHS_IMAGES.commercialSplit)
    : MINHS_IMAGES.commercialSplit;

  const panels = [
    {
      id: "maintenance",
      icon: Car,
      eyebrow: "Factory Care",
      title: maintenanceSvc?.title || "Factory Scheduled Maintenance",
      body:
        maintenanceSvc?.description ||
        "Follow your manufacturer maintenance schedule with OEM-spec fluids, filters, and inspections — without dealership pricing.",
      image: maintenanceImg,
      to: maintenanceSvc ? `/services/${maintenanceSvc.id}` : "/services/factory-scheduled-maintenance",
      cta: "Maintenance Services",
    },
    {
      id: "performance",
      icon: Building2,
      eyebrow: "Performance",
      title: performanceSvc?.title || "Performance Services",
      body:
        performanceSvc?.description ||
        "Upgrades and performance work guided by factory integrity — for drivers who want more from their European machine.",
      image: performanceImg,
      to: performanceSvc ? `/services/${performanceSvc.id}` : "/services/performance-services",
      cta: "Performance Services",
    },
  ] as const;

  return (
    <section className="bg-[hsl(var(--minhs-surface))]">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px] md:min-h-[560px]">
        {panels.map(panel => {
          const Icon = panel.icon;
          return (
            <article key={panel.id} className="group relative overflow-hidden flex flex-col">
              <img
                src={panel.image}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))] via-[hsl(var(--primary))]/75 to-[hsl(var(--primary))]/30"
              />
              <div className="relative mt-auto p-6 sm:p-8 lg:p-10 text-white">
                <span className="inline-flex items-center gap-2 text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.2em] font-display mb-3">
                  <Icon className="h-4 w-4" />
                  {panel.eyebrow}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight">
                  {panel.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/75 max-w-md leading-relaxed">
                  {panel.body}
                </p>
                <Link
                  to={panel.to}
                  className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[hsl(var(--secondary))] px-5 py-3 text-sm font-display font-bold uppercase tracking-wider text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 transition-colors"
                >
                  {panel.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ResidentialCommercialSplit;
