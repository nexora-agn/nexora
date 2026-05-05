import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Linkedin,
  Twitter,
  Quote,
  HardHat,
  ClipboardCheck,
  Hammer,
  ShieldCheck,
  Building2,
  Users,
} from "lucide-react";
import Layout from "@template-summit/components/layout/Layout";
import Reveal from "@template-summit/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

/** Summit Team. Distinct from Constructo's uniform 3-column hover-social grid.
 *  Archetypes:
 *  1. Stat-led split hero
 *  2. Tier strip — Leadership / Field / Estimating with counts + density-per-tier
 *  3. Alternating quote-led profile rows (image left/right alternating, no uniform grid)
 *  4. Certifications micro-band
 *  5. Page-unique hiring nudge */

interface TierMeta {
  id: string;
  label: string;
  icon: typeof HardHat;
  blurb: string;
  count: string;
}

const TIERS: TierMeta[] = [
  {
    id: "leadership",
    label: "Leadership",
    icon: Building2,
    blurb:
      "Founders, partners, and the principals who sign every contract. They're on site at least once a week.",
    count: "3 partners",
  },
  {
    id: "delivery",
    label: "Project delivery",
    icon: ClipboardCheck,
    blurb:
      "Senior PMs and superintendents who own a job from preconstruction through punch. One name, one phone number.",
    count: "12 PMs · 18 supers",
  },
  {
    id: "field",
    label: "Field operations",
    icon: Hammer,
    blurb:
      "Carpenters, finishers, and laborers who've been with us long enough to know the kids' birthdays. Not subs — staff.",
    count: "40+ field staff",
  },
  {
    id: "estimating",
    label: "Estimating & safety",
    icon: ShieldCheck,
    blurb:
      "The people who price the work and keep it safe. They never see a number they don't sign their name to.",
    count: "Dedicated team",
  },
];

const Team = () => {
  const { team, company: COMPANY } = useSiteContent();
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  const principals = team.slice(0, 3);
  const operators = team.slice(3);

  return (
    <Layout>
      <Helmet>
        <title>The crew | {COMPANY.name}</title>
        <meta
          name="description"
          content={`Meet the people who run a ${COMPANY.name} job — partners, PMs, superintendents, and field staff.`}
        />
      </Helmet>

      {/* 1 — Stat-led split hero */}
      <section className="bg-background border-b border-border">
        <div className="container-custom px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-4">
              ONE CREW · ONE NUMBER
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02] text-primary">
              The same names
              <br />
              <span className="text-secondary">on every job.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed">
              We don't rotate strangers through your project. The PM you meet
              at preconstruction is the PM at the ribbon cutting. Below: the
              people you'll actually work with.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-primary text-primary-foreground p-5 col-span-2 flex items-center justify-between">
              <div>
                <span className="text-4xl md:text-5xl font-black text-secondary leading-none">
                  73
                </span>
                <span className="ml-2 text-base font-bold uppercase tracking-widest text-white/85">
                  on staff
                </span>
              </div>
              <Users className="h-10 w-10 text-secondary/60" strokeWidth={1.4} />
            </div>
            <div className="rounded-xl bg-card border border-border p-5">
              <div className="text-3xl font-black text-primary leading-none">
                12 yrs
              </div>
              <div className="mt-2 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Avg. tenure of senior staff
              </div>
            </div>
            <div className="rounded-xl bg-card border border-border p-5">
              <div className="text-3xl font-black text-primary leading-none">
                85%
              </div>
              <div className="mt-2 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Field staff returning year-on-year
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Tier strip */}
      <section className="bg-muted/40 py-12 md:py-16 border-b border-border">
        <div className="container-custom px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map(tier => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.id}
                  className="rounded-2xl bg-card border border-border p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary/15 text-secondary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                      {tier.count}
                    </span>
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight text-primary">
                    {tier.label}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {tier.blurb}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 — Alternating quote-led profile rows (NOT a uniform grid) */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              PARTNERS & PRINCIPALS
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              The names on the contract.
            </h2>
          </div>

          <div className="space-y-16 md:space-y-24">
            {principals.map((member, idx) => {
              const flip = idx % 2 === 1;
              return (
                <Reveal key={member.id}>
                  <article
                    className={cn(
                      "grid lg:grid-cols-12 gap-8 lg:gap-12 items-center",
                    )}
                  >
                    <div
                      className={cn(
                        "lg:col-span-5 relative",
                        flip && "lg:order-2",
                      )}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-black/5">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 text-primary px-3 py-1.5 text-[10px] font-black tracking-widest uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                          {String(idx + 1).padStart(2, "0")} / Principal
                        </div>
                      </div>
                    </div>
                    <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
                      <Quote
                        className="h-10 w-10 text-secondary/30 mb-3"
                        aria-hidden
                      />
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary leading-snug tracking-tight">
                        "{member.bio}"
                      </p>
                      <div className="mt-7 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-base md:text-lg font-black uppercase tracking-tight text-primary">
                            {member.name}
                          </p>
                          <p className="text-xs font-bold tracking-widest uppercase text-secondary mt-1">
                            {member.role}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {member.social?.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${member.name} on LinkedIn`}
                              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/70 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-colors"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {member.social?.twitter && (
                            <a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${member.name} on Twitter`}
                              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/70 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-colors"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Operators block — denser, but still distinct from a uniform grid */}
      {operators.length > 0 && (
        <section className="bg-muted/40 section-padding border-y border-border">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
                THE OPERATING TEAM
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
                The desk you'll talk to most.
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {operators.map(member => (
                <li
                  key={member.id}
                  className="group flex items-stretch gap-5 rounded-2xl bg-card border border-border p-5 hover:border-secondary/60 hover:shadow-md transition-all"
                >
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl ring-1 ring-black/5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                        {member.role}
                      </p>
                      <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-primary mt-0.5 leading-tight">
                        {member.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {member.social?.linkedin && (
                        <a
                          href={member.social.linkedin}
                          aria-label="LinkedIn"
                          className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground/70 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {member.social?.twitter && (
                        <a
                          href={member.social.twitter}
                          aria-label="Twitter"
                          className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground/70 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                        >
                          <Twitter className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 4 — Certifications micro-band */}
      <section className="bg-primary text-primary-foreground py-10">
        <div className="container-custom px-4 md:px-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] md:text-xs font-bold tracking-widest uppercase text-white/85">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            OSHA-30 field certified
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            EM385 awareness
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            CPR / First aid
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            CMAA leadership program
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            LEED green associate
          </span>
        </div>
      </section>

      {/* 5 — Page-unique hiring nudge (different shape than every other page CTA) */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="rounded-2xl bg-secondary text-secondary-foreground p-8 md:p-12 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-black tracking-[0.28em] uppercase opacity-70 mb-3">
                Like the way we work?
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight">
                We hire carpenters and PMs the way we hire family.
              </h2>
              <p className="mt-4 text-sm md:text-base opacity-90 max-w-2xl leading-relaxed">
                If you've worked in this trade for a while and you'd rather
                build a career than chase a rate sheet, our open roles live on
                the careers page.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <Button
                asChild
                className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/careers" className="inline-flex items-center gap-2">
                  SEE OPEN ROLES
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {COMPANY.phone && (
                <a
                  href={`tel:${cleanPhone}`}
                  className="text-sm font-extrabold tracking-widest uppercase border-b-2 border-primary/40 hover:border-primary transition-colors self-center"
                >
                  or call {COMPANY.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
