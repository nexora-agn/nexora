import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";

/**
 * Summit (editorial luxury) — magazine-style asymmetric hero.
 * Left: serif headline + body + textual nav links (NO buttons, NO image
 * overlay, NO rating card). Right: tall full-bleed photo with a thin
 * caption rule beneath it. Foot: 4 hairline-divided values row.
 */
const HomeHero = () => {
  const { homeHero: HOME_HERO, company: COMPANY } = useSiteContent();

  const eyebrow =
    (HOME_HERO as { eyebrow?: string }).eyebrow ||
    "ESTABLISHED CRAFTSMANSHIP";

  const city = (COMPANY.address || "").split(",").slice(-2, -1)[0]?.trim() ||
    "Texas";

  return (
    <section className="bg-background border-b border-foreground/10">
      <div className="container-custom grid lg:grid-cols-12 gap-10 lg:gap-16 px-4 md:px-10 pt-16 md:pt-24 pb-12 md:pb-20 items-end">
        <div className="lg:col-span-6">
          <p className="text-[11px] tracking-[0.32em] uppercase font-semibold text-foreground/60 mb-6">
            {eyebrow}
            <span className="mx-3 text-foreground/30">/</span>
            {city}
          </p>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-foreground"
            style={{ fontFamily: "var(--tpl-font-display)" }}
          >
            {HOME_HERO.headlineBefore}{" "}
            <span className="italic text-secondary">
              {HOME_HERO.headlineHighlight}
            </span>
            {HOME_HERO.headlineAfter && (
              <>
                <br />
                <span className="text-foreground/85">
                  {HOME_HERO.headlineAfter}
                </span>
              </>
            )}
          </h1>

          <p className="mt-8 max-w-md text-base md:text-lg text-foreground/70 leading-relaxed">
            {HOME_HERO.body}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-x-10 gap-y-4 text-sm font-semibold tracking-[0.18em] uppercase">
            <Link
              to={HOME_HERO.primaryCta.to}
              className="tpl-link-underline inline-flex items-center gap-2 text-foreground"
            >
              {HOME_HERO.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to={HOME_HERO.secondaryCta.to}
              className="tpl-link-underline inline-flex items-center gap-2 text-foreground/65"
            >
              {HOME_HERO.secondaryCta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <figure className="lg:col-span-6 lg:col-start-7">
          <div className="overflow-hidden">
            <img
              src={HOME_HERO.image}
              alt={HOME_HERO.featuredTitle || COMPANY.name}
              className="block w-full h-[440px] md:h-[560px] lg:h-[640px] object-cover"
              loading="eager"
            />
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-6 border-t border-foreground/15 pt-4">
            <span
              className="italic text-foreground/75"
              style={{ fontFamily: "var(--tpl-font-display)" }}
            >
              {HOME_HERO.featuredTitle || "Featured Project"}
            </span>
            <span className="text-[11px] tracking-[0.28em] uppercase text-foreground/55 font-semibold">
              {HOME_HERO.featuredMeta || HOME_HERO.featuredEyebrow}
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="border-t border-foreground/10">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-foreground/10 px-0">
          {[
            { k: "Est.", v: String(new Date().getFullYear() - 20) },
            { k: "Projects", v: "500+" },
            { k: "Repeat clients", v: "85%" },
            { k: "Warranty", v: "10-Year" },
          ].map(item => (
            <div key={item.k} className="px-6 md:px-10 py-8">
              <p className="text-[10px] tracking-[0.32em] uppercase text-foreground/55 font-semibold">
                {item.k}
              </p>
              <p
                className="tpl-number mt-2 text-4xl md:text-5xl text-foreground"
                style={{ fontFamily: "var(--tpl-font-display)" }}
              >
                {item.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
