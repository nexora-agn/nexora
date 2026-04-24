import { motion } from "framer-motion";

const TRUST_SLIDER_HEADING = "Trusted by local businesses";

const TRUST_SLIDER_NAMES = [
  "F.Morina Bauunternehmen",
  "Arizona Roof Doctors",
  "Boss Roofing & Siding",
  "The Honest Guys",
  "Go Prime Electric",
  "Pro Lawn & Pest Control",
  "Indy Precision Painters",
] as const;

/** Sits at the bottom of the landing hero (white background, above the dark feature bar). */
const HeroTrustStrip = () => {
  const scrolling = [...TRUST_SLIDER_NAMES, ...TRUST_SLIDER_NAMES];

  return (
    <div className="relative w-full shrink-0 overflow-hidden bg-background" aria-labelledby="trust-heading">
      <div className="relative mx-auto max-w-6xl px-5 py-8 md:px-6 md:py-9">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p
            id="trust-heading"
            className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500"
          >
            {TRUST_SLIDER_HEADING}
          </p>

          <div className="overflow-hidden py-1">
            <div
              className="flex w-max items-center gap-10 md:gap-14"
              style={{ animation: "marquee 22s linear infinite" }}
            >
              {scrolling.map((name, index) => (
                <span
                  key={`${name}-${index}`}
                  className="select-none whitespace-nowrap text-xs font-bold uppercase tracking-[0.12em] text-neutral-400 sm:text-sm sm:tracking-[0.16em]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroTrustStrip;
