import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NexoraPageHeroProps {
  title: string;
  eyebrowAfter?: string;
  body?: string;
  breadcrumb?: { label: string; to?: string }[];
  image?: string;
  imageAlt?: string;
  badges?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
}

const NexoraPageHero = ({
  title,
  eyebrowAfter,
  body,
  breadcrumb,
  image,
  imageAlt,
  badges,
  rightSlot,
  className,
}: NexoraPageHeroProps) => {
  return (
    <section className={cn("relative overflow-hidden bg-[hsl(var(--primary))] text-white", className)}>
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt || ""}
            aria-hidden={!imageAlt}
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary))]/85 to-[hsl(var(--primary))]/30"
          />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-3">
            {breadcrumb.map((b, i) => (
              <span key={b.label + i} className="flex items-center gap-1.5">
                {b.to ? (
                  <Link to={b.to} className="hover:text-white">{b.label}</Link>
                ) : (
                  <span>{b.label}</span>
                )}
                {i < breadcrumb.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" />}
              </span>
            ))}
          </nav>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
              {title}
            </h1>
            {eyebrowAfter && (
              <p className="text-[hsl(var(--secondary))] font-bold text-base sm:text-lg">
                {eyebrowAfter}
              </p>
            )}
            {body && (
              <p className="text-white/85 text-base leading-relaxed max-w-xl">{body}</p>
            )}
            {badges && <div className="pt-2">{badges}</div>}
          </div>
          {rightSlot && <div className="lg:col-span-5">{rightSlot}</div>}
        </div>
      </div>
    </section>
  );
};

export default NexoraPageHero;
