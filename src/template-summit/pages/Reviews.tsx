import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Quote,
  PlayCircle,
  ExternalLink,
  MapPin,
  Search,
} from "lucide-react";
import Layout from "@template-summit/components/layout/Layout";
import Reveal from "@template-summit/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

/** Summit Reviews. Distinct from the homepage's three-up testimonial carousel.
 *  Archetypes:
 *  1. Aggregate score split hero with platform breakdown
 *  2. Platform filter pills (Google / Houzz / Referrals / Yelp)
 *  3. Searchable, asymmetric review wall (varied card sizes)
 *  4. Video testimonial filmstrip (placeholder posters)
 *  5. Reviewer-cities map pin band linking to Service Areas
 *  6. Page-unique closing strip */

interface Platform {
  id: string;
  label: string;
  count: number;
  rating: number;
  color: string;
}

const PLATFORMS: Platform[] = [
  { id: "google", label: "Google", count: 142, rating: 4.9, color: "bg-blue-500" },
  { id: "houzz", label: "Houzz", count: 38, rating: 5.0, color: "bg-emerald-500" },
  { id: "referral", label: "Direct referrals", count: 67, rating: 5.0, color: "bg-secondary" },
  { id: "yelp", label: "Yelp", count: 24, rating: 4.8, color: "bg-rose-500" },
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
    author: "Patricia M.",
    city: "Frisco, TX",
    platform: "google",
    rating: 5,
    date: "Jan 2026",
    body:
      "Three contractors bid the addition. Summit was the only one who walked the attic before quoting. Their number was the most honest one we got and ended up being the final number too.",
    project: "Whole-home addition",
  },
  {
    id: "r2",
    author: "Marcus & Joanne",
    city: "Plano, TX",
    platform: "houzz",
    rating: 5,
    date: "Dec 2025",
    body:
      "Friday owner walks were the difference. We never had a Monday surprise the entire job. The super knew our dog's name by week two.",
    project: "Custom home, 4,800 sqft",
  },
  {
    id: "r3",
    author: "Hassan R.",
    city: "Irving, TX",
    platform: "referral",
    rating: 5,
    date: "Nov 2025",
    body:
      "Hired them on a friend's recommendation. Project came in three days early. Punch list closed before the final draw. Refer them every chance I get.",
    project: "Office TI",
  },
  {
    id: "r4",
    author: "Diane L.",
    city: "Fort Worth, TX",
    platform: "google",
    rating: 5,
    date: "Oct 2025",
    body:
      "We were told a renovation of this scope would be a nightmare. It wasn't. Daily sweep, dust barriers, and our kitchen worked the entire time.",
    project: "Estate renovation",
  },
  {
    id: "r5",
    author: "Edmund K.",
    city: "Arlington, TX",
    platform: "houzz",
    rating: 5,
    date: "Sep 2025",
    body:
      "We used the aftercare line a year after move-in. They came back within two days, fixed it under warranty, and emailed me a one-page note. Doesn't happen with every builder.",
    project: "Custom home aftercare",
  },
  {
    id: "r6",
    author: "Renee A.",
    city: "Dallas, TX",
    platform: "yelp",
    rating: 5,
    date: "Aug 2025",
    body:
      "Two change orders the entire job, both priced before the work started. The bill at the end matched the contract. I had to triple-check.",
    project: "Restaurant fit-out",
  },
  {
    id: "r7",
    author: "Bryan & Eli",
    city: "Mansfield, TX",
    platform: "referral",
    rating: 5,
    date: "Jul 2025",
    body:
      "We've now hired them twice. Different supers, same standards. The continuity across crews is what made us come back.",
    project: "Second residence",
  },
  {
    id: "r8",
    author: "Kelly H.",
    city: "Allen, TX",
    platform: "google",
    rating: 5,
    date: "Jun 2025",
    body:
      "They told me the things I didn't want to hear about my budget — early enough that we could change the plan instead of the project.",
    project: "Custom build",
  },
];

const VIDEO_REVIEWS = [
  {
    poster:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&h=520&fit=crop",
    speaker: "Owner — Plano custom home",
    duration: "1:42",
  },
  {
    poster:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=520&fit=crop",
    speaker: "Owner — Office TI, Las Colinas",
    duration: "2:16",
  },
  {
    poster:
      "https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=900&h=520&fit=crop",
    speaker: "Architect — Frisco estate",
    duration: "0:58",
  },
];

const Reviews = () => {
  const { company: COMPANY } = useSiteContent();
  const [platform, setPlatform] = useState<string>("all");
  const [query, setQuery] = useState("");

  const totalCount = PLATFORMS.reduce((s, p) => s + p.count, 0);
  const aggregate = (
    PLATFORMS.reduce((s, p) => s + p.rating * p.count, 0) / totalCount
  ).toFixed(1);

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

  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  return (
    <Layout>
      <Helmet>
        <title>Reviews | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Owner reviews of ${COMPANY.name} from Google, Houzz, direct referrals, and Yelp.`}
        />
      </Helmet>

      {/* 1 — Aggregate score split hero */}
      <section className="bg-background border-b border-border">
        <div className="container-custom px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-4">
              {totalCount} REVIEWS · 4 PLATFORMS
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02] text-primary">
              Owner words,
              <br />
              <span className="text-secondary">pulled from public posts.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed">
              Filter by platform or city. Every entry below is verifiable on
              the platform it came from — no curated quote sheets.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-primary text-primary-foreground p-7 md:p-8">
            <div className="flex items-baseline gap-3">
              <span className="text-6xl md:text-7xl font-black text-secondary leading-none tabular-nums">
                {aggregate}
              </span>
              <div className="flex flex-col">
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </span>
                <span className="mt-1 text-[10px] font-bold tracking-widest uppercase text-white/70">
                  Aggregate, four platforms
                </span>
              </div>
            </div>
            <ul className="mt-6 pt-6 border-t border-white/10 space-y-3">
              {PLATFORMS.map(p => (
                <li
                  key={p.id}
                  className="flex items-center gap-3 text-xs"
                >
                  <span className={cn("h-2 w-2 rounded-full shrink-0", p.color)} />
                  <span className="font-bold uppercase tracking-wider text-white/85 flex-1">
                    {p.label}
                  </span>
                  <span className="tabular-nums text-secondary font-extrabold">
                    {p.rating.toFixed(1)}
                  </span>
                  <span className="text-white/60 tabular-nums">
                    · {p.count} reviews
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2 — Platform filter + search */}
      <section className="bg-background pt-12 md:pt-14">
        <div className="container-custom px-4 md:px-8 grid md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPlatform("all")}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-extrabold tracking-widest uppercase border-2 transition-colors",
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
                  "rounded-full px-4 py-2 text-xs font-extrabold tracking-widest uppercase border-2 transition-colors flex items-center gap-2",
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
              placeholder="Search by city, owner, or word…"
              className="h-12 pl-11 rounded-md text-sm font-medium bg-card border-2 border-border focus-visible:ring-secondary focus-visible:border-secondary"
            />
          </div>
        </div>
      </section>

      {/* 3 — Asymmetric review wall */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-border p-16 text-center">
              <p className="text-sm text-muted-foreground">
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
                        isFeature ? "text-secondary/30" : "text-secondary/15",
                      )}
                      aria-hidden
                    />
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex gap-0.5">
                        {[...Array(r.rating)].map((_, k) => (
                          <Star
                            key={k}
                            className="h-3.5 w-3.5 fill-secondary text-secondary"
                          />
                        ))}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-bold tracking-widest uppercase",
                          isFeature ? "text-white/65" : "text-muted-foreground",
                        )}
                      >
                        {r.platform} · {r.date}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "leading-relaxed",
                        isFeature
                          ? "text-base md:text-xl font-medium"
                          : "text-sm md:text-base text-foreground/90",
                      )}
                    >
                      "{r.body}"
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
                            "text-sm font-black uppercase tracking-tight",
                            isFeature ? "text-white" : "text-primary",
                          )}
                        >
                          {r.author}
                        </p>
                        <p
                          className={cn(
                            "text-[10px] font-bold tracking-widest uppercase mt-0.5",
                            isFeature ? "text-secondary" : "text-secondary",
                          )}
                        >
                          {r.city}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-bold tracking-widest uppercase rounded-full px-2.5 py-1",
                          isFeature
                            ? "bg-white/10 text-white/85"
                            : "bg-muted text-muted-foreground",
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

      {/* 4 — Video filmstrip */}
      <Reveal>
        <section className="bg-muted/40 section-padding border-y border-border">
          <div className="container-custom px-4 md:px-8 mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-2">
                ON CAMERA
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight leading-tight">
                Owners we filmed at handover.
              </h2>
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground hidden md:inline">
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
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-white/90 group-hover:text-secondary transition-colors"
                  strokeWidth={1.4}
                />
                <div className="absolute left-4 right-4 bottom-4 text-white text-left">
                  <p className="text-sm md:text-base font-black uppercase tracking-tight">
                    {v.speaker}
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold tracking-widest uppercase text-secondary tabular-nums">
                    {v.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 5 — Reviewer cities map pin band */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container-custom px-4 md:px-8 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
              WHERE OUR REVIEWERS LIVE
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
              Eleven counties, one phone number.
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/85 leading-relaxed">
              Every pin below is a published review from an actual owner. If you
              don't see your city, that just means we haven't worked there yet —
              we'd like to change that.
            </p>
            <Link
              to="/service-areas"
              className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-secondary hover:gap-3 transition-all"
            >
              SEE FULL SERVICE AREA
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {cities.map(city => (
              <div
                key={city}
                className="flex items-center gap-2 rounded-md bg-white/5 ring-1 ring-white/10 px-3 py-2.5"
              >
                <MapPin className="h-3.5 w-3.5 text-secondary shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider truncate">
                  {city}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Closing strip */}
      <section className="bg-background border-t border-border">
        <div className="container-custom px-4 md:px-8 py-12 md:py-16 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
              YOUR REVIEW, EVENTUALLY
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight leading-tight">
              We'd rather earn the words than ask for them.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
            <Button
              asChild
              className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link to="/contact">START A PROJECT</Link>
            </Button>
            <a
              href="https://www.google.com/search?q=summit+construction+reviews"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 self-center text-xs font-extrabold tracking-widest uppercase text-primary hover:text-secondary border-b-2 border-primary/20 hover:border-secondary transition-colors"
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
