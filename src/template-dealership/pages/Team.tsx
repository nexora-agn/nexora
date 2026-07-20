import { Helmet } from "react-helmet-async";
import { Linkedin, Twitter } from "lucide-react";
import Layout from "@template-dealership/components/layout/Layout";
import CTASection from "@template-dealership/components/sections/CTASection";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { useTheme } from "@template-dealership/contexts/ThemeContext";

const Team = () => {
  const { team: members, sectionVisibility, company: COMPANY } = useSiteContent();
  const { resolveTeamImage } = useTheme();

  return (
    <Layout>
      <Helmet>
        <title>Our Team | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Meet the design-build team and specialists behind ${COMPANY.name} — licensed, local, and committed to quality work across Central NJ.`}
        />
      </Helmet>

      <section className="bg-[hsl(var(--primary))] text-white dealer-header-offset pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative container-custom container-inset">
          <p className="dealer-eyebrow text-[hsl(var(--secondary))] mb-3">Sales Team</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight max-w-2xl">
            Meet Our Advisors
          </h1>
          <p className="mt-4 text-white/80 max-w-xl leading-relaxed">
            Product specialists for new, used, certified, finance, and performance vehicles — here to help you find the right fit.
          </p>
        </div>
      </section>

      {sectionVisibility["team.grid"] ? (
        <section className="section-padding-inset bg-[hsl(var(--flow-surface))]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map(member => (
              <article
                key={member.id}
                className="group bg-white rounded-lg overflow-hidden border border-slate-100 hover:border-[hsl(var(--secondary))]/40 hover:shadow-lg transition-all"
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={resolveTeamImage(member.id, member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[hsl(var(--primary))]/0 group-hover:bg-[hsl(var(--primary))]/50 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <a
                      href={member.social.linkedin}
                      className="h-11 w-11 rounded-full bg-white flex items-center justify-center hover:bg-[hsl(var(--secondary))] hover:text-white transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="h-11 w-11 rounded-full bg-white flex items-center justify-center hover:bg-[hsl(var(--secondary))] hover:text-white transition-colors"
                      aria-label={`${member.name} on Twitter`}
                    >
                      <Twitter className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </a>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-display font-bold text-lg text-[hsl(var(--primary))]">{member.name}</h3>
                  <p className="text-[hsl(var(--secondary))] text-sm font-display font-bold uppercase tracking-wide mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {sectionVisibility["team.cta"] ? (
        <CTASection
          title="Work with our HarborStone crew"
          subtitle="Licensed landscaping, ISA-certified arborists, and design-build teams across North Jersey."
        />
      ) : null}
    </Layout>
  );
};

export default Team;
