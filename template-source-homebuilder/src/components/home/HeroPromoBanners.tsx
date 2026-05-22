import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LEAD_MAGNET, HOME_BUILDER_IMAGES } from "@template-homebuilder/data/siteData";
import { Button } from "@/components/ui/button";

/** GTG-style lead magnet — single prominent split section, not 3 dark promo tiles */
const HeroPromoBanners = () => (
  <section className="border-y border-border bg-[hsl(var(--hb-bronze-light))]/50">
    <div className="grid lg:grid-cols-2">
      <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-4">
          Free Resource
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))] uppercase leading-tight">
          {LEAD_MAGNET.title}
        </h2>
        <div className="hb-rule my-6" />
        <p className="text-muted-foreground font-sans-brand leading-relaxed mb-8">{LEAD_MAGNET.subtitle}</p>
        <ul className="space-y-2 mb-8 text-sm font-sans-brand text-[hsl(var(--primary))]">
          <li>• Setting a realistic budget & key cost factors</li>
          <li>• Exploring financing options</li>
          <li>• Selecting the right builder</li>
          <li>• Navigating timelines & finding land</li>
        </ul>
        <Button
          asChild
          size="lg"
          className="w-fit rounded-none bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 font-display uppercase tracking-widest text-xs h-12 px-8"
        >
          <Link to={LEAD_MAGNET.cta.to}>
            {LEAD_MAGNET.cta.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="relative min-h-[280px] lg:min-h-full order-1 lg:order-2">
        <img
          src={LEAD_MAGNET.image}
          alt="Custom home planning guide"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>

    <div className="grid md:grid-cols-2 border-t border-border">
      <Link
        to="/projects"
        className="group flex items-center gap-6 p-8 md:p-10 bg-white border-b md:border-b-0 md:border-r border-border hover:bg-[hsl(var(--hb-linen))] transition-colors"
      >
        <img
          src={HOME_BUILDER_IMAGES.heroPortfolio}
          alt=""
          className="h-20 w-28 object-cover shrink-0 hidden sm:block"
        />
        <span>
          <span className="block font-display text-lg font-bold text-[hsl(var(--primary))] uppercase">
            View Our Portfolio
          </span>
          <span className="block text-sm text-muted-foreground font-sans-brand mt-1">
            Custom homes across Central NJ
          </span>
        </span>
        <ArrowRight className="h-5 w-5 text-[hsl(var(--secondary))] ml-auto shrink-0 group-hover:translate-x-1 transition-transform" />
      </Link>
      <Link
        to="/process"
        className="group flex items-center gap-6 p-8 md:p-10 bg-white hover:bg-[hsl(var(--hb-linen))] transition-colors"
      >
        <img
          src={HOME_BUILDER_IMAGES.heroProcess}
          alt=""
          className="h-20 w-28 object-cover shrink-0 hidden sm:block"
        />
        <span>
          <span className="block font-display text-lg font-bold text-[hsl(var(--primary))] uppercase">
            Our Process
          </span>
          <span className="block text-sm text-muted-foreground font-sans-brand mt-1">
            Design-build from concept to completion
          </span>
        </span>
        <ArrowRight className="h-5 w-5 text-[hsl(var(--secondary))] ml-auto shrink-0 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </section>
);

export default HeroPromoBanners;
