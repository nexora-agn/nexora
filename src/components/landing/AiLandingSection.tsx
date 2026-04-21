import { motion } from "framer-motion";
import { Bot, MessageCircle, Sparkles, Timer } from "lucide-react";

const forBusiness = [
  {
    title: "Faster answers",
    line: "Visitors get stock, areas, and next steps—without waiting on an inbox.",
  },
  {
    title: "Smarter hand-offs",
    line: "Quotes and tours include context your team can act on.",
  },
  {
    title: "Always on",
    line: "After-hours bookings still hit your queue—with timestamps.",
  },
];

const forYou = [
  {
    icon: Bot,
    title: "On-brand assistant",
    line: "Trained on your services—not a generic bot.",
  },
  {
    icon: MessageCircle,
    title: "Instant replies",
    line: "Fewer drop-offs than “we’ll email you Monday.”",
  },
  {
    icon: Timer,
    title: "24/7 coverage",
    line: "You keep approvals; automation handles repetition.",
  },
];

const AiLandingSection = () => {
  return (
    <section id="ai" className="scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 max-w-2xl md:mb-14"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">AI</p>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl md:leading-[1.12]">
            Automation that actually helps
          </h2>
          <p className="mt-3 text-base font-medium text-neutral-600 md:text-lg">
            Routing, qualification, first-line answers—you stay in control.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand" aria-hidden />
              <h3 className="text-base font-semibold text-neutral-950 md:text-lg">For your business</h3>
            </div>
            <div className="space-y-5">
              {forBusiness.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="border-b border-neutral-200 pb-5 last:border-0 last:pb-0"
                >
                  <p className="font-semibold text-neutral-950">{item.title}</p>
                  <p className="mt-1 text-sm text-neutral-600">{item.line}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-neutral-200 bg-neutral-950 p-8 text-neutral-100 shadow-xl md:p-10">
            <div className="mb-5 flex items-center gap-2">
              <Bot className="h-5 w-5 text-brand" aria-hidden />
              <h3 className="text-base font-semibold md:text-lg">For winning clients</h3>
            </div>
            <p className="text-sm font-medium text-neutral-400">
              Speed wins. A tight loop from visit to qualified lead beats a dead contact form.
            </p>
            <ul className="mt-8 space-y-5">
              {forYou.map((row) => (
                <li key={row.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand">
                    <row.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{row.title}</p>
                    <p className="mt-1 text-sm text-neutral-400">{row.line}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiLandingSection;
