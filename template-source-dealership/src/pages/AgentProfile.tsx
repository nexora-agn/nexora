import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { Linkedin, Instagram, Mail, Phone } from "lucide-react";
import Layout from "@template-dealership/components/layout/Layout";
import { PropertyCard } from "@template-dealership/components/home/FeaturedListings";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { useTheme } from "@template-dealership/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const AgentProfile = () => {
  const { team, projects, company: COMPANY } = useSiteContent();
  const { resolveTeamImage } = useTheme();
  const { id } = useParams();
  const agent = team.find(a => a.id === id);

  if (!agent) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <h1 className="font-display text-2xl">Agent not found</h1>
          <Link to="/team" className="text-[hsl(var(--secondary))] mt-4 inline-block">View All Agents</Link>
        </div>
      </Layout>
    );
  }

  const a = agent as {
    languages?: string[]; experience?: string; specialties?: string[];
    social?: { linkedin?: string; instagram?: string; email?: string };
  };
  const listings = projects.filter(p => (p as { agentId?: string }).agentId === agent.id);

  return (
    <Layout>
      <Helmet>
        <title>{agent.name} | {COMPANY.name}</title>
        <meta name="description" content={agent.bio} />
      </Helmet>

      <section className="pt-32 pb-16 bg-[hsl(var(--muted))]">
        <div className="container-custom container-inset grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1">
            <img
              src={resolveTeamImage(agent.id, agent.image)}
              alt={agent.name}
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
          <div className="lg:col-span-2">
            <p className="luxury-eyebrow mb-2">Luxury Advisor</p>
            <h1 className="font-display text-4xl md:text-5xl mb-2">{agent.name}</h1>
            <p className="text-[hsl(var(--secondary))] uppercase tracking-wider text-sm mb-6">{agent.role}</p>
            {a.experience && <p className="text-sm text-muted-foreground mb-4">Experience: {a.experience}</p>}
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">{agent.bio}</p>

            {a.languages && (
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {a.languages.map(l => <span key={l} className="px-3 py-1 bg-white border border-border text-sm">{l}</span>)}
                </div>
              </div>
            )}
            {a.specialties && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {a.specialties.map(s => <span key={s} className="px-3 py-1 bg-[hsl(var(--primary))] text-white text-sm">{s}</span>)}
                </div>
              </div>
            )}
            <div className="flex gap-3 mb-8">
              {a.social?.linkedin && <a href={a.social.linkedin} className="p-3 border border-border hover:border-[hsl(var(--secondary))]"><Linkedin className="h-5 w-5" /></a>}
              {a.social?.instagram && <a href={a.social.instagram} className="p-3 border border-border hover:border-[hsl(var(--secondary))]"><Instagram className="h-5 w-5" /></a>}
              {a.social?.email && <a href={`mailto:${a.social.email}`} className="p-3 border border-border hover:border-[hsl(var(--secondary))]"><Mail className="h-5 w-5" /></a>}
            </div>
            <Button asChild className="rounded-none bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] uppercase text-xs tracking-wider h-12 px-8">
              <Link to="/contact"><Phone className="h-4 w-4 mr-2" /> Contact {agent.name.split(" ")[0]}</Link>
            </Button>
          </div>
        </div>
      </section>

      {listings.length > 0 && (
        <section className="container-custom container-inset py-16">
          <h2 className="luxury-subheading mb-8">Active Listings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map(l => <PropertyCard key={l.id} listing={l} />)}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default AgentProfile;
