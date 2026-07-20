import { Helmet } from "react-helmet-async";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@template-mobile-store/components/layout/Layout";
import HarborPageHero from "@template-mobile-store/components/sections/HarborPageHero";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { calculateMortgage, formatCurrency } from "@template-mobile-store/lib/mortgageCalculator";
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

const Finance = () => {
  const { company: COMPANY } = useSiteContent();
  const [price, setPrice] = useState(45000);
  const [down, setDown] = useState(10);
  const [rate, setRate] = useState(6.9);
  const [term, setTerm] = useState(60);
  const [showApp, setShowApp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const result = useMemo(
    () => calculateMortgage({ price, downPaymentPercent: down, interestRate: rate, termYears: term / 12 }),
    [price, down, rate, term],
  );

  const onCreditSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    createLead({
      type: "finance",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: "Credit application",
      payload: {
        income: String(fd.get("income") || ""),
        employment: String(fd.get("employment") || ""),
      },
    });
    toast.success("Application received. Our finance team will follow up.");
    setShowApp(false);
    setSubmitting(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Finance & Payments | {COMPANY.name}</title>
        <meta name="description" content={`Estimate payments and apply for financing at ${COMPANY.name}.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Finance"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Finance" }]}
        title="Payment Calculator"
        body="Estimate your monthly payment, then apply for credit in minutes."
        image={HOME_BUILDER_IMAGES.financing}
        imageAlt="Auto financing"
      />

      <DealerFormSection variant="white">
        <DealerFormShell maxWidth="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <DealerFormCard title="Adjust your numbers" description="Slide or type values — estimates update instantly.">
              <DealerFormStack>
                <DealerField label="Device price" htmlFor="fin-price">
                  <DealerInput
                    id="fin-price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value) || 0)}
                  />
                </DealerField>
                <DealerField label={`Down payment — ${down}% (${formatCurrency(result.downPayment)})`} htmlFor="fin-down">
                  <input
                    id="fin-down"
                    type="range"
                    min={0}
                    max={50}
                    value={down}
                    onChange={e => setDown(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--secondary))]"
                  />
                </DealerField>
                <DealerFormGrid cols={2}>
                  <DealerField label="APR (%)" htmlFor="fin-rate">
                    <DealerInput
                      id="fin-rate"
                      type="number"
                      step={0.1}
                      value={rate}
                      onChange={e => setRate(Number(e.target.value) || 0)}
                    />
                  </DealerField>
                  <DealerField label="Term" htmlFor="fin-term">
                    <DealerSelect id="fin-term" value={term} onChange={e => setTerm(Number(e.target.value))}>
                      <option value={36}>36 months</option>
                      <option value={48}>48 months</option>
                      <option value={60}>60 months</option>
                      <option value={72}>72 months</option>
                    </DealerSelect>
                  </DealerField>
                </DealerFormGrid>
              </DealerFormStack>
            </DealerFormCard>

            <div className="bg-[hsl(var(--primary))] text-white p-6 sm:p-8 lg:p-9 border border-[hsl(var(--primary))] flex flex-col justify-between min-h-[280px]">
              <div>
                <p className="dealer-eyebrow text-[hsl(var(--secondary))] mb-2">Estimated payment</p>
                <p className="font-display text-4xl sm:text-5xl font-semibold">{formatCurrency(result.monthlyPayment)}</p>
                <p className="text-sm text-white/70 mt-1">per month · with approved credit</p>
                <ul className="text-sm text-white/85 space-y-2 mt-6">
                  <li>Amount financed: {formatCurrency(result.loanAmount)}</li>
                  <li>Total interest: {formatCurrency(result.totalInterest)}</li>
                  <li>Total of payments: {formatCurrency(result.totalCost)}</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button
                  type="button"
                  onClick={() => setShowApp(true)}
                  className="flex-1 min-h-[48px] bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))]/90"
                >
                  Credit application
                </Button>
                <Button asChild variant="outline" className="flex-1 min-h-[48px] border-white/40 text-white hover:bg-white/10">
                  <Link to="/value-your-trade">Value trade</Link>
                </Button>
              </div>
            </div>
          </div>
        </DealerFormShell>
      </DealerFormSection>

      {showApp ? (
        <DealerFormSection>
          <DealerFormShell maxWidth="max-w-lg">
            <DealerFormCard title="Credit application" description="Secure submission — finance will contact you to complete the process.">
              <form onSubmit={onCreditSubmit}>
                <DealerFormStack>
                  <DealerField label="Full name" htmlFor="cred-name">
                    <DealerInput id="cred-name" name="name" required autoComplete="name" />
                  </DealerField>
                  <DealerFormGrid cols={2}>
                    <DealerField label="Email" htmlFor="cred-email">
                      <DealerInput id="cred-email" type="email" name="email" required autoComplete="email" />
                    </DealerField>
                    <DealerField label="Phone" htmlFor="cred-phone">
                      <DealerInput id="cred-phone" type="tel" name="phone" required autoComplete="tel" />
                    </DealerField>
                  </DealerFormGrid>
                  <DealerField label="Annual income" htmlFor="cred-income">
                    <DealerInput id="cred-income" name="income" placeholder="Optional" />
                  </DealerField>
                  <DealerField label="Employer" htmlFor="cred-employer">
                    <DealerInput id="cred-employer" name="employment" placeholder="Optional" />
                  </DealerField>
                  <div className="flex flex-col-reverse sm:flex-row gap-3">
                    <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowApp(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting} className="flex-1 min-h-[48px] bg-[hsl(var(--primary))]">
                      {submitting ? "Submitting…" : "Submit application"}
                    </Button>
                  </div>
                </DealerFormStack>
              </form>
            </DealerFormCard>
          </DealerFormShell>
        </DealerFormSection>
      ) : null}
    </Layout>
  );
};

export default Finance;
