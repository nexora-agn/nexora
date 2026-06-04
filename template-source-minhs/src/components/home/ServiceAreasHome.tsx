import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { SERVICE_AREAS } from "@/data/siteData";

const ServiceAreasHome = () => {
  const { siteTop: SITE_TOP } = useSiteContent();
  const areas = SERVICE_AREAS;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20 border-t border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-2 text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">
              <MapPin className="h-4 w-4" />
              Service Areas
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold uppercase text-[hsl(var(--primary))] leading-tight">
              Local Electricians,
              <span className="block text-[hsl(var(--secondary))]">On Call Near You</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {SITE_TOP.locations
                ? `Proudly serving ${SITE_TOP.locations} and surrounding communities with same-day availability for most calls.`
                : "We dispatch licensed crews across the metro — from quick outlet fixes to full commercial fit-outs."}
            </p>
            <Link
              to="/service-areas"
              className="mt-6 inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] transition-colors"
            >
              View All Service Areas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {areas.map(area => (
                <Link
                  key={area}
                  to="/service-areas"
                  className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--minhs-surface))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary))] hover:border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/10 hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {area}
                </Link>
              ))}
              <Link
                to="/service-areas"
                className="inline-flex items-center rounded-full border-2 border-dashed border-[hsl(var(--secondary))]/50 px-4 py-2 text-sm font-display font-bold uppercase tracking-wider text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/10 transition-colors"
              >
                + More Areas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasHome;
