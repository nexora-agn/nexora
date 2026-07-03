import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, BadgeCheck } from "lucide-react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const TestimonialsSlider = () => {
  const { testimonials } = useSiteContent();
  const [active, setActive] = useState(0);

  const next = useCallback(() => setActive(i => (i + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setActive(i => (i - 1 + testimonials.length) % testimonials.length), [testimonials.length]);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const item = testimonials[active];
  if (!item) return null;

  return (
    <section className="luxury-section bg-[hsl(var(--primary))] text-white relative overflow-hidden">
      <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 h-40 w-40 text-white/5" />
      <div className="container-custom container-inset relative">
        <Reveal direction="up" className="max-w-2xl mx-auto text-center mb-14">
          <p className="luxury-eyebrow mb-4">Client Stories</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase">What Clients Say</h2>
        </Reveal>

        <div className="max-w-3xl mx-auto text-center">
          <div key={active} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
              ))}
            </div>
            <p className="text-xl sm:text-2xl font-display font-light leading-snug text-white/90">"{item.quote}"</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <img src={item.avatar} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
              <div className="text-left">
                <p className="text-sm font-semibold flex items-center gap-1.5">
                  {item.name} <BadgeCheck className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                </p>
                <p className="text-xs text-white/50">{item.role}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button type="button" onClick={prev} aria-label="Previous testimonial" className="text-white/60 hover:text-white transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn("h-1.5 rounded-full transition-all", i === active ? "w-6 bg-[hsl(var(--secondary))]" : "w-1.5 bg-white/25")}
                />
              ))}
            </div>
            <button type="button" onClick={next} aria-label="Next testimonial" className="text-white/60 hover:text-white transition-colors">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
