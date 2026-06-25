import { Link } from "react-router-dom";
import { Wrench, Phone } from "lucide-react";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const FloatingRequestButton = () => {
  const { company: COMPANY } = useSiteContent();
  const emergencyHref = `tel:${(COMPANY.emergencyPhone || "").replace(/[^+\d]/g, "")}`;

  return (
    <>
      <a
        href={emergencyHref}
        className={cn(
          "fixed bottom-24 right-5 z-50 lg:bottom-6 lg:right-36",
          "flex h-14 w-14 items-center justify-center rounded-full",
          "bg-red-600 text-white shadow-lg animate-pulse",
          "hover:bg-red-700 transition-colors",
        )}
        aria-label="Emergency call"
      >
        <Phone className="h-6 w-6" />
      </a>
      <Link
        to="/request-service"
        className={cn(
          "fixed bottom-5 right-5 z-50",
          "flex items-center gap-2 h-14 px-5",
          "bg-[hsl(var(--secondary))] text-white shadow-lg",
          "font-sans-brand text-xs font-bold uppercase tracking-[0.12em]",
          "hover:brightness-110 transition-all",
        )}
        aria-label="Request service"
      >
        <Wrench className="h-5 w-5" />
        <span className="hidden sm:inline">Request Service</span>
      </Link>
    </>
  );
};

export default FloatingRequestButton;
