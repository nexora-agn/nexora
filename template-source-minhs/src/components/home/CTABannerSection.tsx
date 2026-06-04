import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA_SECTION } from "@/data/siteData";

const CTABannerSection = () => {
  const c = CTA_SECTION;
  const phoneHref = c.secondaryCta.to.startsWith("tel:") ? c.secondaryCta.to : `tel:${c.secondaryCta.to}`;

  return (
    <section className="section-padding bg-[hsl(var(--primary))] text-white">
      <div className="container-custom text-center max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight">
          {c.headline}
        </h2>
        <p className="mt-4 text-lg text-white/75">{c.subheadline}</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase tracking-wider rounded-sm px-8"
          >
            <Link to={c.primaryCta.to}>
              {c.primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-display font-bold uppercase tracking-wider rounded-sm px-8"
          >
            <a href={phoneHref}>
              <Phone className="mr-2 h-4 w-4" />
              {c.secondaryCta.label}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABannerSection;
