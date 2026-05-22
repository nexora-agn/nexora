import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Star, Quote, ArrowRight } from "lucide-react";
import Layout from "@template-homebuilder/components/layout/Layout";
import { HOME_BUILDER_IMAGES } from "@template-homebuilder/data/siteData";
import HarborPageHero from "@template-homebuilder/components/sections/HarborPageHero";
import CTASection from "@template-homebuilder/components/sections/CTASection";
import { useSiteContent } from "@template-homebuilder/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";

const Reviews = () => {
  const { testimonials, company: COMPANY, siteTop, stats } = useSiteContent();
  const [featured, ...rest] = testimonials;

  return (
    <Layout>
      <Helmet>
        <title>Reviews | {COMPANY.name}</title>
        <meta
          name="description"
          content={`See what Central NJ homeowners and businesses say about ${COMPANY.name} — design-build team, quality work, and honest pricing.`}
        />
      </Helmet>

      <HarborPageHero
        eyebrow="Customer Reviews"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Reviews" }]}
        title="Trusted Across Central NJ"
        eyebrowAfter={`${siteTop.ratingValue} Stars · ${siteTop.ratingCount} ${siteTop.ratingLabel}`}
        body="Real feedback from Central New Jersey homeowners and business owners who chose HarborStone Design-Build for drains, water heaters, emergency repairs, and commercial painting work."
        image={HOME_BUILDER_IMAGES.reviewsHero}
        imageAlt="Painter at work"
      />

      <section className="bg-[hsl(var(--primary))] text-white py-10 border-y border-[hsl(var(--secondary))]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div key={stat.label} className="text-center sm:text-left">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--secondary))]">
                {stat.value}
                {stat.suffix}
              </span>
              <span className="block mt-1 text-[10px] sm:text-xs font-display font-bold uppercase tracking-wider text-white/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {featured ? (
        <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-[hsl(var(--secondary))] text-xs font-display font-bold uppercase tracking-[0.22em] mb-6">
              Featured Review
            </p>
            <article className="relative rounded-lg bg-[hsl(var(--primary))] text-white p-8 sm:p-10 lg:p-12 overflow-hidden">
              <Quote className="absolute top-6 right-6 h-16 w-16 text-[hsl(var(--secondary))]/20" aria-hidden />
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <img
                  src={featured.avatar}
                  alt={featured.name}
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-[hsl(var(--secondary))]/30 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex gap-1 mb-4">
                    {[...Array(featured.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                    ))}
                  </div>
                  <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wide leading-snug mb-6">
                    &ldquo;{featured.quote}&rdquo;
                  </blockquote>
                  <footer>
                    <p className="font-display font-bold text-[hsl(var(--secondary))]">{featured.name}</p>
                    <p className="text-sm text-white/70 mt-0.5">{featured.role}</p>
                  </footer>
                </div>
              </div>
            </article>
          </div>
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-8">
              More Customer Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(t => (
                <article
                  key={t.name + t.quote.slice(0, 20)}
                  className="rounded-lg border border-slate-100 bg-white p-6 hover:border-[hsl(var(--secondary))]/40 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="font-display font-bold text-sm text-[hsl(var(--primary))]">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[hsl(var(--primary))] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Ready to join our happy customers?</h2>
            <p className="text-white/75 mt-2 text-sm max-w-lg">
              Master painters, upfront pricing, and quality work across the Dallas metro.
            </p>
          </div>
          <Button
            asChild
            className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-display font-bold uppercase tracking-wide shrink-0"
          >
            <Link to="/contact">
              Get a Free Estimate
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CTASection
        title="Experience the HarborStone difference"
        subtitle="Free estimates and 24/7 emergency tree dispatch from licensed crews across North Jersey."
        primaryLabel="REQUEST ESTIMATE"
        secondaryLabel="BOOK A CALL"
      />
    </Layout>
  );
};

export default Reviews;
