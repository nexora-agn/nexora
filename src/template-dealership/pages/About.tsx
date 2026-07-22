import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Award, ShieldCheck, Car, Tag, MapPin } from "lucide-react";
import Layout from "@template-dealership/components/layout/Layout";
import LuxuryCTA from "@template-dealership/components/home/LuxuryCTA";
import AgentsSection from "@template-dealership/components/home/AgentsSection";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { ABOUT_HERO_BADGES, ABOUT_TIMELINE, AWARDS, LUXURY_IMAGES } from "@template-dealership/data/siteData";

const badgeIconMap = { Car, ShieldCheck, Award, Tag, MapPin } as const;

const About = () => {
  const { company: COMPANY, coreValues, certifications, aboutStats } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>About Us | {COMPANY.name}</title>
        <meta name="description" content={COMPANY.tagline} />
      </Helmet>

      <section className="relative dealer-header-offset pb-12 sm:pb-16 lg:pb-20 bg-[hsl(var(--primary))] text-white overflow-hidden">
        <div className="container-custom container-inset relative">
          <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium max-w-3xl mb-8">
            Redefining the Automotive Retail Experience
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
              Nexora Motors was founded on a simple belief: buying a vehicle should feel as clear and modern as shopping for anything else you care about — transparent pricing, honest advice, and zero pressure.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, our sales and service teams help Central Texas drivers across Austin, Round Rock, Cedar Park, and San Marcos — from first browse to factory-trained service for years to come.
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
