import { Link } from "react-router-dom";
import {
  Phone,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";

/**
 * Nexora (bold local contractor) — left-aligned blocky hero anchored by
 * a GIANT click-to-call button. No floating Google rating card. Instead a
 * vertical badge column on the right with stacked trust pills and a small
 * inset photo. Background is light with bright orange chunks, not a dark
 * full-bleed image. Intentionally loud and CTA-first.
 */
const HomeHero = () => {
  const { homeHero: HOME_HERO, company: COMPANY, siteTop: SITE_TOP } =
    useSiteContent();

  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const ratingValue =
    (SITE_TOP as { ratingValue?: string }).ratingValue || "4.9";
  const ratingCount =
    (SITE_TOP as { ratingCount?: string }).ratingCount || "500+ Reviews";

  return (
    <section className="relative overflow-hidden bg-background border-b-[6px] border-secondary">
      {/* Bright orange diagonal slab */}
      <div
        aria-hidden
        className="absolute -right-10 -top-16 w-[55%] h-[120%] bg-secondary/95"
        style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }}
      />
      {/* Soft pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, hsl(var(--primary)) 0 1px, transparent 1px 14px)",
        }}
      />

      <div className="container-custom relative px-4 md:px-8 pt-10 md:pt-16 pb-14 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left — pill, headline, GIANT call button */}
          <div className="lg:col-span-7">
            <span className="tpl-tag">
              <Zap className="h-3 w-3" />
              24/7 Emergency Service
            </span>

            <h1 className="mt-5 text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] text-primary">
              {HOME_HERO.headlineBefore}
              <br />
              <span className="text-secondary">
                {HOME_HERO.headlineHighlight}
              </span>
              {HOME_HERO.headlineAfter && (
                <>
                  <br />
                  <span className="text-primary/85">
                    {HOME_HERO.headlineAfter}
                  </span>
                </>
              )}
            </h1>

            <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/75 leading-relaxed">
              {HOME_HERO.body}
            </p>

            {/* GIANT click-to-call — dominates the hero */}
            <a
              href={cleanPhone ? `tel:${cleanPhone}` : "#"}
              className="mt-8 inline-flex items-stretch group rounded-[var(--radius)] overflow-hidden tpl-raised"
            >
              <span className="flex items-center gap-3 px-5 md:px-6 bg-primary text-primary-foreground">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Phone className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-[10px] tracking-[0.22em] uppercase font-bold text-secondary">
                    Tap to call now
                  </span>
                  <span className="block text-2xl md:text-3xl font-bold">
                    {COMPANY.phone}
                  </span>
                </span>
              </span>
              <span className="hidden sm:flex items-center px-6 bg-secondary text-secondary-foreground font-bold uppercase tracking-[0.14em] text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Talk to a roofer
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </a>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-foreground/75">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-secondary" /> No-obligation quote
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-secondary" /> Most calls back in 15 min
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-secondary" /> We work with your insurance
              </span>
            </div>

            <div className="mt-8">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-[var(--radius)] h-12 px-6 text-sm font-bold uppercase tracking-[0.16em] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to={HOME_HERO.primaryCta.to}>
                  {HOME_HERO.primaryCta.label || "Get a Free Estimate"}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right — stacked vertical badge column + tilted photo */}
          <aside className="lg:col-span-5 relative">
            <div className="relative">
              <img
                src={HOME_HERO.image}
                alt={HOME_HERO.featuredTitle || COMPANY.name}
                className="block w-full h-[420px] md:h-[520px] object-cover rounded-[var(--radius)] tpl-raised rotate-[1.5deg]"
                loading="eager"
              />
              {/* Yellow-orange rating sticker */}
              <div className="absolute -bottom-5 -left-3 md:-left-6 rounded-full bg-primary text-primary-foreground px-5 py-3 flex items-center gap-3 tpl-raised">
                <div className="flex flex-col items-center leading-none">
                  <span className="text-2xl font-bold text-secondary">
                    {ratingValue}
                  </span>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-2.5 w-2.5 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                </div>
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/70 font-bold">
                    Google rating
                  </p>
                  <p className="text-xs font-bold">{ratingCount}</p>
                </div>
              </div>
            </div>

            {/* Stacked badge column */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Licensed & Insured",
                  sub: "Full coverage on every job",
                },
                {
                  icon: Clock,
                  title: "Same-day Repairs",
                  sub: "Most leaks fixed in hours",
                },
              ].map(({ icon: Icon, title, sub }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-[var(--radius)] border-2 border-primary/10 bg-card p-4 tpl-raised"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary shrink-0">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[15px] font-bold text-primary">
                      {title}
                    </p>
                    <p className="text-xs text-foreground/70 mt-1">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
