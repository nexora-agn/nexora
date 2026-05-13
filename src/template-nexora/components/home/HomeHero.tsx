import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  Calendar,
  Tag,
  ShieldCheck,
  Star,
  Quote,
  Medal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";

const iconMap = { Calendar, Tag, ShieldCheck } as const;

const DEFAULT_RATING_AVATARS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
] as const;

const HomeHero = () => {
  const { homeHero: HOME_HERO, company: COMPANY, siteTop: SITE_TOP } = useSiteContent();
  const trustPills = (HOME_HERO as any).trustPills as
    | { label: string; sub: string; icon: keyof typeof iconMap }[]
    | undefined;
  const ratingCard = (HOME_HERO as any).ratingCard as
    | { score: string; countLabel: string; avatars: string[] }
    | undefined;
  const fallbackScore = (SITE_TOP as { ratingValue?: string }).ratingValue ?? "4.9";
  const fallbackLabel =
    (SITE_TOP as { ratingCount?: string }).ratingCount != null
      ? `Backed by ${String((SITE_TOP as { ratingCount?: string }).ratingCount)} homeowner reviews`
      : "Highly rated by local homeowners";

  const displayScore = ratingCard?.score ?? fallbackScore;
  const displayLabel = ratingCard?.countLabel ?? fallbackLabel;
  const displayAvatars =
    ratingCard?.avatars && ratingCard.avatars.length > 0 ? ratingCard.avatars : [...DEFAULT_RATING_AVATARS];
  const ratingQuote =
    String((HOME_HERO as { ratingQuote?: string }).ratingQuote ?? "").trim() ||
    "Straight answers on the estimate, crews that cleaned up nightly, and a roof that survived the last wind season.";
  const showReviewPedestal =
    ratingCard != null ||
    Boolean((SITE_TOP as { ratingValue?: string }).ratingValue) ||
    Boolean((SITE_TOP as { ratingCount?: string }).ratingCount);
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--primary))] text-white">
      {/* Background image */}
      {HOME_HERO.image && (
        <>
          <img
            src={HOME_HERO.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary))]/85 to-[hsl(var(--primary))]/30"
          />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            {HOME_HERO.eyebrow && (
              <span className="inline-block text-[hsl(var(--secondary))] text-sm font-bold tracking-[0.18em] uppercase">
                {HOME_HERO.eyebrow}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight uppercase leading-[1.05]">
              {HOME_HERO.headlineBefore}
              {HOME_HERO.headlineHighlight && (
                <>
                  {" "}
                  <span className="block lg:inline">
                    {HOME_HERO.headlineHighlight}
                  </span>
                </>
              )}
              {HOME_HERO.headlineAfter && (
                <span className="block">{HOME_HERO.headlineAfter}</span>
              )}
            </h1>
            <p className="text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
              {HOME_HERO.body}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-bold uppercase tracking-wide rounded-md px-6 py-6 text-base shadow-lg shadow-black/20"
              >
                <Link to={HOME_HERO.primaryCta?.to || "/contact"}>
                  {HOME_HERO.primaryCta?.label || "Get Free Estimate"}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-white/40 text-white hover:bg-white/10 font-bold uppercase tracking-wide rounded-md px-6 py-6 text-base"
              >
                <a href={phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  {HOME_HERO.secondaryCta?.label || "Call Now"}
                </a>
              </Button>
            </div>

            {trustPills && trustPills.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-xl">
                {trustPills.map(pill => {
                  const Icon = iconMap[pill.icon] || Calendar;
                  return (
                    <div
                      key={pill.label}
                      className="flex items-start gap-2.5 rounded-md"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--secondary))]/15 ring-1 ring-[hsl(var(--secondary))]/30">
                        <Icon className="h-4 w-4 text-[hsl(var(--secondary))]" />
                      </span>
                      <div className="leading-tight">
                        <span className="block text-sm font-bold">{pill.label}</span>
                        <span className="block text-xs text-white/70">{pill.sub}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {showReviewPedestal && (
            <div className="lg:col-span-5 lg:justify-self-end w-full">
              <div className="relative w-full lg:w-auto lg:max-w-[340px] pt-8">
                {/* Ridgepeak-style testimonial pedestal (distinct from Summit ribbon + Roofix slab) */}
                <div className="absolute -top-2 right-10 z-20 flex flex-col items-center">
                  <div className="flex h-[4.75rem] w-[4.75rem] flex-col items-center justify-center rounded-full border-4 border-[hsl(var(--secondary))] bg-white shadow-xl shadow-black/25">
                    <span className="text-2xl font-black text-slate-900 leading-none">{displayScore}</span>
                    <div className="mt-1 flex gap-px" aria-hidden>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-2.5 w-2.5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]"
                        />
                      ))}
                    </div>
                  </div>
                  <Medal className="h-5 w-5 text-[hsl(var(--secondary))] -mt-1 drop-shadow-sm" aria-hidden />
                </div>

                <div className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-b from-white via-white to-slate-100 px-8 pb-8 pt-12 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)]">
                  <Quote
                    className="absolute left-6 top-6 h-14 w-14 text-[hsl(var(--secondary))]/25"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <div className="relative text-center mt-6">
                    <p className="text-[11px] font-black tracking-[0.2em] text-slate-500 uppercase mb-2">
                      Proudly serving our neighbors
                    </p>
                    <p className="text-sm md:text-[15px] text-slate-700 font-semibold leading-relaxed italic">
                      &ldquo;{ratingQuote}&rdquo;
                    </p>
                    <div className="mt-5 flex justify-center gap-1" aria-hidden>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]"
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-xs font-bold text-slate-500">{displayLabel}</p>
                  </div>
                  <div className="mt-6 flex justify-center -space-x-2 pt-6 border-t border-slate-200/90">
                    {displayAvatars.map((src, i) => (
                      <img
                        key={src + i}
                        src={src}
                        alt=""
                        className="h-11 w-11 rounded-full border-[3px] border-white shadow-md object-cover ring-2 ring-slate-200/80"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
