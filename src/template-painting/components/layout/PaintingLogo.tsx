import { Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";

/** Default brand mark when no logo is uploaded. */
const PaintingLogo = ({ className }: { className?: string }) => (
  <span
    className={cn(
      "flex h-full w-full items-center justify-center rounded-sm border border-[hsl(var(--secondary)/0.45)] bg-[hsl(var(--secondary)/0.12)] text-[hsl(var(--secondary))]",
      className,
    )}
  >
    <Paintbrush className="h-[55%] w-[55%]" strokeWidth={1.75} aria-hidden />
  </span>
);

export default PaintingLogo;
