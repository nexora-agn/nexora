import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ABOUT_HOME } from "@template-minhs/data/siteData";

const AboutHomeSection = () => {
  const a = ABOUT_HOME;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative overflow-hidden rounded-sm minhs-card aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
            <img src={a.image} alt="MINHS Automotive shop" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/60 to-transparent" />
          </div>
          <div>
            <p className="text-xs font-display font-bold uppercase tracking-[0.28em] text-[hsl(var(--secondary))]">
              {a.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] leading-tight">
              {a.headline}
            </h2>
            {a.body.map((para, i) => (
              <p key={i} className="mt-4 text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
            <Button
              asChild
              variant="outline"
              className="minhs-btn-outline-on-light mt-8 rounded-sm font-display font-bold uppercase tracking-wider"
            >
              <Link to={a.cta.to}>
                {a.cta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHomeSection;
