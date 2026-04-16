import { motion } from "framer-motion";
import { ImageIcon, Palette, FileText, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ImageIcon,
    title: "Your Logo",
    desc: "Upload your logo to personalize your website.",
  },
  {
    num: "02",
    icon: Palette,
    title: "Your Colors",
    desc: "Choose your brand colors to style your website instantly.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Your Content",
    desc: "Tell us about your business — we'll design and structure everything.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "We Build & Launch",
    desc: "We create and launch your website, ready to go live.",
  },
];

const StepsSection = () => {
  return (
    <section id="how-it-works" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            4 steps. That's it.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-8 hover:border-foreground/20 transition-colors"
            >
              <span className="text-5xl font-bold text-muted-foreground/10 absolute top-4 right-6">
                {step.num}
              </span>
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mb-5">
                <step.icon size={20} className="text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
