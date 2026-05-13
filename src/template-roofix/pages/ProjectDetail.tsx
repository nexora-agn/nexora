import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Building2,
  DollarSign,
  MapPin,
  Target,
  TriangleAlert,
  CheckCircle2,
  Hammer,
  ClipboardCheck,
  Truck,
  ShieldCheck,
  Award,
} from "lucide-react";
import Layout from "@template-roofix/components/layout/Layout";
import Reveal from "@template-roofix/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { useTheme } from "@template-roofix/contexts/ThemeContext";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";

/** Roofix ProjectDetail. New archetypes (not on home, not on Constructo):
 *  1. Image hero with diagonal cut + meta strip
 *  2. Horizontal-scroll gallery filmstrip
 *  3. Phase ribbon (Kickoff → Mobilize → Build → Closeout) with annotated milestones
 *  4. Challenges vs Solutions two-column
 *  5. Region context tile + adjacent projects
 *  6. Page-unique closing CTA */

const PHASES = [
  {
    icon: ClipboardCheck,
    title: "Prep",
    body: "Measurements, HOA letters, dumpsters staged, drip-edge specs confirmed before tear-off.",
  },
  {
    icon: Truck,
    title: "Tear-off / dry-in",
    body: "Protect landscaping, peel to deck, snap ice-and-water shots, plywood only where inspectors agree.",
  },
  {
    icon: Hammer,
    title: "Install",
    body: "Crew lead on the roof daily. Magnet sweeps, ridge venting balanced, skylights reflashed carefully.",
  },
  {
    icon: ShieldCheck,
    title: "QA & closeout",
    body: "Manufacturer walk, homeowner sign-off, warranty packets registered before final invoice.",
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, company: COMPANY } = useSiteContent();
  const { resolveProjectImage } = useTheme();
  const project = projects.find(p => p.id === id);
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  const adjacent = useMemo(() => {
    if (!project) return [];
    return projects
      .filter(p => p.id !== project.id && p.category === project.category)
      .slice(0, 3);
  }, [projects, project]);

  if (!project) {
    return (
      <Layout>
        <div className="section-padding container-custom px-4 md:px-8 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight text-primary">
            That file isn't on the shelf.
          </h1>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 mt-6 text-sm font-extrabold tracking-widest uppercase text-secondary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to project gallery
          </Link>
        </div>
      </Layout>
    );
  }

  const gallery = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : [
        resolveProjectImage(project.id, project.image),
        "https://images.unsplash.com/photo-1765340949906-960f72f32b7f?auto=format&fit=crop&w=1200&h=800&q=85",
        "https://images.unsplash.com/photo-1683551739934-a25185351214?auto=format&fit=crop&w=1200&h=800&q=85",
        "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=1200&h=800&q=85",
      ];

  return (
    <Layout>
      <Helmet>
        <title>
          {project.title} | {COMPANY.name}
        </title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* 1 — Image hero with diagonal cut */}
      <section className="relative isolate bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={resolveProjectImage(project.id, project.image)}
            alt={project.title}
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/30" />
        </div>
        <div className="relative container-custom px-4 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/70 hover:text-secondary mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All projects
          </Link>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/95 text-primary px-3 py-1 text-[11px] font-black tracking-widest uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            {project.category} · {project.year}
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02] max-w-3xl">
            {project.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm font-bold tracking-widest uppercase text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-secondary" />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-secondary" />
              Completed {project.year}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-secondary" />
              {project.value}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-secondary" />
              {project.client}
            </span>
          </div>
        </div>
      </section>

      {/* 2 — Horizontal-scroll gallery filmstrip */}
      <Reveal>
        <section className="bg-background border-b border-border">
          <div className="py-8 md:py-12">
            <div className="container-custom px-4 md:px-8 flex items-end justify-between mb-5">
              <p className="text-xs font-bold tracking-[0.22em] text-secondary">
                ON-SITE FILMSTRIP
              </p>
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Scroll →
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-4 snap-x snap-mandatory [scrollbar-width:thin]">
              {gallery.map((src, i) => (
                <figure
                  key={`${src}-${i}`}
                  className="relative shrink-0 w-[78%] sm:w-[55%] md:w-[44%] lg:w-[36%] aspect-[4/3] rounded-2xl overflow-hidden snap-start ring-1 ring-black/5"
                >
                  <img
                    src={src}
                    alt={`${project.title} — view ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 text-primary px-2.5 py-1 text-[10px] font-black tracking-widest uppercase">
                    Frame {String(i + 1).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* 3 — Phase ribbon */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container-custom px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-3">
                HOW IT MOVED
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.02]">
                Four phases. One production board.
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-white/85 leading-relaxed">
              Every Roofix job runs the same four-phase rhythm — site prep,
              dry-in, install, QA. Here's how this roof moved.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 relative">
            {PHASES.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <li
                  key={phase.title}
                  className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur-sm"
                >
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-black tracking-widest uppercase px-2.5 py-1">
                    Phase {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-7 w-7 text-secondary mt-2" strokeWidth={1.7} />
                  <h3 className="mt-4 text-base md:text-lg font-black uppercase tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    {phase.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 4 — Challenges vs Solutions two-column */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-2xl mb-10 md:mb-14">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              FIELD NOTES
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-primary tracking-tight leading-[1.05]">
              What surprised us.
              <br />
              What we did about it.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            <article className="rounded-2xl border-2 border-border bg-card p-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 text-destructive px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                <TriangleAlert className="h-3 w-3" /> The challenge
              </div>
              <p className="mt-5 text-base md:text-lg text-foreground leading-relaxed">
                {project.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                  Steep backyard access — only one safe staging lane for shingles
                  and tear-off debris.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                  Neighbor lots close — we had to shield windows and keep noise
                  predictable for evening routines.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                  Weather window tight — multiple pop-up storms threatened the
                  exposed deck between lifts.
                </li>
              </ul>
            </article>
            <article className="rounded-2xl bg-primary text-primary-foreground p-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                <Target className="h-3 w-3" /> What we ran
              </div>
              <p className="mt-5 text-base md:text-lg text-white/90 leading-relaxed">
                Dedicated ground protection, phased tear-off with same-day
                dry-in, and a superintendent who texted photo updates before
                homeowners had to ask.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  Dumpsters rotated on a pull schedule so the driveway never
                  stacked debris overnight.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  Magnet + blower pass after every lift — gutters cleared before
                  final walk.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  Weather holds built into the production board, not hidden in
                  the fine print.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  Manufacturer rep sign-off captured on camera for warranty
                  registration.
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 5 — Region context + adjacent projects */}
      <section className="bg-muted/40 section-padding border-y border-border">
        <div className="container-custom px-4 md:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-card border border-border p-7">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-secondary mb-3">
                WHY THIS REGION
              </p>
              <h3 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight leading-tight mb-4">
                Locally licensed in {project.location.split(",")[0]}.
              </h3>
              <p className="text-foreground/85 leading-relaxed">
                Our crews are licensed in this county and file the same
                documentation package your insurer or HOA expects. Adjacent
                neighbors get the same cleanup standard.
              </p>
              <Link
                to="/service-areas"
                className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-secondary hover:gap-3 transition-all"
              >
                See full service area
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Inspection passes", value: "1st cycle", icon: Award },
                { label: "Site safety days", value: "0 LTI", icon: ShieldCheck },
                { label: "Schedule slip", value: "0 days", icon: Calendar },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="rounded-xl bg-primary text-primary-foreground p-4"
                  >
                    <Icon className="h-5 w-5 text-secondary mb-2" />
                    <div className="text-base md:text-lg font-black text-secondary leading-none">
                      {s.value}
                    </div>
                    <div className="mt-1 text-[10px] font-bold tracking-widest uppercase text-white/75 leading-tight">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-end justify-between mb-5">
              <h3 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight leading-tight">
                Roofs in the same lane
              </h3>
              <Link
                to="/projects"
                className="text-xs font-extrabold tracking-widest uppercase text-primary hover:text-secondary inline-flex items-center gap-1.5"
              >
                ALL <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {adjacent.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                More roofs in this category are coming soon.
              </div>
            ) : (
              <ul className="space-y-3">
                {adjacent.map(p => (
                  <li key={p.id}>
                    <Link
                      to={`/projects/${p.id}`}
                      className="group flex items-center gap-4 rounded-xl bg-card border border-border p-4 hover:border-secondary/60 hover:shadow-md transition-all"
                    >
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md ring-1 ring-black/5">
                        <img
                          src={resolveProjectImage(p.id, p.image)}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                          {p.year}
                        </p>
                        <p className="text-sm md:text-base font-black uppercase tracking-tight text-primary leading-snug group-hover:text-secondary transition-colors">
                          {p.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{p.location}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* 6 — Page-unique closing strip */}
      <section className="bg-secondary text-secondary-foreground border-y border-secondary">
        <div className="container-custom px-4 md:px-8 py-10 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] uppercase opacity-70 mb-2">
              Like this project? Yours could be next.
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
              Bring us a similar scope. We'll send back a real number.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-12 rounded-md px-6 text-sm font-extrabold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/contact">REQUEST CONCEPTUAL ESTIMATE</Link>
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

export default ProjectDetail;
