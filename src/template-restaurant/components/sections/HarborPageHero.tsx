import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface HarborPageHeroProps {
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

/** Inner page hero — light editorial band with optional side image */
const HarborPageHero = ({
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
}: HarborPageHeroProps) => {
  const useDark = dark;

  return (
    <section
      className={cn(
        "border-b border-border",
        useDark ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]" : "bg-[hsl(var(--hb-warm-white))]",
        className,
      )}
    >
      <div className="container-custom container-inset py-10 md:py-14">
        <div className={cn("grid gap-8 items-center", image ? "lg:grid-cols-12" : "")}>
          <div className={image ? "lg:col-span-7" : ""}>
            {breadcrumb && breadcrumb.length > 0 && (
              <nav
                className={cn(
                  "flex items-center gap-1.5 text-xs mb-4 font-sans-brand uppercase tracking-wider",
                  useDark ? "text-[hsl(var(--primary-foreground)/0.6)]" : "text-muted-foreground",
                )}
              >
                {breadcrumb.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="h-3 w-3" />}
                    {crumb.to ? (
                      <Link to={crumb.to} className="hover:text-[hsl(var(--secondary))]">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={useDark ? "text-[hsl(var(--secondary))]" : "text-[hsl(var(--primary))]"}>
                        {crumb.label}
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            {eyebrow && (
              <p
                className={cn(
                  "font-display text-xs font-semibold uppercase tracking-[0.28em] mb-3",
                  useDark ? "text-[hsl(var(--secondary))]" : "text-[hsl(var(--secondary))]",
                )}
              >
                {eyebrow}
              </p>
            )}

            <h1
              className={cn(
                "font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight",
                useDark ? "text-[hsl(var(--primary-foreground))]" : "text-[hsl(var(--primary))]",
              )}
            >
              {title}
            </h1>

            {eyebrowAfter && (
              <p
                className={cn(
                  "mt-3 font-display text-sm uppercase tracking-[0.16em]",
                  useDark ? "text-[hsl(var(--primary-foreground)/0.7)]" : "text-muted-foreground",
                )}
              >
                {eyebrowAfter}
              </p>
            )}

            <div className={cn("hb-rule my-5", useDark && "bg-[hsl(var(--secondary))]")} />

            {body && (
              <p
                className={cn(
                  "text-base leading-relaxed max-w-2xl font-sans-brand",
                  useDark ? "text-[hsl(var(--primary-foreground)/0.85)]" : "text-muted-foreground",
                )}
              >
                {body}
              </p>
            )}

            {badges && <div className="mt-6 flex flex-wrap gap-3">{badges}</div>}
            {rightSlot}
          </div>

          {image && (
            <div className="lg:col-span-5">
              <img
                src={image}
                alt={imageAlt || title}
                className="w-full aspect-[16/10] object-cover border border-border hb-frame"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HarborPageHero;
