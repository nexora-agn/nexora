import { Link } from "react-router-dom";
import { ArrowRight, Car, Wrench } from "lucide-react";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { useTheme } from "@template-dealership/contexts/ThemeContext";
import { HOME_BUILDER_IMAGES } from "@template-dealership/data/siteData";

const ResidentialCommercialSplit = () => {
  const { services } = useSiteContent();
  const { resolveServiceImage } = useTheme();

  const salesSvc =
    services.find(s => s.id === "new-vehicles") ?? services.find(s => s.id === "used-vehicles");
  const serviceSvc = services.find(s => s.id === "service");

  const salesImg = salesSvc
    ? resolveServiceImage(salesSvc.id, salesSvc.image || HOME_BUILDER_IMAGES.showroom)
    : HOME_BUILDER_IMAGES.showroom;
  const serviceImg = serviceSvc
    ? resolveServiceImage(serviceSvc.id, serviceSvc.image || HOME_BUILDER_IMAGES.crewWorking)
    : HOME_BUILDER_IMAGES.crewWorking;

  const panels = [
    {
      id: "sales",
      icon: Car,
      eyebrow: "Sales",
      title: salesSvc?.title || "New & Used Vehicles",
      body:
        salesSvc?.description ||
        "Browse new, used, and certified inventory with transparent pricing across our Central Texas locations.",
      image: salesImg,
      to: salesSvc ? `/services/${salesSvc.id}` : "/inventory",
      cta: "Shop Inventory",
    },
    {
      id: "service",
      icon: Wrench,
      eyebrow: "Service",
      title: serviceSvc?.title || "Factory Service",
      body:
        serviceSvc?.description ||
        "Factory-trained technicians, OEM parts, and service specials that keep you on the road.",
      image: serviceImg,
      to: serviceSvc ? `/services/${serviceSvc.id}` : "/services/service",
      cta: "Schedule Service",
    },
  ] as const;

  return (
    <section className="bg-[hsl(var(--flow-sage))]/40">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px] md:min-h-[520px]">
        {panels.map(panel => {
          const Icon = panel.icon;
          return (
            <article key={panel.id} className="group relative overflow-hidden flex flex-col min-h-[360px]">
              <img
                src={panel.image}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--flow-panel))] via-[hsl(var(--flow-panel))]/70 to-[hsl(var(--flow-panel))]/20"
              />
              <div className="relative mt-auto p-6 sm:p-8 lg:p-10 text-white">
                <span className="inline-flex items-center gap-2 text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.2em] font-sans-brand mb-3">
                  <Icon className="h-4 w-4" />
                  {panel.eyebrow}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-tight">{panel.title}</h2>
                <p className="mt-3 text-sm sm:text-base text-white/80 max-w-md leading-relaxed font-sans-brand">
                  {panel.body}
                </p>
                <Link
                  to={panel.to}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--secondary))] px-5 py-3 text-sm font-sans-brand font-bold uppercase tracking-wider text-[hsl(var(--secondary-foreground))] hover:opacity-90 transition-opacity"
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
