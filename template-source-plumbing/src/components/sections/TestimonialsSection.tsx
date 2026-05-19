import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const TestimonialsSection = () => {
  const { testimonials: TESTIMONIALS } = useSiteContent();
  const safeLength = Math.max(1, TESTIMONIALS.length);
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index % safeLength] ?? TESTIMONIALS[0];
  if (!t) return null;

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">What Our Clients Say</h2>
        <div className="max-w-3xl mx-auto">
          <Quote className="h-10 w-10 text-secondary mx-auto mb-6" />
          <p className="text-lg md:text-xl text-foreground italic mb-6">"{t.quote}"</p>
          <img src={t.avatar} alt={t.name} className="h-14 w-14 rounded-full mx-auto mb-3 object-cover" />
          <p className="font-semibold text-foreground">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.role}</p>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setIndex(i => (i - 1 + safeLength) % safeLength)} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setIndex(i => (i + 1) % safeLength)} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
