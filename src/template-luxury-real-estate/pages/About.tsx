import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Award, ShieldCheck, Home as HomeIcon, Tag } from "lucide-react";
import Layout from "@template-luxury-real-estate/components/layout/Layout";
import LuxuryCTA from "@template-luxury-real-estate/components/home/LuxuryCTA";
import AgentsSection from "@template-luxury-real-estate/components/home/AgentsSection";
import { useSiteContent } from "@template-luxury-real-estate/contexts/SiteContentContext";
import { ABOUT_HERO_BADGES, ABOUT_TIMELINE, AWARDS, LUXURY_IMAGES } from "@template-luxury-real-estate/data/siteData";

const badgeIconMap = { HomeIcon, ShieldCheck, Award, Tag, Home: HomeIcon } as const;

const About = () => {
  const { company: COMPANY, coreValues, certifications, aboutStats } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>About Us | {COMPANY.name}</title>
        <meta name="description" content={COMPANY.tagline} />
      </Helmet>

      <section className="relative pt-32 pb-20 bg-[hsl(var(--primary))] text-white overflow-hidden">
        <div className="container-custom container-inset relative">
          <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium max-w-3xl mb-8">
            Redefining Luxury Real Estate Advisory
          </h1>
          <p className="text-white/75 max-w-2xl text-lg font-light leading-relaxed">{COMPANY.tagline}</p>
          <div className="flex flex-wrap gap-6 mt-10">
            {ABOUT_HERO_BADGES.map(b => {
              const Icon = badgeIconMap[b.icon as keyof typeof badgeIconMap] || Award;
              return (
                <div key={b.label} className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4 text-[hsl(var(--secondary))]" />
                  <span>{b.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="luxury-section">
        <div className="container-custom container-inset grid lg:grid-cols-2 gap-16 items-center">
          <div className="image-zoom aspect-[4/5]">
            <img src={LUXURY_IMAGES.about} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="luxury-eyebrow mb-4">Mission & Vision</p>
            <h2 className="luxury-subheading mb-6">A Standard of Excellence</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Nexora Estate was founded on a simple belief: luxury real estate deserves the same editorial quality and white-glove service as the world&apos;s finest brands.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, our advisors serve discerning clients across premier markets — combining local expertise with an international network spanning twelve countries.
            </p>
          </div>
        </div>
      </section>

      <section className="luxury-section bg-[hsl(var(--muted))]">
        <div className="container-custom container-inset">
          <div className="text-center mb-14">
            <p className="luxury-eyebrow mb-3">Milestones</p>
            <h2 className="luxury-heading">Our History</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0">
            {ABOUT_TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-8 pb-12 relative">
                {i < ABOUT_TIMELINE.length - 1 && (
                  <div className="absolute left-[39px] top-12 bottom-0 w-px bg-border" />
                )}
                <span className="font-display text-2xl text-[hsl(var(--secondary))] w-20 shrink-0">{item.year}</span>
                <div>
                  <h3 className="font-display text-xl text-[hsl(var(--primary))] mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-section">
        <div className="container-custom container-inset">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            {aboutStats.map(s => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl text-[hsl(var(--secondary))]">{s.value}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {AWARDS.map(a => (
              <div key={a.year + a.title} className="border border-border p-6 text-center">
                <p className="text-[hsl(var(--secondary))] font-display text-2xl mb-2">{a.year}</p>
                <h3 className="font-display text-lg mb-1">{a.title}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{a.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AgentsSection />
      <LuxuryCTA />
    </Layout>
  );
};

export default About;
