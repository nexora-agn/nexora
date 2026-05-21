import { Link } from "react-router-dom";
import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-painting/contexts/SiteContentContext";
import { useTheme } from "@template-painting/contexts/ThemeContext";
import { PAINTING_IMAGES } from "@template-painting/data/siteData";

const trustIconMap = { ShieldCheck, Star, Sparkles } as const;

const HomeHero = () => {
  const { homeHero: HOME_HERO } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const heroImage =
    HOME_HERO.image ||
    resolveServiceImage("interior-painting", PAINTING_IMAGES.heroHome);
  const ratingCard = HOME_HERO.ratingCard;
  const trustPills = HOME_HERO.trustPills ?? [];

  return (
    <section className="relative min-h-[78vh] lg:min-h-[84vh] flex items-end overflow-hidden bg-[hsl(var(--flow-panel))]">
      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--flow-panel))] via-[hsl(var(--flow-panel))]/75 to-[hsl(var(--flow-panel))]/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--flow-panel))]/92 via-[hsl(var(--flow-panel))]/40 to-transparent"
      />

      <div className="relative z-10 w-full container-custom container-inset pb-12 md:pb-16 pt-28 md:pt-32">
        <div className="max-w-3xl">
          {HOME_HERO.eyebrow && (
            <p className="flex items-center gap-4 text-[11px] font-sans-brand font-semibold tracking-[0.28em] uppercase text-[hsl(var(--secondary))] mb-6">
              <span className="paint-editorial-rule" aria-hidden />
              {HOME_HERO.eyebrow}
            </p>
          )}

          <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-[4.25rem] text-[hsl(var(--primary-foreground))] leading-[1.05] mb-6">
            {HOME_HERO.headlineBefore}{" "}
            <span className="italic text-[hsl(var(--secondary))]">{HOME_HERO.headlineHighlight}</span>
            <span className="block mt-2">{HOME_HERO.headlineAfter}</span>
          </h1>

          <p className="text-base sm:text-lg text-[hsl(var(--primary-foreground)/0.88)] leading-relaxed max-w-xl font-sans-brand mb-10">
            {HOME_HERO.body}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-[hsl(var(--secondary-foreground))] font-sans-brand font-semibold tracking-wide rounded-sm px-8 h-13 text-sm"
            >
              <Link to={HOME_HERO.primaryCta?.to || "/contact"}>
                {HOME_HERO.primaryCta?.label || "Free Estimate"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[hsl(var(--primary-foreground)/0.35)] bg-transparent text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-foreground)/0.08)] font-sans-brand rounded-sm px-8 h-13"
            >
              <Link to={HOME_HERO.secondaryCta?.to || "/projects"}>
                {HOME_HERO.secondaryCta?.label || "View Gallery"}
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 md:gap-10">
            {trustPills.map(pill => {
              const Icon = trustIconMap[pill.icon as keyof typeof trustIconMap] ?? ShieldCheck;
              return (
                <div key={pill.label} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--secondary)/0.4)] text-[hsl(var(--secondary))]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[hsl(var(--primary-foreground))] font-sans-brand">
                      {pill.label}
                    </span>
                    <span className="block text-xs text-[hsl(var(--primary-foreground)/0.65)] font-sans-brand">
                      {pill.sub}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {ratingCard && (
          <div className="hidden lg:flex absolute right-10 xl:right-14 bottom-16 flex-col items-end gap-4 max-w-xs text-right">
            <div className="rounded-sm border border-[hsl(var(--primary-foreground)/0.12)] bg-[hsl(var(--flow-panel)/0.85)] backdrop-blur-md px-6 py-5 paint-shadow-soft">
              <div className="flex items-center justify-end gap-1 text-[hsl(var(--secondary))] mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="font-display text-4xl text-[hsl(var(--primary-foreground))] leading-none">
                {ratingCard.score}
              </p>
              <p className="text-xs text-[hsl(var(--primary-foreground)/0.7)] font-sans-brand mt-1">
                {ratingCard.countLabel}
              </p>
              {ratingCard.avatars?.length > 0 && (
                <div className="flex justify-end -space-x-2 mt-4">
                  {ratingCard.avatars.slice(0, 4).map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="h-8 w-8 rounded-full border-2 border-[hsl(var(--flow-panel))] object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
            {HOME_HERO.ratingQuote && (
              <p className="text-sm text-[hsl(var(--primary-foreground)/0.75)] font-sans-brand leading-relaxed italic max-w-[280px]">
                "{HOME_HERO.ratingQuote}"
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeHero;
