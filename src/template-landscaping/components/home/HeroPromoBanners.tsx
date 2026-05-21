import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HERO_PROMO_BANNERS } from "@template-landscaping/data/siteData";

/** Jireh-style triple promo strip below hero */
const HeroPromoBanners = () => (
  <section className="grid md:grid-cols-3">
    {HERO_PROMO_BANNERS.map(banner => (
      <Link
        key={banner.id}
        to={banner.cta.to}
        className="group relative min-h-[200px] md:min-h-[220px] overflow-hidden vf-card-hover"
      >
        <img
          src={banner.image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[hsl(var(--vf-forest-dark))]/70 group-hover:bg-[hsl(var(--vf-forest-dark))]/60 transition-colors" />
        <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
          <p className="text-[10px] font-sans-brand font-bold uppercase tracking-[0.22em] text-[hsl(var(--secondary))] mb-2">
            {banner.title}
          </p>
          <h3 className="font-display text-xl md:text-2xl font-bold leading-snug mb-3">{banner.subtitle}</h3>
          <span className="inline-flex items-center gap-1 text-sm font-sans-brand font-semibold text-[hsl(var(--secondary))]">
            {banner.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    ))}
  </section>
);

export default HeroPromoBanners;
