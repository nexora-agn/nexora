import { motion } from "framer-motion";

const TRUST_SLIDER_HEADING = "Trusted by construction companies across the U.S.";

const TRUST_SLIDER_NAMES = [
  "True North Builders",
  "Hardhat Construction",
  "Summit Construction",
  "Pioneer Builders",
  "Ironcrest Companies",
] as const;

const TrustSection = () => {
  const scrolling = [...TRUST_SLIDER_NAMES, ...TRUST_SLIDER_NAMES];

  return (
    <section
      className="relative overflow-hidden border-y border-neutral-900 bg-neutral-950 py-12 md:py-14"
      aria-labelledby="trust-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-25%,rgba(148,163,184,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p
            id="trust-heading"
            className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500"
          >
            {TRUST_SLIDER_HEADING}
          </p>
          <div className="mx-auto mb-8 h-0.5 w-10 bg-brand" aria-hidden />

          <div className="overflow-hidden py-2">
            <div
              className="flex w-max items-center gap-10 md:gap-14"
              style={{ animation: "marquee 22s linear infinite" }}
            >
              {scrolling.map((name, index) => (
                <span
                  key={`${name}-${index}`}
                  className="select-none whitespace-nowrap text-xs font-bold uppercase tracking-[0.12em] text-neutral-500 sm:text-sm sm:tracking-[0.16em]"
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
