import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@template-dealership/components/layout/Layout";
import HarborPageHero from "@template-dealership/components/sections/HarborPageHero";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { createLead } from "@template-dealership/lib/dealerLeads";
import { HOME_BUILDER_IMAGES } from "@template-dealership/data/siteData";
import {
  DealerFormCard,
  DealerFormGrid,
  DealerFormSection,
  DealerFormShell,
  DealerFormStack,
  DealerField,
  DealerInput,
  DealerSelect,
} from "@template-dealership/components/forms/DealerForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TestDrive = () => {
  const { projects, company: COMPANY } = useSiteContent();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const prefillVehicle = params.get("vehicle") || "";
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    createLead({
      type: "test-drive",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      vehicleId: String(fd.get("vehicleId") || ""),
      message: `Preferred: ${fd.get("date")} at ${fd.get("time")}`,
      payload: {
        date: String(fd.get("date") || ""),
        time: String(fd.get("time") || ""),
        contactMethod: String(fd.get("contactMethod") || ""),
      },
    });
    toast.success("Test drive request received.");
    navigate("/test-drive/confirmation");
    setSubmitting(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Schedule Test Drive | {COMPANY.name}</title>
        <meta name="description" content={`Book a test drive at ${COMPANY.name}.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Experience"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Test Drive" }]}
        title="Schedule a Test Drive"
        body="Choose your vehicle and preferred time — our team will confirm your appointment."
        image={HOME_BUILDER_IMAGES.contactHero}
        imageAlt="Test drive"
      />

      <DealerFormSection>
        <DealerFormShell maxWidth="max-w-xl">
          <DealerFormCard title="Book your drive" description="All fields are required unless noted.">
            <form onSubmit={onSubmit}>
              <DealerFormStack>
                <DealerField label="Vehicle" htmlFor="td-vehicle">
                  <DealerSelect id="td-vehicle" name="vehicleId" required defaultValue={prefillVehicle}>
                    <option value="">Select a vehicle</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </DealerSelect>
                </DealerField>
                <DealerFormGrid cols={2}>
                  <DealerField label="Preferred date" htmlFor="td-date">
                    <DealerInput id="td-date" type="date" name="date" required />
                  </DealerField>
                  <DealerField label="Preferred time" htmlFor="td-time">
                    <DealerInput id="td-time" type="time" name="time" required />
                  </DealerField>
                </DealerFormGrid>
                <DealerField label="Full name" htmlFor="td-name">
                  <DealerInput id="td-name" name="name" required autoComplete="name" />
                </DealerField>
                <DealerFormGrid cols={2}>
                  <DealerField label="Email" htmlFor="td-email">
                    <DealerInput id="td-email" type="email" name="email" required autoComplete="email" />
                  </DealerField>
                  <DealerField label="Phone" htmlFor="td-phone">
                    <DealerInput id="td-phone" type="tel" name="phone" required autoComplete="tel" />
                  </DealerField>
                </DealerFormGrid>
                <DealerField label="Preferred contact" htmlFor="td-contact">
                  <DealerSelect id="td-contact" name="contactMethod" defaultValue="phone">
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="text">Text message</option>
                  </DealerSelect>
                </DealerField>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-[48px] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] font-sans-brand text-xs uppercase tracking-wider"
                >
                  {submitting ? "Sending…" : "Request test drive"}
                </Button>
              </DealerFormStack>
            </form>
          </DealerFormCard>
        </DealerFormShell>
      </DealerFormSection>
    </Layout>
  );
};

export default TestDrive;
