import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PlumbingPageHeroProps {
  title: string;
  eyebrow?: string;
  eyebrowAfter?: string;
  body?: string;
  breadcrumb?: { label: string; to?: string }[];
  image?: string;
  imageAlt?: string;
  badges?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
  /** @deprecated Light hero is the default; dark only for legacy overrides */
  dark?: boolean;
}

const PlumbingPageHero = ({
  title,
  eyebrow,
  eyebrowAfter,
  body,
  breadcrumb,
  image,
  imageAlt,
  badges,
  rightSlot,
  className,
  dark = false,
}: PlumbingPageHeroProps) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border",
        dark
          ? "bg-[hsl(var(--primary))] text-white"
          : "ff-page-hero text-[hsl(var(--foreground))]",
        className,
      )}
    >
      {image ? (
        <>
          <img
            src={image}
            alt={imageAlt || ""}
            aria-hidden={!imageAlt}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              dark ? "opacity-35" : "opacity-[0.07]",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0",
              dark
                ? "bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary))]/92 to-[hsl(var(--primary))]/50"
                : "bg-gradient-to-r from-white via-white/96 to-white/85",
            )}
          />
        </>
      ) : null}

      {!dark && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 90% 10%, hsl(var(--secondary) / 0.12) 0%, transparent 45%), radial-gradient(circle at 5% 95%, hsl(var(--secondary) / 0.06) 0%, transparent 40%)",
          }}
        />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14 lg:py-18">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav
            className={cn(
              "flex items-center gap-1.5 text-xs mb-4 font-sans-brand font-semibold uppercase tracking-wider",
              dark ? "text-white/60" : "text-muted-foreground",
            )}
          >
            {breadcrumb.map((b, i) => (
              <span key={b.label + i} className="flex items-center gap-1.5">
                {b.to ? (
                  <Link
                    to={b.to}
                    className={cn(
                      "transition-colors",
                      dark ? "hover:text-white" : "hover:text-[hsl(var(--secondary))]",
                    )}
                  >
                    {b.label}
                  </Link>
                ) : (
                  <span className={dark ? "text-white/90" : "text-[hsl(var(--primary))]"}>
                    {b.label}
                  </span>
                )}
                {i < breadcrumb.length - 1 ? <ChevronRight className="h-3 w-3 opacity-50" /> : null}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-4">
            {eyebrow ? (
              <p
                className={cn(
                  "text-xs font-bold uppercase tracking-[0.2em] font-sans-brand",
                  dark ? "text-[hsl(var(--secondary))]" : "text-[hsl(var(--secondary))]",
                )}
              >
                {eyebrow}
              </p>
            ) : null}
            <h1
              className={cn(
                "font-display font-bold leading-[1.08]",
                dark
                  ? "text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide"
                  : "text-3xl sm:text-4xl lg:text-[3.25rem] text-[hsl(var(--primary))]",
              )}
            >
              {title}
            </h1>
            {eyebrowAfter ? (
              <p
                className={cn(
                  "font-display font-bold text-base sm:text-lg",
                  dark
                    ? "text-[hsl(var(--secondary))] uppercase tracking-wide"
                    : "text-[hsl(var(--secondary))]",
                )}
              >
                {eyebrowAfter}
              </p>
            ) : null}
            {body ? (
              <p
                className={cn(
                  "text-base leading-relaxed max-w-xl font-sans-brand",
                  dark ? "text-white/80" : "text-muted-foreground",
                )}
              >
                {body}
              </p>
            ) : null}
            {badges ? (
              <div
                className={cn(
                  "pt-2 [&_.badge-pill]:rounded-lg [&_.badge-pill]:px-3 [&_.badge-pill]:py-2 [&_.badge-pill]:text-xs [&_.badge-pill]:font-sans-brand [&_.badge-pill]:font-semibold",
                  dark
                    ? "[&_.badge-pill]:bg-white/10 [&_.badge-pill]:text-white [&_.badge-pill]:uppercase [&_.badge-pill]:tracking-wider"
                    : "[&_.badge-pill]:bg-white [&_.badge-pill]:text-[hsl(var(--primary))] [&_.badge-pill]:border [&_.badge-pill]:border-border [&_.badge-pill]:shadow-sm",
                )}
              >
                {badges}
              </div>
            ) : null}
          </div>
          {rightSlot ? <div className="lg:col-span-5">{rightSlot}</div> : null}
        </div>
      </div>
      {!dark && (
        <div className="h-1 bg-gradient-to-r from-transparent via-[hsl(var(--secondary))] to-transparent opacity-50" />
      )}
      {dark && <div className="h-1 bg-[hsl(var(--secondary))]" aria-hidden />}
    </section>
  );
};

export default PlumbingPageHero;
