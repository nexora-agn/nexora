import { useState } from "react";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQSection = () => {
  const { faqItems } = useSiteContent();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="luxury-section bg-[hsl(var(--muted))]">
      <div className="container-custom container-inset max-w-3xl">
        <div className="text-center mb-14">
          <p className="luxury-eyebrow mb-3">Questions</p>
          <h2 className="luxury-heading">Frequently Asked</h2>
        </div>
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-white border border-border">
              <button
                type="button"
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-display text-lg text-[hsl(var(--primary))] pr-4">{item.question}</span>
                <ChevronDown className={cn("h-5 w-5 shrink-0 text-[hsl(var(--secondary))] transition-transform", open === i && "rotate-180")} />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
