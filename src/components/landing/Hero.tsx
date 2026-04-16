import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">
            No coding. No stress. Just results.
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-foreground mb-6">
            Your website ready
            <br />
            in 4 simple steps
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Upload your logo, choose your colors, and we'll handle the rest.
            In as little as 48 hours. No stress. No coding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 text-base h-12 gap-2">
              Get Started <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12">
              Request Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
