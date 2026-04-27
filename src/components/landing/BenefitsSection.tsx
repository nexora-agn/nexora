import { motion } from "framer-motion";
import { BadgeCheck, Clock, Code2, Rocket } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Accelerated timeline",
    desc: "A guided process replaces open-ended scoping, so approvals and build work stay on a predictable cadence.",
  },
  {
    icon: Code2,
    title: "Zero implementation burden",
    desc: "You are not asked to configure stacks, repos, or deployment pipelines. We handle the technical execution.",
  },
  {
    icon: BadgeCheck,
    title: "Identity you own",
    desc: "Creative decisions map to your positioning, not a one-size-fits-all theme, so the result feels credibly yours.",
  },
  {
    icon: Rocket,
    title: "Launch when you are ready",
    desc: "Once content and design are signed off, the site is staged for go live with a clear handoff checklist.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center md:mb-16"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Why us
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.12]">
            Speed and clarity, without cutting corners
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We optimize for outcomes operators care about: a credible site, a controlled timeline, and
            a partner who owns the build so your team stays focused on the business.
          </p>
        </motion.div>

        <div className="glass-panel overflow-hidden rounded-[2rem] border border-white/50 shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative border-b border-slate-200/50 bg-white/40 p-8 md:p-10 lg:border-b-0 lg:border-r lg:border-slate-200/50"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 via-slate-700 to-cyan-800" />
              <div className="mb-6 inline-flex rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Operating model
              </div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl md:leading-snug">
                From brand inputs to a live site, without the typical agency noise.
              </h3>
              <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                You should always know what is in scope, what happens next, and when you can expect
                to review. That discipline is what keeps delivery fast without sacrificing quality.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: "Single", label: "End-to-end owner of the build" },
                  { value: "None", label: "Engineering hours required from you" },
                  { value: "4-step", label: "Structured path from brief to launch" },
                  { value: "100%", label: "Responsive coverage across devices" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1 + index * 0.08 }}
                    className="rounded-[1.4rem] border border-slate-200/60 bg-white/85 p-5 shadow-sm"
                  >
                    <div className="mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                      {stat.value}
                    </div>
                    <div className="text-sm leading-snug text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-px bg-slate-200/40 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.97)" }}
                  className="group bg-white/80 p-8 transition-colors md:p-9"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-cyan-800 text-white shadow-lg shadow-slate-900/15">
                      <b.icon size={22} aria-hidden />
                    </div>
                    <span className="font-mono text-xs tabular-nums tracking-[0.12em] text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
