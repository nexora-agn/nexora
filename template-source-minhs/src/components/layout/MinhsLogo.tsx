import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

/** Default brand mark when no logo is uploaded — matches other trade templates. */
const MinhsLogo = ({ className }: { className?: string }) => (
  <span
    className={cn(
      "flex h-full w-full items-center justify-center rounded-sm bg-[hsl(var(--secondary))]/20 text-[hsl(var(--secondary))]",
      className,
    )}
  >
    <Car className="h-[55%] w-[55%]" strokeWidth={2.25} aria-hidden />
  </span>
);

export default MinhsLogo;
