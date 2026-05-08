import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Award, ShieldCheck, Home as HomeIcon, Tag, Users, Hammer, Eye, Handshake, Heart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import NexoraPageHero from "@/components/sections/NexoraPageHero";
import ClientStoriesSection from "@/components/home/ClientStoriesSection";
import LeadContactSection from "@/components/home/LeadContactSection";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { ABOUT_HERO_BADGES } from "@/data/siteData";
import { Button } from "@/components/ui/button";

const badgeIconMap = { HomeIcon, ShieldCheck, Award, Tag, Home: HomeIcon } as const;
const valueIconMap = { ShieldCheck, Award, Users, Handshake, Eye, Heart, Hammer } as const;
const whyIconMap = { Award, ShieldCheck, Hammer, Users } as const;

const About = () => {
  const { company: COMPANY, capabilities, coreValues, certifications, aboutStats } = useSiteContent();

  return (
    <Layout>
      <Helmet>
        <title>About Us | {COMPANY.name}</title>
        <meta name="description" content={`${COMPANY.tagline}`} />
      </Helmet>

      <NexoraPageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About Us" }]}
        title={`About ${COMPANY.name}`}
        eyebrowAfter="Built on Integrity. Focused on You."
        body={`${COMPANY.name} is a locally owned and operated roofing company serving North Texas with honest service, superior craftsmanship, and reliable results. We treat every home like our own and every customer like family.`}
        image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&h=900&fit=crop"
        imageAlt="Beautiful home"
        badges={
          <div className="flex flex-wrap gap-3">
            {ABOUT_HERO_BADGES.map(b => {
              const Icon = badgeIconMap[b.icon as keyof typeof badgeIconMap] || ShieldCheck;
              return (
                <span key={b.id} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-bold text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20 ring-1 ring-[hsl(var(--secondary))]/30">
                    <Icon className="h-3.5 w-3.5 text-[hsl(var(--secondary))]" />
                  </span>
                  <span className="leading-tight whitespace-nowrap">{b.title}</span>
                </span>
              );
            })}
          </div>
        }
      />

      {/* Mission + Why us */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-3">Our Mission</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Our mission is simple: to protect your home and everything that matters most. We do this by providing top-quality roofing solutions, transparent communication, and exceptional service from start to finish.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-3">Our Values</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {coreValues.slice(0, 6).map(v => (
                  <li key={v.id} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--secondary))]" />
                    </span>
                    <span>{v.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-50 rounded-lg p-6 lg:p-8">
            <h3 className="text-center text-sm font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-6">
              Why Homeowners Choose Us
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {capabilities.map(c => {
                const Icon = whyIconMap[c.icon as keyof typeof whyIconMap] || Award;
                return (
                  <div key={c.id} className="text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 mb-3">
                      <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] mb-1.5">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section className="bg-white pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-2xl sm:text-3xl font-black uppercase tracking-tight text-[hsl(var(--primary))] mb-8">
            Meet Our Team
          </h2>
          <div className="bg-slate-50 rounded-lg p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 rounded-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop"
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 space-y-5">
              <p className="text-sm text-slate-700 leading-relaxed">
                Our team is made up of skilled professionals who take pride in their work and in serving our community. From project managers to roofing specialists, everyone at {COMPANY.name} is committed to delivering the best possible experience.
              </p>
              <Button asChild className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-bold uppercase tracking-wide">
                <Link to="/contact">
                  Join Our Team
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-xs text-slate-500 leading-relaxed">
                We're always looking for talented, motivated people to join our growing team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-center text-sm font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary))] mb-8">
            Licenses, Certifications & Partnerships
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {certifications.map(c => (
              <div key={c.id} className="text-center">
                <span className="block text-base font-extrabold text-[hsl(var(--primary))] tracking-tight">
                  {c.label}
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-slate-500 mt-0.5">
                  {c.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-[hsl(var(--primary))] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {aboutStats.map(stat => (
            <div key={stat.label} className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--secondary))]/15 ring-1 ring-[hsl(var(--secondary))]/30">
                <Award className="h-5 w-5 text-[hsl(var(--secondary))]" />
              </span>
              <div className="leading-tight">
                <span className="block text-xl sm:text-2xl font-black">{stat.value}</span>
                <span className="block text-xs text-white/70">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ClientStoriesSection />
      <LeadContactSection />
    </Layout>
  );
};

export default About;
