import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

/** Shared input styles — touch-friendly 44px min height, works on light cards. */
export const dealerInputClass =
  "w-full min-h-[44px] rounded-sm border border-border bg-white px-3 py-2.5 text-base sm:text-sm text-[hsl(var(--primary))] placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-60";

export function DealerFormSection({
  children,
  className,
  variant = "muted",
}: {
  children: ReactNode;
  className?: string;
  variant?: "muted" | "white" | "dark";
}) {
  const bg =
    variant === "dark"
      ? "bg-[hsl(var(--primary))] text-white"
      : variant === "white"
        ? "bg-white"
        : "bg-[hsl(var(--muted))]";
  return <section className={cn("section-padding-inset", bg, className)}>{children}</section>;
}

export function DealerFormShell({
  children,
  maxWidth = "max-w-2xl",
  className,
}: {
  children: ReactNode;
  maxWidth?: string;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full", maxWidth, className)}>{children}</div>;
}

export function DealerFormCard({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white text-[hsl(var(--primary))] border border-border",
        "shadow-[0_12px_48px_-16px_rgba(0,0,0,0.15)]",
        "p-5 sm:p-7 lg:p-9",
        className,
      )}
    >
      {title ? <h2 className="font-display text-xl sm:text-2xl font-semibold mb-1">{title}</h2> : null}
      {description ? <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{description}</p> : null}
      {children}
    </div>
  );
}

export function DealerField({
  label,
  htmlFor,
  children,
  className,
  hint,
}: {
  label?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  hint?: string;
}) {
  return (
    <div className={cn("space-y-1.5 min-w-0", className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="block text-xs font-sans-brand font-semibold uppercase tracking-[0.12em] text-[hsl(var(--primary))]"
        >
          {label}
        </label>
      ) : null}
      {children}
      {hint ? <p className="text-[11px] text-muted-foreground leading-snug">{hint}</p> : null}
    </div>
  );
}

export function DealerInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(dealerInputClass, className)} />;
}

export function DealerSelect({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(dealerInputClass, className)}>
      {children}
    </select>
  );
}

export function DealerTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(dealerInputClass, "min-h-[120px] resize-y py-3", className)}
    />
  );
}

export function DealerFormGrid({
  children,
  cols = 2,
  className,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3;
  className?: string;
}) {
  const gridCls =
    cols === 3 ? "grid-cols-1 sm:grid-cols-3" : cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1";
  return <div className={cn("grid gap-4 sm:gap-5", gridCls, className)}>{children}</div>;
}

export function DealerFormStack({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("space-y-4 sm:space-y-5", className)}>{children}</div>;
}

/** Tab toggle row for service/parts style forms */
export function DealerFormTabs<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6 sm:mb-8">
      {options.map(opt => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            "flex-1 min-h-[44px] px-4 py-2.5 text-xs font-sans-brand font-semibold uppercase tracking-wider border transition-colors",
            value === opt.id
              ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]"
              : "bg-white text-muted-foreground border-border hover:border-[hsl(var(--secondary))]",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
