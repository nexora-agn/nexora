import { Phone, ShoppingCart, RefreshCw, Smartphone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSiteContent } from "@template-mobile-store/contexts/SiteContentContext";
import { cartCount } from "@template-mobile-store/lib/cart";
import { cn } from "@/lib/utils";

const FloatingCallButton = ({ className }: { className?: string }) => {
  const { company: COMPANY } = useSiteContent();
  const { pathname } = useLocation();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => setCount(cartCount());
    refresh();
    const t = setInterval(refresh, 1500);
    return () => clearInterval(t);
  }, [pathname]);

  const buyTo = pathname.startsWith("/shop/") ? "/checkout" : "/shop?category=smartphones";

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[58] md:hidden",
        "border-t border-border bg-background/95 backdrop-blur-md",
        "grid grid-cols-4 gap-0 safe-area-pb",
        className,
      )}
    >
      <Link
        to={buyTo}
        className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[hsl(var(--secondary))]"
      >
        <Smartphone className="h-4 w-4" />
        Buy
      </Link>
      <Link
        to="/cart"
        className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[hsl(var(--secondary))] relative"
      >
        <ShoppingCart className="h-4 w-4" />
        Cart{count > 0 ? ` (${count})` : ""}
      </Link>
      <Link
        to="/trade-in"
        className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[hsl(var(--secondary))]"
      >
        <RefreshCw className="h-4 w-4" />
        Trade
      </Link>
      <a
        href={phoneHref}
        className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-wider bg-[hsl(var(--primary))] text-white"
      >
        <Phone className="h-4 w-4" />
        Call
      </a>
    </div>
  );
};

export default FloatingCallButton;
