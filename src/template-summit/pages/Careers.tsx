import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  Phone,
  HardHat,
  Users,
  ShieldCheck,
  Coffee,
  Wrench,
  GraduationCap,
  Briefcase,
  Mail,
  Award,
  CalendarRange,
} from "lucide-react";
import Layout from "@template-summit/components/layout/Layout";
import Reveal from "@template-summit/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

/** Summit Careers — distinct from a generic perks-grid + jobs-list + dark CTA pattern.
 *  Archetypes:
 *  1. Stat-led split hero with retention numbers
 *  2. Interview journey horizontal stepper
 *  3. Tabbed benefits (Full-time / Craft / Apprentice)
 *  4. Safety big-number band
 *  5. Open roles as a structured table with apply mailto
 *  6. Page-unique closing strip */

const STEPS = [
  {
    icon: Mail,
    label: "Apply",
    body: "Email a one-page note. No portal, no questionnaire. Resume optional.",
  },
  {
    icon: Phone,
    label: "Phone screen",
    body: "Twenty minutes with a senior super or PM. Two-way conversation, not interrogation.",
  },
  {
    icon: HardHat,
    label: "Site ride-along",
    body: "Half a day on an active jobsite with the crew you'd join. Lunch on us.",
  },
  {
    icon: ClipboardCheck,
    label: "Offer",
    body: "Written offer inside 48 hours of the ride-along. Salary band published, not negotiated under duress.",
  },
];

type BenefitTabId = "fulltime" | "craft" | "apprentice";

interface BenefitTab {
  id: BenefitTabId;
  label: string;
  who: string;
  perks: { icon: typeof Coffee; title: string; body: string }[];
}

const BENEFIT_TABS: BenefitTab[] = [
  {
    id: "fulltime",
    label: "Full-time staff",
    who: "PMs, supers, estimators, office",
    perks: [
      {
        icon: Coffee,
        title: "Vacation that means it",
        body: "20 days, with a manager who'll cover your phone so you don't take laptops on the beach.",
      },
      {
        icon: ShieldCheck,
        title: "Health, dental, vision",
        body: "100% employee premium covered. Family covered at 75%.",
      },
      {
        icon: GraduationCap,
        title: "Continuing education",
        body: "Up to $4,000 / year for licensure, CE credits, or trade certifications.",
      },
      {
        icon: Award,
        title: "Project bonus pool",
        body: "Closeouts under budget and on schedule split a bonus pool — not a discretionary handshake.",
      },
    ],
  },
  {
    id: "craft",
    label: "Craft & field",
    who: "Carpenters, finishers, laborers",
    perks: [
      {
        icon: Wrench,
        title: "Tool stipend",
        body: "Annual stipend for the tools you actually use, replaced when they break.",
      },
      {
        icon: ShieldCheck,
        title: "Health, dental, vision",
        body: "Same plan as the office team. No two-tier benefits.",
      },
      {
        icon: HardHat,
        title: "OSHA-30 paid",
        body: "Paid hours during certification. Renewal cycles on the company.",
      },
      {
        icon: Users,
        title: "Steady crew",
        body: "Crew assignments stay together for a full project — not split mid-job to chase another bid.",
      },
    ],
  },
  {
    id: "apprentice",
    label: "Apprentice",
    who: "Trade-school grads, returners",
    perks: [
      {
        icon: GraduationCap,
        title: "Mentor pairing",
        body: "Paired with a senior craftsman for a documented two-year curriculum.",
      },
      {
        icon: CalendarRange,
        title: "Predictable hours",
        body: "Day-shift schedule, weekends free unless a critical path says otherwise.",
      },
      {
        icon: ShieldCheck,
        title: "Same benefits",
        body: "Health, dental, and vision available from day one — same plan as everyone else.",
      },
      {
        icon: Award,
        title: "Promotion ladder",
        body: "Written milestones to journeyman with reviews every six months.",
      },
    ],
  },
];

interface JobOpening {
  id: string;
  role: string;
  type: string;
  location: string;
  level: string;
  summary: string;
}

const OPENINGS: JobOpening[] = [
  {
    id: "senior-super-commercial",
    role: "Senior Superintendent — Commercial",
    type: "Full-time",
    location: "Dallas / Fort Worth",
    level: "10+ yrs",
    summary:
      "Lead a single ground-up or major TI from preconstruction through punch. Senior PM partner, no rotating projects.",
  },
  {
    id: "pm-residential",
    role: "Project Manager — Residential",
    type: "Full-time",
    location: "Frisco yard",
    level: "5–10 yrs",
    summary:
      "Run two custom homes concurrently with a dedicated super and estimator. Owner-facing role.",
  },
  {
    id: "estimator-mid",
    role: "Estimator — Mid-market",
    type: "Full-time",
    location: "Dallas office",
    level: "3–7 yrs",
    summary:
      "Conceptual through GMP estimating across renovation and ground-up. WinEst or similar.",
  },
  {
    id: "lead-carpenter",
    role: "Lead Carpenter",
    type: "Full-time / craft",
    location: "Field, DFW",
    level: "5+ yrs",
    summary:
      "Run a finish crew across high-end residential and hospitality. Read drawings, cut stairs, mentor apprentices.",
  },
  {
    id: "apprentice-carpentry",
    role: "Apprentice — Carpentry",
    type: "Apprentice",
    location: "Field, DFW",
    level: "Trade school grad",
    summary:
      "Two-year mentored program, paired with a senior craftsman. Day-shift schedule.",
  },
];

const Careers = () => {
  const { company: COMPANY } = useSiteContent();
  const [tab, setTab] = useState<BenefitTabId>("fulltime");
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const activeTab =
    BENEFIT_TABS.find(t => t.id === tab) ?? BENEFIT_TABS[0];

  return (
    <Layout>
      <Helmet>
        <title>Build a career | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Open roles at ${COMPANY.name} — staff PMs, supers, craftspeople, and apprentices.`}
        />
      </Helmet>

      {/* 1 — Stat-led split hero */}
      <section className="bg-background border-b border-border">
        <div className="container-custom px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-4">
              HIRING ON THE SAME TERMS WE BUILD
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02] text-primary">
              We hire crew
              <br />
              <span className="text-secondary">like family.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed">
              Long tenure, written offer letters, and a published salary band
              for every role. We'd rather find one person we'll keep than fill
              a slot every six months.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-primary text-primary-foreground p-5 col-span-2">
              <span className="text-4xl md:text-5xl font-black text-secondary leading-none">
                85%
              </span>
              <p className="mt-2 text-[10px] font-bold tracking-widest uppercase text-white/75">
                Field staff returning year-on-year
              </p>
            </div>
            <div className="rounded-xl bg-card border border-border p-5">
              <div className="text-2xl md:text-3xl font-black text-primary leading-none">
                12 yrs
              </div>
              <div className="mt-2 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Avg. senior tenure
              </div>
            </div>
            <div className="rounded-xl bg-card border border-border p-5">
              <div className="text-2xl md:text-3xl font-black text-primary leading-none">
                $0
              </div>
              <div className="mt-2 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Health premium for staff
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Interview journey stepper */}
      <Reveal>
        <section className="bg-muted/40 section-padding border-b border-border">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
                THE JOURNEY
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
                Four steps. One handshake.
              </h2>
            </div>
            <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              <span
                aria-hidden
                className="hidden md:block absolute left-0 right-0 top-7 h-0.5 bg-border"
              />
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li key={step.label} className="relative">
                    <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-black tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-6 w-6 text-secondary mt-4" strokeWidth={1.6} />
                    <h3 className="mt-3 text-base md:text-lg font-black uppercase tracking-tight text-primary">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {step.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </Reveal>

      {/* 3 — Tabbed benefits */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              BENEFITS
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              The same plan, three ways in.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-border mb-10">
            {BENEFIT_TABS.map(t => {
              const isActive = t.id === tab;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "relative inline-flex flex-col items-start gap-0.5 px-5 py-3 text-left transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="text-sm md:text-base font-extrabold tracking-wider uppercase">
                    {t.label}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    {t.who}
                  </span>
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-secondary" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeTab.perks.map(({ icon: Icon, title, body }) => (
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

      {/* 4 — Safety big-number band */}
      <section className="bg-primary text-primary-foreground py-14 md:py-20 border-y border-secondary/30">
        <div className="container-custom px-4 md:px-8 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
              SAFETY · NOT NEGOTIABLE
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black uppercase tracking-tight leading-[1.02]">
              The numbers we work to keep.
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/85 leading-relaxed max-w-md">
              Every Summit jobsite runs on a documented safety plan. Every
              employee — office or field — has stop-work authority. We post
              these numbers because we're proud of them and held to them.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "0.71", l: "EMR · industry avg 1.0" },
              { v: "0", l: "Lost-time incidents (24 mo)" },
              { v: "100%", l: "Field on OSHA-30" },
              { v: "Daily", l: "Toolbox talks logged" },
            ].map(s => (
              <div
                key={s.l}
                className="rounded-xl bg-white/5 ring-1 ring-white/10 p-5 backdrop-blur-sm"
              >
                <div className="text-3xl md:text-4xl font-black text-secondary leading-none tabular-nums">
                  {s.v}
                </div>
                <div className="mt-3 text-[10px] font-bold tracking-widest uppercase text-white/75 leading-tight">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Open roles structured list */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
                OPEN ROLES · {OPENINGS.length}
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
                Pick the one that fits.
              </h2>
            </div>
            <a
              href={`mailto:${COMPANY.email}?subject=General%20application`}
              className="hidden md:inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-primary hover:text-secondary"
            >
              GENERAL APPLICATION
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <ul className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
            {OPENINGS.map(role => (
              <li key={role.id}>
                <a
                  href={`mailto:${COMPANY.email}?subject=Application%20-%20${encodeURIComponent(
                    role.role,
                  )}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-5 md:px-7 py-5 hover:bg-muted/40 transition-colors items-center"
                >
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 text-secondary px-2 py-0.5 text-[10px] font-black tracking-widest uppercase">
                        <Briefcase className="h-3 w-3" /> {role.type}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                        {role.level}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-primary leading-snug group-hover:text-secondary transition-colors">
                      {role.role}
                    </h3>
                  </div>
                  <p className="md:col-span-5 text-sm text-muted-foreground leading-relaxed">
                    {role.summary}
                  </p>
                  <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                      {role.location}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Page-unique closing strip */}
      <section className="bg-secondary text-secondary-foreground border-y border-secondary">
        <div className="container-custom px-4 md:px-8 py-10 md:py-14 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold tracking-[0.28em] uppercase opacity-70 mb-2">
              Don't see your role?
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
              Send us a paragraph about what you'd build with us.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
            <Button
              asChild
              className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a
                href={`mailto:${COMPANY.email}?subject=General%20application`}
                className="inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                EMAIL US
              </a>
            </Button>
            {COMPANY.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 self-center text-sm font-extrabold tracking-widest uppercase border-b-2 border-primary/40 hover:border-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                or call {COMPANY.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
