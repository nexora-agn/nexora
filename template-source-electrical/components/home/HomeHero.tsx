import { Link } from "react-router-dom";
import { ArrowRight, Phone, ShieldCheck, BadgeCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ELECTRICAL_IMAGES } from "@/data/siteData";

const LICENSE_BADGES = [
  { icon: ShieldCheck, label: "Licensed" },
  { icon: BadgeCheck, label: "Insured" },
  { icon: Zap, label: "Master Electrician" },
] as const;

const HomeHero = () => {
  const { homeHero: HOME_HERO, company: COMPANY, siteTop: SITE_TOP } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const heroImage =
    HOME_HERO.image ||
    resolveServiceImage("emergency-electrical", ELECTRICAL_IMAGES.heroElectrician);

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--primary))]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] lg:min-h-[580px]">
        {/* Left dark panel */}
        <div className="relative z-10 flex flex-col justify-center px-4 sm:px-6 lg:px-10 xl:px-14 py-12 lg:py-16 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[hsl(var(--primary))] lg:bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--primary))] to-[hsl(var(--volt-dark-panel))]"
          />
          <div className="relative max-w-xl">
            {HOME_HERO.eyebrow && (
              <span className="inline-block text-[hsl(var(--secondary))] text-xs sm:text-sm font-bold tracking-[0.22em] uppercase font-display mb-4">
                {HOME_HERO.eyebrow}
              </span>
            )}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold uppercase leading-[0.95] tracking-wide">
              {HOME_HERO.headlineBefore}
              {HOME_HERO.headlineHighlight && (
                <>
                  {" "}
                  <span className="text-[hsl(var(--secondary))]">{HOME_HERO.headlineHighlight}</span>
                </>
              )}
              {HOME_HERO.headlineAfter && (
                <span className="block mt-1">{HOME_HERO.headlineAfter}</span>
              )}
            </h1>
            <p className="mt-5 text-sm sm:text-base text-white/75 leading-relaxed max-w-md">
              {HOME_HERO.body}
            </p>

            {/* Emergency phone CTA — large */}
            <a
              href={phoneHref}
              className="mt-8 inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 group"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] volt-glow shrink-0">
                <Phone className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--secondary))] font-semibold">
                  {SITE_TOP.line || "24/7 Emergency Service"}
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-wide group-hover:text-[hsl(var(--secondary))] transition-colors">
                  {COMPANY.phone}
                </span>
              </span>
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase tracking-wider rounded-sm px-6"
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
                className="border-white/25 bg-transparent text-white hover:bg-white/10 font-display font-bold uppercase tracking-wider rounded-sm"
              >
                <Link to={HOME_HERO.secondaryCta?.to || "/services"}>
                  {HOME_HERO.secondaryCta?.label || "View Services"}
                </Link>
              </Button>
            </div>

            {/* Licensed badges */}
            <div className="mt-10 flex flex-wrap gap-3">
              {LICENSE_BADGES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider"
                >
                  <Icon className="h-4 w-4 text-[hsl(var(--secondary))]" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right image — diagonal clip */}
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full order-first lg:order-last">
          <img
            src={heroImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover volt-clip-diagonal"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/80 via-transparent to-transparent lg:bg-gradient-to-l from-transparent via-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/70 volt-clip-diagonal"
          />
          <div className="absolute bottom-6 left-6 lg:left-auto lg:right-8 lg:bottom-10 max-w-[220px] rounded-sm border border-[hsl(var(--secondary))]/40 bg-[hsl(var(--primary))]/90 backdrop-blur-sm p-4 text-white">
            <span className="font-display text-3xl font-bold text-[hsl(var(--secondary))]">
              {(SITE_TOP as { ratingValue?: string }).ratingValue || "4.9"}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-white/60 mt-1">
              {(SITE_TOP as { ratingCount?: string }).ratingCount || "250+"}{" "}
              {(SITE_TOP as { ratingLabel?: string }).ratingLabel || "Reviews"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
