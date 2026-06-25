import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import Reveal from "@template-truck-repair/components/animations/Reveal";
import { RESTAURANT_IMAGES } from "@template-truck-repair/data/siteData";

const RestaurantCTA = () => {
  const { company: COMPANY, leadForm } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <img src={RESTAURANT_IMAGES.bar} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/65" />
      <div className="container-custom container-inset relative text-center text-white">
        <Reveal>
          <p className="text-[11px] font-sans-brand font-medium uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-4">
            {leadForm.eyebrow || "Join Us Tonight"}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            Reserve Your Table Today
          </h2>
          <p className="max-w-xl mx-auto text-white/80 leading-relaxed mb-10">
            {leadForm.body || "Experience exceptional cuisine in an atmosphere of timeless elegance."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/reservations" className="btn-luxury-hero-primary min-w-[220px]">
              Reserve Now
            </Link>
            <a href={phoneHref} className="btn-luxury-hero-secondary min-w-[220px] inline-flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" /> Call Restaurant
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default RestaurantCTA;
