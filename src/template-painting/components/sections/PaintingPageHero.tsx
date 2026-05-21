import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PaintingPageHeroProps {
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
  dark?: boolean;
}

const PaintingPageHero = ({
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
  dark = true,
}: PaintingPageHeroProps) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-[hsl(var(--primary))] text-white" : "bg-white text-[hsl(var(--primary))]",
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
              dark ? "opacity-40" : "opacity-25",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0",
              dark
                ? "bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary))]/90 to-[hsl(var(--primary))]/40"
                : "bg-gradient-to-r from-white via-white/95 to-white/80",
            )}
          />
        </>
      ) : null}
      
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav
            className={cn(
              "flex items-center gap-1.5 text-xs mb-3 font-display uppercase tracking-wider",
              dark ? "text-white/60" : "text-[hsl(var(--primary))]/60",
            )}
          >
            {breadcrumb.map((b, i) => (
              <span key={b.label + i} className="flex items-center gap-1.5">
                {b.to ? (
                  <Link
                    to={b.to}
                    className={cn("transition-colors", dark ? "hover:text-white" : "hover:text-[hsl(var(--primary))]")}
                  >
                    {b.label}
                  </Link>
                ) : (
                  <span className={dark ? "text-white/90" : "text-[hsl(var(--primary))]"}>{b.label}</span>
                )}
                {i < breadcrumb.length - 1 ? <ChevronRight className="h-3 w-3 opacity-50" /> : null}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-4">
            {eyebrow ? (
              <p className="text-[hsl(var(--secondary))] text-xs font-bold uppercase tracking-[0.22em] font-display">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-[0.95]">
              {title}
            </h1>
            {eyebrowAfter ? (
              <p className="text-[hsl(var(--secondary))] font-display font-bold text-base sm:text-lg uppercase tracking-wide">
                {eyebrowAfter}
              </p>
            ) : null}
            {body ? (
              <p
                className={cn(
                  "text-base leading-relaxed max-w-xl",
                  dark ? "text-white/80" : "text-[hsl(var(--primary))]/70",
                )}
              >
                {body}
              </p>
            ) : null}
            {badges ? (
              <div
                className={cn(
                  "pt-2 [&_.badge-pill]:rounded-sm [&_.badge-pill]:px-3 [&_.badge-pill]:py-2 [&_.badge-pill]:text-xs [&_.badge-pill]:font-display [&_.badge-pill]:font-bold [&_.badge-pill]:uppercase [&_.badge-pill]:tracking-wider",
                  dark
                    ? "[&_.badge-pill]:bg-white/10 [&_.badge-pill]:text-white"
                    : "[&_.badge-pill]:bg-[hsl(var(--primary))]/10 [&_.badge-pill]:text-[hsl(var(--primary))]",
                )}
              >
                {badges}
              </div>
            ) : null}
          </div>
          {rightSlot ? <div className="lg:col-span-5">{rightSlot}</div> : null}
        </div>
      </div>
    </section>
  );
};

export default PaintingPageHero;
