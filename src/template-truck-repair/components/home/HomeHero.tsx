import { Link } from "react-router-dom";
import { ChevronDown, Phone } from "lucide-react";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import Reveal from "@template-truck-repair/components/animations/Reveal";

const HomeHero = () => {
  const { homeHero, company: COMPANY } = useSiteContent();
  const emergencyHref = `tel:${(COMPANY.emergencyPhone || COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <section className="relative min-h-[85vh] flex items-center">
      <img src={homeHero.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/90 via-[hsl(var(--primary))]/70 to-transparent" />
      <div className="relative container-custom container-inset py-32 pt-36 sm:pt-40">
        <Reveal direction="up">
          <p className="industrial-eyebrow text-white/90 mb-4">{homeHero.eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-[1.05] mb-6 max-w-3xl">
            {homeHero.headlineBefore}{" "}
            <span className="text-[hsl(var(--secondary))]">{homeHero.headlineHighlight}</span>
          </h1>
          <p className="text-lg text-white/85 max-w-xl mb-10 leading-relaxed">{homeHero.body}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={homeHero.primaryCta.to} className="btn-industrial-hero-primary">{homeHero.primaryCta.label}</Link>
            <Link to={homeHero.secondaryCta.to} className="btn-industrial-hero-secondary">{homeHero.secondaryCta.label}</Link>
          </div>
          <a href={emergencyHref} className="inline-flex items-center gap-2 mt-8 text-white/80 hover:text-[hsl(var(--secondary))] text-sm font-semibold uppercase tracking-wider transition-colors">
            <Phone className="h-4 w-4" /> Emergency: {COMPANY.emergencyPhone || COMPANY.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default HomeHero;
