import { Link } from "react-router-dom";
import { Phone, AlertTriangle } from "lucide-react";
import ServiceRequestForm from "@template-truck-repair/components/service/ServiceRequestForm";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import Reveal from "@template-truck-repair/components/animations/Reveal";

const EmergencyBreakdownSection = () => {
  const { company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.emergencyPhone || "").replace(/[^+\d]/g, "")}`;

  return (
    <section className="industrial-section bg-[hsl(var(--primary))] text-white" id="emergency">
      <div className="container-custom container-inset">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-[hsl(var(--secondary))]" />
              <p className="industrial-eyebrow text-[hsl(var(--secondary))]">24/7 Emergency Dispatch</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6">Truck Down? We Respond Fast.</h2>
            <p className="text-white/75 leading-relaxed mb-8">
              Submit an emergency breakdown request with GPS location, or call dispatch directly.
              Average emergency ETA: 45 minutes in the Dallas metro.
            </p>
            <a href={phoneHref} className="btn-industrial-hero-primary inline-flex items-center gap-2 mb-8">
              <Phone className="h-4 w-4" /> Call {COMPANY.emergencyPhone}
            </a>
            <ul className="space-y-3 text-sm text-white/70">
              <li>• GPS location capture for faster dispatch</li>
              <li>• Mobile repair units on standby 24/7</li>
              <li>• Real-time ETA and technician assignment</li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <ServiceRequestForm emergency />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EmergencyBreakdownSection;
