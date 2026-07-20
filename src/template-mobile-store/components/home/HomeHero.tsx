import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import Reveal from "@template-mobile-store/components/animations/Reveal";

const HomeHero = () => {
  const { homeHero } = useSiteContent();

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[hsl(var(--primary))]">
      <img
        src={homeHero.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/45"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/25" aria-hidden />

      <div className="relative container-custom container-inset pt-28 pb-24 sm:pt-32 lg:pt-36 lg:pb-32 max-w-3xl">
        <Reveal direction="up" duration={600}>
          <p className="tech-eyebrow text-[hsl(var(--secondary))] mb-4">{homeHero.eyebrow}</p>
        </Reveal>
        <Reveal direction="up" delay={100} duration={700}>
          <h1 className="font-sans-brand text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-white mb-6">
            {homeHero.headlineBefore}{" "}
            <span className="text-[hsl(var(--secondary))]">{homeHero.headlineHighlight}</span>
            {homeHero.headlineAfter ? ` ${homeHero.headlineAfter}` : ""}
          </h1>
        </Reveal>
        <Reveal direction="up" delay={200} duration={700}>
          <p className="max-w-xl text-base md:text-lg text-white/85 font-normal leading-relaxed mb-10">
            {homeHero.body}
          </p>
        </Reveal>
        <Reveal direction="up" delay={300} duration={700}>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              to={homeHero.primaryCta.to}
              className="inline-flex items-center justify-center h-12 px-8 bg-[hsl(var(--secondary))] text-white font-sans-brand text-xs font-semibold uppercase tracking-[0.16em] hover:brightness-110 transition-all"
            >
              {homeHero.primaryCta.label}
            </Link>
            <Link
              to={homeHero.secondaryCta.to}
              className="inline-flex items-center justify-center h-12 px-8 border border-white/40 text-white font-sans-brand text-xs font-semibold uppercase tracking-[0.16em] hover:border-white hover:bg-white/10 transition-all"
            >
              {homeHero.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-5 w-5 scroll-indicator" />
      </div>
    </section>
  );
};

export default HomeHero;
