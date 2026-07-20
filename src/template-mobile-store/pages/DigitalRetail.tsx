import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import Layout from "@template-mobile-store/components/layout/Layout";
import HarborPageHero from "@template-mobile-store/components/sections/HarborPageHero";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { createLead } from "@template-mobile-store/lib/dealerLeads";
import { HOME_BUILDER_IMAGES } from "@template-mobile-store/data/siteData";
import {
  DealerFormCard,
  DealerFormSection,
  DealerFormShell,
  DealerFormStack,
  DealerField,
  DealerInput,
  DealerSelect,
} from "@template-mobile-store/components/forms/DealerForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STEPS = ["Select device", "Payment", "Trade-in", "Finance", "Submit"] as const;

const DigitalRetail = () => {
  const { projects, company: COMPANY } = useSiteContent();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
      return;
    }
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    createLead({
      type: "inquiry",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      vehicleId: String(fd.get("vehicleId") || ""),
      message: "Digital retail checkout",
      payload: {
        payment: String(fd.get("payment") || ""),
        trade: String(fd.get("trade") || ""),
        finance: String(fd.get("finance") || ""),
      },
    });
    toast.success("Your digital retail request has been submitted.");
    setSubmitting(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Digital Retail | {COMPANY.name}</title>
        <meta name="description" content="Complete your purchase online with guided steps." />
      </Helmet>

      <HarborPageHero
        eyebrow="Buy online"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Digital Retail" }]}
        title="Digital Retail"
        body="Build your deal in five steps — we finalize details with you in store or remotely."
        image={HOME_BUILDER_IMAGES.showroom}
        imageAlt="Digital retail"
      />

      <DealerFormSection variant="white">
        <DealerFormShell maxWidth="max-w-2xl">
          <div className="-mx-1 mb-6 sm:mb-8 overflow-x-auto pb-2">
            <ol className="flex gap-2 min-w-max px-1 sm:flex-wrap sm:min-w-0">
              {STEPS.map((label, i) => (
                <li
                  key={label}
                  className={cn(
                    "flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-wider px-3 py-2.5 border whitespace-nowrap",
                    i <= step ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/5 text-[hsl(var(--primary))]" : "border-border text-muted-foreground",
                  )}
                >
                  {i < step ? <Check className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" /> : <span className="font-semibold">{i + 1}</span>}
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label.split(" ")[0]}</span>
                </li>
              ))}
            </ol>
          </div>

          <DealerFormCard title={STEPS[step]} description={`Step ${step + 1} of ${STEPS.length}`}>
            <form onSubmit={handleSubmit}>
              <DealerFormStack>
                <div className={step === 0 ? "" : "sr-only"} aria-hidden={step !== 0}>
                  <DealerField label="Device" htmlFor="dr-vehicle">
                    <DealerSelect id="dr-vehicle" name="vehicleId" required={step === 0} defaultValue="">
                      <option value="">Choose a phone or tablet</option>
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </DealerSelect>
                  </DealerField>
                </div>
                <div className={step === 1 ? "" : "sr-only"} aria-hidden={step !== 1}>
                  <DealerField label="How would you like to pay?" htmlFor="dr-payment">
                    <DealerSelect id="dr-payment" name="payment" defaultValue="finance">
                      <option value="cash">Cash</option>
                      <option value="finance">Finance</option>
                      <option value="lease">Lease</option>
                    </DealerSelect>
                  </DealerField>
                </div>
                <div className={step === 2 ? "" : "sr-only"} aria-hidden={step !== 2}>
                  <DealerField label="Trade-in" htmlFor="dr-trade">
                    <DealerSelect id="dr-trade" name="trade" defaultValue="no">
                      <option value="no">No trade-in</option>
                      <option value="yes">I have a trade-in</option>
                    </DealerSelect>
                  </DealerField>
                </div>
                <div className={step === 3 ? "" : "sr-only"} aria-hidden={step !== 3}>
                  <DealerField label="Financing" htmlFor="dr-finance">
                    <DealerSelect id="dr-finance" name="finance" defaultValue="apply">
                      <option value="apply">Apply for financing</option>
                      <option value="preapproved">I'm pre-approved</option>
                    </DealerSelect>
                  </DealerField>
                </div>
                <div className={step === 4 ? "" : "sr-only"} aria-hidden={step !== 4}>
                  <DealerField label="Full name" htmlFor="dr-name">
                    <DealerInput id="dr-name" name="name" required={step === 4} autoComplete="name" />
                  </DealerField>
                  <DealerField label="Email" htmlFor="dr-email">
                    <DealerInput id="dr-email" type="email" name="email" required={step === 4} autoComplete="email" />
                  </DealerField>
                  <DealerField label="Phone" htmlFor="dr-phone">
                    <DealerInput id="dr-phone" type="tel" name="phone" required={step === 4} autoComplete="tel" />
                  </DealerField>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-2">
                  <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep(s => s - 1)} className="min-h-[44px]">
                    Back
                  </Button>
                  {step < STEPS.length - 1 ? (
                    <Button type="submit" className="min-h-[44px] bg-[hsl(var(--primary))]">
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" disabled={submitting} className="min-h-[44px] bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]">
                      {submitting ? "Submitting…" : "Submit deal"}
                    </Button>
                  )}
                </div>
              </DealerFormStack>
            </form>
          </DealerFormCard>
        </DealerFormShell>
      </DealerFormSection>
    </Layout>
  );
};

export default DigitalRetail;
