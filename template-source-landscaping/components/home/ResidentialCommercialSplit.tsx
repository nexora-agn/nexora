import { Link } from "react-router-dom";
import { ArrowRight, Building2, Home } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LANDSCAPING_IMAGES } from "@/data/siteData";

const ResidentialCommercialSplit = () => {
  const { services } = useSiteContent();
  const { resolveServiceImage } = useTheme();

  const residentialSvc = services.find(s => s.id === "residential-plumbing");
  const commercialSvc = services.find(s => s.id === "commercial-plumbing");

  const residentialImg = residentialSvc
    ? resolveServiceImage(residentialSvc.id, residentialSvc.image || LANDSCAPING_IMAGES.residentialSplit)
    : LANDSCAPING_IMAGES.residentialSplit;
  const commercialImg = commercialSvc
    ? resolveServiceImage(commercialSvc.id, commercialSvc.image || LANDSCAPING_IMAGES.commercialSplit)
    : LANDSCAPING_IMAGES.commercialSplit;

  const panels = [
    {
      id: "residential",
      icon: Home,
      eyebrow: "Residential",
      title: residentialSvc?.title || "Home Plumbing",
      body:
        residentialSvc?.description ||
        "Panel upgrades, rewiring, lighting, EV chargers, and code-safe repairs for every room in your home.",
      image: residentialImg,
      to: residentialSvc ? `/services/${residentialSvc.id}` : "/services",
      cta: "Residential Services",
    },
    {
      id: "commercial",
      icon: Building2,
      eyebrow: "Commercial",
      title: commercialSvc?.title || "Commercial Plumbing",
      body:
        commercialSvc?.description ||
        "Tenant build-outs, maintenance contracts, emergency power, and compliance for offices, retail, and industrial sites.",
      image: commercialImg,
      to: commercialSvc ? `/services/${commercialSvc.id}` : "/services",
      cta: "Commercial Services",
    },
  ] as const;

  return (
    <section className="bg-[hsl(var(--flow-surface))]">
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
