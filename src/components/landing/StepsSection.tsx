import { useCallback, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronUp, ImageIcon, Palette, FileText, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ImageIcon,
    title: "Your logo",
    desc: "Upload your logo so the site reflects your brand from the first pixel.",
    detail: "We anchor the experience on your visual identity before layering layout and content.",
    tags: ["Brand anchor", "Header & favicon", "Consistent placement"],
  },
  {
    num: "02",
    icon: Palette,
    title: "Your colors",
    desc: "Pick a palette and we apply it across the interface in one coherent system.",
    detail: "Typography, surfaces, and accents stay aligned so nothing feels patched together.",
    tags: ["Color system", "UI surfaces", "Readable contrast"],
  },
  {
    num: "03",
    icon: FileText,
    title: "Your content",
    desc: "Share what you do—we shape it into clear sections and a confident narrative.",
    detail: "Messaging, proof points, and calls to action are structured for clarity and trust.",
    tags: ["Positioning", "Structure", "Conversion flow"],
  },
  {
    num: "04",
    icon: Rocket,
    title: "Build & launch",
    desc: "We assemble, refine, and publish a responsive site that is ready to go live.",
    detail: "You get a polished build with a straightforward path from review to launch.",
    tags: ["Responsive build", "Review & polish", "Ready to publish"],
    completion: {
      title: "You're all set",
      subtitle:
        "Your website is built, refined, and ready to publish. We hand off a complete, responsive site you can take live on your timeline.",
    },
  },
];

const StepCompletionBanner = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="mb-6 flex gap-4 rounded-2xl border border-emerald-200/45 bg-gradient-to-br from-emerald-50/90 via-white/80 to-slate-50/70 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-emerald-100/60"
  >
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600/[0.09] text-emerald-700"
      aria-hidden
    >
      <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
    </div>
    <div className="min-w-0 pt-0.5">
      <p className="text-[0.9375rem] font-semibold tracking-tight text-foreground">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
    </div>
  </motion.div>
);

const StepsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const setStep = useCallback((index: number) => {
    setActiveIndex((current) => {
      const base = typeof index === "number" ? index : current;
      return Math.max(0, Math.min(steps.length - 1, base));
    });
  }, []);

  const progressHeight = `${((activeIndex + 1) / steps.length) * 100}%`;

  const focusTab = (stepNum: string) => {
    queueMicrotask(() => document.getElementById(`step-tab-${stepNum}`)?.focus());
  };

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      if (index < steps.length - 1) {
        e.preventDefault();
        const next = steps[index + 1];
        setStep(index + 1);
        focusTab(next.num);
      }
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      if (index > 0) {
        e.preventDefault();
        const prev = steps[index - 1];
        setStep(index - 1);
        focusTab(prev.num);
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      setStep(0);
      focusTab(steps[0].num);
    } else if (e.key === "End") {
      e.preventDefault();
      const last = steps.length - 1;
      setStep(last);
      focusTab(steps[last].num);
    }
  };

  return (
    <section id="how-it-works" className="py-28 lg:py-36">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="mb-3 text-sm uppercase tracking-[0.15em] text-muted-foreground">
              How it works
            </p>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Four steps from input to launch
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              A single production flow that stays light on your side: you supply brand and content,
              we handle structure, design, and deployment.
            </p>

            <div className="mt-10 hidden items-start gap-5 lg:flex">
              <div className="relative h-44 w-[3px] overflow-hidden rounded-full bg-slate-200/55 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)]">
                <motion.div
                  className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-slate-900 via-slate-600 to-cyan-700 shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_2px_10px_-2px_rgba(14,116,144,0.3)]"
                  animate={{ height: progressHeight }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="space-y-1" role="tablist" aria-label="Steps">
                {steps.map((step, index) => {
                  const selected = index === activeIndex;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      role="tab"
                      id={`step-tab-${step.num}`}
                      aria-selected={selected}
                      aria-controls={`step-panel-${step.num}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setStep(index)}
                      onKeyDown={(e) => onTabKeyDown(e, index)}
                      className={`w-full rounded-2xl px-3 py-2.5 text-left transition-all duration-200 ${
                        selected
                          ? "bg-white/90 text-foreground shadow-sm ring-1 ring-slate-200/80"
                          : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                      }`}
                    >
                      <div className="text-xs uppercase tracking-[0.24em]">{step.num}</div>
                      <div className="mt-1 text-sm font-semibold">{step.title}</div>
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2 pl-1">
                <button
                  type="button"
                  aria-label="Previous step"
                  disabled={activeIndex === 0}
                  onClick={() => {
                    const previous = Math.max(0, activeIndex - 1);
                    setStep(previous);
                    focusTab(steps[previous].num);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/85 text-slate-700 shadow-sm transition-all enabled:hover:-translate-y-0.5 enabled:hover:border-slate-300 enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <ChevronUp size={16} aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Next step"
                  disabled={activeIndex === steps.length - 1}
                  onClick={() => {
                    const next = Math.min(steps.length - 1, activeIndex + 1);
                    setStep(next);
                    focusTab(steps[next].num);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/85 text-slate-700 shadow-sm transition-all enabled:hover:translate-y-0.5 enabled:hover:border-slate-300 enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <ChevronDown size={16} aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="relative hidden lg:block pl-12">
              <div
                className="pointer-events-none absolute left-5 top-0 h-full w-[3px] -translate-x-px overflow-hidden rounded-full bg-slate-200/55 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)]"
                aria-hidden
              />
              <motion.div
                className="pointer-events-none absolute left-5 top-0 w-[3px] -translate-x-px rounded-full bg-gradient-to-b from-slate-900 via-slate-600 to-cyan-700 shadow-[0_0_0_1px_rgba(255,255,255,0.65),0_2px_12px_-2px_rgba(14,116,144,0.35)]"
                animate={{ height: progressHeight }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="relative min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={steps[activeIndex].num}
                    id={`step-panel-${steps[activeIndex].num}`}
                    role="tabpanel"
                    aria-labelledby={`step-tab-${steps[activeIndex].num}`}
                    initial={{ opacity: 0, y: 24, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 0.99 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div className="absolute left-[-31px] top-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-slate-100 bg-slate-900 shadow-[0_0_0_8px_rgba(255,255,255,0.8)]" />

                    <div className="glass-panel group relative overflow-hidden rounded-[1.9rem] p-8">
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 via-slate-700 to-cyan-800" />
                      <div className="absolute -right-10 top-10 h-28 w-28 rounded-full bg-cyan-100/70 blur-2xl transition-all duration-500" />
                      <span className="absolute right-6 top-4 text-5xl font-bold tracking-tight text-slate-300/35">
                        {steps[activeIndex].num}
                      </span>

                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-cyan-800 text-white shadow-lg shadow-slate-900/15">
                          {(() => {
                            const Icon = steps[activeIndex].icon;
                            return <Icon size={20} aria-hidden />;
                          })()}
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Step {steps[activeIndex].num} of 04
                          </div>
                          <h3 className="text-xl font-semibold text-foreground">{steps[activeIndex].title}</h3>
                        </div>
                      </div>

                      {steps[activeIndex].completion && (
                        <StepCompletionBanner
                          title={steps[activeIndex].completion.title}
                          subtitle={steps[activeIndex].completion.subtitle}
                        />
                      )}

                      <div className="grid gap-8 md:grid-cols-[1fr_220px] md:items-end md:gap-10">
                        <div className="max-w-xl md:min-w-0">
                          <p className="mb-4 text-base leading-relaxed text-foreground/90 md:text-[1.05rem]">
                            {steps[activeIndex].desc}
                          </p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {steps[activeIndex].detail}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {steps[activeIndex].tags.map((item) => (
                              <span
                                key={`${steps[activeIndex].num}-${item}`}
                                className="rounded-full border border-slate-200/90 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <motion.div
                          animate={{ opacity: 1, y: -2 }}
                          transition={{ duration: 0.3 }}
                          className="rounded-[1.4rem] border border-slate-200/70 bg-white/85 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:border-l md:border-l-slate-200/80 md:pl-6"
                          aria-hidden
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <div className="h-2 w-20 rounded-full bg-slate-200" />
                            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                              Preview
                            </div>
                          </div>
                          <div className="mb-3 rounded-2xl bg-[rgba(15,23,42,0.06)] p-3">
                            <div className="mb-2 h-2 w-16 rounded-full bg-slate-200" />
                            <div className="mb-2 h-10 rounded-xl bg-[rgba(15,23,42,0.08)]" />
                            <div className="h-2 w-10 rounded-full bg-slate-100" />
                          </div>
                          <div className="mb-2 h-2 w-24 rounded-full bg-slate-200" />
                          <div className="mb-3 h-2 w-16 rounded-full bg-slate-100" />
                          <div className="flex gap-2">
                            <div className="h-8 flex-1 rounded-xl bg-slate-100" />
                            <div className="h-8 w-10 rounded-xl bg-slate-50" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-10 lg:hidden">
              {steps.map((step) => (
                <div key={step.num}>
                  <div className="glass-panel relative overflow-hidden rounded-[1.9rem] p-8">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 via-slate-700 to-cyan-800" />
                    <span className="absolute right-6 top-4 text-5xl font-bold text-slate-300/35">
                      {step.num}
                    </span>
                    <div className="mb-5 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-cyan-800 text-white shadow-lg shadow-slate-900/15">
                        <step.icon size={20} aria-hidden />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Step {step.num}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      </div>
                    </div>
                    {step.completion && (
                      <StepCompletionBanner title={step.completion.title} subtitle={step.completion.subtitle} />
                    )}
                    <p className="mb-3 text-base leading-relaxed text-foreground/90">{step.desc}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {step.tags.map((item) => (
                        <span
                          key={`${step.num}-${item}`}
                          className="rounded-full border border-slate-200/90 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
