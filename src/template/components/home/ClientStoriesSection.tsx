import { Star } from "lucide-react";
import { useSiteContent } from "@template/contexts/SiteContentContext";

const ClientStoriesSection = () => {
  const { testimonials: TESTIMONIALS } = useSiteContent();
  const stories = TESTIMONIALS.slice(0, 2);

  return (
    <section className="section-padding bg-muted/40">
      <div className="container-custom px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Client Stories</h2>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stories.map(t => (
            <article key={t.name} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" aria-hidden />
                ))}
              </div>
              <blockquote className="text-foreground leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt="" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientStoriesSection;
