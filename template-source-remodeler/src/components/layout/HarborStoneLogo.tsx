import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const HarborStoneLogo = ({ className }: { className?: string }) => (
  <span
    className={cn(
      "flex h-full w-full items-center justify-center border-2 border-[hsl(var(--secondary))] bg-[hsl(var(--rm-linen))] text-[hsl(var(--secondary))]",
      className,
    )}
  >
    <Building2 className="h-[55%] w-[55%]" strokeWidth={1.5} aria-hidden />
  </span>
);

export default HarborStoneLogo;
