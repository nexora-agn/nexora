import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@template-tire-shop/components/layout/Layout";
import HarborPageHero from "@template-tire-shop/components/sections/HarborPageHero";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";
import { getCart, updateQty, removeFromCart, type CartLine } from "@template-tire-shop/lib/cart";
import type { PhoneProduct } from "@template-tire-shop/data/products";
import { HOME_BUILDER_IMAGES } from "@template-tire-shop/data/siteData";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@template-tire-shop/lib/mortgageCalculator";

const Cart = () => {
  const { projects, company: COMPANY } = useSiteContent();
  const [lines, setLines] = useState<CartLine[]>([]);

  const refresh = () => setLines(getCart());

  useEffect(() => {
    refresh();
  }, []);

  const items = useMemo(() => {
    const map = new Map((projects as PhoneProduct[]).map(p => [p.id, p]));
    return lines
      .map(line => {
        const product = map.get(line.productId);
        if (!product) return null;
        return { line, product };
      })
      .filter(Boolean) as { line: CartLine; product: PhoneProduct }[];
  }, [lines, projects]);

  const subtotal = items.reduce((sum, { line, product }) => sum + product.price * line.qty, 0);

  const setQty = (productId: string, qty: number) => {
    updateQty(productId, qty);
    refresh();
  };

  const remove = (productId: string) => {
    removeFromCart(productId);
    refresh();
  };

  return (
    <Layout>
      <Helmet>
        <title>Cart | {COMPANY.name}</title>
      </Helmet>

      <HarborPageHero
        eyebrow="Checkout"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Cart" }]}
        title="Your Cart"
        body="Review devices and quantities before checkout."
        image={HOME_BUILDER_IMAGES.lot}
        imageAlt="Shopping cart"
      />

      <section className="section-padding-inset">
        {items.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button asChild>
              <Link to="/shop">Continue shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {items.map(({ line, product }) => (
                <div key={`${product.id}-${line.color}-${line.storage}`} className="flex gap-6 border border-border p-4 bg-white">
                  <img src={product.image} alt="" className="w-24 h-24 object-contain bg-[hsl(var(--muted))]" />
                  <div className="flex-1">
                    <Link to={`/shop/${product.id}`} className="font-semibold hover:text-[hsl(var(--secondary))]">
                      {product.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {line.storage || product.storage} · {line.color || product.color}
                    </p>
                    <p className="font-display text-xl mt-2">{product.priceLabel}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Qty</label>
                      <input
                        type="number"
                        min={1}
                        max={9}
                        value={line.qty}
                        onChange={e => setQty(product.id, Math.max(1, Number(e.target.value) || 1))}
                        className="w-16 h-9 border border-border px-2 text-sm"
                      />
                      <button type="button" onClick={() => remove(product.id)} className="text-xs text-muted-foreground hover:text-destructive uppercase tracking-wider">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="border border-border p-6 h-fit bg-[hsl(var(--muted))]/30">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Subtotal</p>
              <p className="font-display text-3xl mb-6">{formatCurrency(subtotal)}</p>
              <p className="text-xs text-muted-foreground mb-6">Tax and shipping calculated at checkout.</p>
              <Button asChild className="w-full rounded-none h-12 uppercase text-xs tracking-wider bg-[hsl(var(--secondary))]">
                <Link to="/checkout">Proceed to checkout</Link>
              </Button>
              <Link to="/shop" className="block text-center text-sm mt-4 text-[hsl(var(--secondary))] hover:underline">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
