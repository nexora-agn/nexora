import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import RequestDemoModal from "@/components/landing/RequestDemoModal";
import { ChannelsCard, ConversationCard } from "@/components/ai/AiMockCards";
import AiLiveDemo from "@/components/ai/AiLiveDemo";
import {
  aiClosing,
  aiCoreValue,
  aiFeatures,
  aiHero,
  aiHeroConversation,
  aiHowItWorks,
  aiLive,
  aiMoreFeatures,
  aiPlanLimits,
} from "@/data/nexoraAi";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

const AiAssistant = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "AI assistant for your business | Nexora";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? null;
    meta?.setAttribute(
      "content",
      "A smart assistant on your website that answers customers 24/7, books jobs into your calendar, and sends every lead straight to your phone.",
    );
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc !== null) meta.setAttribute("content", prevDesc);
    };
  }, []);

  const openDemo = () => setDemoOpen(true);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative flex min-h-screen flex-col">
        <Navbar onRequestDemo={openDemo} />
        <main className="flex-1 pt-16">
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden>
              <div className="absolute right-[-10%] top-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
              <div className="absolute left-[-8%] top-40 h-72 w-72 rounded-full bg-neutral-900/[0.05] blur-3xl" />
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
              <motion.div {...fadeUp}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  {aiHero.eyebrow}
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl md:leading-[1.08]">
                  {aiHero.title} <span className="text-brand">{aiHero.titleHighlight}</span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
                  {aiHero.subtitle}
                </p>
                <div className="mt-8">
                  <Button
                    size="lg"
                    className="h-12 rounded-xl border-0 bg-brand px-8 text-base font-semibold text-brand-foreground hover:bg-brand-muted"
                    onClick={openDemo}
                  >
                    {aiHero.ctaLabel}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex justify-center lg:justify-end"
              >
                <ConversationCard {...aiHeroConversation} />
              </motion.div>
            </div>
          </section>

          {/* ── How it works (knows your business) ───────────────────────── */}
          <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
            <motion.div
              {...fadeUp}
              className="rounded-[1.75rem] border border-neutral-200 bg-white p-8 shadow-sm md:p-12"
            >
              <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">
                {aiHowItWorks.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base text-neutral-600">{aiHowItWorks.intro}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {aiHowItWorks.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50/70 px-4 py-3"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-neutral-900">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-sm font-medium text-neutral-800">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-base font-medium text-neutral-950">{aiHowItWorks.closing}</p>
            </motion.div>
          </section>

          {/* ── Core value ───────────────────────────────────────────────── */}
          <section className="mx-auto max-w-4xl px-6 py-14 text-center lg:py-20">
            <motion.h2
              {...fadeUp}
              className="text-3xl font-bold tracking-tight text-neutral-950 md:text-[2.75rem] md:leading-[1.1]"
            >
              {aiCoreValue.title}
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.08 }}
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg"
            >
              {aiCoreValue.subtitle}
            </motion.p>
          </section>

          {/* ── Main features (as conversations) ─────────────────────────── */}
          <section className="mx-auto max-w-6xl space-y-12 px-6 pb-4 lg:space-y-20">
            {aiFeatures.map((f, i) => {
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={f.id}
                  {...fadeUp}
                  className={`grid items-center gap-10 md:grid-cols-2 md:gap-14 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  <div>
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <f.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden />
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-neutral-950 md:text-[1.875rem] md:leading-[1.15]">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-neutral-600">{f.explanation}</p>
                    <ul className="mt-5 space-y-2.5">
                      {f.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                          <span className="text-sm font-medium text-neutral-800">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    {f.visual.kind === "conversation" ? (
                      <ConversationCard
                        business={f.visual.business}
                        turns={f.visual.turns}
                        result={f.visual.result}
                      />
                    ) : (
                      <ChannelsCard />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </section>

          {/* ── More of what it does ─────────────────────────────────────── */}
          <section className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
            <motion.h2
              {...fadeUp}
              className="mb-8 text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl"
            >
              More of what it does
            </motion.h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {aiMoreFeatures.map((m, i) => (
                <motion.div
                  key={m.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i % 3) * 0.05 }}
                  className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <m.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden />
                  </span>
                  <p className="font-semibold text-neutral-950">{m.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{m.line}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Live experience ──────────────────────────────────────────── */}
          <section className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
            <div className="grid items-center gap-10 rounded-[1.75rem] border border-neutral-200 bg-white p-8 shadow-sm md:grid-cols-2 md:gap-14 md:p-12">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">
                  {aiLive.title}
                </h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-neutral-600">
                  {aiLive.subtitle}
                </p>
                <p className="mt-6 text-sm font-medium text-neutral-500">{aiLive.note}</p>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                className="flex justify-center md:justify-end"
              >
                <AiLiveDemo />
              </motion.div>
            </div>
          </section>

          {/* ── Plan limits (Starter / Growth — not on pricing cards) ─────── */}
          <section className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
            <motion.div {...fadeUp} className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-8 md:p-12">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
                {aiPlanLimits.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
                {aiPlanLimits.intro}
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {aiPlanLimits.plans.map((plan) => (
                  <li
                    key={plan.name}
                    className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                      {plan.name}
                    </p>
                    <p className="mt-2 text-base font-semibold text-neutral-950">{plan.limit}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-neutral-500">{aiPlanLimits.note}</p>
            </motion.div>
          </section>

          {/* ── Closing CTA ──────────────────────────────────────────────── */}
          <section className="mx-auto max-w-6xl px-6 pb-20 lg:pb-28">
            <motion.div
              {...fadeUp}
              className="relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-neutral-950 px-8 py-14 text-center shadow-[0_32px_64px_-24px_rgba(10,10,10,0.45)] md:px-14 md:py-16"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,197,23,0.12),transparent_55%)]"
                aria-hidden
              />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl md:leading-[1.15]">
                  {aiClosing.title}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-400">
                  {aiClosing.subtitle}
                </p>
                <Button
                  size="lg"
                  className="mt-8 h-12 rounded-xl border-0 bg-brand px-8 text-base font-semibold text-brand-foreground hover:bg-brand-muted"
                  onClick={openDemo}
                >
                  {aiClosing.ctaLabel}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Button>
              </div>
            </motion.div>
          </section>
        </main>
        <Footer />
        <RequestDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      </div>
    </div>
  );
};

export default AiAssistant;
