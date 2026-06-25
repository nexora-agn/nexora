import { Helmet } from "react-helmet-async";
import Layout from "@template-truck-repair/components/layout/Layout";
import ServiceRequestForm from "@template-truck-repair/components/service/ServiceRequestForm";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { TRUCK_IMAGES, LEAD_FORM } from "@template-truck-repair/data/siteData";

const RequestService = () => {
  const { company: COMPANY, leadForm } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Request Service | {COMPANY.name}</title>
        <meta name="description" content={leadForm.description} />
      </Helmet>

      <section className="relative pt-28 pb-12 bg-[hsl(var(--primary))] text-white">
        <img src={TRUCK_IMAGES.servicesHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="container-custom container-inset relative">
          <p className="industrial-eyebrow text-[hsl(var(--secondary))] mb-3">{LEAD_FORM.title}</p>
          <h1 className="font-display text-4xl md:text-5xl mb-3">Submit a Service Request</h1>
          <p className="text-white/75 max-w-xl">{leadForm.subtitle}</p>
        </div>
      </section>

      <section className="industrial-section">
        <div className="container-custom container-inset max-w-3xl">
          <ServiceRequestForm />
        </div>
      </section>
    </Layout>
  );
};

export default RequestService;
