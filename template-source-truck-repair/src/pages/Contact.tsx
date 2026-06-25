import { Helmet } from "react-helmet-async";
import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Layout from "@template-truck-repair/components/layout/Layout";
import ServiceRequestForm from "@template-truck-repair/components/service/ServiceRequestForm";
import { TRUCK_IMAGES, MAP_EMBED_URL } from "@template-truck-repair/data/siteData";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const { company: COMPANY, officeHours } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const emergencyHref = `tel:${(COMPANY.emergencyPhone || "").replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${COMPANY.email || ""}`;
  const fleetHref = `mailto:${COMPANY.fleetEmail || COMPANY.email}`;

  const onFleetInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Fleet inquiry received. An account manager will contact you within one business day.");
      (event.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact & Service Request | {COMPANY.name}</title>
        <meta name="description" content={`Contact ${COMPANY.name} for truck repair, fleet maintenance, and 24/7 emergency dispatch.`} />
      </Helmet>

      <section className="relative pt-28 pb-12 bg-[hsl(var(--primary))] text-white">
        <img src={TRUCK_IMAGES.contactHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="container-custom container-inset relative">
          <p className="industrial-eyebrow text-[hsl(var(--secondary))] mb-3">Contact</p>
          <h1 className="font-display text-4xl md:text-5xl mb-3">Get In Touch</h1>
          <p className="text-white/75 max-w-xl">Service requests, fleet inquiries, and emergency dispatch — we&apos;re here 24/7.</p>
        </div>
      </section>

      <section className="industrial-section">
        <div className="container-custom container-inset grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl text-[hsl(var(--primary))] mb-6">Dispatch & Contact</h2>
            <ul className="space-y-5 mb-8">
              <li>
                <a href={emergencyHref} className="flex gap-3 text-red-600 font-bold hover:underline">
                  <Phone className="h-5 w-5 shrink-0" />
                  <span>Emergency: {COMPANY.emergencyPhone}</span>
                </a>
              </li>
              <li className="flex gap-3 text-muted-foreground"><Phone className="h-5 w-5 shrink-0 text-[hsl(var(--secondary))]" /><a href={phoneHref} className="hover:text-[hsl(var(--primary))]">{COMPANY.phone}</a></li>
              <li className="flex gap-3 text-muted-foreground"><Mail className="h-5 w-5 shrink-0 text-[hsl(var(--secondary))]" /><a href={mailHref} className="hover:text-[hsl(var(--primary))]">{COMPANY.email}</a></li>
              <li className="flex gap-3 text-muted-foreground"><MessageCircle className="h-5 w-5 shrink-0 text-[hsl(var(--secondary))]" /><span>SMS/WhatsApp: {COMPANY.phone}</span></li>
              <li className="flex gap-3 text-muted-foreground"><MapPin className="h-5 w-5 shrink-0 text-[hsl(var(--secondary))]" />{COMPANY.address}</li>
            </ul>
            <h3 className="font-display text-lg text-[hsl(var(--primary))] mb-3">Business Hours</h3>
            <ul className="space-y-2 mb-8">
              {officeHours.map(row => (
                <li key={row.days} className="flex gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                  <span><strong className="text-[hsl(var(--primary))]">{row.days}</strong> — {row.hours}</span>
                </li>
              ))}
            </ul>
            <div className="aspect-video border border-border overflow-hidden">
              <iframe title="Location map" src={MAP_EMBED_URL} className="w-full h-full border-0" loading="lazy" />
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl text-[hsl(var(--primary))] mb-4">Service Request</h2>
              <ServiceRequestForm />
            </div>

            <div className="border border-border p-6 bg-[hsl(var(--muted))]">
              <h2 className="font-display text-xl text-[hsl(var(--primary))] mb-2">Fleet Inquiry</h2>
              <p className="text-sm text-muted-foreground mb-4">Commercial fleet accounts — contact <a href={fleetHref} className="text-[hsl(var(--secondary))] font-semibold">{COMPANY.fleetEmail}</a></p>
              <form onSubmit={onFleetInquiry} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label className="text-xs uppercase tracking-wider">Company</Label><Input required className="rounded-none mt-1" name="company" /></div>
                  <div><Label className="text-xs uppercase tracking-wider">Fleet Size</Label><Input required className="rounded-none mt-1" name="fleetSize" placeholder="e.g. 45 units" /></div>
                </div>
                <div><Label className="text-xs uppercase tracking-wider">Contact Name</Label><Input required className="rounded-none mt-1" name="name" /></div>
                <div><Label className="text-xs uppercase tracking-wider">Email</Label><Input required type="email" className="rounded-none mt-1" name="email" /></div>
                <div><Label className="text-xs uppercase tracking-wider">Message</Label><Textarea className="rounded-none mt-1 min-h-[100px]" name="message" placeholder="Tell us about your fleet maintenance needs..." /></div>
                <Button type="submit" disabled={submitting} className="rounded-none w-full bg-[hsl(var(--secondary))] hover:brightness-110 uppercase text-xs tracking-wider">
                  {submitting ? "Sending..." : "Submit Fleet Inquiry"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
