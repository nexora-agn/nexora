import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onRequestDemo?: () => void;
}

const FinalCTA = ({ onRequestDemo }: FinalCTAProps) => {
  return (
    <section id="cta" className="relative scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 shadow-[0_32px_64px_-24px_rgba(10,10,10,0.45)] md:rounded-[2rem]"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-25%,rgba(148,163,184,0.12),transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />

          <div className="relative grid gap-10 px-8 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-16 md:px-14 md:py-16 lg:gap-20">
            <div className="border-l-[3px] border-brand pl-6 md:pl-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Next step</p>
              <h2 className="mb-5 text-3xl font-bold tracking-tight text-white md:text-4xl md:leading-[1.15] lg:text-[2.5rem]">
                Live in days—not months
              </h2>
              <p className="max-w-md text-base font-medium leading-relaxed text-neutral-400 md:text-[1.0625rem]">
                15-minute walkthrough. See preview, timeline, and launch. No fluff.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row lg:items-center lg:justify-end">
              <Button
                size="lg"
                className="h-12 rounded-xl border-0 bg-brand px-8 text-base font-semibold text-brand-foreground shadow-none hover:bg-brand-muted"
                onClick={onRequestDemo}
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-neutral-600/90 bg-transparent px-8 text-base font-medium text-neutral-200 hover:bg-white/5 hover:text-white"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
