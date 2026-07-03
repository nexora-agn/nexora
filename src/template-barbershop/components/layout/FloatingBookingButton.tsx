import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingBookingButton = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const hidden = location.pathname.startsWith("/booking");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  return (
    <Link
      to="/booking"
      className={cn(
        "xl:hidden fixed bottom-5 left-4 right-4 z-50 flex items-center justify-center gap-2 h-13 py-3.5",
        "bg-[hsl(var(--primary))] text-white font-sans-brand text-sm font-bold uppercase tracking-[0.14em]",
        "shadow-[0_10px_40px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 border border-[hsl(var(--secondary))]/40",
        visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none",
      )}
    >
      <CalendarDays className="h-4 w-4 text-[hsl(var(--secondary))]" />
      Book Appointment
    </Link>
  );
};

export default FloatingBookingButton;
