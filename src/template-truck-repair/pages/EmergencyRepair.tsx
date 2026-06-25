import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Layout from "@template-truck-repair/components/layout/Layout";
import ServiceRequestForm from "@template-truck-repair/components/service/ServiceRequestForm";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { TRUCK_IMAGES } from "@template-truck-repair/data/siteData";

const EmergencyRepair = () => {
  const { company: COMPANY } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.emergencyPhone || "").replace(/[^+\d]/g, "")}`;

  return (
    <Layout>
      <Helmet>
        <title>24/7 Emergency Truck Repair | {COMPANY.name}</title>
        <meta name="description" content="Emergency breakdown support for semi trucks and commercial fleets. GPS dispatch, mobile repair units, 45-min avg ETA." />
      </Helmet>

      <section className="relative pt-28 pb-16 bg-[hsl(var(--primary))] text-white">
        <img src={TRUCK_IMAGES.emergencyHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="container-custom container-inset relative">
          <p className="industrial-eyebrow text-[hsl(var(--secondary))] mb-3">24/7 Dispatch</p>
          <h1 className="font-display text-4xl md:text-5xl mb-4">Emergency Breakdown Support</h1>
          <p className="text-white/75 max-w-xl mb-6">Truck down on the highway? Submit an emergency request or call dispatch now.</p>
          <a href={phoneHref} className="btn-industrial-hero-primary inline-flex items-center gap-2">
            <Phone className="h-4 w-4" /> Call {COMPANY.emergencyPhone}
          </a>
        </div>
      </section>

      <section className="industrial-section">
        <div className="container-custom container-inset max-w-3xl">
          <ServiceRequestForm emergency />
          <p className="text-center text-sm text-muted-foreground mt-6">
            Prefer to schedule non-emergency service? <Link to="/request-service" className="text-[hsl(var(--secondary))] font-semibold hover:underline">Standard request form</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default EmergencyRepair;
