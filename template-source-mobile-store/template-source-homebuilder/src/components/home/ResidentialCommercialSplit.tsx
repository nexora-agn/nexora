import { Link } from "react-router-dom";
import { ArrowRight, Building2, Home } from "lucide-react";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { useTheme } from "@template-mobile-store/contexts/ThemeContext";
import { HOME_BUILDER_IMAGES } from "@template-mobile-store/data/siteData";

const ResidentialCommercialSplit = () => {
  const { services } = useSiteContent();
  const { resolveServiceImage } = useTheme();

  const residentialSvc =
    services.find(s => s.id === "residential-landscaping") ?? services.find(s => s.id === "landscaping-design");
  const commercialSvc = services.find(s => s.id === "commercial-landscaping");

  const residentialImg = residentialSvc
    ? resolveServiceImage(residentialSvc.id, residentialSvc.image || HOME_BUILDER_IMAGES.residentialSplit)
    : HOME_BUILDER_IMAGES.residentialSplit;
  const commercialImg = commercialSvc
    ? resolveServiceImage(commercialSvc.id, commercialSvc.image || HOME_BUILDER_IMAGES.commercialSplit)
    : HOME_BUILDER_IMAGES.commercialSplit;

  const panels = [
    {
      id: "residential",
      icon: Home,
      eyebrow: "Residential",
      title: residentialSvc?.title || "Residential Landscaping",
      body:
        residentialSvc?.description ||
        "Backyard retreats, front-yard curb appeal, and full-property design-build for North Jersey homes.",
      image: residentialImg,
      to: residentialSvc ? `/services/${residentialSvc.id}` : "/services/residential-landscaping",
      cta: "Residential Services",
    },
    {
      id: "commercial",
      icon: Building2,
      eyebrow: "Commercial",
      title: commercialSvc?.title || "Commercial Grounds",
      body:
        commercialSvc?.description ||
        "HOA entrances, retail campuses, and office grounds maintained to a professional standard year-round.",
      image: commercialImg,
      to: commercialSvc ? `/services/${commercialSvc.id}` : "/services/commercial-landscaping",
      cta: "Commercial Services",
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
