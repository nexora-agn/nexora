import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";
import { SERVICE_AREAS } from "@template-landscaping/data/siteData";

const ServiceAreasHome = () => {
  const { siteTop: SITE_TOP } = useSiteContent();

  return (
    <section className="vf-section-pad bg-white border-t border-border">
      <div className="container-custom container-inset">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 text-[hsl(var(--secondary))] text-xs font-sans-brand font-bold uppercase tracking-[0.2em]">
              <MapPin className="h-4 w-4" />
              Service Areas
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))] leading-tight">
              Proudly Serving
              <span className="block text-[hsl(var(--secondary))]">North Jersey</span>
            </h2>
            <p className="mt-4 text-muted-foreground font-sans-brand leading-relaxed">
              {SITE_TOP.locations
                ? `Residential and commercial properties across ${SITE_TOP.locations} — with 24/7 emergency tree dispatch.`
                : "Local crews, fair pricing, and results you can see from the street."}
            </p>
            <Link
              to="/service-areas"
              className="mt-6 inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wide text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]"
            >
              View All Areas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7 flex flex-wrap gap-2">
            {SERVICE_AREAS.map(area => (
              <Link
                key={area}
                to="/service-areas"
                className="inline-flex rounded-full border border-border bg-[hsl(var(--vf-cream))] px-4 py-2 text-sm font-sans-brand font-medium text-[hsl(var(--primary))] hover:border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/10 transition-colors"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasHome;
