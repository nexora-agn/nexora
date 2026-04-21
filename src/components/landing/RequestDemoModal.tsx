import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  "Custom site + preview before you commit",
  "We ship—you don’t manage devs",
  "Ongoing support on your plan",
];

interface RequestDemoModalProps {
  open: boolean;
  onClose: () => void;
}

const RequestDemoModal = ({ open, onClose }: RequestDemoModalProps) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-background rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto grid md:grid-cols-2"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>

            {/* Left side — Benefits */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-6">
                Book a demo
                <br />
                <span className="text-neutral-600">See it in 15 minutes.</span>
              </h2>

              <div className="space-y-3 mb-8">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-neutral-950 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Typical verticals</p>
              <div className="flex flex-wrap gap-2">
                {["Construction", "Real estate", "Field services", "Distribution"].map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side — Form */}
            <div className="p-8 md:p-10 bg-secondary/30 rounded-r-2xl">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <CheckCircle2 size={48} className="text-foreground mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Thank you!</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input placeholder="Full Name *" required className="h-12 rounded-xl bg-background" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email address *" required className="h-12 rounded-xl bg-background" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Company Name" className="h-12 rounded-xl bg-background" />
                    <select className="h-12 rounded-xl bg-background border border-input px-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">Industry</option>
                      <option>E-commerce</option>
                      <option>SaaS</option>
                      <option>Agency</option>
                      <option>Restaurant</option>
                      <option>Real Estate</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <Input type="tel" placeholder="Phone number *" required className="h-12 rounded-xl bg-background" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Do you already have a website? *
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="hasWebsite" value="yes" className="accent-foreground" />
                        <span className="text-sm text-foreground">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="hasWebsite" value="no" defaultChecked className="accent-foreground" />
                        <span className="text-sm text-foreground">No</span>
                      </label>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                    <input type="checkbox" className="accent-foreground mt-1" />
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      I'd like to receive updates and tips about building a great website.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl border-0 bg-brand text-base font-semibold text-brand-foreground hover:bg-brand-muted"
                  >
                    Request demo
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestDemoModal;
