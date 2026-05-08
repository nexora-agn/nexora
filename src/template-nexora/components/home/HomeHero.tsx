import { Link } from "react-router-dom";
import { ArrowRight, Phone, Calendar, Tag, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";

const iconMap = { Calendar, Tag, ShieldCheck } as const;

const HomeHero = () => {
  const { homeHero: HOME_HERO, company: COMPANY } = useSiteContent();
  const trustPills = (HOME_HERO as any).trustPills as
    | { label: string; sub: string; icon: keyof typeof iconMap }[]
    | undefined;
  const ratingCard = (HOME_HERO as any).ratingCard as
    | { score: string; countLabel: string; avatars: string[] }
    | undefined;
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

          {/* Floating rating card */}
          {ratingCard && (
            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="relative inline-flex w-full lg:w-auto lg:max-w-sm">
                <div className="bg-white rounded-xl shadow-2xl p-5 w-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-slate-100 shadow-inner">
                      <span className="text-[15px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">G</span>
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl font-extrabold text-slate-900 leading-none">
                          {ratingCard.score}
                        </span>
                        <span className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]"
                            />
                          ))}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium block mt-0.5">
                        {ratingCard.countLabel}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex -space-x-2">
                    {ratingCard.avatars.map((src, i) => (
                      <img
                        key={src + i}
                        src={src}
                        alt=""
                        className="h-9 w-9 rounded-full border-2 border-white object-cover"
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
