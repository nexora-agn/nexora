import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import Layout from "@template-tire-shop/components/layout/Layout";
import HarborPageHero from "@template-tire-shop/components/sections/HarborPageHero";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { createLead } from "@template-tire-shop/lib/dealerLeads";
import { HOME_BUILDER_IMAGES } from "@template-tire-shop/data/siteData";
import {
  DealerFormCard,
  DealerFormSection,
  DealerFormShell,
  DealerFormStack,
  DealerField,
  DealerInput,
  DealerSelect,
} from "@template-tire-shop/components/forms/DealerForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BENEFITS = [
  "Volume pricing on commercial and truck tires",
  "Scheduled rotations and mobile install options",
  "Net-term invoicing for approved accounts",
  "Shared inventory across four Austin shops",
];

const DigitalRetail = () => {
  const { company: COMPANY } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    createLead({
      type: "inquiry",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: `Fleet inquiry · Vehicles: ${fd.get("fleetSize")} · Need: ${fd.get("need")}`,
      payload: {
        fleetSize: String(fd.get("fleetSize") || ""),
        need: String(fd.get("need") || ""),
        company: String(fd.get("company") || ""),
      },
    });
    toast.success("Fleet inquiry submitted — we'll follow up shortly.");
    setSubmitting(false);
    e.currentTarget.reset();
  };

  return (
    <Layout>
      <Helmet>
        <title>Fleet Tire Service | {COMPANY.name}</title>
        <meta name="description" content="Commercial and fleet tire accounts for Central Texas operators." />
      </Helmet>

      <HarborPageHero
        eyebrow="Commercial"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Fleet" }]}
        title="Fleet Tire Accounts"
        body="Volume pricing, scheduled service, and optional mobile install for vans, trucks, and light commercial fleets."
        image={HOME_BUILDER_IMAGES.showroom}
        imageAlt="Fleet tire service"
      />

      <DealerFormSection variant="white">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          <div>
            <p className="tire-eyebrow mb-3">Why fleets choose us</p>
            <h2 className="tire-subheading mb-6">Keep cost-per-mile under control</h2>
            <ul className="space-y-3">
              {BENEFITS.map(b => (
                <li key={b} className="flex gap-3 text-sm text-muted-foreground font-sans-brand">
                  <Check className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Email{" "}
              <a className="text-[hsl(var(--primary))] underline" href={`mailto:${COMPANY.fleetEmail}`}>
                {COMPANY.fleetEmail}
              </a>{" "}
              or submit the form.
            </p>
          </div>

          <DealerFormShell maxWidth="max-w-xl">
            <DealerFormCard title="Open a fleet account" description="We'll respond within one business day.">
              <form onSubmit={handleSubmit}>
                <DealerFormStack>
                  <DealerField label="Company" htmlFor="fl-company">
                    <DealerInput id="fl-company" name="company" required autoComplete="organization" />
                  </DealerField>
                  <DealerField label="Your name" htmlFor="fl-name">
                    <DealerInput id="fl-name" name="name" required autoComplete="name" />
                  </DealerField>
                  <DealerField label="Email" htmlFor="fl-email">
                    <DealerInput id="fl-email" type="email" name="email" required autoComplete="email" />
                  </DealerField>
                  <DealerField label="Phone" htmlFor="fl-phone">
                    <DealerInput id="fl-phone" type="tel" name="phone" required autoComplete="tel" />
                  </DealerField>
                  <DealerField label="Fleet size" htmlFor="fl-size">
                    <DealerSelect id="fl-size" name="fleetSize" defaultValue="5-15">
                      <option value="1-4">1–4 vehicles</option>
                      <option value="5-15">5–15 vehicles</option>
                      <option value="16-50">16–50 vehicles</option>
                      <option value="50+">50+ vehicles</option>
                    </DealerSelect>
                  </DealerField>
                  <DealerField label="Primary need" htmlFor="fl-need">
                    <DealerSelect id="fl-need" name="need" defaultValue="tires">
                      <option value="tires">Tire supply & install</option>
                      <option value="rotation">Scheduled rotations</option>
                      <option value="mobile">Mobile install</option>
                      <option value="all">Full fleet program</option>
                    </DealerSelect>
                  </DealerField>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="min-h-[48px] bg-[hsl(var(--secondary))] hover:brightness-110 text-[hsl(var(--primary))] font-sans-brand text-xs font-semibold uppercase tracking-wider"
                  >
                    {submitting ? "Submitting…" : "Request fleet pricing"}
                  </Button>
                </DealerFormStack>
              </form>
            </DealerFormCard>
          </DealerFormShell>
        </div>
      </DealerFormSection>
    </Layout>
  );
};

export default DigitalRetail;
