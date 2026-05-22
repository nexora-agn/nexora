import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@template-remodeler/contexts/SiteContentContext";
import { REMODELER_IMAGES } from "@template-remodeler/data/siteData";
import { Button } from "@/components/ui/button";

/** GTG-style "expertise" split band — not a 3-col icon grid like remodeling */
const WhyChooseGrid = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <section className="rm-section-pad bg-white">
      <div className="container-custom container-inset">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={REMODELER_IMAGES.aboutCrew}
              alt="Crestline remodeling crew"
              className="w-full aspect-[4/3] object-cover"
            />
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border-4 border-[hsl(var(--secondary))] -z-10"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-3">
              Why Home Remodeling
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-[hsl(var(--primary))] leading-tight">
              Top-Rated NJ Contractor — 30+ Years Local
            </h2>
            <div className="rm-rule my-6" />
            <p className="text-muted-foreground font-sans-brand leading-relaxed mb-4">
              {COMPANY.name} is a family-owned home improvement company trusted for kitchens, baths, basements,
              and exterior work. We combine affordable options with full-service general contracting.
            </p>
            <p className="text-muted-foreground font-sans-brand leading-relaxed mb-8">
              The home remodeling method centers you in every step — we protect your budget, respect your timeline,
              and deliver a home-building experience unlike traditional architect-plus-builder arrangements.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-2 border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))] font-display uppercase tracking-widest text-xs"
            >
              <Link to="/about">
                About Our Firm
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
