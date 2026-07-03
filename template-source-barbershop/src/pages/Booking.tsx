import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import BookingForm from "@template-barbershop/components/booking/BookingForm";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { BARBERSHOP_IMAGES, COMPANY } from "@template-barbershop/data/siteData";

const FEATURES = [
  "Live availability, updated instantly",
  "Instant email confirmation",
  "Free rescheduling up to 4 hours ahead",
  "Reminder texts & emails before your visit",
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const presetServiceId = searchParams.get("service") || undefined;
  const presetBarberId = searchParams.get("barber") || undefined;

  return (
    <Layout>
      <Helmet>
        <title>Book Appointment | {COMPANY.name}</title>
        <meta name="description" content="Book your appointment online in under a minute — choose your barber, service, date, and time." />
      </Helmet>

      <PageHeader eyebrow="Book Online" title="Book Your Appointment" subtitle="Choose your barber, service, and time — confirmed instantly." image={BARBERSHOP_IMAGES.chairs} variant="compact" />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <Reveal direction="right">
            <p className="luxury-eyebrow mb-4">Why Book Online</p>
            <h2 className="luxury-heading !text-3xl md:!text-4xl">A Faster, Easier Way to Book</h2>
            <ul className="mt-8 space-y-4">
              {FEATURES.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 border border-border bg-[hsl(var(--muted))] p-5">
              <p className="text-sm text-muted-foreground">
                Need to change or cancel an existing appointment? <a href="#/booking/manage" className="text-[hsl(var(--secondary))] font-semibold">Manage your booking here.</a>
              </p>
            </div>
          </Reveal>
          <Reveal direction="left" delay={100}>
            <BookingForm variant="full" presetServiceId={presetServiceId} presetBarberId={presetBarberId} />
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
