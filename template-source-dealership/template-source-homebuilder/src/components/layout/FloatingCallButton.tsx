import { Phone } from "lucide-react";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const FloatingCallButton = ({ className }: { className?: string }) => {
  const { company: COMPANY, siteTop: SITE_TOP } = useSiteContent();
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  return (
    <a
      href={phoneHref}
      aria-label={`Call ${COMPANY.name} — ${SITE_TOP.line}`}
      className={cn(
        "fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full",
        "bg-[hsl(var(--secondary))] text-white pl-4 pr-5 py-3.5",
        "font-sans-brand font-semibold text-sm shadow-lg",
        "hover:bg-[hsl(var(--secondary))]/90 hover:scale-[1.02] active:scale-[0.98]",
        "transition-all md:hidden",
        className,
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
        <Phone className="h-4 w-4" />
      </span>
      <span className="hidden xs:inline">Call Now</span>
    </a>
  );
};

export default FloatingCallButton;
