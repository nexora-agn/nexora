import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { TRUCK_IMAGES, CTA_SECTION } from "@template-truck-repair/data/siteData";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import Reveal from "@template-truck-repair/components/animations/Reveal";

const EmergencyCTA = () => {
  const { company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.emergencyPhone || "").replace(/[^+\d]/g, "")}`;

  return (
    <section className="relative py-20 overflow-hidden">
      <img src={TRUCK_IMAGES.emergencyHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[hsl(var(--primary))]/85" />
      <div className="relative container-custom container-inset text-center text-white">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl mb-8">{CTA_SECTION.headline}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={CTA_SECTION.primaryCta.to} className="btn-industrial-hero-primary">{CTA_SECTION.primaryCta.label}</Link>
            <a href={phoneHref} className="btn-industrial-hero-secondary inline-flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" /> Call Dispatch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default EmergencyCTA;
