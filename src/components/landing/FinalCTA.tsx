import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onRequestDemo?: () => void;
}

const FinalCTA = ({ onRequestDemo }: FinalCTAProps) => {
  return (
    <section id="cta" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950 shadow-[0_32px_64px_-24px_rgba(15,23,42,0.55)] md:rounded-[2rem]"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,rgba(14,116,144,0.22),transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />

          <div className="relative grid gap-12 px-8 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-16 md:px-14 md:py-16 lg:gap-20">
            <div className="border-l-2 border-cyan-500/40 pl-6 md:pl-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Next step
              </p>
              <h2 className="mb-5 text-3xl font-bold tracking-tight text-white md:text-4xl md:leading-[1.15] lg:text-[2.5rem]">
                Ready to turn your brand into a live site
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-slate-400 md:text-[1.0625rem]">
                Share your positioning, assets, and goals—we map them into a structured build with
                clear milestones. You review; we execute. No engineering queue on your side.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row lg:items-center lg:justify-end">
              <Button
                size="lg"
                className="h-12 rounded-xl border-0 bg-white px-8 text-base font-semibold text-slate-950 shadow-none hover:bg-slate-100"
                onClick={onRequestDemo}
              >
                Get started
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-slate-600/90 bg-transparent px-8 text-base font-medium text-slate-200 hover:bg-white/5 hover:text-white"
                asChild
              >
                <a href="#how-it-works">View the process</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
