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
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className={cn("container-custom px-4 md:px-8", align === "center" && "text-center")}>
          {eyebrow && <p className="text-sm font-bold tracking-[0.2em] text-secondary mb-3">{eyebrow}</p>}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{title}</h1>
          {subtitle && (
            <p className={cn("text-lg opacity-80", align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl")}>{subtitle}</p>
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">{title}</h1>
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
