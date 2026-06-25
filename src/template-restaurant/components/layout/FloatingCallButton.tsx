import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const FloatingCallButton = ({ className }: { className?: string }) => {
  const { company: COMPANY } = useSiteContent();

  return (
    <Link
      to="/contact"
      aria-label={`Contact ${COMPANY.name}`}
      className={cn(
        "fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full",
        "bg-[hsl(var(--primary))] text-white pl-4 pr-5 py-3.5",
        "font-sans-brand font-semibold text-sm shadow-lg",
        "hover:bg-[hsl(var(--secondary))] hover:scale-[1.02] active:scale-[0.98]",
        "transition-all md:hidden",
        className,
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
        <MessageCircle className="h-4 w-4" />
      </span>
      <span>Inquire</span>
    </Link>
  );
};

export default FloatingCallButton;
