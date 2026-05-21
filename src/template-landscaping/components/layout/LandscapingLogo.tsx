import { TreePine } from "lucide-react";
import { cn } from "@/lib/utils";

/** Default brand mark when no logo is uploaded. */
const LandscapingLogo = ({ className }: { className?: string }) => (
  <span
    className={cn(
      "flex h-full w-full items-center justify-center rounded-md border border-[hsl(var(--secondary)/0.5)] bg-[hsl(var(--flow-moss)/0.15)] text-[hsl(var(--secondary))]",
      className,
    )}
  >
    <TreePine className="h-[55%] w-[55%]" strokeWidth={1.75} aria-hidden />
  </span>
);

export default LandscapingLogo;
