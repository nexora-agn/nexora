import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
import Layout from "@template-mobile-store/components/layout/Layout";
import HarborPageHero from "@template-mobile-store/components/sections/HarborPageHero";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { createLead } from "@template-mobile-store/lib/dealerLeads";
import { HOME_BUILDER_IMAGES } from "@template-mobile-store/data/siteData";
import {
  DealerFormCard,
  DealerFormGrid,
  DealerFormSection,
  DealerFormShell,
  DealerFormStack,
  DealerField,
  DealerInput,
  DealerSelect,
} from "@template-mobile-store/components/forms/DealerForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ValueYourTrade = () => {
  const { company: COMPANY } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    createLead({
      type: "trade-in",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: `Phone trade-in: ${fd.get("brand")} ${fd.get("model")} ${fd.get("storage")}`,
      payload: {
        imei: String(fd.get("imei") || ""),
        brand: String(fd.get("brand") || ""),
        model: String(fd.get("model") || ""),
        storage: String(fd.get("storage") || ""),
        condition: String(fd.get("condition") || ""),
        carrier: String(fd.get("carrier") || ""),
      },
    });
    toast.success("Trade-in details received. We'll send your estimate within one business day.");
    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Trade-In Value | {COMPANY.name}</title>
        <meta name="description" content={`Get an instant trade-in estimate for your phone at ${COMPANY.name}.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Trade-In"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Trade-In" }]}
        title="Trade In Your Phone"
        body="Enter your IMEI and condition grade for a competitive offer toward your next device."
        image={HOME_BUILDER_IMAGES.keys}
        imageAlt="Phone trade-in"
      />

      <DealerFormSection>
        <DealerFormShell maxWidth="max-w-2xl">
          <DealerFormCard title="Device details" description="IMEI helps us verify eligibility — find it in Settings → General → About, or dial *#06#.">
            <form onSubmit={onSubmit}>
              <DealerFormStack>
                <DealerField label="IMEI" htmlFor="trade-imei" hint="15-digit identifier for your phone">
                  <DealerInput id="trade-imei" name="imei" required placeholder="356938035643809" inputMode="numeric" />
                </DealerField>
                <DealerFormGrid cols={3}>
                  <DealerField label="Brand" htmlFor="trade-brand">
                    <DealerInput id="trade-brand" name="brand" required placeholder="Apple" />
                  </DealerField>
                  <DealerField label="Model" htmlFor="trade-model">
                    <DealerInput id="trade-model" name="model" required placeholder="iPhone 14 Pro" />
                  </DealerField>
                  <DealerField label="Storage" htmlFor="trade-storage">
                    <DealerInput id="trade-storage" name="storage" required placeholder="256GB" />
                  </DealerField>
                </DealerFormGrid>
                <DealerFormGrid cols={2}>
                  <DealerField label="Carrier lock" htmlFor="trade-carrier">
                    <DealerSelect id="trade-carrier" name="carrier" required defaultValue="">
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="unlocked">Unlocked</option>
                      <option value="att">AT&T</option>
                      <option value="tmobile">T-Mobile</option>
                      <option value="verizon">Verizon</option>
                    </DealerSelect>
                  </DealerField>
                  <DealerField label="Condition grade" htmlFor="trade-condition">
                    <DealerSelect id="trade-condition" name="condition" required defaultValue="">
                      <option value="" disabled>
                        Select grade
                      </option>
                      <option value="excellent">Excellent — like new, no cracks</option>
                      <option value="good">Good — light wear, fully functional</option>
                      <option value="fair">Fair — visible wear or minor screen marks</option>
                      <option value="poor">Poor — damage, but powers on</option>
                    </DealerSelect>
                  </DealerField>
                </DealerFormGrid>
                <hr className="border-border" />
                <p className="text-xs font-sans-brand font-semibold uppercase tracking-wider text-muted-foreground">Your contact info</p>
                <DealerField label="Full name" htmlFor="trade-name">
                  <DealerInput id="trade-name" name="name" required autoComplete="name" />
                </DealerField>
                <DealerFormGrid cols={2}>
                  <DealerField label="Email" htmlFor="trade-email">
                    <DealerInput id="trade-email" type="email" name="email" required autoComplete="email" />
                  </DealerField>
                  <DealerField label="Phone" htmlFor="trade-phone">
                    <DealerInput id="trade-phone" type="tel" name="phone" required autoComplete="tel" />
                  </DealerField>
                </DealerFormGrid>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-[48px] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] font-sans-brand text-xs uppercase tracking-wider"
                >
                  {submitting ? "Submitting…" : "Get trade estimate"}
                </Button>
              </DealerFormStack>
            </form>
          </DealerFormCard>
        </DealerFormShell>
      </DealerFormSection>
    </Layout>
  );
};

export default ValueYourTrade;
