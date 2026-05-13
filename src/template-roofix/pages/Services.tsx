import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Home,
  CloudLightning,
  Wrench,
  Hammer,
  ArrowRight,
  ArrowUpRight,
  Check,
  Minus,
  Calendar,
  Truck,
  HardHat,
  ClipboardCheck,
} from "lucide-react";
import Layout from "@template-roofix/components/layout/Layout";
import Reveal from "@template-roofix/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { useTheme } from "@template-roofix/contexts/ThemeContext";
import { cn } from "@/lib/utils";

/** Roofing Services — Roofix-owned layout & photography (distinct from RidgePeak nexora grid). */
const SERVICES_HERO_IMAGE =
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1600&h=1000&q=85";

const SERVICE_CATALOG_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&h=500&q=85";

type PillarId = "residential" | "commercial" | "storm" | "repairs";

interface Pillar {
  id: PillarId;
  label: string;
  short: string;
  icon: LucideIcon;
  blurb: string;
  bullets: string[];
  image: string;
  serviceLink: string;
  signature: string;
}

const PILLARS: Pillar[] = [
  {
    id: "residential",
    label: "Residential",
    short: "Tear-offs · Asphalt · Metal · Tile · Cedar",
    icon: Home,
    blurb:
      "Architectural shingles, designer metal accents, cedar shake, and tile systems — installed with engineered nailing patterns, drip edge, and flashing that actually sheds water.",
    bullets: [
      "Decking inspection photos before shingles ever touch the ladder",
      "Ice & water shield in valleys, penetrations, and eaves as code allows",
      "Magnetic nail sweep daily + driveway protection on every job",
      "Written manufacturer + workmanship warranty paperwork at closeout",
    ],
    image:
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=1100&h=900&q=85",
    serviceLink: "/services/roof-replacement",
    signature: "Typical timelines: 1–5 crew days depending on squares",
  },
  {
    id: "commercial",
    label: "Commercial Flat",
    short: "TPO · Mod bit · Coatings · Drone QA",
    icon: Building2,
    blurb:
      "Single-ply and modified bitumen systems for warehouse, retail, office, and medical envelopes. Moisture scans, tapered insulation layouts, and watertight details at HVAC curbs.",
    bullets: [
      "Infrared/drone-assisted surveys when owners want proof before CAPEX",
      "Detail drawings at parapets, scuppers, and expansion joints",
      "Tenant coordination for occupied campuses with minimal downtime",
      "Leak response plans on retainer — not guesses after-hours",
    ],
    image:
      "https://images.unsplash.com/photo-1763149191834-471c980404f6?auto=format&fit=crop&w=1100&h=900&q=85",
    serviceLink: "/services/commercial-roofing",
    signature: "Typical timelines: phased by section or full weekend shutdowns",
  },
  {
    id: "storm",
    label: "Storm & Insurance",
    short: "Hail · Wind · Emergency tarping · Claims docs",
    icon: CloudLightning,
    blurb:
      "When hail and wind overwhelm Texas shingles, we're on-site fast — forensic photo maps, tarp crews, supplements your adjuster can defend, and zero-pressure guidance if repairs are enough.",
    bullets: [
      "Same-week inspections when capacity allows · emergency tarping crews",
      "Supplement-ready documentation (photos + notes aligned to scopes)",
      "You pick materials and colors · we steer code + manufacturer reqs",
      "No-pressure walkthrough if your roof only needs isolated repairs",
    ],
    image:
      "https://images.unsplash.com/photo-1559368611-813457131803?auto=format&fit=crop&w=1100&h=900&q=85",
    serviceLink: "/services/storm-damage",
    signature: "We meet adjusters weekly during storm seasons",
  },
  {
    id: "repairs",
    label: "Repairs & Leaks",
    short: "Flashing · Vents · Skylights · Metal trim",
    icon: Wrench,
    blurb:
      "Eight out of ten “roof replacements” we’re called after started as a flashing issue. We troubleshoot penetrations before selling a pile cap you don’t actually need.",
    bullets: [
      "Leak tracing from attic ingress back to originating detail",
      "Pipe boot, chimney cricket, skylight flange, rake metal replacements",
      "Written photo report so you understand what fixed it",
      "Priority routes for active drips · call our emergency line anytime",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&h=900&q=85",
    serviceLink: "/services/roof-repair",
    signature: "Most repairs staged inside a single mobilization",
  },
];

const DAY_PHASES = [
  {
    time: "06:30",
    label: "Safety + roof walk",
    description:
      "Lead tech checks ladders, ropes if needed, and yesterday's drying details. Today's scope is reaffirmed crew-wide.",
    icon: HardHat,
  },
  {
    time: "08:30",
    label: "Dry-in + nail-off",
    description:
      "Tear-offs stay sheeted nightly. Decking repairs are photographed and signed off before new underlayment continues.",
    icon: Hammer,
  },
  {
    time: "12:00",
    label: "Material spot-check",
    description:
      "Bundle counts, drip edge color/width, ridge vent SKU — everything reconciled mid-day instead of chasing trucks at dusk.",
    icon: Truck,
  },
  {
    time: "16:30",
    label: "Photo log + magnets",
    description:
      "Homeowner recap (text or voicemail), perimeter magnet sweep, and tomorrow's crane or dump schedule confirmed.",
    icon: ClipboardCheck,
  },
];

interface MatrixRow {
  label: string;
  starter: boolean;
  build: boolean;
  full: boolean;
}

const MATRIX_ROWS: MatrixRow[] = [
  { label: "Free on-roof inspection with annotated photos", starter: true, build: true, full: true },
  { label: "Written estimate + tear-off allowance notes", starter: true, build: true, full: true },
  { label: "Manufacturer system warranty registration support", starter: false, build: true, full: true },
  { label: "Job superintendent on site daily (not sporadic drives)", starter: false, build: true, full: true },
  { label: "Cleanup + magnetic sweep every workday", starter: false, build: true, full: true },
  { label: "Lifetime workmanship warranty on full replacements", starter: false, build: true, full: true },
  { label: "Annual hail-season check reminder + priority scheduling window", starter: false, build: false, full: true },
  { label: "Small leak revisit within 48h for Care+ installs", starter: false, build: false, full: true },
  { label: "Drone documentation archive on request", starter: false, build: false, full: true },
];

const SPOTLIGHTS = [
  {
    metric: "43 squares",
    headline: "Full architectural re-roof in under four days.",
    detail:
      "New synthetic underlayment, upgraded ridge venting, copper chimney flashing, and a spotless gutter line when we wrapped.",
    image:
      "https://images.unsplash.com/photo-1570690732090-275b8807dd76?auto=format&fit=crop&w=900&h=700&q=85",
  },
  {
    metric: "Hail CAT",
    headline: "Adjuster-aligned replacement after North Texas pea hail.",
    detail:
      "Documented ridges, south slopes, soft metals, and fence correlation so the homeowner received full code-compliant scope.",
    image:
      "https://images.unsplash.com/photo-1695045194325-af9f065d5587?auto=format&fit=crop&w=900&h=700&q=85",
  },
  {
    metric: "38k sqft",
    headline: "TPO overlay plus tapered insulation rework.",
    detail:
      "Drainage saddles installed at low spots, mechanically fastened seams, nightly trash haul — forklift traffic never stopped.",
    image:
      "https://images.unsplash.com/photo-1761115435501-bebf019aba54?auto=format&fit=crop&w=900&h=700&q=85",
  },
];

const Services = () => {
  const { company: COMPANY, services, serviceSections } = useSiteContent();
  const { resolveServiceImage } = useTheme();
  const [active, setActive] = useState<PillarId>("residential");
  const activePillar = PILLARS.find(p => p.id === active) ?? PILLARS[0];
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  const sectionById = useMemo(
    () => new Map(serviceSections.map(s => [s.id, s])),
    [serviceSections],
  );

  const catalogSorted = useMemo(() => {
    return [...services].sort((a, b) => {
      const ia = serviceSections.findIndex(x => x.id === a.id);
      const ib = serviceSections.findIndex(x => x.id === b.id);
      if (ia === -1 && ib === -1) return a.title.localeCompare(b.title);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }, [services, serviceSections]);

  return (
    <Layout>
      <Helmet>
        <title>Roofing Services | {COMPANY.name}</title>
        <meta
          name="description"
          content={`${COMPANY.name} installs, repairs, and replaces residential and commercial roofing across Texas — storm restoration, gutter systems, and emergency leak response.`}
        />
      </Helmet>

      {/* 1 — Split hero + photography */}
      <section className="bg-background border-b border-border overflow-hidden">
        <div className="grid lg:grid-cols-12 min-h-[320px]">
          <div className="lg:col-span-7 px-4 md:px-8 py-14 md:py-20 lg:py-24 flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-4">
              FOUR LANES · ONE ROOFING TEAM
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[1.02] text-primary">
              Roof systems built
              <br />
              <span className="text-secondary">for Texas weather.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              Pick the lane that matches your roof today. Residential steep-slope installs, low-slope
              commercial, storm coordination, or laser-focused leak repairs — each crew runs with specialists
              in that specialty.
            </p>
          </div>
          <div className="relative lg:col-span-5 min-h-[280px] lg:min-h-0 border-t lg:border-t-0 lg:border-l border-border">
            <img
              src={SERVICES_HERO_IMAGE}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/45 via-transparent to-secondary/35" aria-hidden />
            <div className="relative h-full hidden lg:flex items-end justify-end p-8">
              <div className="rounded-xl bg-background/95 backdrop-blur-sm border border-border px-5 py-4 max-w-[240px] text-right shadow-lg">
                <p className="text-[10px] font-black tracking-[0.2em] text-secondary mb-1">FIELD READY</p>
                <p className="text-sm font-bold text-primary uppercase leading-snug">
                  Tear-offs staged daily · ladders tied off · magnets every sunset
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick pillar previews */}
      <section className="bg-muted/35 border-b border-border">
        <div className="container-custom px-4 md:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PILLARS.map(p => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p.icon className="h-6 w-6 text-secondary mb-2" aria-hidden />
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{p.label}</p>
              <p className="text-[11px] text-muted-foreground leading-snug mt-1">{p.short}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2 — Tabbed pillar interface */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="flex flex-wrap gap-2 border-b border-border mb-10">
            {PILLARS.map(p => {
              const isActive = p.id === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(p.id)}
                  className={cn(
                    "relative inline-flex items-center gap-2 px-5 py-3 text-sm md:text-base font-extrabold tracking-wider uppercase transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <p.icon className="h-4 w-4" />
                  {p.label}
                  {isActive && <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-secondary" />}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-secondary mb-3">{activePillar.short}</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05] mb-5">
                {activePillar.label}{" "}
                <span className="text-secondary">roofing specialization</span>
              </h2>
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-7">{activePillar.blurb}</p>
              <ul className="space-y-3 mb-8">
                {activePillar.bullets.map(b => (
                  <li key={b} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-secondary-foreground shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  <Link to={activePillar.serviceLink}>
                    Dive into this service lane
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  {activePillar.signature}
                </span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 aspect-[4/5] lg:aspect-[4/5]">
                <img
                  src={activePillar.image}
                  alt={activePillar.label}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  key={activePillar.id}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
                <div className="absolute left-5 right-5 bottom-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary-foreground" />
                    Active crews · photo updates nightly
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Day rhythms */}
      <Reveal>
        <section className="bg-primary text-primary-foreground py-16 md:py-24 border-y border-secondary/20">
          <div className="container-custom px-4 md:px-8">
            <div className="grid lg:grid-cols-12 gap-10 mb-12">
              <div className="lg:col-span-6">
                <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
                  DAY ON YOUR ROOF
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black uppercase tracking-tight leading-[1.02]">
                  Consistency beats heroic one-off moments.
                  <span className="block text-secondary/90 mt-2">Especially with shingles overhead.</span>
                </h2>
              </div>
              <div className="lg:col-span-6">
                <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
                  Roofing crews thrive on repeatable safety briefings, disciplined dry-in pacing, and a closing ritual
                  that respects your landscaping. That cadence scales from a bungalow repair line to multi-day steep
                  mansards.
                </p>
              </div>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {DAY_PHASES.map((phase, i) => {
                const Icon = phase.icon;
                return (
                  <li
                    key={phase.time}
                    className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm"
                  >
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-black tracking-widest uppercase px-2.5 py-1">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-2xl md:text-3xl font-black text-secondary tabular-nums">{phase.time}</span>
                    <div className="mt-3 flex items-center gap-2">
                      <Icon className="h-5 w-5 text-secondary" />
                      <p className="text-sm font-bold uppercase tracking-wider">{phase.label}</p>
                    </div>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">{phase.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </Reveal>

      {/* 4 — Comparator */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">SERVICE DEPTH</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              Matching the inspection to how far you want us to carry the ladder.
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Start with diagnostics and photos, pull us in for rebuilds when you&apos;re ready, or opt into bundled
              aftercare reminders after a full Roofix replacement.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="bg-muted/60 text-left">
                  <th className="py-4 px-5 md:px-7 font-extrabold tracking-wide uppercase text-primary text-xs md:text-sm w-[44%]">
                    Inclusion
                  </th>
                  <th className="py-4 px-3 md:px-5 font-extrabold tracking-wide uppercase text-muted-foreground text-xs md:text-sm text-center">
                    Inspect
                  </th>
                  <th className="py-4 px-3 md:px-5 font-extrabold tracking-wide uppercase text-primary text-xs md:text-sm text-center bg-secondary/10">
                    Install
                  </th>
                  <th className="py-4 px-3 md:px-5 font-extrabold tracking-wide uppercase text-primary text-xs md:text-sm text-center">
                    Care+
                  </th>
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((row, i) => (
                  <tr key={row.label} className={cn("border-t border-border", i % 2 === 1 && "bg-background")}>
                    <td className="py-3.5 px-5 md:px-7 text-foreground/90 font-medium">{row.label}</td>
                    {[row.starter, row.build, row.full].map((on, idx) => (
                      <td
                        key={idx}
                        className={cn("py-3.5 px-3 md:px-5 text-center", idx === 1 && "bg-secondary/10")}
                      >
                        {on ? (
                          <Check className="h-5 w-5 text-secondary mx-auto" strokeWidth={3} />
                        ) : (
                          <Minus className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5 — Spotlight jobs */}
      <section className="bg-muted/40 section-padding border-y border-border">
        <div className="container-custom px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
                SIGNATURE INSTALLS THIS QUARTER
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
                Three roofs we&apos;re proud of on the wall.
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-sm font-extrabold tracking-widest uppercase text-primary hover:text-secondary transition-colors inline-flex items-center gap-2 self-start md:self-end"
            >
              See every project dossier
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPOTLIGHTS.map((s, i) => (
              <article
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {s.metric}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base md:text-lg font-black uppercase text-primary leading-tight tracking-tight">
                    {s.headline}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
                </div>
                <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary shadow opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog — mirrors SERVICES + SERVICE_DEEP_DIVES (admin-synced) */}
      <section className="bg-background section-padding border-y border-border">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-3xl mb-10 md:mb-12">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">SERVICE DOSSIERS</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary leading-[1.05]">
              Nine scopes. One crew brand.
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Each tile opens a scoped detail page with pricing bands, phased delivery notes, and add-ons tuned to real Texas roofs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {catalogSorted.map(svc => {
              const deep = sectionById.get(svc.id);
              const subtitle = deep?.subtitle ?? "";
              const category = deep?.category ?? "ROOFING";
              const raw = [deep?.image, svc.image].find(u => typeof u === "string" && u.trim())?.trim() ?? "";
              const thumb = resolveServiceImage(svc.id, raw || SERVICE_CATALOG_IMAGE_FALLBACK);
              return (
                <Link
                  key={svc.id}
                  to={`/services/${svc.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:border-secondary/55 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={thumb}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-primary/65 via-transparent to-transparent"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-black tracking-[0.2em] uppercase text-secondary drop-shadow-sm">
                      {category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-black uppercase tracking-tight text-primary group-hover:text-secondary transition-colors leading-tight">
                      {svc.title}
                    </h3>
                    {subtitle && (
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                        {subtitle}
                      </p>
                    )}
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{svc.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-secondary uppercase group-hover:gap-2 transition-all">
                      Open dossier
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 — CTA */}
      <section className="bg-secondary text-secondary-foreground border-y border-secondary">
        <div className="container-custom px-4 md:px-8 py-10 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.28em] uppercase opacity-70 mb-2">
              No gimmicks · Free inspection appointments
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
              Tell us the lane. We&apos;ll line up ladders and drones.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/contact">BOOK SERVICE CONSULT</Link>
            </Button>
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="text-sm font-extrabold tracking-widest uppercase border-b-2 border-primary/40 hover:border-primary transition-colors"
              >
                or call {COMPANY.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
