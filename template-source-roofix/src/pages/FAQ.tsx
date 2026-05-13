import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Search,
  Phone,
  Mail,
  CalendarRange,
  ScrollText,
  ShieldCheck,
  Hammer,
  ClipboardList,
  ChevronDown,
  Layers,
} from "lucide-react";
import Layout from "@template-roofix/components/layout/Layout";
import Reveal from "@template-roofix/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import {
  FAQ_BY_CATEGORY,
  FAQ_TABS,
  type FaqTabId,
} from "@template-roofix/data/siteData";
import { cn } from "@/lib/utils";

/** Roofix FAQ. Distinct from Constructo's tabs+single-accordion pattern.
 *  Archetypes:
 *  1. Search-led hero with live counter
 *  2. Six quick-answer icon cards (educational, not Q&A)
 *  3. Search-filtered accordion grouped per category
 *  4. Cost-band slab visualizer (educational, not accordion)
 *  5. Page-unique closing footer */

interface QuickAnswer {
  icon: typeof Layers;
  title: string;
  body: string;
}

const QUICK_ANSWERS: QuickAnswer[] = [
  {
    icon: Layers,
    title: "What we cover",
    body: "Steep-slope, low-slope, storm mitigation, skylights, gutters — one crew brand, coordinated schedules.",
  },
  {
    icon: ScrollText,
    title: "How we contract",
    body: "Most residential roofs are fixed price. Commercial membranes bill on milestones — change orders quoted before crews move.",
  },
  {
    icon: CalendarRange,
    title: "How fast we mobilize",
    body: "Two-hour acknowledgement. Emergency tarps routed same day when weather cooperates.",
  },
  {
    icon: ShieldCheck,
    title: "How we warrant work",
    body: "10-year workmanship plus manufacturer-backed systems. Warranty desk answers the phone.",
  },
  {
    icon: ClipboardList,
    title: "What you see weekly",
    body: "Photo lifts, superintendent notes, magnet sweeps logged — emailed, not trapped in portals.",
  },
  {
    icon: Hammer,
    title: "Who's on your roof",
    body: "A named crew lead every day — same superintendent from tear-off day one through QA walk.",
  },
];

interface CostBand {
  scale: string;
  range: string;
  blurb: string;
}

const COST_BANDS: CostBand[] = [
  {
    scale: "Service & spot repairs",
    range: "$500 – $4K",
    blurb: "Flashing resets, chimney cricket rebuilds, squirrel damage, slipped ridge — usually same-week.",
  },
  {
    scale: "Partial slope / overlays (when allowed)",
    range: "$4K – $12K",
    blurb: "Isolated elevations, HOA quick fixes — only when code + manufacturer specs allow overlays.",
  },
  {
    scale: "Full steep-slope replacement",
    range: "$12K – $60K",
    blurb: "Typical DFW detachments with decking repairs, vents, skylights, gutters add-ons billed separately.",
  },
  {
    scale: "Low-slope commercial",
    range: "$12K – six figures",
    blurb: "Mechanically fastened or fully adhered membranes sized per square foot + rooftop access logistics.",
  },
  {
    scale: "Storm + insurance supplementation",
    range: "Varies",
    blurb: "We document code upgrades, drip edge, ice/water, and decking so adjusters see defensible line items.",
  },
];

const FAQ = () => {
  const { company: COMPANY } = useSiteContent();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FaqTabId | "all">("all");

  const allEntries = useMemo(() => {
    const out: { tab: FaqTabId; question: string; answer: string }[] = [];
    (Object.keys(FAQ_BY_CATEGORY) as FaqTabId[]).forEach(tab => {
      FAQ_BY_CATEGORY[tab].forEach(entry => out.push({ tab, ...entry }));
    });
    return out;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allEntries.filter(entry => {
      const matchesTab = activeTab === "all" || entry.tab === activeTab;
      const matchesQuery =
        !q ||
        entry.question.toLowerCase().includes(q) ||
        entry.answer.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [allEntries, query, activeTab]);

  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  // Open the first match in the filtered set by default.
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <Layout>
      <Helmet>
        <title>What people ask | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Common questions about ${COMPANY.name} — pricing, timing, contracts, and warranty.`}
        />
      </Helmet>

      {/* 1 — Search-led hero */}
      <section className="bg-background border-b border-border">
        <div className="container-custom px-4 md:px-8 py-16 md:py-24 max-w-4xl">
          <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-4">
            QUESTIONS WE ANSWER OFTEN
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02] text-primary">
            Type a word.
            <br />
            <span className="text-secondary">We'll find it.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-foreground/80 leading-relaxed">
            Most questions land in one of these buckets. If yours doesn't, the
            email at the bottom is real and goes to a real person.
          </p>

          <div className="mt-8 relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setOpenIdx(0);
              }}
              placeholder="e.g. permits, change orders, schedule, warranty…"
              className="h-14 pl-14 pr-32 rounded-md text-base font-medium bg-card border-2 border-border focus-visible:ring-secondary focus-visible:border-secondary"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-widest uppercase text-muted-foreground tabular-nums">
              {filtered.length} match{filtered.length === 1 ? "" : "es"}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[10px] font-extrabold tracking-widest uppercase border-2 transition-colors",
                activeTab === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/70 hover:border-secondary/50",
              )}
            >
              All
            </button>
            {FAQ_TABS.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[10px] font-extrabold tracking-widest uppercase border-2 transition-colors",
                  activeTab === t.id
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-card text-foreground/70 hover:border-secondary/50",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Quick-answer icon cards */}
      <Reveal>
        <section className="bg-muted/40 section-padding border-b border-border">
          <div className="container-custom px-4 md:px-8">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              QUICK ANSWERS
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05] mb-10">
              The six things almost everyone asks.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {QUICK_ANSWERS.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="rounded-2xl bg-card border border-border p-6 hover:border-secondary/60 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary/15 text-secondary mb-4">
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="text-base font-black uppercase tracking-tight text-primary leading-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* 3 — Search-filtered accordion */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05] mb-8">
            Detailed answers
          </h2>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                No matches for "{query}". Try a different word, or
                <Link to="/contact" className="text-secondary font-bold ml-1 underline-offset-4 hover:underline">
                  email the desk
                </Link>
                .
              </p>
            </div>
          ) : (
            <ol className="space-y-3">
              {filtered.map((entry, idx) => {
                const isOpen = idx === openIdx;
                return (
                  <li
                    key={`${entry.tab}-${idx}-${entry.question}`}
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                      className={cn(
                        "w-full flex items-start gap-4 px-5 md:px-6 py-4 text-left transition-colors",
                        isOpen ? "bg-secondary/5" : "hover:bg-muted/40",
                      )}
                    >
                      <span className="text-[10px] font-black tracking-widest uppercase text-secondary tabular-nums w-12 mt-1 shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-base md:text-lg font-bold text-primary leading-snug">
                          {entry.question}
                        </span>
                        <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                          {entry.tab}
                        </span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-muted-foreground transition-transform mt-0.5 shrink-0",
                          isOpen && "rotate-180 text-secondary",
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 md:px-6 pb-5 pl-[5.25rem] text-sm md:text-base text-foreground/85 leading-relaxed">
                        {entry.answer}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>

      {/* 4 — Cost-band slab visualizer (educational, NOT Q&A) */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20 border-y border-secondary/30">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
              WHERE WORK LANDS
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.02]">
              The cost ladder, posted up front.
            </h2>
            <p className="mt-4 text-white/85 text-base md:text-lg leading-relaxed">
              These are the bands most of our work sits in. If your project
              falls outside, that's fine — we'll tell you fast.
            </p>
          </div>

          <div className="space-y-3">
            {COST_BANDS.map((band, i) => {
              const widthPct = 16 + i * 16;
              return (
                <div
                  key={band.scale}
                  className="grid lg:grid-cols-12 gap-4 items-center"
                >
                  <div className="lg:col-span-3">
                    <p className="text-xs font-black tracking-widest uppercase text-secondary tabular-nums">
                      Tier {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-base md:text-lg font-bold uppercase tracking-tight">
                      {band.scale}
                    </p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="h-9 rounded-md bg-white/8 ring-1 ring-white/10 overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-secondary/80 to-secondary"
                        style={{ width: `${widthPct}%` }}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-black tracking-widest uppercase text-primary">
                        {band.range}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-white/70 leading-snug">
                      {band.blurb}
                    </p>
                  </div>
                  <div className="lg:col-span-2 lg:text-right">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/60 tabular-nums">
                      {widthPct}% scale
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 — Closing footer line */}
      <section className="bg-background border-t border-border">
        <div className="container-custom px-4 md:px-8 py-12 md:py-16 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
              STILL UNANSWERED?
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight leading-tight">
              Skip the form. Pick up the phone.
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
              Calls during business hours go to a person, not a tree. Off-hours
              email is acknowledged inside two hours.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 self-end">
            {COMPANY.phone && (
              <Button
                asChild
                className="h-12 rounded-md text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90 col-span-2 sm:col-span-1"
              >
                <a href={`tel:${cleanPhone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  {COMPANY.phone}
                </a>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-md text-sm font-extrabold tracking-wider border-2 col-span-2 sm:col-span-1"
            >
              <a href={`mailto:${COMPANY.email}`}>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </a>
            </Button>
            <Link
              to="/contact"
              className="col-span-2 inline-flex items-center justify-center gap-2 text-xs font-extrabold tracking-widest uppercase text-primary hover:text-secondary"
            >
              Or use the project intake form
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
