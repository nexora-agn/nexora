import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { COMPANY, ABOUT_STATS, CORE_VALUES, CERTIFICATIONS } from "@/data/siteData";
import ProcessSection from "@/components/home/ProcessSection";
import Reveal from "@/components/animations/Reveal";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Award, Eye, Handshake, Shield } from "lucide-react";

const valueIcons = { Award, Eye, Handshake, Shield } as const;

const About = () => {
  const { team, sectionVisibility } = useSiteContent();
  const directors = team.slice(0, 3);

  return (
    <Layout>
    <Helmet>
      <title>About Us — {COMPANY.name}</title>
      <meta name="description" content={`${COMPANY.name} company profile — legacy, values, and how we work.`} />
    </Helmet>

    <Reveal direction="zoom" duration={650}>
      <PageHeader
        eyebrow="COMPANY PROFILE"
        title="About Us"
        subtitle={`${COMPANY.name} is a design-build studio focused on precision delivery, transparent communication, and measurable quality on every site.`}
      />
    </Reveal>

    {sectionVisibility["about.story"] && <Reveal delay={70}>
      <section className="section-padding bg-background">
      <div className="container-custom px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Building legacy, brick by brick</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Since 2008 we&apos;ve partnered with owners, developers, and design teams who expect clarity — not chaos — when budgets
            and schedules are on the line. Our teams integrate early so decisions made on paper survive contact with reality.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            From New York to Dubai, we bring the same playbook: senior leadership on site, milestone-based transparency, and
            craftsmanship that holds up to inspection — and time.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=700&fit=crop"
          alt=""
          className="rounded-2xl w-full h-[380px] lg:h-[440px] object-cover shadow-lg"
          loading="lazy"
        />
      </div>
      </section>
    </Reveal>}

    {sectionVisibility["about.values"] && <Reveal delay={100}>
      <section className="section-padding bg-muted/40 border-y border-border">
      <div className="container-custom px-4 md:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map(v => {
            const Icon = valueIcons[v.icon];
            return (
              <article key={v.id} className="rounded-xl bg-card border border-border p-6 shadow-sm">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </article>
            );
          })}
        </div>
      </div>
      </section>
    </Reveal>}

    {sectionVisibility["about.stats"] && <Reveal delay={120}>
      <section className="bg-secondary py-12 md:py-14 text-secondary-foreground">
      <div className="container-custom px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {ABOUT_STATS.map(s => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-black tracking-tight">{s.value}</p>
              <p className="mt-2 text-xs md:text-sm font-semibold uppercase tracking-wide opacity-95">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      </section>
    </Reveal>}

    {sectionVisibility["about.directors"] && <Reveal delay={140}>
      <section className="section-padding bg-background">
      <div className="container-custom px-4 md:px-8">
        <p className="text-sm font-bold tracking-[0.2em] text-secondary text-center mb-2">COMPANY PROFILE</p>
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Meet the Directors</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {directors.map(m => (
            <Link key={m.id} to="/team" className="group text-center">
              <div className="overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-muted shadow-md">
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-secondary transition-colors">{m.name}</h3>
              <p className="text-sm font-semibold text-secondary mt-1">{m.role}</p>
            </Link>
          ))}
        </div>
      </div>
      </section>
    </Reveal>}

    {sectionVisibility["about.process"] && <Reveal delay={160}>
      <ProcessSection className="border-t border-border bg-muted/25" />
    </Reveal>}

    {sectionVisibility["about.certifications"] && <Reveal delay={180}>
      <section className="py-12 bg-background border-t border-border">
      <div className="container-custom px-4 md:px-8">
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center opacity-70">
          {CERTIFICATIONS.map(c => (
            <div key={c.id} className="text-center">
              <p className="font-bold text-foreground text-sm tracking-wide">{c.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
      </section>
    </Reveal>}

    {sectionVisibility["about.cta"] && <Reveal delay={210}>
      <CTASection
        title="Ready for a similar outcome?"
        subtitle="See how we’d approach your site and schedule."
        primaryLabel="PROJECT ESTIMATE"
        secondaryLabel="OUR WORK"
        secondaryTo="/projects"
      />
    </Reveal>}
    </Layout>
  );
};

export default About;
