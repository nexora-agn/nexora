import * as Icons from "lucide-react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { EXPERIENCE_HIGHLIGHTS } from "@template-barbershop/data/siteData";

const WhyChooseUs = () => {
  return (
    <section className="luxury-section bg-[hsl(var(--muted))]">
      <div className="container-custom container-inset">
        <Reveal direction="up" className="max-w-2xl mx-auto text-center mb-14">
          <p className="luxury-eyebrow mb-4">The Forge Difference</p>
          <h2 className="luxury-heading">Why Choose Us</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {EXPERIENCE_HIGHLIGHTS.map((item, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[item.icon] ?? Icons.Star;
            return (
              <Reveal key={item.id} direction="up" delay={(i % 4) * 90}>
                <div className="bg-background h-full p-7 hover:bg-white transition-colors group">
                  <div className="flex h-12 w-12 items-center justify-center border border-[hsl(var(--secondary))]/40 text-[hsl(var(--secondary))] mb-5 group-hover:bg-[hsl(var(--secondary))] group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base uppercase text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
