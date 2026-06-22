import { Link } from "react-router-dom";
import { CTA_SECTION } from "@template-luxury-real-estate/data/siteData";

const LuxuryCTA = () => (
  <section className="relative py-28 lg:py-36 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85)" }}
    />
    <div className="absolute inset-0 bg-[hsl(var(--primary))]/85" />
    <div className="relative container-custom container-inset text-center text-white">
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-8 max-w-3xl mx-auto">
        {CTA_SECTION.headline}
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to={CTA_SECTION.primaryCta.to} className="btn-luxury-hero-primary">
          {CTA_SECTION.primaryCta.label}
        </Link>
        <Link to={CTA_SECTION.secondaryCta.to} className="btn-luxury-hero-secondary">
          {CTA_SECTION.secondaryCta.label}
        </Link>
      </div>
    </div>
  </section>
);

export default LuxuryCTA;
