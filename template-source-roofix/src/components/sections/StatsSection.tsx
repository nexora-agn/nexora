import { useEffect, useRef, useState } from "react";
import { STATS } from "@/data/siteData";

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-3xl md:text-4xl font-bold text-secondary">{count}{suffix}</div>;
};

const StatsSection = () => (
  <section className="bg-primary text-primary-foreground section-padding">
    <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {STATS.map(stat => (
        <div key={stat.label}>
          <Counter target={stat.value} suffix={stat.suffix} />
          <p className="mt-2 text-sm opacity-80">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;
