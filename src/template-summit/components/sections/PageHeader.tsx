import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  /** Light = white page title band (Constructo inner pages). Dark = inverted bar. */
  variant?: "light" | "dark";
  align?: "center" | "left";
}

const PageHeader = ({
  title,
  subtitle,
  eyebrow,
  variant = "light",
  align = "center",
}: PageHeaderProps) => {
  if (variant === "dark") {
    return (
      <section className="relative bg-primary text-primary-foreground py-20 md:py-28 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className={cn("container-custom relative px-4 md:px-8", align === "center" && "text-center")}>
          {eyebrow && (
            <p className="text-xs md:text-sm font-bold tracking-[0.22em] text-secondary mb-4">{eyebrow}</p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[1.05]">
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-5 text-base md:text-lg text-white/85 leading-relaxed",
                align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-14 md:py-20 border-b border-border">
      <div className={cn("container-custom px-4 md:px-8", align === "center" && "text-center")}>
        {eyebrow && (
          <p className="text-sm font-bold tracking-[0.2em] text-secondary mb-3">{eyebrow}</p>
        )}
        <h1 className="text-4xl md:text-5xl font-black uppercase text-primary tracking-tight leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mt-4 text-lg text-muted-foreground leading-relaxed",
              align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
