import { ReactNode } from "react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  variant?: "hero" | "compact";
  children?: ReactNode;
  align?: "left" | "center";
}

const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  image,
  variant = "hero",
  children,
  align = "center",
}: PageHeaderProps) => {
  const isHero = variant === "hero";

  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden bg-[hsl(var(--primary))] text-white",
        isHero ? "min-h-[56vh] pt-32 pb-16 lg:pt-40 lg:pb-20" : "pt-32 pb-14 lg:pt-36 lg:pb-16",
      )}
    >
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))] via-[hsl(var(--primary))]/70 to-[hsl(var(--primary))]/30" />
        </>
      )}
      <div
        className={cn(
          "relative container-custom container-inset",
          align === "center" && "text-center mx-auto",
        )}
      >
        <Reveal direction="up">
          {eyebrow && <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-4">{eyebrow}</p>}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold uppercase leading-[1.05] max-w-3xl mx-auto">
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-5 text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl",
                align === "center" && "mx-auto",
              )}
            >
              {subtitle}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
};

export default PageHeader;
