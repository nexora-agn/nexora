import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LegalPolicyLinks from "@/components/legal/LegalPolicyLinks";
import { PlanCardBody, PlanPopularBadge } from "@/components/landing/PlanCardBody";
import { MARKETING_PLANS } from "@/lib/pricingPlans";

interface PricingSectionProps {
  /** When false, renders as a standalone page section (no duplicate intro — use PageHeader). */
  embedded?: boolean;
}

const PricingSection = ({ embedded = true }: PricingSectionProps) => {
  return (
    <section
      id={embedded ? "pricing" : undefined}
      className={embedded ? "scroll-mt-28 py-24 lg:py-32" : "py-12 lg:py-16"}
    >
      <div className="mx-auto max-w-6xl px-6">
        {embedded ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-12 text-center md:mb-16"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Pricing</p>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">Pick your lane</h2>
            <p className="mx-auto mt-3 max-w-lg text-base font-medium text-neutral-600 md:text-lg">
              Monthly subscriptions from $199. Preview your staged website, then subscribe when you're ready.
            </p>
          </motion.div>
        ) : (
          <p className="mb-10 text-center text-base font-medium text-neutral-600 md:text-lg">
            Preview your staged website, then subscribe through secure checkout.
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-5">
          {MARKETING_PLANS.map((plan, i) => {
            const inverted = plan.highlight;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`relative flex min-h-0 flex-col rounded-2xl border p-8 ${
                  plan.highlight
                    ? "border-neutral-950 bg-neutral-950 text-white shadow-2xl ring-2 ring-brand/60 ring-offset-2 ring-offset-background lg:z-[1] lg:scale-[1.02]"
                    : "border-neutral-200 bg-white shadow-sm"
                }`}
              >
                {plan.highlight ? <PlanPopularBadge darkBg /> : null}
                <PlanCardBody plan={plan} inverted={inverted} />
                <Button
                  size="lg"
                  asChild
                  className={`mt-8 h-12 w-full rounded-xl text-base font-semibold ${
                    plan.highlight
                      ? "bg-brand text-brand-foreground hover:bg-brand-muted"
                      : "bg-neutral-950 text-white hover:bg-neutral-800"
                  }`}
                >
                  <Link to={`/start?plan=${encodeURIComponent(plan.id)}`}>
                    {plan.id === "custom" ? "Contact sales" : "Subscribe"}
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mx-auto mt-10 max-w-2xl text-center"
        >
          <p className="text-sm text-neutral-600">By subscribing you agree to:</p>
          <LegalPolicyLinks variant="inline" linkClassName="text-neutral-800" />
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
