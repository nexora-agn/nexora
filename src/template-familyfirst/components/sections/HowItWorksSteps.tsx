import { Phone, Search, FileCheck, Hammer, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const STEP_ICONS = [Phone, Search, FileCheck, Hammer, ShieldCheck] as const;

export type HowItWorksStep = {
  id: string;
  label: string;
  description: string;
};

interface HowItWorksStepsProps {
  title?: string;
  steps: HowItWorksStep[];
  className?: string;
}

const HowItWorksSteps = ({ title = "How It Works", steps, className }: HowItWorksStepsProps) => {
  const items = steps.slice(0, 5);

  return (
    <section className={cn("bg-white py-14 lg:py-20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-display text-center text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-10">
          {title}
        </h2>
        <ul className="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-x-6 gap-y-10 md:gap-x-8 lg:gap-x-10 lg:gap-y-12">
          {items.map((s, i) => {
            const Icon = STEP_ICONS[i] ?? Hammer;
            return (
              <li
                key={s.id}
                className="flex w-[calc(50%-0.75rem)] flex-col items-center text-center sm:w-36 md:w-40 lg:w-44"
              >
                <span className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--primary))] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] md:h-14 md:w-14">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </span>
                <h3 className="mt-3 font-display text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))]">
                  {s.label}
                </h3>
                <p className="mt-1 max-w-[11rem] text-xs leading-relaxed text-slate-600">{s.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HowItWorksSteps;
