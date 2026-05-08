import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import Layout from "@template-nexora/components/layout/Layout";
import NexoraPageHero from "@template-nexora/components/sections/NexoraPageHero";
import LeadContactSection from "@template-nexora/components/home/LeadContactSection";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";
import { SERVICE_AREAS } from "@template-nexora/data/siteData";
import { Button } from "@/components/ui/button";

const ServiceAreas = () => {
  const { company: COMPANY, mapEmbedUrl, siteTop: SITE_TOP } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <Layout>
      <Helmet>
        <title>Service Areas | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} serves homeowners across North Texas including ${SERVICE_AREAS.slice(0, 4).join(", ")}. Schedule a free inspection.`}
        />
      </Helmet>

      <NexoraPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Service Areas" }]}
        title="Areas We Serve"
        eyebrowAfter="North Texas Roofing Crews"
        body={`From emergency tarping to full replacements, our crews roll deep across the Metroplex. Same honest pricing and workmanship warranty — ${SITE_TOP.locations || "Frisco · McKinney · Plano · Allen"}.`}
        image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&h=900&fit=crop"
        badges={
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-bold">
              <MapPin className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
              Dispatch daily across DFW
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-bold">
              Free on-site estimates
            </span>
          </div>
        }
      />

      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_AREAS.map(area => (
              <div
                key={area}
                className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-3.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold uppercase tracking-wide text-[hsl(var(--primary))]">{area}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[hsl(var(--secondary))] mb-1">
                Outside these cities?
              </p>
              <p className="text-sm text-slate-600">
                Call us — we often mobilize for hail corridors and multi-home neighborhoods nearby.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-[hsl(var(--primary))] font-bold uppercase">
                <Link to="/contact">
                  Request service <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="font-bold uppercase border-[hsl(var(--primary))] text-[hsl(var(--primary))]">
                <a href={phoneHref}>
                  <Phone className="mr-1.5 h-4 w-4" />
                  Call now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {mapEmbedUrl ? (
        <section className="bg-slate-50 py-12 lg:py-16 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[hsl(var(--primary))] mb-6 text-center">
              Find us on the map
            </h2>
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md aspect-[21/9] min-h-[260px] bg-slate-200">
              <iframe title="Service area map" src={mapEmbedUrl} className="w-full h-full border-0" loading="lazy" />
            </div>
          </div>
        </section>
      ) : null}

      <LeadContactSection />
    </Layout>
  );
};

export default ServiceAreas;
