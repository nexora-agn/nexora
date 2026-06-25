import * as LucideIcons from "lucide-react";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";

const WhyChooseUs = () => {
  const { whyBenefits } = useSiteContent();

  return (
    <section className="luxury-section bg-[hsl(var(--muted))]">
      <div className="container-custom container-inset">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="luxury-eyebrow mb-3">The Nexora Difference</p>
          <h2 className="luxury-heading">Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyBenefits.map((item, i) => {
            const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[item.icon] || LucideIcons.Star;
            return (
              <div
                key={item.title}
                className="bg-white p-8 border border-border hover:border-[hsl(var(--secondary))] transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-5 text-[hsl(var(--secondary))] group-hover:scale-110 transition-transform">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl text-[hsl(var(--primary))] mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
