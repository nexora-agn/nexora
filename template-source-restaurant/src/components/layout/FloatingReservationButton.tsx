import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingReservationButton = () => (
  <Link
    to="/reservations"
    className={cn(
      "fixed bottom-6 right-6 z-50 lg:hidden",
      "flex items-center gap-2 h-14 px-5",
      "bg-[hsl(var(--primary))] text-white",
      "shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
      "font-sans-brand text-xs font-medium uppercase tracking-[0.14em]",
      "transition-all duration-300 hover:bg-[hsl(var(--secondary))]",
    )}
    aria-label="Reserve a table"
  >
    <CalendarDays className="h-5 w-5" />
    Reserve
  </Link>
);

export default FloatingReservationButton;
