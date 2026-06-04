import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Home as HomeIcon,
  Tag,
  Users,
  Eye,
  Handshake,
  Heart,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import PlumbingPageHero from "@/components/sections/PlumbingPageHero";
import LeadContactSection from "@/components/home/LeadContactSection";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ABOUT_HERO_BADGES, PLUMBING_IMAGES } from "@/data/siteData";
import { Button } from "@/components/ui/button";

const badgeIconMap = { HomeIcon, ShieldCheck, Award, Tag, Home: HomeIcon } as const;
const valueIconMap = { ShieldCheck, Award, Users, Handshake, Eye, Heart } as const;

const About = () => {
  const { company: COMPANY, coreValues, certifications, aboutStats, team } = useSiteContent();
  const { resolveTeamImage } = useTheme();
  const previewTeam = team.slice(0, 4);

  return (
    <Layout>
      <Helmet>
        <title>About Us | {COMPANY.name}</title>
        <meta name="description" content={COMPANY.tagline} />
      </Helmet>

      <PlumbingPageHero
        eyebrow="Our Story"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
        title="Powering DFW Since Day One"
        eyebrowAfter="Master Plumbers. Local Roots."
        body={`${COMPANY.name} was built on a simple promise: every panel labeled, every connection torqued, and every homeowner treated with respect. We're Dallas master plumbers — not a franchise, not a handyman with a voltage tester.`}
        image={PLUMBING_IMAGES.aboutHero}
        imageAlt="Master plumber at work"
        badges={
          <div className="flex flex-wrap gap-3">
            {ABOUT_HERO_BADGES.map(b => {
              const Icon = badgeIconMap[b.icon as keyof typeof badgeIconMap] || ShieldCheck;
              return (
                <span
                  key={b.id}
                  className="inline-flex items-center gap-2 rounded-sm bg-white/10 px-3 py-2 text-xs font-display font-bold uppercase tracking-wider text-white"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20 ring-1 ring-[hsl(var(--secondary))]/40">
                    <Icon className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                  </span>
                  {b.title}
                </span>
              );
            })}
          </div>
        }
      />

      <section className="bg-[hsl(var(--primary))] text-white py-10 border-y border-[hsl(var(--secondary))]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {aboutStats.map(stat => (
            <div key={stat.label} className="text-center lg:text-left">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[hsl(var(--secondary))]">{stat.value}</span>
              <span className="block mt-1 text-[10px] sm:text-xs font-display font-bold uppercase tracking-wider text-white/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">
              Who We Are
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold uppercase text-[hsl(var(--primary))] leading-tight">
              Charcoal-Sharp Craft.
              <span className="block">Electric-Blue Integrity.</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              From 100-amp panel upgrades in Lakewood to three-phase commercial fit-outs in Irving, our crews combine NEC
              expertise with upfront pricing. We pull permits, pass inspections, and document every job with photos
              you'll actually understand.
            </p>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 rounded-sm overflow-hidden ring-1 ring-[hsl(var(--border))]">
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&h=800&q=85"
              alt="Plumbing panel installation"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20 border-t border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">
              Core Values
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase text-[hsl(var(--primary))]">
              How We Wire Every Job
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map(v => {
              const Icon = valueIconMap[v.icon as keyof typeof valueIconMap] || ShieldCheck;
              return (
                <article
                  key={v.id}
                  className="group rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--flow-surface))] p-6 hover:border-[hsl(var(--secondary))]/50 transition-colors"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-[hsl(var(--secondary))]/15 text-[hsl(var(--secondary))] mb-4">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--primary))] py-14 lg:py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <span className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">The Crew</span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase">Meet the Masters</h2>
            </div>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 font-display font-bold uppercase tracking-wider rounded-sm">
              <Link to="/team">Full Team <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {previewTeam.map(member => (
              <Link key={member.id} to="/team" className="group rounded-sm overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-[hsl(var(--secondary))]/50 transition-all">
                <div className="aspect-square overflow-hidden">
                  <img src={resolveTeamImage(member.id, member.image)} alt={member.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide group-hover:text-[hsl(var(--secondary))] transition-colors">{member.name}</h3>
                  <p className="text-[10px] font-display font-bold uppercase tracking-wider text-[hsl(var(--secondary))] mt-0.5">{member.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--flow-surface))] py-12 border-t border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-center font-display text-xs font-bold uppercase tracking-[0.22em] text-[hsl(var(--secondary))] mb-8">
            Licensed · Certified · Trusted
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {certifications.map(c => (
              <div key={c.id} className="text-center">
                <span className="block font-display text-base font-bold uppercase tracking-wide text-[hsl(var(--primary))]">
                  {c.label}
                </span>
                <span className="block text-[10px] font-display font-bold uppercase tracking-wider text-muted-foreground mt-1">
                  {c.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadContactSection />
    </Layout>
  );
};

export default About;
