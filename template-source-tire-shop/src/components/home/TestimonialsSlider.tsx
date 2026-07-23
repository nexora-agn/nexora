import { useState } from "react";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TestimonialsSlider = () => {
  const { testimonials } = useSiteContent();
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);

  return (
    <section className="luxury-section bg-white">
      <div className="container-custom container-inset max-w-4xl text-center">
        <p className="luxury-eyebrow mb-3">Client Stories</p>
        <h2 className="luxury-heading mb-16">Testimonials</h2>
        <Quote className="h-12 w-12 text-[hsl(var(--secondary))] mx-auto mb-8 opacity-60" />
        <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-[hsl(var(--primary))] leading-relaxed font-light italic mb-10">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <div className="flex items-center justify-center gap-4 mb-10">
          <img src={t.avatar} alt="" className="w-14 h-14 rounded-full object-cover" />
          <div className="text-left">
            <p className="font-medium text-[hsl(var(--primary))]">{t.name}</p>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button type="button" onClick={prev} className="p-2 border border-border hover:border-[hsl(var(--secondary))] transition-colors" aria-label="Previous">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-[hsl(var(--secondary))]" : "bg-border"}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={next} className="p-2 border border-border hover:border-[hsl(var(--secondary))] transition-colors" aria-label="Next">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
