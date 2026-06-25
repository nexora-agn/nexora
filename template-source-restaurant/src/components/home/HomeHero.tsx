import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import Reveal from "@template-restaurant/components/animations/Reveal";

const HomeHero = () => {
  const { homeHero } = useSiteContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={homeHero.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      <div className="relative container-custom container-inset text-center text-white pt-32 pb-40">
        <Reveal direction="up" duration={600}>
          <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-6">{homeHero.eyebrow}</p>
        </Reveal>
        <Reveal direction="up" delay={100} duration={700}>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.05] mb-8">
            {homeHero.headlineBefore}{" "}
            <span className="italic text-[hsl(var(--secondary))]">{homeHero.headlineHighlight}</span>
          </h1>
        </Reveal>
        <Reveal direction="up" delay={200} duration={700}>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/85 font-light leading-relaxed mb-12">
            {homeHero.body}
          </p>
        </Reveal>
        <Reveal direction="up" delay={300} duration={700}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={homeHero.primaryCta.to} className="btn-luxury-hero-primary">
              {homeHero.primaryCta.label}
            </Link>
            <Link to={homeHero.secondaryCta.to} className="btn-luxury-hero-secondary">
              {homeHero.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-5 w-5 scroll-indicator" />
      </div>
    </section>
  );
};

export default HomeHero;
