import { motion } from "framer-motion";

const logos = ["Acme Corp", "Globex", "Initech", "Umbrella", "Stark Inc"];

const gridPattern =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

const TrustSection = () => {
  const scrollingLogos = [...logos, ...logos];

  return (
    <section
      className="relative overflow-hidden border-y border-slate-800/80 bg-slate-950 py-16 md:py-20"
      aria-labelledby="trust-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-25%,rgba(14,116,144,0.2),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{ backgroundImage: gridPattern }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p
            id="trust-heading"
            className="mb-8 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500"
          >
            Trusted by 500+ businesses
          </p>

          <div className="overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/35 py-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] md:rounded-3xl md:py-7">
            <div
              className="flex w-max items-center gap-8 md:gap-12"
              style={{ animation: "marquee 18s linear infinite" }}
            >
              {scrollingLogos.map((name, index) => (
                <span
                  key={`${name}-${index}`}
                  className="select-none rounded-full border border-slate-600/80 bg-slate-800/70 px-5 py-3 text-base font-semibold text-slate-300 shadow-sm md:text-lg"
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
