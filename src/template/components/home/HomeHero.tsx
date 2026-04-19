import { Link } from "react-router-dom";
import { ArrowRight, Play, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template/contexts/SiteContentContext";

const HomeHero = () => {
  const { homeHero: HOME_HERO, homeStats: HOME_STATS } = useSiteContent();
  const pillStat = HOME_STATS?.[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-muted/90 via-background to-background section-padding">
      {/* Decorative background: subtle grid + soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 30% 20%, #000 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 20%, #000 35%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-secondary/20 blur-3xl"
      />

      <div className="container-custom relative px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1.5 text-xs font-semibold tracking-widest text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              BUILDING SINCE 1998 · LICENSED &amp; INSURED
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.05]">
              {HOME_HERO.headlineBefore}{" "}
              <span className="relative inline-block text-secondary">
                {HOME_HERO.headlineHighlight}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-secondary/25"
                />
              </span>{" "}
              {HOME_HERO.headlineAfter}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              {HOME_HERO.body}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-sm px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide shadow-lg shadow-primary/10"
              >
                <Link to={HOME_HERO.primaryCta.to}>{HOME_HERO.primaryCta.label}</Link>
              </Button>
              <Link
                to={HOME_HERO.secondaryCta.to}
                className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-secondary transition-colors group"
              >
                {HOME_HERO.secondaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border/70 pt-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary text-secondary"
                      aria-hidden
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">4.9/5</span> from
                  250+ clients
                </span>
              </div>
              <div className="hidden sm:block h-5 w-px bg-border" aria-hidden />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-secondary" />
                <span>
                  <span className="font-semibold text-foreground">10-year</span>{" "}
                  structural warranty
                </span>
              </div>
            </div>
          </div>

          <div className="relative lg:min-w-0">
            <div className="relative overflow-hidden rounded-[1.75rem] md:rounded-3xl bg-muted shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
              <img
                src={HOME_HERO.image}
                alt=""
                className="w-full aspect-[4/5] max-h-[min(560px,78vh)] object-cover object-center"
                loading="eager"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
              />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-black/45 px-4 py-4 shadow-lg backdrop-blur-xl sm:px-6 sm:py-5 md:gap-6">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary sm:text-xs">
                      {HOME_HERO.featuredEyebrow}
                    </p>
                    <h2 className="mt-1.5 text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl md:text-[1.65rem]">
                      {HOME_HERO.featuredTitle}
                    </h2>
                    <p className="mt-1 text-sm text-white/85">
                      {HOME_HERO.featuredMeta}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-md ring-1 ring-white/40 transition-transform hover:scale-105 md:h-[4.25rem] md:w-[4.25rem]"
                    aria-label="Play video"
                  >
                    <Play
                      className="h-7 w-7 ml-1 md:h-8 md:w-8"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            {pillStat && (
              <div className="hidden md:flex absolute -left-4 lg:-left-8 top-8 items-center gap-3 rounded-2xl border border-border bg-card/95 backdrop-blur px-4 py-3 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.25)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-primary leading-none">
                    {pillStat.value}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-1">
                    {pillStat.label}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
