import { motion } from "framer-motion";
import { Check } from "lucide-react";

const outcomes = [
  {
    title: "Looks like you",
    desc: "Logo, type, colours—cohesive, not a template skin.",
  },
  {
    title: "Works everywhere",
    desc: "Desktop to phone. No janky breakpoints.",
  },
  {
    title: "Plugs into your stack",
    desc: "When you’re ready, data connects to how you already operate.",
  },
];

const scopeItems = ["Brand applied end-to-end", "Core pages, responsive", "Launch-ready handoff"];

const WhatYouGet = () => {
  return (
    <section id="what-you-get" className="scroll-mt-28 py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">What you get</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl md:leading-[1.12]">
              A real site—not a vague “package”
            </h2>
            <p className="mb-8 max-w-md text-base font-medium text-neutral-600 md:text-lg">
              Clear deliverables. You know exactly what ships.
            </p>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Usually includes</p>
              <ul className="mt-4 space-y-2.5">
                {scopeItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-medium text-neutral-800">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-brand">
                      <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="space-y-0 divide-y divide-neutral-200 border-y border-neutral-200">
            {outcomes.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="py-8 first:pt-0 last:pb-0"
              >
                <h3 className="text-lg font-semibold text-neutral-950">{item.title}</h3>
                <p className="mt-2 max-w-md text-sm font-medium text-neutral-600 md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
