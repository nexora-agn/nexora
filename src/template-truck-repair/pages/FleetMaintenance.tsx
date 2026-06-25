import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Layout from "@template-truck-repair/components/layout/Layout";
import ServiceRequestForm from "@template-truck-repair/components/service/ServiceRequestForm";
import { FLEET_PROGRAM } from "@template-truck-repair/data/siteData";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";

const FleetMaintenance = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Fleet Maintenance Programs | {COMPANY.name}</title>
        <meta name="description" content="Monthly fleet maintenance contracts, priority service lanes, and dedicated account management for commercial trucking companies." />
      </Helmet>

      <section className="relative pt-28 pb-16 bg-[hsl(var(--primary))] text-white">
        <img src={FLEET_PROGRAM.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="container-custom container-inset relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="industrial-eyebrow text-[hsl(var(--secondary))] mb-3">B2B Fleet Programs</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">{FLEET_PROGRAM.title}</h1>
            <p className="text-white/75 mb-8">{FLEET_PROGRAM.subtitle}</p>
            <ul className="space-y-3">
              {FLEET_PROGRAM.benefits.map(b => (
                <li key={b} className="flex gap-3 text-sm text-white/80">
                  <Check className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />{b}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/20 p-6">
            <h2 className="font-display text-xl text-white mb-4">Request Fleet Quote</h2>
            <ServiceRequestForm />
          </div>
        </div>
      </section>

      <section className="industrial-section text-center">
        <div className="container-custom container-inset max-w-2xl">
          <h2 className="industrial-heading mb-4">Dedicated Fleet Account Management</h2>
          <p className="text-muted-foreground mb-8">
            Fleet clients get a single point of contact, digital service history, scheduled PM reminders, and priority lanes at every location.
          </p>
          <Link to="/contact" className="btn-industrial-primary">Contact Fleet Sales</Link>
        </div>
      </section>
    </Layout>
  );
};

export default FleetMaintenance;
