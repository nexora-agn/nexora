import { Link } from "react-router-dom";
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
  Paintbrush,
  ArrowRight,
} from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

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
  Paintbrush,
} as const;

/** Convert an all-caps title (e.g. "DESIGN-BUILD SERVICES") to display form. */
function formatTitle(label: string): string {
  // Allow line break after first 2-3 words for nicer card height
  return label;
}

const ServicesRibbon = () => {
  const { servicesRibbon: SERVICES_RIBBON, services } = useSiteContent();

  return (
    <section id="services" className="bg-background section-padding">
      <div className="container-custom px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              WHAT WE DO
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black text-primary tracking-tight uppercase leading-[1.05]">
              Our Construction Services
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-extrabold tracking-widest text-primary hover:text-secondary transition-colors self-start md:self-end uppercase"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {SERVICES_RIBBON.map(item => {
            const Icon =
              iconMap[item.icon as keyof typeof iconMap] || Building2;
            // Try to map ribbon item id → existing service detail page
            const matchingService = services.find(s => s.id === item.id);
            const linkTo = matchingService
              ? `/services/${matchingService.id}`
              : "/services";
            return (
              <Link
                key={item.id}
                to={linkTo}
                className="group block rounded-lg border border-border bg-card p-6 hover:border-secondary/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center mb-5 text-secondary transition-transform group-hover:scale-110">
                  <Icon
                    className="h-12 w-12"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-primary leading-tight mb-3">
                  {formatTitle(item.label)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 min-h-[3.5rem]">
                  {matchingService?.description ||
                    "Professional construction services delivered with quality and care."}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-secondary group-hover:gap-2.5 transition-all">
                  LEARN MORE
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
