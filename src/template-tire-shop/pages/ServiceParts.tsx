import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
import Layout from "@template-tire-shop/components/layout/Layout";
import HarborPageHero from "@template-tire-shop/components/sections/HarborPageHero";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { createLead } from "@template-tire-shop/lib/dealerLeads";
import { HOME_BUILDER_IMAGES } from "@template-tire-shop/data/siteData";
import {
  DealerFormCard,
  DealerFormGrid,
  DealerFormSection,
  DealerFormShell,
  DealerFormStack,
  DealerFormTabs,
  DealerField,
  DealerInput,
  DealerTextarea,
} from "@template-tire-shop/components/forms/DealerForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ServiceParts = () => {
  const { company: COMPANY } = useSiteContent();
  const [tab, setTab] = useState<"service" | "parts">("service");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    createLead({
      type: tab,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      payload: {
        vehicle: String(fd.get("device") || fd.get("vehicle") || ""),
        preferredDate: String(fd.get("preferredDate") || ""),
        partNumber: String(fd.get("partNumber") || ""),
      },
    });
    toast.success(tab === "service" ? "Service request received." : "Parts inquiry received.");
    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Service & Parts | {COMPANY.name}</title>
        <meta name="description" content={`Schedule service or order parts at ${COMPANY.name}.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Service"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Service & Parts" }]}
        title="Repairs & Accessories"
        body="Book screen, battery, and port repairs — or request cases, chargers, and OEM accessories."
        image={HOME_BUILDER_IMAGES.crewWorking}
        imageAlt="Phone repair service"
      />

      <DealerFormSection>
        <DealerFormShell maxWidth="max-w-xl">
          <DealerFormTabs
            value={tab}
            onChange={setTab}
            options={[
              { id: "service", label: "Schedule service" },
              { id: "parts", label: "Parts inquiry" },
            ]}
          />
          <DealerFormCard
            title={tab === "service" ? "Service appointment" : "Parts request"}
            description={
              tab === "service"
                ? "Choose a preferred date and describe the work needed."
                : "Include part numbers or descriptions and we'll follow up with availability."
            }
          >
            <form key={tab} onSubmit={onSubmit}>
              <DealerFormStack>
                <DealerFormGrid cols={2}>
                  <DealerField label="Full name" htmlFor="sp-name">
                    <DealerInput id="sp-name" name="name" required autoComplete="name" />
                  </DealerField>
                  <DealerField label="Phone" htmlFor="sp-phone">
                    <DealerInput id="sp-phone" name="phone" type="tel" required autoComplete="tel" />
                  </DealerField>
                </DealerFormGrid>
                <DealerField label="Email" htmlFor="sp-email">
                  <DealerInput id="sp-email" name="email" type="email" required autoComplete="email" />
                </DealerField>
                <DealerField label="Your device" htmlFor="sp-vehicle">
                  <DealerInput id="sp-vehicle" name="device" placeholder="e.g. F-150, Model Y, 225/45R17" required />
                </DealerField>
                {tab === "service" ? (
                  <DealerField label="Preferred date" htmlFor="sp-date">
                    <DealerInput id="sp-date" type="date" name="preferredDate" />
                  </DealerField>
                ) : (
                  <DealerField label="Part number or description" htmlFor="sp-part">
                    <DealerInput id="sp-part" name="partNumber" placeholder="OEM part # or accessory name" />
                  </DealerField>
                )}
                <DealerField label="Notes" htmlFor="sp-message">
                  <DealerTextarea id="sp-message" name="message" rows={3} placeholder="Symptoms, service type, or additional details" />
                </DealerField>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-[48px] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] font-sans-brand text-xs uppercase tracking-wider"
                >
                  {submitting ? "Sending…" : tab === "service" ? "Request appointment" : "Submit parts inquiry"}
                </Button>
              </DealerFormStack>
            </form>
          </DealerFormCard>
        </DealerFormShell>
      </DealerFormSection>
    </Layout>
  );
};

export default ServiceParts;
