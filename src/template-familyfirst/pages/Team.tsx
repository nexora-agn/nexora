import { Helmet } from "react-helmet-async";
import { Linkedin, Twitter } from "lucide-react";
import Layout from "@template-familyfirst/components/layout/Layout";
import PlumbingPageHero from "@template-familyfirst/components/sections/PlumbingPageHero";
import CTASection from "@template-familyfirst/components/sections/CTASection";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";
import { useTheme } from "@template-familyfirst/contexts/ThemeContext";

const Team = () => {
  const { team: members, sectionVisibility, company: COMPANY } = useSiteContent();
  const { resolveTeamImage } = useTheme();

  return (
    <Layout>
      <Helmet>
        <title>Our Team | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Meet the master plumbers and specialists behind ${COMPANY.name} — licensed, local, and committed to quality work across Central NJ.`}
        />
      </Helmet>

      <PlumbingPageHero
        eyebrow="Our Team"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Team" }]}
        title="Master Plumbers You Can Trust"
        body="Licensed, family-oriented plumbers and specialists serving Monmouth and Ocean County — the crew that shows up on time and explains every repair in plain language."
      />

      {sectionVisibility["team.grid"] ? (
        <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
          title="Work with our master plumbers"
          subtitle="Same-day service, upfront pricing, and quality craftsmanship across Central NJ."
        />
      ) : null}
    </Layout>
  );
};

export default Team;
