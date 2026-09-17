import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type PageCtaProps = {
  title: string;
  body: string;
  primary: { to: string; label: string };
  secondary?: { to: string; label: string };
};

/** Conversion strip used on commercial SEO pages. */
const PageCta = ({ title, body, primary, secondary }: PageCtaProps) => {
  return (
    <section className="border-t border-border/80 bg-neutral-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:py-14">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400 md:text-base">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="h-11 rounded-xl bg-brand px-6 font-semibold text-brand-foreground hover:bg-brand-muted">
            <Link to={primary.to}>{primary.label}</Link>
          </Button>
          {secondary ? (
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-xl border-neutral-700 bg-transparent px-6 font-semibold text-white hover:bg-white/10"
            >
              <Link to={secondary.to}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PageCta;
