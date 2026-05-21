import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME_TRANSFORMATIONS } from "@template-painting/data/siteData";

/** Before/after transformations — uses fixed painting imagery (not draft project overrides). */
const SignatureProjectsSection = () => {
  const featured = HOME_TRANSFORMATIONS;
  const [active, setActive] = useState(0);
  const current = featured[active] ?? featured[0];
  if (!current) return null;

  return (
    <section className="section-padding bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-sans-brand tracking-[0.24em] uppercase text-[hsl(var(--secondary))] mb-3">
              Transformations
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Before & After
              <span className="block italic text-[hsl(var(--secondary))]">Real North Jersey Homes</span>
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-[hsl(var(--primary-foreground)/0.25)] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-foreground)/0.08)] rounded-sm self-start"
          >
            <Link to="/projects">
              Full gallery <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-sm overflow-hidden paint-shadow-soft">
            <div className="absolute inset-0 flex">
              <div className="w-1/2 relative overflow-hidden border-r border-[hsl(var(--primary-foreground)/0.15)]">
                <img
                  src={current.beforeImage}
                  alt={`${current.title} before`}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-4 left-4 text-[10px] font-sans-brand font-bold tracking-[0.2em] uppercase bg-[hsl(var(--flow-panel))]/80 px-3 py-1 rounded-sm">
                  Before
                </span>
              </div>
              <div className="w-1/2 relative overflow-hidden">
                <img
                  src={current.afterImage}
                  alt={`${current.title} after`}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-4 right-4 text-[10px] font-sans-brand font-bold tracking-[0.2em] uppercase bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] px-3 py-1 rounded-sm">
                  After
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-sans-brand text-[hsl(var(--secondary))] uppercase tracking-widest mb-2">
                {current.category} · {current.location}
              </p>
              <h3 className="font-display text-3xl mb-3">{current.title}</h3>
              <p className="text-sm text-[hsl(var(--primary-foreground)/0.75)] font-sans-brand leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {featured.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`text-left px-4 py-3 rounded-sm border transition-all font-sans-brand text-sm ${
                    i === active
                      ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary)/0.12)] text-[hsl(var(--primary-foreground))]"
                      : "border-[hsl(var(--primary-foreground)/0.12)] text-[hsl(var(--primary-foreground)/0.6)] hover:border-[hsl(var(--primary-foreground)/0.25)]"
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-sans-brand font-semibold text-[hsl(var(--secondary))] hover:gap-3 transition-all"
            >
              View full gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureProjectsSection;
