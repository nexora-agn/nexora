import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import Layout from "@/components/layout/Layout";
import HarborPageHero from "@/components/sections/HarborPageHero";
import CTASection from "@/components/sections/CTASection";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { LEAD_MAGNET, REMODELER_IMAGES, BLOG_POSTS } from "@/data/siteData";

const Resources = () => {
  const { company: COMPANY } = useSiteContent();
  const guides = BLOG_POSTS.filter(p => ["Kitchen", "Bath", "Siding"].includes(p.category));

  return (
    <Layout>
      <Helmet>
        <title>Resources | {COMPANY.name}</title>
        <meta name="description" content={`Remodeling guides, FAQs, and downloads from ${COMPANY.name} — New Jersey home improvement resources.`} />
      </Helmet>

      <HarborPageHero
        eyebrow="Resources"
        title="Remodeling Guides & Downloads"
        body="Free planning resources for NJ homeowners — kitchen, bath, siding, budgeting, and what to expect during construction."
        image={REMODELER_IMAGES.resourcesHero}
        imageAlt="remodeling resources"
      />

      <section className="rm-section-pad bg-white">
        <div className="container-custom container-inset">
          <div className="grid lg:grid-cols-2 gap-12 items-center border border-border p-8 md:p-12 bg-[hsl(var(--rm-cream))]">
            <div>
              <p className="text-xs font-sans-brand uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-2">Lead magnet</p>
              <h2 className="font-display text-3xl text-[hsl(var(--primary))] mb-3">{LEAD_MAGNET.title}</h2>
              <p className="text-muted-foreground font-sans-brand mb-6">{LEAD_MAGNET.subtitle}</p>
              <Link
                to={LEAD_MAGNET.cta.to}
                className="inline-flex items-center gap-2 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] px-6 py-3 font-sans-brand font-semibold text-sm"
              >
                <Download className="h-4 w-4" />
                {LEAD_MAGNET.cta.label}
              </Link>
            </div>
            <img src={LEAD_MAGNET.image} alt="" className="w-full aspect-[4/3] object-cover rm-frame" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="rm-section-pad bg-[hsl(var(--muted))]">
        <div className="container-custom container-inset">
          <h2 className="font-display text-2xl text-[hsl(var(--primary))] mb-8">Service Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {guides.map(g => (
              <Link
                key={g.id}
                to={`/blog/${g.id}`}
                className="group block border border-border bg-white p-6 rm-card-hover"
              >
                <p className="text-xs uppercase tracking-wider text-[hsl(var(--secondary))] font-sans-brand mb-2">{g.category}</p>
                <h3 className="font-display text-xl text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] mb-2">{g.title}</h3>
                <span className="inline-flex items-center gap-1 text-sm font-sans-brand font-semibold text-[hsl(var(--secondary))]">
                  Read guide <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/faq" className="font-sans-brand font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]">FAQs →</Link>
            <Link to="/blog" className="font-sans-brand font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]">Blog →</Link>
            <Link to="/financing" className="font-sans-brand font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]">Financing →</Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Questions About Your Project?"
        subtitle="Request a free estimate or call our Union office — we serve 11 NJ counties."
        primaryLabel="Get a Free Estimate"
        secondaryLabel="Call Now"
      />
    </Layout>
  );
};

export default Resources;
