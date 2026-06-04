import {
  ClipboardCheck,
  FileSpreadsheet,
  CalendarClock,
  HardHat,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const STEP_ICONS: Record<string, LucideIcon> = {
  inspection: ClipboardCheck,
  estimate: FileSpreadsheet,
  plan: CalendarClock,
  install: HardHat,
  cleanup: ShieldCheck,
};

interface ProcessSectionProps {
  className?: string;
}

const ProcessSection = ({ className }: ProcessSectionProps) => {
  const { processSteps: PROCESS_STEPS } = useSiteContent();

  if (!PROCESS_STEPS.length) return null;

  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-border bg-muted/30 py-14 md:py-20 lg:py-24",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 18px, hsl(var(--border)) 18px, hsl(var(--border)) 19px)",
        }}
      />

      <div className="container-custom relative px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="text-xs font-bold tracking-[0.24em] text-secondary">
              JOB FLOW · NYC
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[42px] font-black uppercase tracking-tight leading-[1.05] text-primary">
              Five steps from{" "}
              <span className="text-secondary">inspection</span> to sign-off.
            </h2>
            <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
              Permits, parking, and borough logistics are built into every phase — not
              bolted on after you sign. You always know who is on site and what happens next.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-primary hover:text-secondary transition-colors"
            >
              Schedule inspection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-8">
            <ol className="space-y-3 md:space-y-4">
              {PROCESS_STEPS.map((step, index) => {
                const Icon = STEP_ICONS[step.id] ?? ClipboardCheck;
                const phase = String(index + 1).padStart(2, "0");
                return (
                  <li
                    key={step.id}
                    className="group relative flex gap-4 md:gap-5 rounded-xl border border-border bg-card p-4 md:p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div
                      className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-secondary/80"
                      aria-hidden
                    />
                    <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.6} />
                      <span className="mt-0.5 text-[9px] font-bold tracking-widest opacity-80">
                        {phase}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-base md:text-lg font-black uppercase tracking-wide text-primary">
                          {step.label}
                        </h3>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-secondary/90 uppercase">
                          Phase {phase}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <span
                      className="hidden sm:block text-5xl md:text-6xl font-black leading-none text-primary/[0.06] select-none"
                      aria-hidden
                    >
                      {phase}
                    </span>
                  </li>
                );
              })}
            </ol>

            <p className="mt-6 rounded-lg border border-dashed border-secondary/40 bg-secondary/5 px-4 py-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
              <span className="font-bold text-primary">NYC note:</span> Emergency tarping and
              insurance documentation can start the same day — full replacements follow the
              phases above once scope and permits are locked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
