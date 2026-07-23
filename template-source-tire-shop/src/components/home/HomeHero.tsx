import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import Reveal from "@template-tire-shop/components/animations/Reveal";

const HomeHero = () => {
  const { homeHero } = useSiteContent();

  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden tread-bg clip-diagonal">
      <img
        src={homeHero.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/50" aria-hidden />
      <div className="absolute inset-0 tread-bg opacity-60 pointer-events-none" aria-hidden />

      {/* Diagonal safety-yellow accent bar */}
      <div
        className="absolute top-0 right-0 w-[18%] min-w-[72px] max-w-[140px] h-full bg-[hsl(var(--secondary))] clip-diagonal-bar opacity-95"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-[hsl(var(--secondary))]"
        aria-hidden
      />

      <div className="relative container-custom container-inset pt-28 pb-28 sm:pt-32 lg:pt-40 lg:pb-36 max-w-3xl">
        <Reveal direction="up" duration={600}>
          <p className="tire-eyebrow text-[hsl(var(--secondary))] mb-4">{homeHero.eyebrow}</p>
        </Reveal>
        <Reveal direction="up" delay={100} duration={700}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight text-white mb-6">
            <span className="block">{homeHero.headlineBefore}</span>
            <span className="block text-[hsl(var(--secondary))]">{homeHero.headlineHighlight}</span>
            {homeHero.headlineAfter ? (
              <span className="block text-white/95">{homeHero.headlineAfter}</span>
            ) : null}
          </h1>
        </Reveal>
        <Reveal direction="up" delay={200} duration={700}>
          <p className="max-w-xl text-base md:text-lg text-white/80 font-sans-brand font-normal leading-relaxed mb-10">
            {homeHero.body}
          </p>
        </Reveal>
        <Reveal direction="up" delay={300} duration={700}>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link to={homeHero.primaryCta.to} className="btn-luxury-hero-primary">
              {homeHero.primaryCta.label}
            </Link>
            <Link to={homeHero.secondaryCta.to} className="btn-luxury-hero-secondary">
              {homeHero.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans-brand">Scroll</span>
        <ChevronDown className="h-5 w-5 scroll-indicator" />
      </div>
    </section>
  );
};

export default HomeHero;
