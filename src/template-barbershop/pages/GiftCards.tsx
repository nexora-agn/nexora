import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Gift, Mail, Printer, Check } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import CTASection from "@template-barbershop/components/sections/CTASection";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { GIFT_CARD_TIERS, BARBERSHOP_IMAGES, COMPANY } from "@template-barbershop/data/siteData";
import { cn } from "@/lib/utils";

const GiftCards = () => {
  const [selected, setSelected] = useState(GIFT_CARD_TIERS[1].id);
  const [custom, setCustom] = useState("");
  const [format, setFormat] = useState<"digital" | "printable">("digital");
  const [purchased, setPurchased] = useState(false);

  const selectedTier = GIFT_CARD_TIERS.find(t => t.id === selected);

  return (
    <Layout>
      <Helmet>
        <title>Gift Cards | {COMPANY.name}</title>
        <meta name="description" content="Give the gift of a great haircut — digital and printable gift cards in any amount." />
      </Helmet>

      <PageHeader eyebrow="Give the Gift of a Great Cut" title="Gift Cards" subtitle="Digital or printable — delivered instantly or ready to hand over in person." image={BARBERSHOP_IMAGES.giftHero} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset grid lg:grid-cols-2 gap-14 items-start">
          <Reveal direction="right" className="image-zoom">
            <div className="relative aspect-[3/2] bg-[hsl(var(--primary))] text-white flex flex-col justify-between p-8 overflow-hidden">
              <img src={BARBERSHOP_IMAGES.lounge} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
              <div className="relative flex items-center gap-2">
                <Gift className="h-6 w-6 text-[hsl(var(--secondary))]" />
                <span className="font-display uppercase tracking-widest text-sm">Gift Card</span>
              </div>
              <div className="relative">
                <p className="font-display text-4xl">{custom ? `$${custom}` : selectedTier?.label}</p>
                <p className="text-xs text-white/60 mt-2">{COMPANY.name}</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={100}>
            {purchased ? (
              <div className="border border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/5 p-8 text-center">
                <Check className="h-10 w-10 text-[hsl(var(--secondary))] mx-auto mb-4" />
                <p className="font-display text-xl uppercase mb-2">Gift Card Sent</p>
                <p className="text-sm text-muted-foreground">Check your email for delivery details.</p>
              </div>
            ) : (
              <>
                <h2 className="luxury-heading !text-3xl mb-6">Choose an Amount</h2>
                <div className="grid grid-cols-2 gap-3">
                  {GIFT_CARD_TIERS.map(tier => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => { setSelected(tier.id); setCustom(""); }}
                      className={cn(
                        "border p-4 text-left transition-colors",
                        selected === tier.id && !custom ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/5" : "border-border hover:border-[hsl(var(--primary))]/30",
                      )}
                    >
                      <p className="font-display text-2xl text-foreground">{tier.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{tier.description}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Or enter a custom amount</label>
                  <input
                    type="number"
                    min={10}
                    value={custom}
                    onChange={e => setCustom(e.target.value)}
                    placeholder="$75"
                    className="mt-1.5 h-12 w-full border border-border px-4 text-sm focus:outline-none focus:border-[hsl(var(--secondary))]"
                  />
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Delivery Format</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormat("digital")}
                      className={cn(
                        "flex items-center justify-center gap-2 h-12 border text-xs font-semibold uppercase tracking-wide transition-colors",
                        format === "digital" ? "border-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" : "border-border text-muted-foreground",
                      )}
                    >
                      <Mail className="h-4 w-4" /> Digital
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormat("printable")}
                      className={cn(
                        "flex items-center justify-center gap-2 h-12 border text-xs font-semibold uppercase tracking-wide transition-colors",
                        format === "printable" ? "border-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" : "border-border text-muted-foreground",
                      )}
                    >
                      <Printer className="h-4 w-4" /> Printable
                    </button>
                  </div>
                </div>

                <button type="button" onClick={() => setPurchased(true)} className="btn-luxury-primary w-full mt-8">
                  Purchase Gift Card
                </button>
              </>
            )}
          </Reveal>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default GiftCards;
