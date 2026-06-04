import { Link } from "react-router-dom";
import { ArrowRight, Clock, FileText, Phone, ShieldCheck } from "lucide-react";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const STEP_ICONS = [Phone, Clock, FileText, ShieldCheck] as const;

interface ProcessSectionProps {
  className?: string;
}

const ProcessSection = ({ className }: ProcessSectionProps) => {
  const { company: COMPANY, processSteps: PROCESS_STEPS } = useSiteContent();

  return (
    <section className={cn("bg-white py-14 sm:py-16 lg:py-20 border-y border-[hsl(var(--border))]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">
              What to Expect
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase text-[hsl(var(--primary))] leading-tight">
              Plumbing Done Right,
              <span className="block text-[hsl(var(--secondary))]">Step by Step</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              From your first call to the final walkthrough, {COMPANY.name} keeps every job clear,
              on schedule, and backed by licensed workmanship.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[hsl(var(--primary))] px-5 py-3 text-sm font-display font-bold uppercase tracking-wider text-white hover:bg-[hsl(var(--primary))]/90 transition-colors"
            >
              Schedule Service
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ol className="lg:col-span-8 space-y-4 sm:space-y-5">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? Phone;
              const num = String(index + 1).padStart(2, "0");

              return (
                <li
                  key={step.id}
                  className={cn(
                    "group flex gap-4 sm:gap-6 rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--flow-surface))] p-5 sm:p-6 transition-colors",
                    "hover:border-[hsl(var(--secondary))]/40 hover:bg-white hover:shadow-md",
                  )}
                >
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    <span
                      aria-hidden
                      className="font-display text-3xl sm:text-4xl font-bold leading-none text-[hsl(var(--secondary))]/35 group-hover:text-[hsl(var(--secondary))]/65 transition-colors"
                    >
                      {num}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[hsl(var(--primary))] text-[hsl(var(--secondary))]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                  </div>

                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
