import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
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
      message: `Trade-in: ${fd.get("year")} ${fd.get("make")} ${fd.get("model")}`,
      payload: {
        vin: String(fd.get("vin") || ""),
        year: String(fd.get("year") || ""),
        make: String(fd.get("make") || ""),
        model: String(fd.get("model") || ""),
        mileage: String(fd.get("mileage") || ""),
        condition: String(fd.get("condition") || ""),
      },
    });
    toast.success("Trade-in details received. We'll be in touch with an estimate.");
    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Value Your Trade | {COMPANY.name}</title>
        <meta name="description" content={`Get a trade-in estimate from ${COMPANY.name}.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Trade-in"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Value Your Trade" }]}
        title="Value Your Trade"
        body="Tell us about your vehicle and we'll prepare a competitive trade-in offer."
        image={HOME_BUILDER_IMAGES.keys}
        imageAlt="Trade-in valuation"
      />

      <DealerFormSection>
        <DealerFormShell maxWidth="max-w-2xl">
          <DealerFormCard
            title="Vehicle details"
            description="Enter your VIN if you have it — otherwise year, make, and model are enough to start."
          >
            <form onSubmit={onSubmit}>
              <DealerFormStack>
                <DealerField label="VIN" htmlFor="trade-vin" hint="17 characters on your dashboard or door jamb">
                  <DealerInput id="trade-vin" name="vin" required placeholder="1HGCM82633A004352" />
                </DealerField>
                <DealerFormGrid cols={3}>
                  <DealerField label="Year" htmlFor="trade-year">
                    <DealerInput id="trade-year" name="year" required inputMode="numeric" placeholder="2020" />
                  </DealerField>
                  <DealerField label="Make" htmlFor="trade-make">
                    <DealerInput id="trade-make" name="make" required placeholder="Honda" />
                  </DealerField>
                  <DealerField label="Model" htmlFor="trade-model">
                    <DealerInput id="trade-model" name="model" required placeholder="Accord" />
                  </DealerField>
                </DealerFormGrid>
                <DealerFormGrid cols={2}>
                  <DealerField label="Mileage" htmlFor="trade-mileage">
                    <DealerInput id="trade-mileage" name="mileage" required inputMode="numeric" placeholder="45000" />
                  </DealerField>
                  <DealerField label="Condition" htmlFor="trade-condition">
                    <DealerSelect id="trade-condition" name="condition" required defaultValue="">
                      <option value="" disabled>
                        Select condition
                      </option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
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
