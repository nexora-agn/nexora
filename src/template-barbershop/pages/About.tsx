import { Helmet } from "react-helmet-async";
import * as Icons from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import StatsSection from "@template-barbershop/components/sections/StatsSection";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { BARBERSHOP_IMAGES, ABOUT_TIMELINE, AWARDS, ABOUT_HERO_BADGES, COMPANY } from "@template-barbershop/data/siteData";

const About = () => {
  const { coreValues, certifications, aboutStats } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>About Us | {COMPANY.name}</title>
        <meta name="description" content="The story of Forge Barber Co. — passion, craftsmanship, and community since day one." />
      </Helmet>

      <PageHeader eyebrow="Our Story" title="Craft, Community, Consistency" subtitle="Fourteen years of precision cuts and honest craftsmanship." image={BARBERSHOP_IMAGES.aboutHero}>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {ABOUT_HERO_BADGES.map(badge => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[badge.icon] ?? Icons.Star;
            return (
              <span key={badge.label} className="inline-flex items-center gap-2 border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
                <Icon className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" /> {badge.label}
              </span>
            );
          })}
        </div>
      </PageHeader>

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset grid lg:grid-cols-2 gap-14 items-center">
          <Reveal direction="right" className="image-zoom">
            <img src={BARBERSHOP_IMAGES.barberAtWork} alt="Barber at work" className="w-full aspect-[4/3] object-cover" loading="lazy" />
          </Reveal>
          <Reveal direction="left" delay={100}>
            <p className="luxury-eyebrow mb-4">Since 2012</p>
            <h2 className="luxury-heading !text-3xl md:!text-4xl mb-6">Built on Craft, Not Trends</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Forge Barber Co. opened on the Bowery in 2012 with three chairs and one rule: every cut earns the next visit.
              Fourteen years later, that rule still governs everything we do.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We're not chasing trends — we're refining the fundamentals of classic barbering while staying sharp on
              modern technique. Every barber on our floor trains continuously, and every client gets a real
              consultation before the shears ever touch their head.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What started as a neighborhood shop has become a destination — but the standard hasn't changed:
              precision, professionalism, and a setting worth spending an hour in.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="luxury-section bg-[hsl(var(--muted))]">
        <div className="container-custom container-inset">
          <Reveal direction="up" className="max-w-2xl mx-auto text-center mb-14">
            <p className="luxury-eyebrow mb-4">What We Stand For</p>
            <h2 className="luxury-heading">Our Core Values</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, i) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[value.icon] ?? Icons.Star;
              return (
                <Reveal key={value.id} direction="up" delay={(i % 3) * 90}>
                  <div className="bg-white border border-border p-7 h-full">
                    <div className="flex h-12 w-12 items-center justify-center border border-[hsl(var(--secondary))]/40 text-[hsl(var(--secondary))] mb-5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg uppercase text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <StatsSection stats={aboutStats.map(s => ({ value: parseInt(s.value.replace(/\D/g, ""), 10) || 0, label: s.label, suffix: s.value.replace(/[\d,]/g, "") }))} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset max-w-3xl">
          <Reveal direction="up" className="text-center mb-14">
            <p className="luxury-eyebrow mb-4">Our Journey</p>
            <h2 className="luxury-heading">Fourteen Years in the Making</h2>
          </Reveal>
          <div className="relative border-l border-border pl-8 space-y-10">
            {ABOUT_TIMELINE.map((item, i) => (
              <Reveal key={item.year} direction="right" delay={i * 90}>
                <div className="relative">
                  <span className="absolute -left-[38px] top-1 h-3 w-3 rounded-full bg-[hsl(var(--secondary))]" />
                  <p className="font-display text-2xl text-[hsl(var(--secondary))]">{item.year}</p>
                  <h3 className="font-display text-lg uppercase text-foreground mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-section bg-[hsl(var(--primary))] text-white">
        <div className="container-custom container-inset">
          <Reveal direction="up" className="max-w-2xl mx-auto text-center mb-12">
            <p className="luxury-eyebrow mb-4">Recognition</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold uppercase">Awards & Certifications</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {certifications.map((cert, i) => (
              <Reveal key={cert.id} direction="up" delay={i * 70}>
                <div className="border border-white/15 p-5 text-center h-full">
                  <p className="font-display text-sm uppercase text-white">{cert.label}</p>
                  <p className="text-xs text-white/50 mt-1">{cert.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {AWARDS.map(award => (
              <div key={award.title} className="text-center">
                <p className="text-[hsl(var(--secondary))] font-display text-xl">{award.year}</p>
                <p className="text-sm text-white/80">{award.title}</p>
                <p className="text-xs text-white/40">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;
