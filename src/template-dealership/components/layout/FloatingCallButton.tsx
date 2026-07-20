import { Phone, MessageSquare, Tag, Car } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const FloatingCallButton = ({ className }: { className?: string }) => {
  const { company: COMPANY } = useSiteContent();
  const { pathname } = useLocation();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const smsHref = `sms:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;
  const onVdp = pathname.includes("/inventory/") || pathname.includes("/listings/");

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[58] md:hidden",
        "border-t border-border bg-background/95 backdrop-blur-md",
        "grid grid-cols-4 gap-0 safe-area-pb",
        className,
      )}
    >
      <a
        href={phoneHref}
        className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[hsl(var(--secondary))]"
      >
        <Phone className="h-4 w-4" />
        Call
      </a>
      <a
        href={smsHref}
        className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[hsl(var(--secondary))]"
      >
        <MessageSquare className="h-4 w-4" />
        Text
      </a>
      <Link
        to={onVdp ? `${pathname}#e-price` : "/inventory"}
        className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-[hsl(var(--secondary))]"
      >
        <Tag className="h-4 w-4" />
        Get Price
      </Link>
      <Link
        to="/test-drive"
        className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-wider bg-[hsl(var(--primary))] text-white"
      >
        <Car className="h-4 w-4" />
        Test Drive
      </Link>
    </div>
  );
};

export default FloatingCallButton;
