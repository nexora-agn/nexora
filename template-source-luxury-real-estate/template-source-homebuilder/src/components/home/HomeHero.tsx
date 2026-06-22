import { Link } from "react-router-dom";
import { ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-luxury-real-estate/contexts/SiteContentContext";
import { useTheme } from "@template-luxury-real-estate/contexts/ThemeContext";
import { HOME_BUILDER_IMAGES } from "@template-luxury-real-estate/data/siteData";
import { getServiceIcon } from "@template-luxury-real-estate/lib/serviceIcons";

const HomeHero = () => {
  const { homeHero: HERO, company: COMPANY } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const heroImage = HERO.image || resolveServiceImage("custom-homes", HOME_BUILDER_IMAGES.heroHome);
  const rating = HERO.ratingCard;
  const trustPills = HERO.trustPills ?? [];

  return (
    <section className="relative bg-[hsl(var(--hb-warm-white))] border-b border-border overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[hsl(var(--hb-bronze-light))]/40 hidden lg:block"
      />

      <div className="container-custom container-inset py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-5">
              {HERO.eyebrow}
            </p>

            <h1 className="font-display text-[2.35rem] sm:text-5xl lg:text-[3.5rem] font-bold text-[hsl(var(--primary))] leading-[1.08] uppercase">
              {HERO.headlineBefore}
              {HERO.headlineHighlight ? (
                <>
                  <span className="block text-[hsl(var(--secondary))] mt-1 normal-case tracking-normal text-[0.92em]">
                    {HERO.headlineHighlight}
                  </span>
                </>
              ) : null}
            </h1>

            <div className="hb-rule my-6" />

            <p className="text-base md:text-lg text-muted-foreground font-sans-brand leading-relaxed max-w-xl mb-8">
              {HERO.body}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-none bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-[hsl(var(--secondary-foreground))] font-display font-semibold uppercase tracking-widest text-xs"
              >
                <Link to={HERO.primaryCta?.to || "/contact"}>
                  {HERO.primaryCta?.label || "Work With Us"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-none border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] font-display font-semibold uppercase tracking-widest text-xs"
              >
                <Link to={HERO.secondaryCta?.to || "/projects"}>
                  {HERO.secondaryCta?.label || "View Portfolio"}
                </Link>
              </Button>
            </div>

            {trustPills.length > 0 && (
              <ul className="grid sm:grid-cols-3 gap-4 mb-8">
                {trustPills.map(pill => {
                  const Icon = getServiceIcon(pill.icon);
                  return (
                    <li
                      key={pill.label}
                      className="flex gap-3 items-start border border-border bg-white p-4"
                    >
                      <span className="hb-check-box">
                        <Check className="h-5 w-5" strokeWidth={2.5} />
                      </span>
                      <span>
                        <span className="block font-display text-sm font-bold text-[hsl(var(--primary))] leading-snug">
                          {pill.label}
                        </span>
                        <span className="block text-xs text-muted-foreground font-sans-brand mt-0.5">
                          {pill.sub}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            {rating && (
              <div className="inline-flex flex-wrap items-center gap-4 border border-border bg-white px-5 py-3">
                <div className="flex -space-x-2">
                  {(rating.avatars ?? []).slice(0, 4).map((src, i) => (
                    <img key={i} src={src} alt="" className="h-9 w-9 border-2 border-white object-cover" />
                  ))}
                </div>
                <div>
                  <p className="flex items-center gap-1.5 font-display font-bold text-[hsl(var(--primary))] text-lg">
                    <Star className="h-5 w-5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                    {rating.score}
                  </p>
                  <p className="text-xs text-muted-foreground font-sans-brand">{rating.countLabel}</p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[4/5] sm:aspect-[5/6] max-h-[560px] lg:max-h-none">
              <img
                src={heroImage}
                alt={`${COMPANY.name} custom home`}
                className="absolute inset-0 h-full w-full object-cover hb-frame"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
