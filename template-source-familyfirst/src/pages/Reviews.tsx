import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Star,
  Quote,
  PlayCircle,
  ExternalLink,
  MapPin,
  Search,
} from "lucide-react";
import Layout from "@template-familyfirst/components/layout/Layout";
import Reveal from "@template-familyfirst/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSiteContent } from "@template-familyfirst/contexts/SiteContentContext";
import { PLUMBING_IMAGES } from "@template-familyfirst/data/siteData";
import { cn } from "@/lib/utils";

/** Premium reviews layout (MrBuilderNYC archetype) — Family First Plumbing. */

interface Platform {
  id: string;
  label: string;
  count: number;
  rating: number;
  color: string;
}

const PLATFORMS: Platform[] = [
  { id: "google", label: "Google", count: 86, rating: 5.0, color: "bg-blue-500" },
  { id: "referral", label: "Direct referrals", count: 42, rating: 5.0, color: "bg-secondary" },
  { id: "facebook", label: "Facebook", count: 28, rating: 5.0, color: "bg-indigo-500" },
  { id: "yelp", label: "Yelp", count: 18, rating: 4.9, color: "bg-rose-500" },
];

interface ReviewItem {
  id: string;
  author: string;
  city: string;
  platform: Platform["id"];
  rating: number;
  date: string;
  body: string;
  project: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    author: "Karen S.",
    city: "Freehold, NJ",
    platform: "google",
    rating: 5,
    date: "Jan 2026",
    body:
      "Extremely knowledgeable — went over every option for our repair, did the work personally, and followed up after the job. Highly recommend.",
    project: "Boiler repair",
  },
  {
    id: "r2",
    author: "Mike D.",
    city: "Toms River, NJ",
    platform: "google",
    rating: 5,
    date: "Dec 2025",
    body:
      "Great scheduling and communication from start to finish. Exactly what you want from a local plumber.",
    project: "Water heater replacement",
  },
  {
    id: "r3",
    author: "Linda P.",
    city: "Red Bank, NJ",
    platform: "referral",
    rating: 5,
    date: "Nov 2025",
    body:
      "They repaired our leaking water heater quickly. The home inspection caught pressure issues we didn't know about — huge help.",
    project: "Water heater + pressure fix",
  },
  {
    id: "r4",
    author: "James W.",
    city: "Brick, NJ",
    platform: "google",
    rating: 5,
    date: "Oct 2025",
    body:
      "Quick, reliable, efficient service at reasonable rates. Will call again without hesitation.",
    project: "Drain cleaning",
  },
  {
    id: "r5",
    author: "Donna R.",
    city: "Point Pleasant, NJ",
    platform: "facebook",
    rating: 5,
    date: "Sep 2025",
    body:
      "Boiler was making strange noises — they fixed the real issue, not a band-aid. House is warm again.",
    project: "Hydronic heating service",
  },
  {
    id: "r6",
    author: "Steve H.",
    city: "Howell, NJ",
    platform: "referral",
    rating: 5,
    date: "Aug 2025",
    body:
      "Family-owned feel with professional results. On time, respectful, and honest about pricing.",
    project: "Emergency pipe repair",
  },
  {
    id: "r7",
    author: "Maria G.",
    city: "Middletown, NJ",
    platform: "yelp",
    rating: 5,
    date: "Jul 2025",
    body:
      "Called with no hot water on a Sunday — they walked us through shutoffs and were here fast. Fair quote, clean work.",
    project: "Emergency water heater",
  },
  {
    id: "r8",
    author: "Tom & Sue",
    city: "Jackson, NJ",
    platform: "google",
    rating: 5,
    date: "Jun 2025",
    body:
      "Sewer backup was a nightmare. They diagnosed the line, cleared it, and explained how to avoid it next time.",
    project: "Sewer line service",
  },
];

const VIDEO_REVIEWS = [
  {
    poster: PLUMBING_IMAGES.waterHeater,
    speaker: "Homeowner — water heater replacement",
    duration: "1:28",
  },
  {
    poster: PLUMBING_IMAGES.boiler,
    speaker: "Homeowner — boiler & hydronic repair",
    duration: "2:04",
  },
  {
    poster: PLUMBING_IMAGES.emergency,
    speaker: "Homeowner — emergency leak repair",
    duration: "0:54",
  },
];

const Reviews = () => {
  const { company: COMPANY } = useSiteContent();
  const [platform, setPlatform] = useState<string>("all");
  const [query, setQuery] = useState("");

  const totalCount = PLATFORMS.reduce((s, p) => s + p.count, 0);
  const aggregate = (PLATFORMS.reduce((s, p) => s + p.rating * p.count, 0) / totalCount).toFixed(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REVIEWS.filter(r => {
      const platformOk = platform === "all" || r.platform === platform;
      const queryOk =
        !q ||
        r.body.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.project.toLowerCase().includes(q);
      return platformOk && queryOk;
    });
  }, [platform, query]);

  const cities = useMemo(() => {
    const set = new Set<string>();
    REVIEWS.forEach(r => set.add(r.city));
    return Array.from(set);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Reviews | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Homeowner reviews of ${COMPANY.name} from Google, referrals, Facebook, and Yelp across Monmouth and Ocean County.`}
        />
      </Helmet>

      <section className="bg-background border-b border-border">
        <div className="container-custom px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-sans-brand font-bold tracking-[0.28em] text-secondary mb-4">
              {totalCount} REVIEWS · 4 PLATFORMS
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.05] text-primary">
              Neighbor words,
              <br />
              <span className="text-secondary">from real plumbing jobs.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed font-sans-brand">
              Filter by platform or town. Every entry reflects the kind of work we do every week —
              boilers, water heaters, drains, and emergency repairs at the shore.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-primary text-primary-foreground p-7 md:p-8 flow-shadow-elevated">
            <div className="flex items-baseline gap-3">
              <span className="text-6xl md:text-7xl font-display font-bold text-[hsl(var(--accent))] leading-none tabular-nums">
                {aggregate}
              </span>
              <div className="flex flex-col">
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                  ))}
                </span>
                <span className="mt-1 text-[10px] font-sans-brand font-bold tracking-widest uppercase text-white/70">
                  Aggregate, four platforms
                </span>
              </div>
            </div>
            <ul className="mt-6 pt-6 border-t border-white/10 space-y-3">
              {PLATFORMS.map(p => (
                <li key={p.id} className="flex items-center gap-3 text-xs font-sans-brand">
                  <span className={cn("h-2 w-2 rounded-full shrink-0", p.color)} />
                  <span className="font-bold uppercase tracking-wider text-white/85 flex-1">{p.label}</span>
                  <span className="tabular-nums text-[hsl(var(--accent))] font-extrabold">
                    {p.rating.toFixed(1)}
                  </span>
                  <span className="text-white/60 tabular-nums">· {p.count} reviews</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background pt-12 md:pt-14">
        <div className="container-custom px-4 md:px-8 grid md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPlatform("all")}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-sans-brand font-bold tracking-widest uppercase border-2 transition-colors",
                platform === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/70 hover:border-secondary/50",
              )}
            >
              All platforms · {totalCount}
            </button>
            {PLATFORMS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatform(p.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-sans-brand font-bold tracking-widest uppercase border-2 transition-colors flex items-center gap-2",
                  platform === p.id
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-card text-foreground/70 hover:border-secondary/50",
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", p.color)} />
                {p.label} · {p.count}
              </button>
            ))}
          </div>
          <div className="md:col-span-5 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by town, name, or keyword…"
              className="h-12 pl-11 rounded-xl text-sm font-medium bg-card border-2 border-border focus-visible:ring-secondary focus-visible:border-secondary"
            />
          </div>
        </div>
      </section>

      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-border p-16 text-center">
              <p className="text-sm text-muted-foreground font-sans-brand">
                No reviews match that combination yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-5 auto-rows-[minmax(220px,_auto)]">
              {filtered.map((r, i) => {
                const variant = i % 5;
                const isFeature = variant === 0;
                return (
                  <article
                    key={r.id}
                    className={cn(
                      "relative rounded-2xl border border-border p-6 md:p-7 transition-all hover:border-secondary/60 hover:-translate-y-0.5",
                      isFeature
                        ? "bg-primary text-primary-foreground md:col-span-6 lg:col-span-7"
                        : "bg-card md:col-span-3 lg:col-span-5",
                      variant === 1 && "lg:col-span-4",
                      variant === 2 && "lg:col-span-3",
                      variant === 3 && "lg:col-span-5",
                      variant === 4 && "lg:col-span-4",
                    )}
                  >
                    <Quote
                      className={cn(
                        "absolute top-4 right-4 h-8 w-8",
                        isFeature ? "text-[hsl(var(--accent))]/30" : "text-secondary/15",
                      )}
                      aria-hidden
                    />
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex gap-0.5">
                        {[...Array(r.rating)].map((_, k) => (
                          <Star key={k} className="h-3.5 w-3.5 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                        ))}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-sans-brand font-bold tracking-widest uppercase",
                          isFeature ? "text-white/65" : "text-muted-foreground",
                        )}
                      >
                        {r.platform} · {r.date}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "leading-relaxed font-sans-brand",
                        isFeature ? "text-base md:text-xl font-medium" : "text-sm md:text-base text-foreground/90",
                      )}
                    >
                      &ldquo;{r.body}&rdquo;
                    </p>
                    <footer
                      className={cn(
                        "mt-5 pt-5 border-t flex items-center justify-between gap-3",
                        isFeature ? "border-white/10" : "border-border",
                      )}
                    >
                      <div>
                        <p
                          className={cn(
                            "text-sm font-display font-bold",
                            isFeature ? "text-white" : "text-primary",
                          )}
                        >
                          {r.author}
                        </p>
                        <p className="text-[10px] font-sans-brand font-bold tracking-widest uppercase mt-0.5 text-secondary">
                          {r.city}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-sans-brand font-bold tracking-widest uppercase rounded-full px-2.5 py-1",
                          isFeature ? "bg-white/10 text-white/85" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {r.project}
                      </span>
                    </footer>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Reveal>
        <section className="bg-[hsl(var(--flow-soft))] section-padding border-y border-border">
          <div className="container-custom px-4 md:px-8 mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-sans-brand font-bold tracking-[0.22em] text-secondary mb-2">ON CAMERA</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight leading-tight">
                Homeowners we filmed after the fix.
              </h2>
            </div>
            <span className="text-[10px] font-sans-brand font-bold tracking-widest uppercase text-muted-foreground hidden md:inline">
              Slide →
            </span>
          </div>
          <div className="flex gap-5 overflow-x-auto px-4 md:px-8 pb-5 snap-x snap-mandatory [scrollbar-width:thin]">
            {VIDEO_REVIEWS.map((v, i) => (
              <button
                key={i}
                type="button"
                className="group relative shrink-0 w-[80%] sm:w-[55%] md:w-[40%] aspect-video rounded-2xl overflow-hidden ring-1 ring-black/5 snap-start"
              >
                <img
                  src={v.poster}
                  alt={v.speaker}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                <PlayCircle
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-white/90 group-hover:text-[hsl(var(--accent))] transition-colors"
                  strokeWidth={1.4}
                />
                <div className="absolute left-4 right-4 bottom-4 text-white text-left">
                  <p className="text-sm md:text-base font-display font-bold">{v.speaker}</p>
                  <p className="mt-0.5 text-[10px] font-sans-brand font-bold tracking-widest uppercase text-[hsl(var(--accent))] tabular-nums">
                    {v.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </Reveal>

      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container-custom px-4 md:px-8 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-sans-brand font-bold tracking-[0.28em] text-[hsl(var(--accent))] mb-3">
              WHERE OUR REVIEWERS LIVE
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              Monmouth & Ocean County.
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/85 leading-relaxed font-sans-brand">
              Every pin below is from a published review by a local homeowner. If your town is not listed
              yet, we may still serve your area — call or text to confirm.
            </p>
            <Link
              to="/service-areas"
              className="mt-5 inline-flex items-center gap-2 text-xs font-sans-brand font-bold tracking-widest uppercase text-[hsl(var(--accent))] hover:gap-3 transition-all"
            >
              SEE FULL SERVICE AREA
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {cities.map(city => (
              <div
                key={city}
                className="flex items-center gap-2 rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2.5"
              >
                <MapPin className="h-3.5 w-3.5 text-[hsl(var(--accent))] shrink-0" />
                <span className="text-xs font-sans-brand font-bold uppercase tracking-wider truncate">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background border-t border-border">
        <div className="container-custom px-4 md:px-8 py-12 md:py-16 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-sans-brand font-bold tracking-[0.28em] text-secondary mb-3">
              YOUR REVIEW, EVENTUALLY
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight leading-tight">
              We&apos;d rather earn the words than ask for them.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
            <Button asChild className="h-12 rounded-xl px-6 ff-warm-cta text-sm font-sans-brand font-semibold">
              <Link to="/contact">SCHEDULE SERVICE</Link>
            </Button>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(`${COMPANY.name} plumbing reviews`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 self-center text-xs font-sans-brand font-bold tracking-widest uppercase text-primary hover:text-secondary border-b-2 border-primary/20 hover:border-secondary transition-colors"
            >
              READ ON GOOGLE
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
