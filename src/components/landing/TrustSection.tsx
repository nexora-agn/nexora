import { motion } from "framer-motion";

const logos = ["Acme Corp", "Globex", "Initech", "Umbrella", "Stark Inc"];

const TrustSection = () => {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-10 uppercase tracking-[0.15em]">
            Trusted by 500+ businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {logos.map((name) => (
              <span
                key={name}
                className="text-lg font-semibold text-muted-foreground/40 select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
