import { useSiteContent } from "@template-painting/contexts/SiteContentContext";

const TrustLicenseBar = () => {
  const { siteTop: SITE_TOP } = useSiteContent();
  const items = [
    ...(SITE_TOP.badges ?? []),
    `${SITE_TOP.ratingValue}★ ${SITE_TOP.ratingLabel}`,
    SITE_TOP.locations,
  ];

  const doubled = [...items, ...items];

  return (
    <section className="border-y border-border bg-[hsl(var(--flow-warm))] py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center mx-8 text-xs font-sans-brand font-semibold tracking-[0.2em] uppercase text-muted-foreground"
          >
            <span className="h-1 w-1 rounded-full bg-[hsl(var(--secondary))] mr-8" aria-hidden />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TrustLicenseBar;
