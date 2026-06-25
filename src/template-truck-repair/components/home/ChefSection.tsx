import { Link } from "react-router-dom";
import { Award } from "lucide-react";
import { CHEF } from "@template-truck-repair/data/siteData";
import Reveal from "@template-truck-repair/components/animations/Reveal";

const ChefSection = () => (
  <section className="luxury-section bg-[hsl(var(--primary))] text-white overflow-hidden">
    <div className="container-custom container-inset">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal direction="left">
          <div className="relative">
            <img
              src={CHEF.image}
              alt={CHEF.name}
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 bg-[hsl(var(--secondary))] text-white p-6 hidden md:block">
              <p className="font-display text-3xl font-medium">{CHEF.experience}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] mt-1">Experience</p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={100}>
          <div>
            <p className="text-[11px] font-sans-brand font-medium uppercase tracking-[0.28em] text-[hsl(var(--secondary))] mb-4">
              Executive Chef
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.1] mb-2">
              {CHEF.name}
            </h2>
            <p className="text-white/60 text-sm uppercase tracking-wider mb-8">{CHEF.role}</p>
            <p className="text-white/80 leading-relaxed mb-6">{CHEF.bio}</p>
            <blockquote className="border-l-2 border-[hsl(var(--secondary))] pl-6 italic text-white/70 mb-8">
              "{CHEF.philosophy}"
            </blockquote>
            {CHEF.awards?.length > 0 && (
              <div className="space-y-3 mb-8">
                {CHEF.awards.map(award => (
                  <div key={award} className="flex items-center gap-3 text-sm text-white/80">
                    <Award className="h-4 w-4 text-[hsl(var(--secondary))] shrink-0" />
                    {award}
                  </div>
                ))}
              </div>
            )}
            <Link to="/about" className="btn-luxury-hero-secondary">
              Our Story
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ChefSection;
