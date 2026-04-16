import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onRequestDemo?: () => void;
}

const Hero = ({ onRequestDemo }: HeroProps) => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            No coding. No stress. Just results.
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-[1.02] tracking-tight text-foreground md:text-7xl">
            Launch a
            {" "}
            <span className="text-gradient">colorful website</span>
            <br />
            that feels alive
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl lg:mx-0">
            Upload your logo, choose your vibe, and watch your site transform with bold visuals,
            smooth motion, and a polished launch in as little as 48 hours.
          </p>
          <div className="mb-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              className="h-12 gap-2 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-800 px-8 text-base shadow-lg shadow-slate-900/20 transition-transform hover:scale-[1.02]"
              onClick={onRequestDemo}
            >
              Get Started <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-slate-200 bg-white/75 px-8 text-base backdrop-blur hover:bg-white"
              onClick={onRequestDemo}
            >
              Request Demo
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start">
            {["Animated sections", "Custom colors", "Modern mobile layout"].map((item) => (
              <span key={item} className="rounded-full border border-border/70 bg-white/70 px-4 py-2 backdrop-blur">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-4">
            <div className="absolute inset-x-6 top-6 h-24 rounded-full bg-gradient-to-r from-slate-700/20 to-cyan-800/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/55">Instant Website Studio</p>
                  <p className="mt-1 text-sm text-white/80">Interactive homepage preview</p>
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                </div>
              </div>

              <div className="grid gap-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-800 p-6"
                >
                  <p className="mb-10 text-xs uppercase tracking-[0.3em] text-white/75">Live hero section</p>
                  <div className="max-w-xs">
                    <h3 className="mb-3 text-3xl font-semibold leading-tight">Make your brand impossible to ignore.</h3>
                    <p className="text-sm text-white/80">Layered gradients, animated highlights, and crisp calls to action.</p>
                  </div>
                </motion.div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Motion cards", color: "from-slate-700/25 to-slate-900/5" },
                    { title: "Glow effects", color: "from-cyan-800/20 to-sky-900/5" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.35 + index * 0.12 }}
                      className={`rounded-2xl border border-white/10 bg-gradient-to-br ${item.color} p-5`}
                    >
                      <div className="mb-8 h-2 w-16 rounded-full bg-white/50" />
                      <p className="text-sm font-medium text-white/90">{item.title}</p>
                    </motion.div>
                  ))}
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
