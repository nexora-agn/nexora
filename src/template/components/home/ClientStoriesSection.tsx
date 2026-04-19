import { Quote, Star } from "lucide-react";
import { useSiteContent } from "@template/contexts/SiteContentContext";

const ClientStoriesSection = () => {
  const { testimonials: TESTIMONIALS } = useSiteContent();
  const stories = TESTIMONIALS.slice(0, 2);

  return (
    <section className="section-padding bg-muted/40">
      <div className="container-custom px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
            CLIENT STORIES
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1]">
            Trusted by owners who <span className="text-secondary">don't compromise.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Real words from real projects — developers, homeowners and
            institutions we've built for.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stories.map(t => (
            <article
              key={t.name}
              className="relative rounded-2xl border border-border bg-card p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <Quote
                className="absolute -top-2 -right-2 h-24 w-24 text-secondary/10"
                strokeWidth={1}
                aria-hidden
              />
              <div className="relative">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-secondary text-secondary"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="text-lg text-foreground leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <img
                    src={t.avatar}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-secondary/20"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
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
