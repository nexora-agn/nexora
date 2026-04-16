import { motion } from "framer-motion";
import { Check, Globe, Smartphone, Zap, Wrench } from "lucide-react";

const items = [
  {
    icon: Globe,
    title: "Brand-led web presence",
    desc: "Logo, palette, typography, and domain—composed into a site that reads as your business, not a generic template.",
  },
  {
    icon: Smartphone,
    title: "Responsive by design",
    desc: "Layouts, spacing, and hierarchy are tuned for desktop, tablet, and phone so every visit looks intentional.",
  },
  {
    icon: Zap,
    title: "Structured delivery",
    desc: "A defined intake-to-launch path keeps momentum high—without the overhead of a traditional dev cycle.",
  },
  {
    icon: Wrench,
    title: "No in-house engineering",
    desc: "You are not expected to write code, wrangle hosting, or coordinate contractors. We carry the build.",
  },
];

const scopeItems = [
  "Brand assets applied across the experience",
  "Responsive layout system and core pages",
  "Launch-ready structure and handoff",
];

const WhatYouGet = () => {
  return (
    <section id="what-you-get" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel relative overflow-hidden rounded-[2rem] p-8 md:p-10 lg:sticky lg:top-24"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 via-slate-700 to-cyan-800" />
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              What you get
            </p>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.12]">
              A production-ready site, scoped for clarity
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Every engagement is organized around deliverables you can evaluate: identity applied,
              responsive UI, and a launch path you can follow without a technical backlog.
            </p>

            <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/85 p-6 shadow-sm">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-slate-200/60 pb-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Standard scope
                  </p>
                  <p className="mt-1.5 text-base font-semibold tracking-tight text-foreground">
                    Core website package
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                  Included
                </span>
              </div>
              <ul className="space-y-3.5">
                {scopeItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-snug text-muted-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
                      <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-panel group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/40 p-8 transition-shadow duration-300 hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 via-slate-700 to-cyan-800 opacity-80" />
                <div className="absolute -right-10 top-8 h-24 w-24 rounded-full bg-cyan-100/60 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-800 text-white shadow-lg shadow-slate-900/15">
                    <item.icon size={22} aria-hidden />
                  </div>
                  <span className="font-mono text-xs tabular-nums tracking-[0.12em] text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
