import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { HOME_BUILDER_IMAGES } from "@template-dealership/data/siteData";
import { Button } from "@/components/ui/button";

/** Expertise split band for dealership positioning */
const WhyChooseGrid = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <section className="hb-section-pad bg-white">
      <div className="container-custom container-inset">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={HOME_BUILDER_IMAGES.luxuryExterior}
              alt="Vehicles at Nexora Motors showroom"
              className="w-full aspect-[4/3] object-cover"
            />
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border-4 border-[hsl(var(--secondary))] -z-10"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-3">
              Why Nexora Motors
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))] uppercase leading-tight">
              Expertise That Makes Buying Clear
            </h2>
            <div className="hb-rule my-6" />
            <p className="text-muted-foreground font-sans-brand leading-relaxed mb-4">
              {COMPANY.name} is a Central Texas dealership built around transparent pricing, digital retail tools,
              and specialists who help you compare new, used, and certified options with confidence.
            </p>
            <p className="text-muted-foreground font-sans-brand leading-relaxed mb-8">
              From same-day test drives to competitive financing and factory-trained service, we protect your budget,
              respect your timeline, and keep the experience modern from first browse to delivery.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-2 border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))] font-display uppercase tracking-widest text-xs"
            >
              <Link to="/about">
                About Our Dealership
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseGrid;
