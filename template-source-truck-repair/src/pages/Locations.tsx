import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Truck } from "lucide-react";
import Layout from "@template-truck-repair/components/layout/Layout";
import { LOCATIONS, TRUCK_IMAGES, MAP_EMBED_URL } from "@template-truck-repair/data/siteData";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";

const Locations = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Service Locations | {COMPANY.name}</title>
        <meta name="description" content="Heavy-duty truck repair facilities in Dallas, Fort Worth, and Houston with mobile repair units." />
      </Helmet>

      <section className="relative pt-28 pb-12 bg-[hsl(var(--primary))] text-white">
        <img src={TRUCK_IMAGES.locationsHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="container-custom container-inset relative">
          <p className="industrial-eyebrow text-[hsl(var(--secondary))] mb-3">Service Network</p>
          <h1 className="font-display text-4xl md:text-5xl">Our Locations</h1>
        </div>
      </section>

      <section className="industrial-section">
        <div className="container-custom container-inset">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {LOCATIONS.map(loc => (
              <article key={loc.id} className="card-industrial p-6">
                <h2 className="font-display text-xl text-[hsl(var(--primary))] mb-3">{loc.name}</h2>
                <p className="flex gap-2 text-sm text-muted-foreground mb-2"><MapPin className="h-4 w-4 shrink-0 text-[hsl(var(--secondary))]" />{loc.address}</p>
                <p className="flex gap-2 text-sm text-muted-foreground mb-2"><Phone className="h-4 w-4 shrink-0 text-[hsl(var(--secondary))]" />{loc.phone}</p>
                <p className="flex gap-2 text-sm text-muted-foreground mb-4"><Truck className="h-4 w-4 shrink-0 text-[hsl(var(--secondary))]" />{loc.bays} bays · {loc.mobileUnits} mobile units</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{loc.hours}</p>
              </article>
            ))}
          </div>
          <div className="aspect-[16/7] border border-border overflow-hidden">
            <iframe title="Service area map" src={MAP_EMBED_URL} className="w-full h-full border-0" loading="lazy" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
