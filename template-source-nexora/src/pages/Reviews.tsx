import { Helmet } from "react-helmet-async";
import { Star, Quote } from "lucide-react";
import Layout from "@/components/layout/Layout";
import NexoraPageHero from "@/components/sections/NexoraPageHero";
import LeadContactSection from "@/components/home/LeadContactSection";
import { useSiteContent } from "@/contexts/SiteContentContext";

const Reviews = () => {
  const { testimonials, company: COMPANY, siteTop: SITE_TOP, stats } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>Customer Reviews | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Read verified homeowner reviews for ${COMPANY.name}. ${SITE_TOP.ratingValue || "5"}★ average across ${SITE_TOP.ratingCount || "250+"} reviews.`}
        />
      </Helmet>

      <NexoraPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Reviews" }]}
        title="What Homeowners Say"
        eyebrowAfter="Trusted Across North Texas"
        body={`We're proud of the roofs we've installed and the homeowners we've served. Here's what people say about working with ${COMPANY.name}.`}
        image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&h=900&fit=crop"
        badges={
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-bold">
              <Star className="h-3.5 w-3.5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
              {SITE_TOP.ratingValue || "4.9"} Google rating
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-bold">
              {SITE_TOP.ratingCount || "250+"} homeowner reviews
            </span>
          </div>
        }
      />

      <section className="bg-[hsl(var(--primary))] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
            {stats.slice(0, 4).map(s => (
              <div key={s.label} className="rounded-lg bg-white/10 px-4 py-5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-[hsl(var(--secondary))]">
                  {s.value}
                  {s.suffix ?? ""}
                </div>
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <article
                key={`${t.name}-${t.role}`}
                className="flex flex-col rounded-lg border border-slate-100 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <Quote className="h-8 w-8 text-[hsl(var(--secondary))]/80 mb-4" aria-hidden />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed flex-1 mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                  <img src={t.avatar} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100" />
                  <div>
                    <p className="text-sm font-extrabold text-[hsl(var(--primary))]">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LeadContactSection />
    </Layout>
  );
};

export default Reviews;
