import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";

const iconMap = { ShieldCheck, Award, Users, BadgeCheck };

/**
 * Roofix (sleek premium metallic) — full-section dark metallic hero.
 * NO image hero (intentional: the only template with no photographic hero
 * background). Instead a 3-stop radial gradient + grid pattern. Left side
 * has a gradient-text headline and a single squared CTA. Right side is a
 * bento-grid of glass cards showing live stats and credentials.
 */
const HomeHero = () => {
  const { homeHero: HOME_HERO } = useSiteContent();

  const trustPills =
    (HOME_HERO as { trustPills?: { id: string; label: string; sub: string; icon: keyof typeof iconMap }[] })
      .trustPills ?? [];

  return (
    <section className="relative isolate tpl-metallic text-white overflow-hidden">
      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* Subtle moving glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, hsl(217 91% 60% / 0.55), transparent 60%)",
        }}
      />

      <div className="container-custom relative px-4 md:px-8 pt-20 md:pt-28 pb-20 md:pb-32">
        {/* Eyebrow chip */}
        <div className="inline-flex items-center gap-2 rounded-full tpl-glass px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase">
          <Sparkles className="h-3.5 w-3.5 text-secondary" />
          {(HOME_HERO as { eyebrow?: string }).eyebrow ||
            "Premium Roofing — Built To Last"}
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          {/* Headline + CTA */}
          <div className="lg:col-span-7">
            <h1
              className="text-5xl md:text-6xl lg:text-[88px] font-bold leading-[0.95] tracking-[-0.02em]"
              style={{ fontFamily: "var(--tpl-font-display)" }}
            >
              {HOME_HERO.headlineBefore}
              <br />
              <span className="tpl-gradient-text">
                {HOME_HERO.headlineHighlight}
              </span>
              {HOME_HERO.headlineAfter && (
                <>
                  <br />
                  <span className="text-white/85">
                    {HOME_HERO.headlineAfter}
                  </span>
                </>
              )}
            </h1>

            <div className="tpl-rule-gradient mt-8 w-32" />

            <p className="mt-6 max-w-xl text-base md:text-lg text-white/75 leading-relaxed">
              {HOME_HERO.body}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-[var(--radius)] h-14 px-7 text-sm font-bold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_18px_40px_-12px_hsl(217_91%_60%/0.55)] group"
              >
                <Link
                  to={HOME_HERO.primaryCta.to}
                  className="inline-flex items-center gap-2"
                >
                  {HOME_HERO.primaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Link
                to={HOME_HERO.secondaryCta.to}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors"
              >
                {HOME_HERO.secondaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Bento glass-card grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-6 gap-3">
              {/* Big spec card */}
              <div className="col-span-6 tpl-glass rounded-[var(--radius)] p-6">
                <p className="text-[10px] tracking-[0.32em] uppercase text-secondary font-bold">
                  Live · This Month
                </p>
                <p
                  className="mt-3 text-6xl md:text-7xl font-bold tpl-gradient-text leading-none"
                  style={{ fontFamily: "var(--tpl-font-display)" }}
                >
                  4.9
                </p>
                <p className="mt-3 text-xs text-white/65">
                  Average rating across 320+ verified reviews
                </p>
              </div>

              {/* Small specs */}
              <div className="col-span-3 tpl-glass rounded-[var(--radius)] p-5">
                <p className="text-[10px] tracking-[0.32em] uppercase text-white/55 font-bold">
                  Roofs Done
                </p>
                <p
                  className="mt-2 text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--tpl-font-display)" }}
                >
                  2,500+
                </p>
              </div>
              <div className="col-span-3 tpl-glass rounded-[var(--radius)] p-5">
                <p className="text-[10px] tracking-[0.32em] uppercase text-white/55 font-bold">
                  Warranty
                </p>
                <p
                  className="mt-2 text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--tpl-font-display)" }}
                >
                  Lifetime
                </p>
              </div>

              {/* Pills row */}
              {trustPills.slice(0, 2).map(pill => {
                const Icon = iconMap[pill.icon] || ShieldCheck;
                return (
                  <div
                    key={pill.id}
                    className="col-span-3 tpl-glass rounded-[var(--radius)] p-4 flex items-center gap-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary/20 text-secondary">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div className="leading-tight">
                      <p className="text-xs font-bold text-white">{pill.label}</p>
                      <p className="text-[10px] text-white/55">{pill.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
