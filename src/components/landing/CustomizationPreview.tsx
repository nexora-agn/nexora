import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const colorPresets = [
  { name: "Midnight", primary: "#111111", accent: "#ffffff" },
  { name: "Ocean", primary: "#1e40af", accent: "#dbeafe" },
  { name: "Forest", primary: "#166534", accent: "#dcfce7" },
  { name: "Sunset", primary: "#c2410c", accent: "#fff7ed" },
  { name: "Violet", primary: "#7c3aed", accent: "#ede9fe" },
];

const CustomizationPreview = () => {
  const [selected, setSelected] = useState(0);
  const [logoName, setLogoName] = useState("");
  const preset = colorPresets[selected];

  const handleUpload = () => {
    setLogoName("mylogo.svg");
  };

  return (
    <section className="py-28 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-3">
            Try it yourself
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            See it come to life
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Logo Upload */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                1. Upload your logo
              </label>
              <button
                onClick={handleUpload}
                className="w-full border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-3 hover:border-foreground/30 transition-colors bg-background"
              >
                {logoName ? (
                  <>
                    <Check size={24} className="text-foreground" />
                    <span className="text-sm text-muted-foreground">{logoName}</span>
                  </>
                ) : (
                  <>
                    <Upload size={24} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload your logo
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Color Picker */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                2. Choose your colors
              </label>
              <div className="flex flex-wrap gap-3">
                {colorPresets.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelected(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm transition-all ${
                      selected === i
                        ? "border-foreground bg-foreground text-primary-foreground"
                        : "border-border hover:border-foreground/30 text-foreground"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-border"
                      style={{ backgroundColor: c.primary }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border overflow-hidden bg-background shadow-lg"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
              <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
              <span className="flex-1 mx-4 h-5 bg-muted rounded-md" />
            </div>

            {/* Simulated website */}
            <div className="transition-colors duration-500" style={{ backgroundColor: preset.accent }}>
              {/* Nav */}
              <div
                className="flex items-center justify-between px-6 py-4 transition-colors duration-500"
                style={{ backgroundColor: preset.primary }}
              >
                <span className="text-sm font-bold" style={{ color: preset.accent }}>
                  {logoName ? "YourBrand" : "Logo"}
                </span>
                <div className="flex gap-4">
                  {["Home", "About", "Contact"].map((l) => (
                    <span key={l} className="text-xs" style={{ color: preset.accent + "99" }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero */}
              <div className="px-6 py-12 text-center">
                <div
                  className="text-2xl font-bold mb-2 transition-colors duration-500"
                  style={{ color: preset.primary }}
                >
                  Welcome to Your Site
                </div>
                <p className="text-sm mb-6" style={{ color: preset.primary + "88" }}>
                  Built just for you, ready in 48 hours.
                </p>
                <span
                  className="inline-block px-5 py-2 rounded-full text-xs font-medium transition-colors duration-500"
                  style={{
                    backgroundColor: preset.primary,
                    color: preset.accent,
                  }}
                >
                  Learn More
                </span>
              </div>

              {/* Cards */}
              <div className="px-6 pb-8 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="rounded-lg p-4 transition-colors duration-500"
                    style={{
                      backgroundColor: preset.primary + "0D",
                      borderColor: preset.primary + "1A",
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded mb-2 transition-colors duration-500"
                      style={{ backgroundColor: preset.primary + "22" }}
                    />
                    <div
                      className="h-2 rounded w-3/4 mb-1.5"
                      style={{ backgroundColor: preset.primary + "22" }}
                    />
                    <div
                      className="h-2 rounded w-1/2"
                      style={{ backgroundColor: preset.primary + "11" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationPreview;
