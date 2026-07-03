import { Link } from "react-router-dom";
import { Phone, CalendarDays } from "lucide-react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { BARBERSHOP_IMAGES } from "@template-barbershop/data/siteData";

const CTASection = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <section className="relative luxury-section bg-[hsl(var(--primary))] text-white overflow-hidden">
      <img src={BARBERSHOP_IMAGES.barberAtWork} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary))]/90 to-[hsl(var(--primary))]/60" />
      <div className="relative container-custom container-inset text-center">
        <Reveal direction="zoom">
          <p className="luxury-eyebrow mb-5">Your Next Appointment</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold uppercase leading-[1.05] max-w-3xl mx-auto">
            Ready for Your Next Fresh Cut?
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="btn-luxury-hero-primary">
              <CalendarDays className="h-4 w-4 mr-2" />
              Book Appointment
            </Link>
            <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`} className="btn-luxury-hero-secondary">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTASection;
