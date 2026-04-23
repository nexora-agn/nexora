import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MarketingPlan } from "@/lib/pricingPlans";

/** Shared block: name, description, price, and feature list (used on pricing and Start a project). */
export function PlanCardBody({
  plan,
  inverted,
  className,
  /** In multi-column pickers, keeps the description block a consistent height so cards don’t jump. */
  evenTaglineBlock,
}: {
  plan: MarketingPlan;
  inverted: boolean;
  className?: string;
  evenTaglineBlock?: boolean;
}) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <div className="mb-6 min-w-0">
        <h3 className={cn("text-lg font-semibold", inverted ? "text-white" : "text-neutral-950")}>{plan.name}</h3>
        <p
          className={cn(
            "mt-2 text-pretty text-sm leading-relaxed",
            inverted ? "text-neutral-400" : "text-neutral-600",
            evenTaglineBlock && "min-h-[4.25rem] sm:min-h-[3.5rem]",
          )}
        >
          {plan.tagline}
        </p>
        <div className="mt-6 flex flex-wrap items-baseline gap-1">
          <span
            className={cn(
              "font-bold tracking-tight",
              plan.price === "Custom" ? "text-4xl" : "text-xl leading-snug sm:text-2xl",
              inverted ? "text-white" : "text-neutral-950",
            )}
          >
            {plan.price}
          </span>
          {plan.period ? <span className="text-lg text-neutral-500">{plan.period}</span> : null}
        </div>
      </div>
      <ul className="flex-1 space-y-3">
        {plan.features.map(f => (
          <li key={f} className="flex gap-3 text-sm leading-snug">
            <Check
              className={cn("mt-0.5 h-4 w-4 shrink-0", inverted ? "text-brand" : "text-neutral-950")}
              strokeWidth={2.5}
              aria-hidden
            />
            <span className={inverted ? "text-neutral-300" : "text-neutral-700"}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PlanPopularBadge({ darkBg }: { darkBg: boolean }) {
  return (
    <span
      className={cn(
        "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border-2 border-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
        darkBg ? "bg-neutral-950 text-brand" : "bg-white text-amber-700",
      )}
    >
      Most popular
    </span>
  );
}
