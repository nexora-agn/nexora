import { Link } from "react-router-dom";
import { Check, Crown } from "lucide-react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { LOYALTY_TIERS, BARBERSHOP_IMAGES } from "@template-barbershop/data/siteData";

const LoyaltyTeaser = () => {
  const gold = LOYALTY_TIERS[1];

  return (
    <section className="luxury-section bg-[hsl(var(--muted))]">
      <div className="container-custom container-inset grid lg:grid-cols-2 gap-12 items-center">
        <Reveal direction="right" className="image-zoom">
          <img src={BARBERSHOP_IMAGES.lounge} alt="Forge Barber Co. lounge" className="h-full w-full object-cover aspect-[4/3]" loading="lazy" />
        </Reveal>
        <Reveal direction="left" delay={100}>
          <p className="luxury-eyebrow mb-4 flex items-center gap-2">
            <Crown className="h-4 w-4" /> Forge Loyalty
          </p>
          <h2 className="luxury-heading">Rewards for Regulars</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
            Every visit earns you closer to priority booking, discounted services, and VIP-only experiences.
          </p>
          <div className="mt-7 border border-border bg-white p-6 max-w-md">
            <p className="font-display text-lg uppercase text-foreground">{gold.name}</p>
            <p className="text-xs text-muted-foreground mb-4">{gold.threshold}</p>
            <ul className="space-y-2.5">
              {gold.benefits.map(b => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <Link to="/loyalty" className="btn-luxury-primary mt-8 inline-flex">
            Explore Loyalty Program
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default LoyaltyTeaser;
