import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";
import { LANDSCAPING_IMAGES } from "@template-landscaping/data/siteData";

const InteriorExteriorShowcase = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <Link
            to="/services/interior-painting"
            className="lg:col-span-7 group relative min-h-[420px] lg:min-h-[520px] overflow-hidden rounded-sm paint-shadow-card"
          >
            <img
              src={LANDSCAPING_IMAGES.gardenDesign}
              alt="Landscaping design"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--flow-panel))]/85 via-[hsl(var(--flow-panel))]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="text-[11px] font-sans-brand tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-2">
                Interior
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-[hsl(40_20%_98%)] mb-3">
                Rooms That Feel Designed
              </h2>
              <p className="text-sm text-[hsl(40_15%_90%/0.8)] font-sans-brand max-w-md mb-4">
                Walls, ceilings, trim, and built-ins with smooth, durable finishes and designer color guidance.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-sans-brand font-semibold text-[hsl(var(--secondary))] group-hover:gap-2 transition-all">
                Explore interior painting <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            <Link
              to="/services/exterior-painting"
              className="group relative flex-1 min-h-[200px] overflow-hidden rounded-sm paint-shadow-card"
            >
              <img
                src={LANDSCAPING_IMAGES.residentialYard}
                alt="Exterior house painting"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--flow-panel))]/80 to-transparent" />
              <div className="absolute bottom-0 p-6 md:p-8">
                <p className="text-[11px] font-sans-brand tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-1">
                  Exterior
                </p>
                <h3 className="font-display text-2xl text-[hsl(40_20%_98%)]">Curb Appeal That Lasts</h3>
              </div>
            </Link>

            <div className="rounded-sm border border-border bg-card p-8 flex flex-col justify-center paint-shadow-soft">
              <p className="text-[11px] font-sans-brand tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-3">
                {COMPANY.name}
              </p>
              <p className="font-display text-2xl text-foreground leading-snug mb-4">
                Residential & commercial crews across North Jersey
              </p>
              <Link
                to="/services/commercial-painting"
                className="text-sm font-sans-brand font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors inline-flex items-center gap-1"
              >
                Commercial projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorExteriorShowcase;
