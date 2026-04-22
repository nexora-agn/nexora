import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, LayoutTemplate, Smartphone } from "lucide-react";

interface HeroProps {
  onRequestDemo?: () => void;
}

const Hero = ({ onRequestDemo }: HeroProps) => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_0_3px_rgba(245,197,24,0.2)]" />
            Your brand. Live faster.
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-neutral-950 md:text-6xl lg:text-[3.35rem]">
            A site that feels
            <br />
            <span className="text-accent">100% yours</span>
          </h1>
          <p className="mb-8 max-w-lg text-base font-medium leading-relaxed text-neutral-600 md:text-lg lg:mx-0">
            Logo, colours, story—built to convert. No generic templates. No dev team on your payroll.
          </p>
          <div className="mb-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
            <Button
              size="lg"
              className="h-12 gap-2 rounded-xl border-0 bg-neutral-950 px-8 text-base font-semibold text-white shadow-lg shadow-neutral-900/15 transition-transform hover:scale-[1.01] hover:bg-neutral-800"
              onClick={onRequestDemo}
            >
              Book a Demo
              <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-neutral-300 bg-white/80 px-8 text-base font-medium text-neutral-950 backdrop-blur hover:bg-white"
              asChild
            >
              <a
                href="#live-preview"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("live-preview");
                  if (!el) return;
                  const top = el.getBoundingClientRect().top + window.scrollY - 96;
                  window.scrollTo({ top, behavior: "smooth" });
                }}
              >
                Preview Your Site
              </a>
            </Button>
          </div>
          <p className="mb-3 max-w-lg text-center text-sm leading-relaxed text-neutral-600 lg:mx-0 lg:text-left">
            <Link
              to="/start"
              className="font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-950"
            >
              Start a project
            </Link>
            <span className="text-neutral-500">
              {" "}
              — a short guided flow for a new site or migration. We follow up fast.
            </span>
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Preview first · Launch when you say go
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="glass-panel relative overflow-hidden rounded-[1.75rem] p-1 shadow-sm">
            <div className="relative overflow-hidden rounded-[1.6rem] bg-neutral-950 p-5 text-white md:p-6">
              <div
                className="pointer-events-none absolute -right-16 top-20 h-48 w-48 rounded-full bg-white/10 blur-3xl"
                aria-hidden
              />
              <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">Live preview</p>
                  <p className="mt-1 text-sm text-white/85">Desktop &amp; mobile</p>
                </div>
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-5"
                >
                  <div className="mb-4 flex items-center gap-2 text-xs font-medium text-white/70">
                    <Globe2 className="h-4 w-4 text-brand" aria-hidden />
                    Your homepage
                  </div>
                  <div className="mb-3 h-2 w-24 rounded-full bg-white/20" />
                  <div className="mb-5 h-2 w-40 rounded-full bg-white/10" />
                  <div className="mb-5 h-28 rounded-xl bg-white/5" />
                  <div className="flex gap-2">
                    <span className="h-9 flex-1 rounded-lg bg-brand text-center text-xs font-semibold leading-9 text-brand-foreground">
                      Get in touch
                    </span>
                    <span className="h-9 w-28 rounded-lg border border-white/15 bg-white/5" />
                  </div>
                </motion.div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-1 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-white/70">
                      <Smartphone className="h-4 w-4 text-white/80" aria-hidden />
                      Same brand, small screen
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="h-2 w-full rounded-full bg-white/15" />
                      <div className="h-2 w-4/5 rounded-full bg-white/10" />
                      <div className="mt-3 flex gap-2">
                        <div className="h-16 flex-1 rounded-lg bg-white/[0.07]" />
                        <div className="h-16 flex-1 rounded-lg bg-white/[0.05]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                    <LayoutTemplate className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                    <p className="text-[10px] leading-relaxed text-white/50">
                      Typography, spacing, and CTAs stay consistent everywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
