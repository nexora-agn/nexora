import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Truck,
  Radio,
  Clock,
  Phone,
} from "lucide-react";
import Layout from "@template-roofix/components/layout/Layout";
import Reveal from "@template-roofix/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

/** Summit ServiceAreas — distinct from city-cards + promise-band + map + CTA pattern.
 *  Archetypes:
 *  1. Custom hero with crawling city ticker
 *  2. Drive-time concentric ring infographic
 *  3. Dispatch board "live" status strip
 *  4. Neighborhood micro-case mosaic with ZIP / project tags
 *  5. Mileage-cost transparency band
 *  6. Page-unique closing CTA */

const PRIMARY_CITIES = [
  "Dallas",
  "Fort Worth",
  "Plano",
  "Frisco",
  "McKinney",
  "Allen",
  "Irving",
  "Arlington",
  "Mansfield",
  "Las Colinas",
  "Southlake",
  "Grapevine",
  "Coppell",
  "Richardson",
  "Garland",
  "Carrollton",
  "Lewisville",
  "Flower Mound",
  "Trophy Club",
  "Keller",
];

interface DriveRing {
  minutes: string;
  scope: string;
  blurb: string;
  size: number;
}

const DRIVE_RINGS: DriveRing[] = [
  {
    minutes: "0–25 min",
    scope: "Same-day dispatch",
    blurb: "Crew can be on your site before lunch on a Tuesday.",
    size: 60,
  },
  {
    minutes: "25–55 min",
    scope: "Next-day site walk",
    blurb: "Field super on site within one business day for quoting.",
    size: 75,
  },
  {
    minutes: "55–90 min",
    scope: "Project-priced",
    blurb: "Worked into the bid as a fixed mobilization, no surprises.",
    size: 90,
  },
];

interface DispatchEntry {
  status: "Mobilizing" | "On site" | "Closing out" | "Pre-walk";
  city: string;
  detail: string;
  time: string;
}

const DISPATCH: DispatchEntry[] = [
  {
    status: "On site",
    city: "Frisco, TX",
    detail: "Custom home · framing inspection booked",
    time: "Active now",
  },
  {
    status: "Mobilizing",
    city: "Plano, TX",
    detail: "Office TI · trailer dropped, temp power on",
    time: "Today",
  },
  {
    status: "Closing out",
    city: "Dallas, TX",
    detail: "Restaurant fit-out · health inspection cleared",
    time: "This week",
  },
  {
    status: "Pre-walk",
    city: "Fort Worth, TX",
    detail: "Estate renovation · kickoff Monday 7am",
    time: "Mon",
  },
  {
    status: "On site",
    city: "Arlington, TX",
    detail: "Tilt-wall · two panels stood today",
    time: "Active now",
  },
];

const NEIGHBORHOOD_CASES = [
  {
    zip: "75034",
    city: "Frisco",
    project: "Custom home, 4,800 sqft",
    note: "Mature oak protection plan, 8-month build.",
  },
  {
    zip: "76104",
    city: "Fort Worth",
    project: "Restaurant fit-out",
    note: "14-week shell-to-opening on Magnolia Ave.",
  },
  {
    zip: "75024",
    city: "Plano",
    project: "Office TI",
    note: "After-hours phasing, occupied building.",
  },
  {
    zip: "76039",
    city: "Euless",
    project: "Tilt-wall industrial",
    note: "180,000 sqft distribution facility.",
  },
  {
    zip: "75252",
    city: "Dallas",
    project: "Whole-home renovation",
    note: "Lived-in remodel, dust controls, kitchen worked the entire job.",
  },
  {
    zip: "76092",
    city: "Southlake",
    project: "Estate compound",
    note: "Multi-phase, pool house and main residence under one GMP.",
  },
];

const ServiceAreas = () => {
  const { company: COMPANY } = useSiteContent();
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  return (
    <Layout>
      <Helmet>
        <title>Service area | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} serves North Texas — Dallas, Fort Worth, and the surrounding counties.`}
        />
      </Helmet>

      {/* 1 — Custom hero with crawling ticker */}
      <section className="bg-primary text-primary-foreground border-b border-secondary/30">
        <div className="container-custom px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-4">
              ELEVEN COUNTIES · ONE TRUCK BRAND
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02]">
              We work where
              <br />
              <span className="text-secondary">our trucks fit.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
              No franchise model, no out-of-state subcontractor chase. Every
              site below is reachable from our yard before traffic. That's how
              we keep the cadence promise.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            {[
              { v: "11", l: "Counties" },
              { v: "<90 min", l: "Max drive" },
              { v: "100%", l: "Staff crews" },
            ].map(s => (
              <div
                key={s.l}
                className="rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-4"
              >
                <div className="text-2xl md:text-3xl font-black text-secondary leading-none">
                  {s.v}
                </div>
                <div className="mt-2 text-[10px] font-bold tracking-widest uppercase text-white/75 leading-tight">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* City crawl */}
        <div className="bg-secondary text-secondary-foreground py-3 overflow-hidden border-y-2 border-primary/30 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex shrink-0 gap-8 px-4 animate-[summit-areas-marquee_60s_linear_infinite]">
            {[...PRIMARY_CITIES, ...PRIMARY_CITIES].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="inline-flex items-center gap-2 text-sm font-black tracking-wider uppercase whitespace-nowrap"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {c}, TX
              </span>
            ))}
          </div>
          <style>{`@keyframes summit-areas-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
        </div>
      </section>

      {/* 2 — Drive-time concentric ring infographic */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              DRIVE-TIME PLEDGE
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              The cadence depends on the radius.
            </h2>
            <ul className="mt-7 space-y-5">
              {DRIVE_RINGS.map((ring, i) => (
                <li
                  key={ring.minutes}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground text-xs font-black tabular-nums">
                    R{i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-base md:text-lg font-black uppercase tracking-tight text-primary">
                        {ring.scope}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                        {ring.minutes}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {ring.blurb}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Concentric ring graphic */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-square max-w-[520px] mx-auto">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/10"
              />
              {DRIVE_RINGS.slice()
                .reverse()
                .map((ring, i) => {
                  const sizePct = ring.size;
                  return (
                    <div
                      key={ring.minutes}
                      className={cn(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed flex items-center justify-center",
                        i === 0 && "border-secondary/30",
                        i === 1 && "border-secondary/45",
                        i === 2 && "border-secondary/60",
                      )}
                      style={{
                        width: `${sizePct}%`,
                        height: `${sizePct}%`,
                      }}
                    >
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-2 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase text-secondary">
                        {ring.minutes}
                      </span>
                    </div>
                  );
                })}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 rounded-full bg-primary text-primary-foreground p-6 ring-4 ring-background">
                <Truck className="h-7 w-7 text-secondary" strokeWidth={1.5} />
                <div className="text-center">
                  <p className="text-[10px] font-black tracking-widest uppercase text-secondary">
                    Yard
                  </p>
                  <p className="text-sm font-black tracking-tight uppercase">
                    Dallas, TX
                  </p>
                </div>
              </div>
              {/* Pin overlays */}
              <div className="absolute top-[10%] left-[60%] w-2 h-2 rounded-full bg-secondary ring-4 ring-secondary/30" />
              <div className="absolute top-[68%] left-[18%] w-2 h-2 rounded-full bg-secondary ring-4 ring-secondary/30" />
              <div className="absolute top-[44%] left-[88%] w-2 h-2 rounded-full bg-secondary ring-4 ring-secondary/30" />
              <div className="absolute top-[80%] left-[55%] w-2 h-2 rounded-full bg-secondary ring-4 ring-secondary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Dispatch board */}
      <Reveal>
        <section className="bg-primary text-primary-foreground py-14 md:py-20 border-y border-secondary/30">
          <div className="container-custom px-4 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
              <div>
                <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-2 inline-flex items-center gap-2">
                  <Radio className="h-3 w-3" /> DISPATCH BOARD · LIVE
                </p>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
                  What's running across the region right now.
                </h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-3 py-1.5 text-[10px] font-black tracking-widest uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary-foreground animate-pulse" />
                Updated every Friday
              </span>
            </div>

            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
              <div className="grid grid-cols-12 px-5 md:px-7 py-3 text-[10px] font-black tracking-widest uppercase text-white/60 border-b border-white/10">
                <span className="col-span-3">Status</span>
                <span className="col-span-3">City</span>
                <span className="col-span-4">Detail</span>
                <span className="col-span-2 text-right">When</span>
              </div>
              {DISPATCH.map((row, i) => (
                <div
                  key={i}
                  className={cn(
                    "grid grid-cols-12 px-5 md:px-7 py-4 items-center text-sm gap-y-1",
                    i % 2 === 1 && "bg-white/[0.02]",
                  )}
                >
                  <span className="col-span-3 inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        row.status === "On site" && "bg-emerald-400 animate-pulse",
                        row.status === "Mobilizing" && "bg-secondary",
                        row.status === "Closing out" && "bg-amber-400",
                        row.status === "Pre-walk" && "bg-blue-400",
                      )}
                    />
                    {row.status}
                  </span>
                  <span className="col-span-3 inline-flex items-center gap-1.5 text-white/90">
                    <MapPin className="h-3.5 w-3.5 text-secondary" />
                    {row.city}
                  </span>
                  <span className="col-span-4 text-white/75 truncate">
                    {row.detail}
                  </span>
                  <span className="col-span-2 text-right text-[10px] font-bold tracking-widest uppercase text-secondary">
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* 4 — Neighborhood micro-case mosaic */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              BY ZIP CODE
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              Recent work, neighborhood by neighborhood.
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NEIGHBORHOOD_CASES.map(c => (
              <li
                key={c.zip}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-secondary/60 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black tracking-widest uppercase text-secondary tabular-nums">
                    ZIP {c.zip}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-primary leading-tight">
                  {c.city}
                </h3>
                <p className="mt-3 text-sm font-bold uppercase tracking-wider text-foreground/70">
                  {c.project}
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {c.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — Mileage-cost transparency band */}
      <section className="bg-muted/40 py-12 md:py-14 border-y border-border">
        <div className="container-custom px-4 md:px-8 grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Truck,
              label: "Inside 25 minutes",
              value: "No mobilization fee on most projects.",
            },
            {
              icon: Clock,
              label: "25–90 minutes",
              value: "Mobilization priced in writing, in the contract.",
            },
            {
              icon: MapPin,
              label: "Outside 90 minutes",
              value: "We'll refer you to a builder we'd hire ourselves.",
            },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl bg-card border border-border p-6"
              >
                <Icon className="h-7 w-7 text-secondary mb-4" strokeWidth={1.6} />
                <p className="text-[11px] font-black tracking-widest uppercase text-secondary mb-1">
                  {item.label}
                </p>
                <p className="text-base font-bold text-primary leading-snug">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6 — Page-unique closing CTA */}
      <section className="bg-background border-t border-border">
        <div className="container-custom px-4 md:px-8 py-12 md:py-16 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
              DON'T SEE YOUR ZIP?
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight leading-tight">
              Drop a pin. We'll tell you in one call whether we should be your
              builder.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
            <Button
              asChild
              className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link to="/contact">CHECK MY SITE</Link>
            </Button>
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 self-center text-sm font-extrabold tracking-widest uppercase text-primary hover:text-secondary border-b-2 border-primary/20 hover:border-secondary transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {COMPANY.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceAreas;
