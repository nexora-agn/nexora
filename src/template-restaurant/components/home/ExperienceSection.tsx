import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { EXPERIENCE_HIGHLIGHTS } from "@template-restaurant/data/siteData";
import Reveal from "@template-restaurant/components/animations/Reveal";

const ExperienceSection = () => (
  <section className="luxury-section">
    <div className="container-custom container-inset">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="luxury-eyebrow mb-4">The Experience</p>
          <h2 className="luxury-heading">
            More Than <span className="italic text-[hsl(var(--secondary))]">A Meal</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {EXPERIENCE_HIGHLIGHTS.map((item, i) => {
          const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[item.icon] || LucideIcons.Sparkles;
          return (
            <Reveal key={item.id} delay={i * 50}>
              <div className="card-luxury p-8 text-center h-full group hover:border-[hsl(var(--secondary))]/30">
                <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-[hsl(var(--secondary))]/30 text-[hsl(var(--secondary))] group-hover:bg-[hsl(var(--secondary))] group-hover:text-white transition-all duration-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl text-[hsl(var(--primary))] mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
