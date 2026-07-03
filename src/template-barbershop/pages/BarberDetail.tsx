import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Star, Instagram, Linkedin, Mail, CalendarDays } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { useTheme } from "@template-barbershop/contexts/ThemeContext";
import { COMPANY } from "@template-barbershop/data/siteData";

const BarberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { team, testimonials } = useSiteContent();
  const { resolveTeamImage } = useTheme();
  const barber = team.find(b => b.id === id);

  if (!barber) return <Navigate to="/barbers" replace />;

  const relatedReviews = testimonials.slice(0, 2);

  return (
    <Layout>
      <Helmet>
        <title>{barber.name} | {COMPANY.name}</title>
        <meta name="description" content={barber.bio} />
      </Helmet>

      <PageHeader eyebrow={barber.role} title={barber.name} image={resolveTeamImage(barber.id, barber.image)} variant="compact" />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
          <Reveal direction="right" className="image-zoom">
            <img src={resolveTeamImage(barber.id, barber.image)} alt={barber.name} className="w-full aspect-[4/5] object-cover" loading="lazy" />
          </Reveal>
          <Reveal direction="left" delay={100}>
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
              <span className="font-semibold">{barber.rating}</span>
              <span className="text-sm text-muted-foreground">({barber.reviewCount} verified reviews)</span>
              <span className="mx-2 text-border">|</span>
              <span className="text-sm text-muted-foreground">{barber.experience} experience</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">{barber.bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {barber.specialties.map(sp => (
                <span key={sp} className="text-xs font-semibold uppercase tracking-wide px-3 py-1.5 bg-[hsl(var(--muted))] text-foreground/70">
                  {sp}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a href={barber.social.instagram} aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-border hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))] transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href={barber.social.linkedin} aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center border border-border hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))] transition-colors"><Linkedin className="h-4 w-4" /></a>
              <a href={`mailto:${barber.social.email}`} aria-label="Email" className="flex h-10 w-10 items-center justify-center border border-border hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))] transition-colors"><Mail className="h-4 w-4" /></a>
            </div>

            <Link to="/booking" className="btn-luxury-primary mt-8 inline-flex">
              <CalendarDays className="h-4 w-4 mr-2" />
              Book with {barber.name.split(" ")[0]}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="luxury-section bg-[hsl(var(--muted))]">
        <div className="container-custom container-inset">
          <Reveal direction="up" className="text-center mb-10">
            <p className="luxury-eyebrow mb-4">Client Feedback</p>
            <h2 className="luxury-heading">What Clients Say</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {relatedReviews.map((review, i) => (
              <Reveal key={review.name} direction="up" delay={i * 100}>
                <div className="bg-white border border-border p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 italic">"{review.quote}"</p>
                  <p className="mt-4 text-sm font-semibold">{review.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default BarberDetail;
