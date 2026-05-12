import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";

/**
 * Summit (editorial luxury) — numbered hairline service index.
 * Tall heading on the left, vertical list on the right with serif numbers,
 * hairline rules between rows, no cards, no icons. Hovering reveals an
 * arrow on each row. Intentionally NOT a grid of cards.
 */
const ServicesRibbon = () => {
  const { services } = useSiteContent();
  const rows = services.slice(0, 8);

  return (
    <section className="bg-background border-t border-foreground/10">
      <div className="container-custom section-padding grid lg:grid-cols-12 gap-12 lg:gap-20">
        <header className="lg:col-span-4">
          <p className="text-[11px] tracking-[0.32em] uppercase font-semibold text-foreground/60">
            Index — Services
          </p>
          <h2
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] text-foreground"
            style={{ fontFamily: "var(--tpl-font-display)" }}
          >
            What we{" "}
            <span className="italic text-secondary">craft</span>.
          </h2>
          <p className="mt-6 max-w-sm text-foreground/65 leading-relaxed">
            A single accountable partner across feasibility, design, and build.
            Every project is led by a senior superintendent and a written scope
            you can read in one sitting.
          </p>
          <Link
            to="/services"
            className="tpl-link-underline mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.22em] uppercase text-foreground"
          >
            View all services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </header>

        <ol className="lg:col-span-8 border-t border-foreground/15">
          {rows.map((service, i) => (
            <li
              key={service.id}
              className="group border-b border-foreground/15"
            >
              <Link
                to={`/services/${service.id}`}
                className="grid grid-cols-12 items-baseline gap-4 py-7 md:py-9 transition-colors hover:bg-foreground/[0.02]"
              >
                <span
                  className="col-span-2 text-2xl md:text-3xl text-foreground/40 group-hover:text-secondary transition-colors"
                  style={{ fontFamily: "var(--tpl-font-display)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="col-span-6 md:col-span-5 text-2xl md:text-3xl lg:text-4xl font-medium text-foreground"
                  style={{ fontFamily: "var(--tpl-font-display)" }}
                >
                  {service.title}
                </h3>
                <p className="col-span-12 md:col-span-4 text-sm text-foreground/65 leading-relaxed">
                  {service.description}
                </p>
                <span className="col-span-12 md:col-span-1 flex md:justify-end pt-2 md:pt-0">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-all group-hover:border-secondary group-hover:text-secondary group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServicesRibbon;
