import { Link } from "react-router-dom";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { useTheme } from "@template-tire-shop/contexts/ThemeContext";
import { Linkedin, Instagram, Mail } from "lucide-react";

const AgentsSection = () => {
  const { team } = useSiteContent();
  const { resolveTeamImage } = useTheme();

  return (
    <section className="luxury-section bg-white">
      <div className="container-custom container-inset">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="luxury-eyebrow mb-3">Expert Advisors</p>
          <h2 className="luxury-heading">Meet Our Agents</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map(agent => (
            <article key={agent.id} className="group text-center">
              <Link to={`/agents/${agent.id}`} className="block relative overflow-hidden mb-6 aspect-[3/4] image-zoom">
                <img
                  src={resolveTeamImage(agent.id, agent.image)}
                  alt={agent.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3">
                  {agent.social?.linkedin && (
                    <a href={agent.social.linkedin} className="p-2 bg-white/20 hover:bg-white/40 text-white" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {agent.social?.instagram && (
                    <a href={agent.social.instagram} className="p-2 bg-white/20 hover:bg-white/40 text-white" aria-label="Instagram">
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {agent.social?.email && (
                    <a href={`mailto:${agent.social.email}`} className="p-2 bg-white/20 hover:bg-white/40 text-white" aria-label="Email">
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </Link>
              <h3 className="font-display text-xl text-[hsl(var(--primary))] mb-1">
                <Link to={`/agents/${agent.id}`} className="hover:text-[hsl(var(--secondary))] transition-colors">{agent.name}</Link>
              </h3>
              <p className="text-xs uppercase tracking-wider text-[hsl(var(--secondary))] mb-2">{agent.role}</p>
              {(agent as { experience?: string }).experience && (
                <p className="text-xs text-muted-foreground">{(agent as { experience?: string }).experience}</p>
              )}
              <Link to={`/agents/${agent.id}`} className="inline-block mt-4 text-xs uppercase tracking-wider text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]">
                View Profile →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
