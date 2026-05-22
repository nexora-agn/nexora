import { REVIEW_PLATFORMS } from "@/data/siteData";

const ReviewPlatformsStrip = () => (
  <section className="py-10 border-y border-border bg-white">
    <div className="container-custom container-inset">
      <p className="text-center text-xs font-sans-brand font-semibold uppercase tracking-[0.24em] text-muted-foreground mb-6">
        Trusted on leading review platforms
      </p>
      <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
        {REVIEW_PLATFORMS.map(name => (
          <li
            key={name}
            className="font-display text-sm md:text-base text-[hsl(var(--primary))]/80 px-4 py-2 border border-border bg-[hsl(var(--rm-cream))]"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ReviewPlatformsStrip;
