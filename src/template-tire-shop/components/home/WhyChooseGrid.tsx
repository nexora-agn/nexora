import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { HOME_BUILDER_IMAGES } from "@template-tire-shop/data/siteData";
import { Button } from "@/components/ui/button";

const WhyChooseGrid = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <section className="hb-section-pad bg-white">
      <div className="container-custom container-inset">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={HOME_BUILDER_IMAGES.luxuryExterior}
              alt="Tire rack at Nexora Tires"
              className="w-full aspect-[4/3] object-cover"
            />
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border-4 border-[hsl(var(--secondary))] -z-10"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-3">
              Why Nexora Tires
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))] uppercase leading-tight">
              Spec-Sheet Clarity for Every Fitment
            </h2>
            <div className="hb-rule my-6" />
            <p className="text-muted-foreground font-sans-brand leading-relaxed mb-4">
              {COMPANY.name} specialists live and breathe tires — comparing size, load, speed rating, and season
              so you do not have to guess.
            </p>
            <p className="text-muted-foreground font-sans-brand leading-relaxed mb-8">
              From road-hazard options to same-day installs, we support your tires long after checkout with transparent
              pricing and ASE-certified service at four Austin-area shops.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-2 border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))] font-display uppercase tracking-widest text-xs"
            >
              <Link to="/about">
                About Us
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
