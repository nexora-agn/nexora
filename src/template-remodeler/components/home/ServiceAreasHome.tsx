import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-remodeler/contexts/SiteContentContext";
import { SERVICE_AREA_COUNTIES } from "@template-remodeler/data/siteData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ServiceAreasHome = () => {
  const { siteTop: SITE_TOP } = useSiteContent();

  return (
    <section className="rm-section-pad bg-[hsl(var(--rm-linen))]">
      <div className="container-custom container-inset">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-3">
              Where We Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))] uppercase leading-tight">
              Central New Jersey
            </h2>
            <div className="rm-rule my-5" />
            <p className="text-muted-foreground font-sans-brand leading-relaxed">
              {SITE_TOP.locations
                ? `We build across ${SITE_TOP.locations}. Contact us to confirm we serve your municipality.`
                : "Luxury home remodeling homes across Central New Jersey."}
            </p>
            <Link
              to="/service-areas"
              className="mt-6 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))]"
            >
              View all areas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="multiple" className="space-y-2">
              {SERVICE_AREA_COUNTIES.map(({ county, towns }) => (
                <AccordionItem
                  key={county}
                  value={county}
                  className="border border-border bg-white px-4 border-l-4 border-l-[hsl(var(--secondary))]"
                >
                  <AccordionTrigger className="font-display font-semibold text-[hsl(var(--primary))] uppercase tracking-wide text-sm hover:no-underline py-4">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[hsl(var(--secondary))]" />
                      {county}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-wrap gap-2 pb-4">
                      {towns.map(town => (
                        <li key={town}>
                          <Link
                            to="/service-areas"
                            className="inline-flex px-3 py-1.5 text-sm font-sans-brand border border-border bg-[hsl(var(--rm-linen))] text-[hsl(var(--primary))] hover:border-[hsl(var(--secondary))] transition-colors"
                          >
                            {town}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasHome;
