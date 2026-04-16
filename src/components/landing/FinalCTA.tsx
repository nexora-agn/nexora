import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-28">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Start your website in minutes
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            No complexity. No waiting. Just a beautiful website, built for you.
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

export default FinalCTA;
