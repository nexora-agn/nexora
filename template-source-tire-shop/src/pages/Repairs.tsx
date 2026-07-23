import { FormEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@template-tire-shop/components/layout/Layout";
import HarborPageHero from "@template-tire-shop/components/sections/HarborPageHero";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { REPAIR_SERVICES, HOME_BUILDER_IMAGES } from "@template-tire-shop/data/siteData";
import { createLead } from "@template-tire-shop/lib/dealerLeads";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Repairs = () => {
  const { company: COMPANY } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    createLead({
      type: "service",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("notes") || "Repair booking request"),
      payload: {
        service: String(fd.get("service") || ""),
        device: String(fd.get("device") || ""),
        preferredDate: String(fd.get("date") || ""),
      },
    });
    toast.success("Repair request received — we'll confirm your appointment shortly.");
    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Repairs | {COMPANY.name}</title>
        <meta name="description" content={`Screen, battery, and device repairs at ${COMPANY.name} Austin stores.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Genius Bar"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Repairs" }]}
        title="Repair Services"
        body="Same-day options for screen, battery, charging, and water damage — plus free data transfer with any new phone."
        image={HOME_BUILDER_IMAGES.crewWorking}
        imageAlt="Device repair"
      />

      <section className="section-padding-inset">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {REPAIR_SERVICES.map(s => (
            <div key={s.id} className="border border-border p-6 bg-white">
              <h2 className="font-semibold text-lg mb-2">{s.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
              <p className="text-xs uppercase tracking-wider text-[hsl(var(--secondary))]">
                From {s.priceFrom} · {s.duration}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto border border-border p-8 bg-[hsl(var(--muted))]/20">
          <h2 className="font-sans-brand text-2xl font-semibold mb-2">Book a repair</h2>
          <p className="text-sm text-muted-foreground mb-6">We&apos;ll call or text to confirm your time slot.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <select name="service" required className="w-full h-11 border border-border px-3 text-sm bg-white">
              <option value="">Select service</option>
              {REPAIR_SERVICES.map(s => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <input name="device" required placeholder="Device model (e.g. iPhone 15 Pro)" className="w-full h-11 border border-border px-3 text-sm" />
            <input name="date" type="date" className="w-full h-11 border border-border px-3 text-sm" />
            <input name="name" required placeholder="Your name" className="w-full h-11 border border-border px-3 text-sm" />
            <input name="email" required type="email" placeholder="Email" className="w-full h-11 border border-border px-3 text-sm" />
            <input name="phone" required type="tel" placeholder="Phone" className="w-full h-11 border border-border px-3 text-sm" />
            <textarea name="notes" placeholder="Describe the issue (optional)" rows={3} className="w-full border border-border px-3 py-2 text-sm" />
            <Button type="submit" disabled={submitting} className="w-full rounded-none h-12 uppercase text-xs tracking-wider bg-[hsl(var(--secondary))]">
              {submitting ? "Sending…" : "Request appointment"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Repairs;
