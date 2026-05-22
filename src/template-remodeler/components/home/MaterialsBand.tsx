import { MATERIAL_BRANDS } from "@template-remodeler/data/siteData";

const MaterialsBand = () => (
  <section className="rm-section-pad bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
    <div className="container-custom container-inset text-center">
      <p className="font-sans-brand text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--secondary))] mb-3">
        Brands You Trust
      </p>
      <h2 className="font-display text-3xl sm:text-4xl mb-4">Premium Materials & Systems</h2>
      <p className="text-[hsl(var(--primary-foreground)/0.8)] font-sans-brand max-w-2xl mx-auto mb-10">
        We specify proven cabinetry, roofing, siding, and window lines — installed to manufacturer standards by licensed crews.
      </p>
      <ul className="flex flex-wrap justify-center gap-3 md:gap-4">
        {MATERIAL_BRANDS.map(label => (
          <li
            key={label}
            className="px-5 py-3 border border-[hsl(var(--primary-foreground)/0.2)] text-sm font-sans-brand font-semibold uppercase tracking-wide"
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default MaterialsBand;
