import { useEffect, useRef, useState } from "react";

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
      <p className="font-display text-5xl lg:text-6xl text-[hsl(var(--secondary))] mb-2">
        {display}{suffix || ""}
      </p>
      <p className="text-sm uppercase tracking-[0.2em] text-white/70">{label}</p>
    </div>
  );
}

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: 120, label: "Vehicles in Stock", suffix: "+" },
    { value: 2400, label: "Happy Drivers", suffix: "+" },
    { value: 4, label: "Central Texas Locations", suffix: "" },
    { value: 25, label: "Years Experience", suffix: "+" },
  ];

  return (
    <section ref={ref} className="luxury-section bg-[hsl(var(--primary))] text-white">
      <div className="container-custom container-inset">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
