import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { useTheme } from "@template-dealership/contexts/ThemeContext";
import { HOME_BUILDER_IMAGES } from "@template-dealership/data/siteData";
import { Button } from "@/components/ui/button";

const HIGHLIGHT_SERVICES = [
  { id: "new-vehicles", title: "New Vehicles", image: HOME_BUILDER_IMAGES.showroom },
  { id: "cpo", title: "Certified Pre-Owned", image: HOME_BUILDER_IMAGES.keys },
  { id: "service", title: "Factory Service", image: HOME_BUILDER_IMAGES.crewWorking },
  { id: "ev", title: "Electric Vehicles", image: HOME_BUILDER_IMAGES.evCharge },
] as const;

const TreeServiceHighlights = () => {
  const { company: COMPANY } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <section className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-16 lg:py-24">
      <div className="container-custom container-inset">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <p className="verde-editorial-rule mb-4" />
            <p className="text-[11px] font-sans-brand font-bold tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-3">
              Dealership Highlights
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight">
              Specialists for Every Step of Ownership
            </h2>
            <p className="mt-4 text-[hsl(var(--primary-foreground)/0.85)] font-sans-brand leading-relaxed">
              From new inventory and CPO confidence to EV guidance and factory-trained service — transparent pricing included.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))] shrink-0"
          >
            <a href={phoneHref}>
              <Phone className="h-4 w-4 mr-2" />
              Call Sales
            </a>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {HIGHLIGHT_SERVICES.map((item, index) => {
            const img = resolveServiceImage(item.id, item.image);
            return (
              <Link
                key={item.id}
                to={`/services/${item.id}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/5] card-lift"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <img
                  src={img}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--flow-panel))] via-[hsl(var(--flow-panel))]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-xl text-white flex items-center justify-between gap-2">
                    {item.title}
                    <ArrowUpRight className="h-5 w-5 text-[hsl(var(--secondary))] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TreeServiceHighlights;
