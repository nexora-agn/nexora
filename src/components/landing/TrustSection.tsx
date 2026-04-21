import { motion } from "framer-motion";

const industries = ["Construction", "Real estate", "Field services", "Distribution", "Professional services"];

const TrustSection = () => {
  const scrolling = [...industries, ...industries];

  return (
    <section
      className="relative overflow-hidden border-y border-neutral-900 bg-neutral-950 py-14 md:py-16"
      aria-labelledby="trust-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-25%,rgba(148,163,184,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p
            id="trust-heading"
            className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500"
          >
            Built for teams that move
          </p>
          <p className="mx-auto mb-3 max-w-md text-sm font-medium text-neutral-400 md:text-base">
            Serious websites—without hiring a full product team.
          </p>
          <div className="mx-auto mb-8 h-0.5 w-10 bg-brand" aria-hidden />

          <div className="overflow-hidden py-2">
            <div
              className="flex w-max items-center gap-8 md:gap-12"
              style={{ animation: "marquee 22s linear infinite" }}
            >
              {scrolling.map((name, index) => (
                <span
                  key={`${name}-${index}`}
                  className="select-none whitespace-nowrap text-sm font-medium uppercase tracking-[0.18em] text-neutral-500"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
