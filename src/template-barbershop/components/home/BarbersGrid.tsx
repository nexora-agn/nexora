import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Star, ArrowRight } from "lucide-react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { useTheme } from "@template-barbershop/contexts/ThemeContext";

const BarbersGrid = () => {
  const { team } = useSiteContent();
  const { resolveTeamImage } = useTheme();
  const featured = team.slice(0, 4);

  return (
    <section className="luxury-section bg-background">
      <div className="container-custom container-inset">
        <Reveal direction="up" className="max-w-2xl mx-auto text-center mb-14">
          <p className="luxury-eyebrow mb-4">The Craftsmen</p>
          <h2 className="luxury-heading">Meet Our Barbers</h2>
          <p className="mt-5 text-muted-foreground">Every barber on our floor brings years of dedicated craft and a distinct specialty.</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((barber, i) => (
            <Reveal key={barber.id} direction="up" delay={i * 100}>
              <div className="group relative overflow-hidden bg-[hsl(var(--primary))]">
                <div className="image-zoom aspect-[3/4]">
                  <img src={resolveTeamImage(barber.id, barber.image)} alt={barber.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[10px] font-sans-brand uppercase tracking-[0.2em] text-[hsl(var(--secondary))] mb-1">{barber.role}</p>
                  <h3 className="font-display text-xl uppercase">{barber.name}</h3>
                  <div className="flex items-center gap-1 mt-1.5 mb-3">
                    <Star className="h-3.5 w-3.5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                    <span className="text-xs">{barber.rating} ({barber.reviewCount})</span>
                  </div>

                  <div
                    className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-out"
                  >
                    <p className="text-xs text-white/70 mb-3">{barber.specialties.join(" · ")}</p>
                    <div className="flex items-center gap-3 mb-3">
                      <a href={barber.social.instagram} aria-label="Instagram" className="text-white/60 hover:text-white"><Instagram className="h-4 w-4" /></a>
                      <a href={barber.social.linkedin} aria-label="LinkedIn" className="text-white/60 hover:text-white"><Linkedin className="h-4 w-4" /></a>
                      <a href={`mailto:${barber.social.email}`} aria-label="Email" className="text-white/60 hover:text-white"><Mail className="h-4 w-4" /></a>
                    </div>
                  </div>

                  <Link
                    to={`/barbers/${barber.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white border-b border-[hsl(var(--secondary))] pb-0.5 hover:gap-2.5 transition-all"
                  >
                    Book {barber.name.split(" ")[0]} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/barbers" className="btn-luxury-outline">
            Meet the Full Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BarbersGrid;
