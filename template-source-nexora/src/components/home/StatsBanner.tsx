import { useEffect, useRef, useState } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";

/**
 * Parses a stat string like "250+", "15M+", "98%", "10yrs" into:
 *   { prefix: "", number: 250, suffix: "+" }
 * so we can animate the numeric portion while preserving the original formatting.
 */
const parseStat = (value: string) => {
  const match = value.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", number: null as number | null, suffix: value };
  return {
    prefix: match[1] ?? "",
    number: Number(match[2]),
    suffix: match[3] ?? "",
  };
};

const AnimatedNumber = ({
  value,
  active,
  duration = 1400,
}: {
  value: string;
  active: boolean;
  duration?: number;
}) => {
  const { prefix, number, suffix } = parseStat(value);
  const [display, setDisplay] = useState(number ?? 0);

  useEffect(() => {
    if (number == null) return;
    if (!active) {
      setDisplay(0);
      return;
    }
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplay(number);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(number * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [number, active, duration]);

  if (number == null) return <>{value}</>;
  return (
    <>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </>
  );
};

const StatsBanner = () => {
  const { homeStats: HOME_STATS } = useSiteContent();
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(true);
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-secondary py-14 md:py-16 text-secondary-foreground"
    >
      {/* Subtle pattern overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container-custom relative px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-xs font-bold tracking-[0.22em] opacity-90">
            BY THE NUMBERS
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold">
            Nearly three decades of trusted craftsmanship.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0 text-center lg:divide-x lg:divide-secondary-foreground/20">
          {HOME_STATS.map(stat => (
            <div key={stat.label} className="px-2 lg:px-6">
              <p className="text-4xl md:text-5xl font-black tracking-tight tabular-nums">
                <AnimatedNumber value={stat.value} active={active} />
              </p>
              <p className="mt-3 text-sm md:text-base font-semibold uppercase tracking-wider opacity-95">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
