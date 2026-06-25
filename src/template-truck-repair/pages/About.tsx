import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Award, ShieldCheck, Phone, Truck } from "lucide-react";
import Layout from "@template-truck-repair/components/layout/Layout";
import EmergencyCTA from "@template-truck-repair/components/home/EmergencyCTA";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { ABOUT_HERO_BADGES, ABOUT_TIMELINE, TRUCK_IMAGES } from "@template-truck-repair/data/siteData";

const badgeIconMap = { ShieldCheck, Award, Phone, Truck } as const;

const About = () => {
  const { company: COMPANY, coreValues, certifications, aboutStats } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>About Us | {COMPANY.name}</title>
        <meta name="description" content={COMPANY.tagline} />
      </Helmet>

      <section className="relative pt-28 pb-16 bg-[hsl(var(--primary))] text-white overflow-hidden">
        <img src={TRUCK_IMAGES.aboutHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="container-custom container-inset relative">
          <p className="industrial-eyebrow text-[hsl(var(--secondary))] mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl max-w-3xl mb-6">Keeping Commercial Fleets on the Road Since 2004</h1>
          <p className="text-white/75 max-w-2xl leading-relaxed">{COMPANY.tagline}</p>
          <div className="flex flex-wrap gap-6 mt-8">
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

      <section className="industrial-section">
        <div className="container-custom container-inset grid lg:grid-cols-2 gap-12 items-center">
          <img src={TRUCK_IMAGES.mechanic} alt="" className="w-full aspect-[4/3] object-cover" />
          <div>
            <p className="industrial-eyebrow mb-3">Mission</p>
            <h2 className="industrial-heading mb-6">Built for Fleet Reliability</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {COMPANY.name} was founded to solve one problem: commercial trucks can&apos;t afford downtime. We built an industrial-grade service operation with 24/7 dispatch, priority fleet lanes, and ASE Master diesel technicians.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today we serve 180+ fleet contracts across the Southwest — from single-owner operators to regional logistics companies running hundreds of units.
            </p>
          </div>
        </div>
      </section>

      <section className="industrial-section bg-[hsl(var(--muted))]">
        <div className="container-custom container-inset">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-14">
            {aboutStats.map(s => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl text-[hsl(var(--secondary))]">{s.value}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <h2 className="industrial-heading text-center mb-10">Company Timeline</h2>
          <div className="max-w-3xl mx-auto space-y-0">
            {ABOUT_TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-8 pb-10 relative">
                {i < ABOUT_TIMELINE.length - 1 && <div className="absolute left-[39px] top-10 bottom-0 w-px bg-border" />}
                <span className="font-display text-xl text-[hsl(var(--secondary))] w-16 shrink-0">{item.year}</span>
                <div>
                  <h3 className="font-display text-lg text-[hsl(var(--primary))] mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="industrial-section">
        <div className="container-custom container-inset">
          <h2 className="industrial-heading text-center mb-10">Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map(v => (
              <div key={v.id} className="card-industrial p-6">
                <h3 className="font-display text-lg text-[hsl(var(--primary))] mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="industrial-section bg-[hsl(var(--primary))] text-white">
        <div className="container-custom container-inset flex flex-wrap justify-center gap-8">
          {certifications.map(c => (
            <div key={c.id} className="text-center">
              <p className="font-display text-lg text-[hsl(var(--secondary))]">{c.label}</p>
              <p className="text-xs text-white/60 mt-1">{c.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <EmergencyCTA />
    </Layout>
  );
};

export default About;
