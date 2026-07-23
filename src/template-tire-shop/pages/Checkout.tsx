import { FormEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@template-tire-shop/components/layout/Layout";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { getCart, clearCart } from "@template-tire-shop/lib/cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ORDER_KEY = "nexora-mobile-last-order";

const STEPS = ["Cart", "Info", "Delivery", "Payment", "Confirmation"] as const;

type OrderStub = {
  id: string;
  email: string;
  name: string;
  fulfillment: "pickup" | "delivery";
  createdAt: string;
  lineCount: number;
};

const Checkout = () => {
  const { company: COMPANY } = useSiteContent();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    fulfillment: "pickup" as "pickup" | "delivery",
    card: "",
  });
  const [orderId, setOrderId] = useState<string | null>(null);

  const cartLines = getCart();

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    const stub: OrderStub = {
      id: `NM-${Date.now()}`,
      email: form.email,
      name: form.name,
      fulfillment: form.fulfillment,
      createdAt: new Date().toISOString(),
      lineCount: cartLines.reduce((n, l) => n + l.qty, 0),
    };
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(stub));
    } catch {
      /* ignore */
    }
    clearCart();
    setOrderId(stub.id);
    setStep(4);
  };

  return (
    <Layout>
      <Helmet>
        <title>Checkout | {COMPANY.name}</title>
      </Helmet>

      <div className="dealer-header-offset section-padding-inset max-w-3xl mx-auto">
        <h1 className="font-sans-brand text-3xl font-semibold mb-8">Checkout</h1>

        <ol className="flex flex-wrap gap-2 mb-10">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={cn(
                "px-3 py-1.5 text-[10px] uppercase tracking-wider border",
                i === step ? "bg-[hsl(var(--secondary))] text-white border-[hsl(var(--secondary))]" : i < step ? "border-[hsl(var(--secondary))] text-[hsl(var(--secondary))]" : "border-border text-muted-foreground",
              )}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="space-y-4">
            <p className="text-muted-foreground">{cartLines.length ? `${cartLines.length} item(s) in cart` : "Your cart is empty."}</p>
            {!cartLines.length && (
              <Button asChild variant="outline">
                <Link to="/shop">Shop devices</Link>
              </Button>
            )}
            <div className="flex gap-3">
              <Button type="button" onClick={next} disabled={!cartLines.length} className="bg-[hsl(var(--secondary))]">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <form
            className="space-y-4"
            onSubmit={e => {
              e.preventDefault();
              next();
            }}
          >
            <input required placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full h-11 border border-border px-3" />
            <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full h-11 border border-border px-3" />
            <input required type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full h-11 border border-border px-3" />
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={back}>
                Back
              </Button>
              <Button type="submit" className="bg-[hsl(var(--secondary))]">
                Continue
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form
            className="space-y-4"
            onSubmit={e => {
              e.preventDefault();
              next();
            }}
          >
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="fulfillment" checked={form.fulfillment === "pickup"} onChange={() => setForm(f => ({ ...f, fulfillment: "pickup" }))} />
                Store pickup (free)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="fulfillment" checked={form.fulfillment === "delivery"} onChange={() => setForm(f => ({ ...f, fulfillment: "delivery" }))} />
                Local delivery
              </label>
            </div>
            {form.fulfillment === "delivery" && (
              <input required placeholder="Delivery address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="w-full h-11 border border-border px-3" />
            )}
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={back}>
                Back
              </Button>
              <Button type="submit" className="bg-[hsl(var(--secondary))]">
                Continue
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-4" onSubmit={placeOrder}>
            <p className="text-sm text-muted-foreground">Demo payment — no card is charged.</p>
            <input required placeholder="Card number" value={form.card} onChange={e => setForm(f => ({ ...f, card: e.target.value }))} className="w-full h-11 border border-border px-3" />
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={back}>
                Back
              </Button>
              <Button type="submit" className="bg-[hsl(var(--primary))]">
                Place order
              </Button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="text-center py-8 space-y-4">
            <p className="text-2xl font-semibold text-[hsl(var(--secondary))]">Thank you!</p>
            <p className="text-muted-foreground">Order {orderId} confirmed. We&apos;ll email {form.email || "you"} with pickup details.</p>
            <Button asChild>
              <Link to="/shop">Continue shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
