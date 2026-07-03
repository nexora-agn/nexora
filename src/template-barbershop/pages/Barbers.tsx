import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Star, ArrowRight } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { useTheme } from "@template-barbershop/contexts/ThemeContext";
import { BARBERSHOP_IMAGES, COMPANY } from "@template-barbershop/data/siteData";

const Barbers = () => {
  const { team } = useSiteContent();
  const { resolveTeamImage } = useTheme();

  return (
    <Layout>
      <Helmet>
        <title>Our Barbers | {COMPANY.name}</title>
        <meta name="description" content="Meet the master barbers behind every precision cut, fade, and shave." />
      </Helmet>

      <PageHeader eyebrow="The Team" title="Meet Our Barbers" subtitle="Every barber on our floor brings years of dedicated craft and a distinct specialty." image={BARBERSHOP_IMAGES.barbersHero} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((barber, i) => (
            <Reveal key={barber.id} direction="up" delay={(i % 3) * 100}>
              <div className="group card-luxury flex flex-col h-full">
                <div className="image-zoom aspect-[4/5]">
                  <img src={resolveTeamImage(barber.id, barber.image)} alt={barber.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[10px] font-sans-brand font-semibold uppercase tracking-[0.18em] text-[hsl(var(--secondary))]">{barber.role}</p>
                  <h3 className="mt-1.5 font-display text-2xl uppercase text-foreground">{barber.name}</h3>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="h-4 w-4 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                    <span className="text-sm font-semibold">{barber.rating}</span>
                    <span className="text-xs text-muted-foreground">({barber.reviewCount} reviews)</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground flex-1">{barber.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {barber.specialties.map(sp => (
                      <span key={sp} className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 bg-[hsl(var(--muted))] text-foreground/70">
                        {sp}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between pt-5 border-t border-border">
                    <span className="text-xs text-muted-foreground">{barber.experience} experience</span>
                    <Link
                      to={`/barbers/${barber.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[hsl(var(--secondary))] hover:gap-2.5 transition-all"
                    >
                      View Profile <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Barbers;
