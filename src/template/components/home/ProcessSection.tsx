import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { Search, PenLine, Calendar, BrickWall, KeyRound, Headphones } from "lucide-react";
import { useSiteContent } from "@template/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const icons = [Search, PenLine, Calendar, BrickWall, KeyRound, Headphones];

interface ProcessSectionProps {
  className?: string;
}

const ProcessSection = ({ className }: ProcessSectionProps) => {
  const { company: COMPANY, processSteps: PROCESS_STEPS } = useSiteContent();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  const maxScrollableHeight = useMemo(
    () => `${Math.max(200, PROCESS_STEPS.length * 42)}vh`,
    [PROCESS_STEPS.length],
  );

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      if (window.innerWidth < 1024) {
        setActiveStep(PROCESS_STEPS.length - 1);
        setLineProgress(1);
        return;
      }

      const rect = section.getBoundingClientRect();
      const stickyTop = 96;
      const totalTrack = section.offsetHeight - window.innerHeight;
      const raw = (stickyTop - rect.top) / Math.max(1, totalTrack);
      const progress = Math.min(1, Math.max(0, raw));
      const index = Math.min(
        PROCESS_STEPS.length - 1,
        Math.floor(progress * PROCESS_STEPS.length),
      );
      setActiveStep(index);
      setLineProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [PROCESS_STEPS.length]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative bg-background section-padding lg:h-[var(--process-scroll-span)]",
        className,
      )}
      style={{ "--process-scroll-span": maxScrollableHeight } as CSSProperties}
    >
      <div className="container-custom px-4 md:px-8 lg:sticky lg:top-24">
        <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
            HOW WE WORK
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1]">
            The {COMPANY.name}{" "}
            <span className="text-secondary">Process</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            One accountable team from first sketch to warranty — with clarity
            and communication at every gate.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="relative hidden lg:block">
          <div
            className="absolute top-8 left-[8%] right-[8%] h-0.5 bg-border"
            aria-hidden
          />
          <div
            className="absolute top-8 left-[8%] h-0.5 bg-secondary transition-[width] duration-200"
            style={{ width: `${lineProgress * 84}%` }}
            aria-hidden
          />
          <div className="grid grid-cols-6 gap-4">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = icons[i] ?? Search;
              const active = i <= activeStep;
              return (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 mb-4 transition-all duration-300 ${
                      active
                        ? "border-secondary bg-secondary text-secondary-foreground shadow-[0_10px_30px_-8px_hsl(var(--secondary)/0.55)] scale-105"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <span
                    className={`text-[10px] font-bold tracking-[0.22em] mb-1 transition-colors ${
                      active ? "text-secondary" : "text-muted-foreground"
                    }`}
                  >
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`font-bold text-sm uppercase tracking-wide transition-colors ${
                      active ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {step.label}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-snug max-w-[150px] mx-auto">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/tablet: vertical timeline */}
        <div className="relative lg:hidden">
          <div
            className="absolute left-8 top-2 bottom-2 w-0.5 bg-border"
            aria-hidden
          />
          <ul className="space-y-8">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = icons[i] ?? Search;
              return (
                <li key={step.id} className="relative flex gap-5">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-secondary text-secondary-foreground shadow-md">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <div className="pt-1">
                    <span className="text-[10px] font-bold tracking-[0.22em] text-secondary">
                      STEP {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-bold text-base uppercase tracking-wide text-primary">
                      {step.label}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
