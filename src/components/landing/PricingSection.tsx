import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingSectionProps {
  onRequestDemo?: () => void;
}

const plans = [
  {
    name: "Starter",
    tagline: "Launch fast. Look legit.",
    price: "$199",
    period: "/month",
    highlight: false,
    cta: "Book a demo",
    features: ["3 pages", "Responsive + fast", "Lead capture", "Hosting & SSL", "Monthly updates (scoped)"],
  },
  {
    name: "Growth",
    tagline: "More pages. Deeper systems.",
    price: "$399",
    period: "/month",
    highlight: true,
    cta: "Book a demo",
    features: ["8 pages", "Catalog & pricing sync", "Forms → your workflow", "AI on key pages", "Priority support"],
  },
  {
    name: "Custom",
    tagline: "You name it—we scope it.",
    price: "Custom",
    period: "",
    highlight: false,
    cta: "Talk to us",
    features: ["Milestone-based scope", "Custom integrations", "Multi-brand", "Dedicated lead", "Full handoff"],
  },
];

const PricingSection = ({ onRequestDemo }: PricingSectionProps) => {
  return (
    <section id="pricing" className="scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
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
            Starter to get live. Growth when you need depth. Custom for anything else.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-neutral-950 bg-neutral-950 text-white shadow-2xl ring-2 ring-brand/60 ring-offset-2 ring-offset-background lg:z-[1] lg:scale-[1.02]"
                  : "border-neutral-200 bg-white shadow-sm"
              }`}
            >
              {plan.highlight ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border-2 border-brand bg-neutral-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
                  Most popular
                </span>
              ) : null}
              <div className="mb-6">
                <h3 className={`text-lg font-semibold ${plan.highlight ? "text-white" : "text-neutral-950"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${plan.highlight ? "text-neutral-400" : "text-neutral-600"}`}>
                  {plan.tagline}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`text-4xl font-bold tracking-tight ${plan.highlight ? "text-white" : "text-neutral-950"}`}>
                    {plan.price}
                  </span>
                  {plan.period ? (
                    <span className={plan.highlight ? "text-neutral-500" : "text-neutral-500"}>{plan.period}</span>
                  ) : null}
                </div>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-snug">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? "text-brand" : "text-neutral-950"}`}
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <span className={plan.highlight ? "text-neutral-300" : "text-neutral-700"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className={`h-12 w-full rounded-xl text-base font-semibold ${
                  plan.highlight
                    ? "bg-brand text-brand-foreground hover:bg-brand-muted"
                    : "bg-neutral-950 text-white hover:bg-neutral-800"
                }`}
                variant={plan.highlight ? "default" : "default"}
                onClick={onRequestDemo}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mx-auto mt-10 max-w-md text-center text-sm font-medium text-neutral-500"
        >
          Final numbers after a quick demo—scoped in writing.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
