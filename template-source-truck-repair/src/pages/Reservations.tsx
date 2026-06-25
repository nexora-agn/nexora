import { Helmet } from "react-helmet-async";
import Layout from "@template-truck-repair/components/layout/Layout";
import ReservationForm from "@template-truck-repair/components/reservation/ReservationForm";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { RESTAURANT_IMAGES, OFFICE_HOURS } from "@template-truck-repair/data/siteData";

const Reservations = () => {
  const { company: COMPANY } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Reservations | {COMPANY.name}</title>
        <meta name="description" content={`Reserve a table at ${COMPANY.name}. Instant confirmation for available times.`} />
      </Helmet>

      <section className="relative h-[40vh] min-h-[280px] flex items-end">
        <img src={RESTAURANT_IMAGES.interior} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="container-custom container-inset relative pb-10 pt-32">
          <h1 className="font-display text-4xl md:text-5xl text-white font-medium">Reservations</h1>
        </div>
      </section>

      <section className="luxury-section">
        <div className="container-custom container-inset">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="font-display text-2xl text-[hsl(var(--primary))] mb-4">Hours</h2>
                <ul className="space-y-3">
                  {OFFICE_HOURS.map(row => (
                    <li key={row.days} className="flex justify-between text-sm border-b border-border pb-2">
                      <span className="text-muted-foreground">{row.days}</span>
                      <span className="font-medium">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-2xl text-[hsl(var(--primary))] mb-4">Contact</h2>
                <p className="text-sm text-muted-foreground mb-2">{COMPANY.phone}</p>
                <p className="text-sm text-muted-foreground">{COMPANY.email}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For parties larger than 10 or private dining inquiries, please visit our{" "}
                <a href="/private-events" className="text-[hsl(var(--secondary))] underline">Private Events</a> page.
              </p>
            </div>
            <div className="lg:col-span-2">
              <ReservationForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reservations;
