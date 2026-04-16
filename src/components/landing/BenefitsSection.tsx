import { motion } from "framer-motion";
import { Clock, Code2, HandMetal, Rocket } from "lucide-react";

const benefits = [
  { icon: Clock, title: "Save Time", desc: "No weeks of back-and-forth. Get your site fast." },
  { icon: Code2, title: "No Coding Needed", desc: "Zero technical skills required. We do it all." },
  { icon: HandMetal, title: "Done For You", desc: "From design to launch, completely handled." },
  { icon: Rocket, title: "Launch Fast", desc: "Go live in as little as 48 hours." },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-28 bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.15em] opacity-60 mb-3">
            Why us
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            The easiest way to get online
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                <b.icon size={22} />
              </div>
              <h3 className="text-base font-semibold mb-1.5">{b.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
