import type { TemplateOption } from "@/lib/templates";

type TemplateThumbCardProps = {
  template: TemplateOption;
  /** Defaults to the interactive demo at /templates/{slug}. */
  href?: string;
};

const TemplateThumbCard = ({ template, href }: TemplateThumbCardProps) => {
  const to = href ?? `/templates/${template.chirpsSlug}`;
  return (
    <a
      href={to}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-background transition-colors hover:border-foreground/25"
    >
      <div
        className="aspect-[16/10] overflow-hidden"
        style={{ backgroundColor: `${template.accent}22` }}
      >
        <img
          src={template.thumbnail}
          alt={`${template.name} website template preview`}
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          width={640}
          height={400}
        />
      </div>
      <div className="p-4">
        <p className="font-semibold tracking-tight text-foreground">{template.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{template.tagline}</p>
        <p className="mt-3 text-xs font-semibold text-foreground underline-offset-4 group-hover:underline">
          Open demo
        </p>
      </div>
    </a>
  );
};

export default TemplateThumbCard;
