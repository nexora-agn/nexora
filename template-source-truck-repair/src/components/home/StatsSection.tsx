import { useEffect, useRef, useState } from "react";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";

function StatItem({ value, suffix, label, active }: { value: number | string; suffix?: string; label: string; active: boolean }) {
  const num = typeof value === "number" ? value : parseInt(String(value), 10) || 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || typeof value !== "number") return;
    let start = 0;
    const step = num / 125;
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [num, active, value]);

  const display = typeof value === "number" ? count : value;

  return (
    <div className="text-center">
      <p className="font-display text-4xl lg:text-5xl text-[hsl(var(--secondary))] mb-2">
        {display.toLocaleString()}{suffix || ""}
      </p>
      <p className="text-xs uppercase tracking-[0.18em] text-white/70">{label}</p>
    </div>
  );
}

const StatsSection = () => {
  const { stats } = useSiteContent();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="industrial-section bg-[hsl(var(--primary))] text-white">
      <div className="container-custom container-inset">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={i} value={stat.value} suffix={stat.suffix} label={stat.label} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
