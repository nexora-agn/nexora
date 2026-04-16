import { motion } from "framer-motion";
import { Globe, Smartphone, Zap, Wrench, Monitor } from "lucide-react";

const items = [
  { icon: Globe, title: "Fully Ready Website", desc: "Designed, built, and live — no extra work needed." },
  { icon: Monitor, title: "Modern Design", desc: "Clean, professional look that represents your brand." },
  { icon: Smartphone, title: "Mobile Responsive", desc: "Looks perfect on every screen and device." },
  { icon: Zap, title: "Fast Delivery", desc: "Your website ready in as little as 48 hours." },
  { icon: Wrench, title: "No Technical Work", desc: "We handle everything — you just show up." },
];

const WhatYouGet = () => {
  return (
    <section id="what-you-get" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-3">
            What you get
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Everything you need. Nothing you don't.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border p-8 hover:border-foreground/20 transition-colors"
            >
              <item.icon size={22} className="text-foreground mb-4" />
              <h3 className="text-base font-semibold text-foreground mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
