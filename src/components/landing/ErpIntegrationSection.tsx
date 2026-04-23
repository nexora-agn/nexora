import { motion } from "framer-motion";
import { Building2, Car, Home, PlugZap } from "lucide-react";

const industries = [
  {
    icon: Building2,
    title: "Construction & supply",
    copy: "Pricing and stock match your warehouse. No double entry.",
  },
  {
    icon: Home,
    title: "Real estate & development",
    copy: "Leads land with context, not just “contact us.”",
  },
  {
    icon: Car,
    title: "Automotive & field services",
    copy: "Bookings and jobs match how your shop already works.",
  },
];

const questions = [
  {
    q: "Already have a site?",
    a: "Refresh or start fresh. We plan the data path upfront.",
  },
  {
    q: "Migrating or new?",
    a: "Same clear review loop either way.",
  },
  {
    q: "Which system?",
    a: "We map once. Then catalog and orders stay in sync.",
  },
];

const ErpIntegrationSection = () => {
  return (
    <section id="erp-sync" className="scroll-mt-28 border-y border-neutral-200/80 bg-neutral-50 py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Systems in sync
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl md:leading-[1.15]">
              Your site talks to
              <br />
              <span className="text-accent">your tools.</span>
            </h2>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-neutral-600 md:text-lg">
              One source of truth. No copy-paste. No surprise numbers.
            </p>

            <ul className="mt-8 space-y-3 border-l-[3px] border-brand pl-5">
              <li className="text-sm font-medium text-neutral-800 md:text-base">
                <span className="text-neutral-950">Catalog &amp; pricing</span> matches your live rules.
              </li>
              <li className="text-sm font-medium text-neutral-800 md:text-base">
                <span className="text-neutral-950">Orders</span> land where fulfilment already looks.
              </li>
              <li className="text-sm font-medium text-neutral-800 md:text-base">
                <span className="text-neutral-950">One trail</span>: finance and ops see the same story.
              </li>
            </ul>
          </motion.div>

          <div className="space-y-6">
            {industries.map((row, i) => (
              <motion.div
                key={row.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white">
                  <row.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-950 md:text-base">{row.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{row.copy}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl border border-dashed border-neutral-300 bg-white/80 p-5 md:p-6"
            >
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                <PlugZap className="h-4 w-4 text-neutral-700" aria-hidden />
                Quick fit check
              </div>
              <div className="space-y-5">
                {questions.map((item) => (
                  <div key={item.q} className="border-b border-neutral-100 pb-5 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-neutral-950">{item.q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErpIntegrationSection;
