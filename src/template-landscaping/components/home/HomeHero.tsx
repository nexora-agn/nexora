import { Link } from "react-router-dom";
import { ArrowRight, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-landscaping/contexts/SiteContentContext";
import { useTheme } from "@template-landscaping/contexts/ThemeContext";
import { LANDSCAPING_IMAGES } from "@template-landscaping/data/siteData";

const HomeHero = () => {
  const { homeHero: HERO, company: COMPANY } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const heroImage = HERO.image || resolveServiceImage("residential-landscaping", LANDSCAPING_IMAGES.heroHome);
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const rating = HERO.ratingCard;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[hsl(var(--vf-forest-dark))]">
      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--vf-forest-dark))]/95 via-[hsl(var(--vf-forest-dark))]/75 to-[hsl(var(--vf-forest-dark))]/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--vf-forest-dark))]/80 via-transparent to-transparent"
      />

      <div className="relative z-10 w-full container-custom container-inset py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="inline-block rounded-full bg-[hsl(var(--secondary))] px-4 py-1.5 text-[11px] font-sans-brand font-bold uppercase tracking-[0.2em] text-[hsl(var(--secondary-foreground))] mb-6">
            {HERO.eyebrow}
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white leading-[1.05] tracking-tight mb-6">
            {HERO.headlineBefore}{" "}
            <span className="text-[hsl(var(--secondary))]">{HERO.headlineHighlight}</span>
            {HERO.headlineAfter ? ` ${HERO.headlineAfter}` : ""}
          </h1>

          <p className="text-lg md:text-xl text-white/90 font-sans-brand leading-relaxed max-w-2xl mb-8">
            {HERO.body}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 rounded-md bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-[hsl(var(--secondary-foreground))] font-display font-bold uppercase tracking-wide text-sm"
            >
              <Link to={HERO.primaryCta?.to || "/contact"}>
                {HERO.primaryCta?.label || "Free Estimate"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8 rounded-md border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 font-display font-bold uppercase tracking-wide text-sm backdrop-blur-sm"
            >
              <a href={phoneHref}>
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 px-6 text-white hover:bg-white/10 font-sans-brand font-semibold"
            >
              <Link to={HERO.secondaryCta?.to || "/projects"}>
                {HERO.secondaryCta?.label || "View Our Work"}
              </Link>
            </Button>
          </div>

          {rating && (
            <div className="inline-flex flex-wrap items-center gap-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3">
              <div className="flex -space-x-2">
                {(rating.avatars ?? []).slice(0, 4).map((src, i) => (
                  <img key={i} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div>
                <p className="flex items-center gap-1.5 font-display font-bold text-white text-lg">
                  <Star className="h-5 w-5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                  {rating.score}
                  <span className="text-sm font-sans-brand font-normal text-white/80">/ 5</span>
                </p>
                <p className="text-xs text-white/75 font-sans-brand">{rating.countLabel}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
