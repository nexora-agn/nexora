import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, Crown } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { LOYALTY_TIERS, BARBERSHOP_IMAGES, COMPANY } from "@template-barbershop/data/siteData";
import { cn } from "@/lib/utils";

const Loyalty = () => {
  return (
    <Layout>
      <Helmet>
        <title>Loyalty Program | {COMPANY.name}</title>
        <meta name="description" content="Earn rewards, discounts, and priority booking with the Forge Loyalty program." />
      </Helmet>

      <PageHeader eyebrow="Forge Loyalty" title="Rewards for Regulars" subtitle="The more you visit, the more you save — plus priority booking and VIP-only perks." image={BARBERSHOP_IMAGES.loyaltyHero} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset grid md:grid-cols-3 gap-6">
          {LOYALTY_TIERS.map((tier, i) => (
            <Reveal key={tier.id} direction="up" delay={i * 100}>
              <div
                className={cn(
                  "relative flex flex-col h-full border p-7 bg-white",
                  i === 1 ? "border-[hsl(var(--secondary))] shadow-xl scale-[1.02]" : "border-border",
                )}
              >
                {i === 1 && (
                  <span className="absolute -top-3 left-7 bg-[hsl(var(--secondary))] text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1">
                    Most Popular
                  </span>
                )}
                <Crown className={cn("h-8 w-8 mb-4", i === 1 ? "text-[hsl(var(--secondary))]" : "text-muted-foreground")} />
                <h3 className="font-display text-2xl uppercase text-foreground">{tier.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wide">{tier.threshold}</p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {tier.benefits.map(b => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={200} className="mt-14 text-center">
          <Link to="/booking" className="btn-luxury-primary">
            Book Your First Visit
          </Link>
        </Reveal>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Loyalty;
