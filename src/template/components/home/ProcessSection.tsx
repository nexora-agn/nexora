import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { Search, PenLine, Calendar, BrickWall, KeyRound, Headphones } from "lucide-react";
import { COMPANY, PROCESS_STEPS } from "@template/data/siteData";
import { cn } from "@/lib/utils";

const icons = [Search, PenLine, Calendar, BrickWall, KeyRound, Headphones];

interface ProcessSectionProps {
  className?: string;
}

const ProcessSection = ({ className }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  const maxScrollableHeight = useMemo(
    () => `${Math.max(200, PROCESS_STEPS.length * 42)}vh`,
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      if (window.innerWidth < 1024) {
        setActiveStep(0);
        setLineProgress(0);
        return;
      }

      const rect = section.getBoundingClientRect();
      const stickyTop = 96;
      const totalTrack = section.offsetHeight - window.innerHeight;
      const raw = (stickyTop - rect.top) / Math.max(1, totalTrack);
      const progress = Math.min(1, Math.max(0, raw));
      const index = Math.min(PROCESS_STEPS.length - 1, Math.floor(progress * PROCESS_STEPS.length));
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("bg-background section-padding lg:h-[var(--process-scroll-span)]", className)}
      style={{ "--process-scroll-span": maxScrollableHeight } as CSSProperties}
    >
      <div className="container-custom px-4 md:px-8 lg:sticky lg:top-24">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          The {COMPANY.name} <span className="text-secondary">Process</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 md:mb-16">
          One accountable team from first sketch to warranty — with clarity at every gate.
        </p>

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-0.5 bg-border" aria-hidden />
          <div
            className="hidden lg:block absolute top-8 left-[8%] h-0.5 bg-secondary transition-[width] duration-200"
            style={{ width: `${lineProgress * 84}%` }}
            aria-hidden
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = icons[i] ?? Search;
              const active = i <= activeStep;
              return (
                <div key={step.id} className="relative flex flex-col items-center text-center">
                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 mb-4 transition-colors ${
                      active
                        ? "border-secondary bg-secondary text-secondary-foreground shadow-lg"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className={`font-bold text-sm uppercase tracking-wide ${active ? "text-secondary" : "text-foreground"}`}>
                    {step.label}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-snug max-w-[140px] mx-auto hidden sm:block">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
