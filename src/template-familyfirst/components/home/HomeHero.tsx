import { Link } from "react-router-dom";
import { ArrowRight, Phone, Star, ShieldCheck, Clock, Home, Thermometer, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";
import { useTheme } from "@template-familyfirst/contexts/ThemeContext";
import { PLUMBING_IMAGES } from "@template-familyfirst/data/siteData";

const trustIconMap = { Clock, Home, ShieldCheck, Thermometer, Camera } as const;

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
    <section className="relative ff-gradient-hero text-[hsl(var(--foreground))] overflow-hidden border-b border-border">
      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.07]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, hsl(var(--secondary) / 0.14) 0%, transparent 42%), radial-gradient(circle at 10% 90%, hsl(var(--secondary) / 0.08) 0%, transparent 38%)",
        }}
      />

      <div className="relative z-10 container-custom px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[560px] lg:min-h-[600px] py-14 lg:py-20">
          <div className="lg:col-span-7 space-y-6">
            {HOME_HERO.eyebrow && (
              <p className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--secondary))]/25 bg-white px-4 py-1.5 text-xs font-sans-brand font-semibold tracking-[0.18em] uppercase text-[hsl(var(--secondary))] shadow-sm">
                {HOME_HERO.eyebrow}
              </p>
            )}

            <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-[3.35rem] font-bold leading-[1.1] text-[hsl(var(--primary))]">
              {HOME_HERO.headlineBefore}{" "}
              <span className="text-[hsl(var(--secondary))]">{HOME_HERO.headlineHighlight}</span>
              <span className="block mt-2 text-[hsl(var(--foreground))]/90">
                {HOME_HERO.headlineAfter}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-sans-brand">
              {HOME_HERO.body}
            </p>

            <a
              href={phoneHref}
              className="inline-flex items-center gap-4 rounded-xl border-2 border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))] text-white px-5 py-4 flow-shadow-soft hover:bg-[hsl(var(--secondary))]/90 transition-colors group"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="h-5 w-5" />
              </span>
              <span className="text-left">
                <span className="block text-[10px] uppercase tracking-[0.22em] text-white/85 font-sans-brand font-semibold">
                  {SITE_TOP.line}
                </span>
                <span className="block text-xl sm:text-2xl font-display font-bold tracking-tight">
                  {COMPANY.phone}
                </span>
              </span>
            </a>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-white font-sans-brand font-semibold rounded-xl px-7 h-12 shadow-md"
              >
                <Link to={HOME_HERO.primaryCta?.to || "/contact"}>
                  {HOME_HERO.primaryCta?.label || "Schedule Service"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] bg-white hover:bg-[hsl(var(--flow-soft))] font-sans-brand font-semibold rounded-xl h-12"
              >
                <Link to={HOME_HERO.secondaryCta?.to || "/services/emergency-plumbing"}>
                  {HOME_HERO.secondaryCta?.label || "Emergency Help"}
                </Link>
              </Button>
            </div>

            {trustPills.length > 0 && (
              <ul className="flex flex-wrap gap-3 pt-1">
                {trustPills.map(pill => {
                  const Icon =
                    trustIconMap[pill.icon as keyof typeof trustIconMap] ?? ShieldCheck;
                  return (
                    <li
                      key={pill.label}
                      className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm text-muted-foreground font-sans-brand shadow-sm"
                    >
                      <Icon className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0" />
                      <span>
                        <strong className="text-[hsl(var(--primary))] font-semibold">
                          {pill.label}
                        </strong>
                        {pill.sub && <span className="text-muted-foreground"> · {pill.sub}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden flow-shadow-elevated border border-border bg-white">
              <div className="relative aspect-[4/3]">
                <img
                  src={heroImage}
                  alt="Licensed plumber providing professional service"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <span className="absolute top-4 left-4 flex items-center gap-2 rounded-lg bg-white/95 backdrop-blur px-3 py-2 text-sm font-sans-brand font-semibold text-[hsl(var(--primary))] flow-shadow-soft">
                  <ShieldCheck className="h-4 w-4 text-[hsl(var(--secondary))]" />
                  {COMPANY.license || "Licensed & Insured"}
                </span>
              </div>
              <div className="p-5 sm:p-6 border-t border-border bg-[hsl(var(--flow-surface))]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5 text-[hsl(var(--secondary))]">
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
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-l-2 border-[hsl(var(--secondary))] pl-3 font-sans-brand">
                    &ldquo;{HOME_HERO.ratingQuote}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-transparent via-[hsl(var(--secondary))] to-transparent opacity-60" />
    </section>
  );
};

export default HomeHero;
