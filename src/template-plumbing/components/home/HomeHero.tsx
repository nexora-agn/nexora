import { Link } from "react-router-dom";
import { ArrowRight, Phone, Star, ShieldCheck, Clock, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-plumbing/contexts/SiteContentContext";
import { useTheme } from "@template-plumbing/contexts/ThemeContext";
import { PLUMBING_IMAGES } from "@template-plumbing/data/siteData";

const trustIconMap = { Clock, Calendar, Award, ShieldCheck } as const;

const HomeHero = () => {
  const { homeHero: HOME_HERO, company: COMPANY, siteTop: SITE_TOP } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const heroImage =
    HOME_HERO.image ||
    resolveServiceImage("emergency-plumbing", PLUMBING_IMAGES.heroPlumber);
  const ratingCard = HOME_HERO.ratingCard;
  const trustPills = HOME_HERO.trustPills ?? [];

  return (
    <section className="relative bg-white overflow-hidden">
      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.12]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-white via-white/96 to-[hsl(var(--flow-surface))]"
      />

      <div className="relative z-10">
          <div className="container-custom px-4 md:px-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[560px] lg:min-h-[620px] py-14 lg:py-20">
              <div className="lg:col-span-7 space-y-6">
                {HOME_HERO.eyebrow && (
                  <p className="inline-flex items-center gap-2 text-xs font-sans-brand font-semibold tracking-[0.2em] uppercase text-[hsl(var(--secondary))]">
                    <span className="h-px w-8 bg-[hsl(var(--secondary))]" aria-hidden />
                    {HOME_HERO.eyebrow}
                  </p>
                )}

                <h1 className="font-display text-[2.35rem] sm:text-5xl lg:text-[3.5rem] font-bold text-[hsl(var(--foreground))] leading-[1.08]">
                  {HOME_HERO.headlineBefore}{" "}
                  <span className="text-[hsl(var(--primary))]">{HOME_HERO.headlineHighlight}</span>
                  <span className="block mt-1 text-[hsl(var(--foreground))]/90">
                    {HOME_HERO.headlineAfter}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-sans-brand">
                  {HOME_HERO.body}
                </p>

                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-4 rounded-sm border-2 border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white px-5 py-4 group flow-shadow-soft hover:bg-[hsl(var(--primary))]/95 transition-colors"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 shrink-0">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span className="text-left">
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-white/80 font-sans-brand font-semibold">
                      {SITE_TOP.line}
                    </span>
                    <span className="block text-xl sm:text-2xl font-display font-bold tracking-tight">
                      {COMPANY.phone}
                    </span>
                  </span>
                </a>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-white font-sans-brand font-semibold tracking-wide rounded-sm px-7 h-12"
                  >
                    <Link to={HOME_HERO.primaryCta?.to || "/contact"}>
                      {HOME_HERO.primaryCta?.label || "Request Service"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--flow-surface))] font-sans-brand font-semibold rounded-sm h-12"
                  >
                    <Link to={HOME_HERO.secondaryCta?.to || "/services/emergency-plumbing"}>
                      {HOME_HERO.secondaryCta?.label || "24/7 Emergency"}
                    </Link>
                  </Button>
                </div>

                {trustPills.length > 0 && (
                  <ul className="flex flex-wrap gap-4 pt-2">
                    {trustPills.map(pill => {
                      const Icon =
                        trustIconMap[pill.icon as keyof typeof trustIconMap] ?? ShieldCheck;
                      return (
                        <li
                          key={pill.label}
                          className="flex items-center gap-2 text-sm text-muted-foreground font-sans-brand"
                        >
                          <Icon className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0" />
                          <span>
                            <strong className="text-foreground font-semibold">{pill.label}</strong>
                            {pill.sub && (
                              <span className="text-muted-foreground"> · {pill.sub}</span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-sm overflow-hidden flow-shadow-card border border-border bg-white">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={heroImage}
                      alt="Licensed plumber at work"
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                    <span className="absolute top-4 left-4 flex items-center gap-2 rounded-sm bg-white/95 backdrop-blur px-3 py-2 text-sm font-sans-brand font-semibold text-[hsl(var(--primary))] flow-shadow-soft">
                      <ShieldCheck className="h-4 w-4 text-[hsl(var(--secondary))]" />
                      {COMPANY.license || "Licensed & Insured"}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6 border-t border-border bg-[hsl(var(--flow-surface))]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[hsl(var(--secondary))]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <div>
                        <p className="font-display text-2xl font-bold text-[hsl(var(--primary))]">
                          {ratingCard?.score ?? SITE_TOP.ratingValue}
                        </p>
                        <p className="text-xs text-muted-foreground font-sans-brand uppercase tracking-wider">
                          {ratingCard?.countLabel ??
                            `${SITE_TOP.ratingCount} ${SITE_TOP.ratingLabel}`}
                        </p>
                      </div>
                    </div>
                    {HOME_HERO.ratingQuote && (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-l-2 border-[hsl(var(--secondary))] pl-3 font-sans-brand italic">
                        &ldquo;{HOME_HERO.ratingQuote}&rdquo;
                      </p>
                    )}
                    {ratingCard?.avatars && ratingCard.avatars.length > 0 && (
                      <div className="mt-4 flex -space-x-2">
                        {ratingCard.avatars.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt=""
                            className="h-9 w-9 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default HomeHero;
