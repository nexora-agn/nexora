import { Helmet } from "react-helmet-async";
import { Star, BadgeCheck } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { BARBERSHOP_IMAGES, SITE_TOP, COMPANY } from "@template-barbershop/data/siteData";

const Reviews = () => {
  const { testimonials } = useSiteContent();
  const average = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <Layout>
      <Helmet>
        <title>Reviews | {COMPANY.name}</title>
        <meta name="description" content="Read verified reviews from Forge Barber Co. clients." />
      </Helmet>

      <PageHeader eyebrow="Client Stories" title="Reviews" subtitle="Verified feedback from clients who trust us with every cut." image={BARBERSHOP_IMAGES.reviewsHero} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset">
          <Reveal direction="up" className="flex flex-col items-center text-center mb-14">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
              ))}
            </div>
            <p className="font-display text-4xl text-foreground">{average} / 5</p>
            <p className="text-sm text-muted-foreground mt-1">Based on {SITE_TOP.ratingCount} verified reviews</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((review, i) => (
              <Reveal key={review.name} direction="up" delay={(i % 3) * 90}>
                <div className="bg-white border border-border p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 italic flex-1">"{review.quote}"</p>
                  <div className="mt-5 flex items-center gap-3 pt-5 border-t border-border">
                    <img src={review.avatar} alt={review.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-1.5">
                        {review.name} <BadgeCheck className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                      </p>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Reviews;
