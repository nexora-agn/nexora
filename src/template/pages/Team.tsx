import { Helmet } from "react-helmet-async";
import Layout from "@template/components/layout/Layout";
import PageHeader from "@template/components/sections/PageHeader";
import CTASection from "@template/components/sections/CTASection";
import { useSiteContent } from "@template/contexts/SiteContentContext";
import { Linkedin, Twitter } from "lucide-react";

const Team = () => {
  const { team: members, sectionVisibility, company: COMPANY } = useSiteContent();

  return (
    <Layout>
    <Helmet>
      <title>Our Team | {COMPANY.name}</title>
      <meta name="description" content={`Meet the leadership and experts behind ${COMPANY.name}.`} />
    </Helmet>
    <PageHeader eyebrow="COMPANY" title="Our Team" subtitle="Senior-led teams on every project: design, engineering, and field operations working as one." />

    {sectionVisibility["team.grid"] && <section className="section-padding bg-background">
      <div className="container-custom px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {members.map(member => (
          <div key={member.id} className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden group">
            <div className="relative overflow-hidden aspect-[4/5]">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/35 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <a
                  href={member.social.linkedin}
                  className="h-11 w-11 rounded-full bg-card flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </a>
                <a
                  href={member.social.twitter}
                  className="h-11 w-11 rounded-full bg-card flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-lg text-foreground">{member.name}</h3>
              <p className="text-secondary text-sm font-semibold mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>}

    {sectionVisibility["team.cta"] && <CTASection />}
    </Layout>
  );
};

export default Team;
