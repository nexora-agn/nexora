import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Gift, Download, Check } from "lucide-react";
import { toast } from "sonner";
import Layout from "@template-truck-repair/components/layout/Layout";
import Reveal from "@template-truck-repair/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GIFT_CARD_TIERS, RESTAURANT_IMAGES } from "@template-truck-repair/data/siteData";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const GiftCards = () => {
  const { company: COMPANY } = useSiteContent();
  const [selected, setSelected] = useState(GIFT_CARD_TIERS[1]?.id || GIFT_CARD_TIERS[0]?.id);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [purchasing, setPurchasing] = useState(false);

  const tier = GIFT_CARD_TIERS.find(t => t.id === selected);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setPurchasing(true);
    await new Promise(r => setTimeout(r, 1000));
    setPurchasing(false);
    toast.success(`Gift card sent to ${recipientEmail}! Check your inbox for confirmation.`);
  };

  return (
    <Layout>
      <Helmet>
        <title>Gift Cards | {COMPANY.name}</title>
        <meta name="description" content={`Give the gift of an extraordinary dining experience at ${COMPANY.name}.`} />
      </Helmet>

      <section className="relative h-[40vh] min-h-[280px] flex items-end">
        <img src={RESTAURANT_IMAGES.giftHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="container-custom container-inset relative pb-10 pt-32">
          <h1 className="font-display text-5xl text-white font-medium">Gift Cards</h1>
        </div>
      </section>

      <section className="luxury-section">
        <div className="container-custom container-inset">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Gift className="h-10 w-10 text-[hsl(var(--secondary))] mx-auto mb-4" />
              <h2 className="font-display text-3xl mb-4">The Perfect Gift</h2>
              <p className="text-muted-foreground leading-relaxed">
                Share an unforgettable dining experience. Digital delivery, balance tracking, and printable cards included.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {GIFT_CARD_TIERS.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelected(t.id)}
                    className={cn(
                      "p-6 border text-left transition-all duration-300",
                      selected === t.id
                        ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/5"
                        : "border-border hover:border-[hsl(var(--secondary))]/50",
                    )}
                  >
                    <p className="font-display text-2xl text-[hsl(var(--primary))]">{t.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
                    {selected === t.id && <Check className="h-4 w-4 text-[hsl(var(--secondary))] mt-2" />}
                  </button>
                ))}
              </div>

              <div className="bg-[hsl(var(--primary))] text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--secondary))]/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--secondary))] mb-2">NEXORA</p>
                <p className="font-display text-4xl mb-4">{tier?.label}</p>
                <p className="text-white/70 text-sm">Valid at all locations · Never expires</p>
                <button type="button" className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors">
                  <Download className="h-4 w-4" /> Preview printable card
                </button>
              </div>
            </div>

            <form onSubmit={handlePurchase} className="space-y-4">
              <div>
                <Label>Recipient Name</Label>
                <Input value={recipientName} onChange={e => setRecipientName(e.target.value)} required className="rounded-none h-11 mt-1" />
              </div>
              <div>
                <Label>Recipient Email</Label>
                <Input type="email" value={recipientEmail} onChange={e => setRecipientEmail(e.target.value)} required className="rounded-none h-11 mt-1" />
              </div>
              <div>
                <Label>Your Name</Label>
                <Input value={senderName} onChange={e => setSenderName(e.target.value)} required className="rounded-none h-11 mt-1" />
              </div>
              <div>
                <Label>Personal Message (optional)</Label>
                <Input value={message} onChange={e => setMessage(e.target.value)} className="rounded-none h-11 mt-1" />
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-display text-2xl">{tier?.label}</span>
                </div>
                <Button type="submit" disabled={purchasing} className="w-full rounded-none h-12 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] uppercase text-xs tracking-wider">
                  {purchasing ? "Processing..." : "Purchase Gift Card"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GiftCards;
