import { useEffect, useRef, useState } from "react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

const useCountUp = (target: number, active: boolean, duration = 1800) => {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
};

const Counter = ({ stat, active }: { stat: Stat; active: boolean }) => {
  const value = useCountUp(stat.value, active);
  return (
    <div className="text-center">
      <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white">
        {value.toLocaleString()}
        <span className="text-[hsl(var(--secondary))]">{stat.suffix}</span>
      </p>
      <p className="mt-2 text-xs sm:text-sm font-sans-brand uppercase tracking-[0.18em] text-white/60">{stat.label}</p>
    </div>
  );
};

interface StatsSectionProps {
  stats: Stat[];
  className?: string;
}

const StatsSection = ({ stats, className }: StatsSectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActive(true)),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={cn("luxury-section bg-[hsl(var(--primary))]", className)}>
      <div className="container-custom container-inset">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} direction="up" delay={i * 90}>
              <Counter stat={stat} active={active} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
