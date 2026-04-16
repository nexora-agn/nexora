import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  breadcrumb: BreadcrumbItem[];
  title: string;
  description?: string;
}

const PageHeader = ({ breadcrumb, title, description }: PageHeaderProps) => {
  return (
    <header className="border-b border-border/80 bg-muted/25">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
            {breadcrumb.map((item, i) => (
              <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span className="text-border select-none" aria-hidden>
                    /
                  </span>
                )}
                {item.to ? (
                  <Link to={item.to} className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl md:leading-tight">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
};

export default PageHeader;
