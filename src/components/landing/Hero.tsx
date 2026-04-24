import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  Calendar,
  Check,
  CloudUpload,
  Clock,
  ChevronDown,
  Lock,
  Phone,
  RefreshCw,
  Rocket,
  Search,
} from "lucide-react";
import { COMPANY, HOME_HERO, HOME_STATS, NAV_LINKS, PROJECTS, SITE_TOP } from "@template/data/siteData";
import { THEME_DEFAULTS } from "@template/contexts/ThemeContext";
import HeroTrustStrip from "@/components/landing/TrustSection";
import constructionBg from "@/assets/construction.png";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: "smooth" });
};

const HERO_EYEBROW = "WEBSITES FOR CONSTRUCTION COMPANIES";

const HERO_BODY =
  "Nexora builds high-converting websites for construction companies, and lets you preview the live site before you buy. Love it? We launch it and migrate everything seamlessly.";

const GALLERY = PROJECTS.slice(0, 3);
const HERO_LIVE_HEADLINE = [HOME_HERO.headlineBefore, HOME_HERO.headlineHighlight, HOME_HERO.headlineAfter].join(" ");
const HERO_LIVE_PREAMBLE = (HOME_HERO.body || "").split(/(?<=[.])\s/)[0] || HOME_HERO.body;

/** Construction hero for the marketing “desktop” preview (not the template default home photo). */
const LANDING_DESKTOP_HERO_CONSTRUCTION =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&h=1012&fit=crop&q=82";

const HERO_BOTTOM_FEATURES = [
  { Icon: Clock, title: "Preview Before You Buy", line: "See your live website first." },
  { Icon: Rocket, title: "Built for Construction", line: "Designed to win more projects." },
  { Icon: RefreshCw, title: "We Handle Everything", line: "Design, build, migrate, launch." },
  { Icon: BarChart2, title: "Results That Matter", line: "More leads. More calls. More builds." },
] as const;

const HERO_TRUST_POINTS = [
  { Icon: Check, title: "No Upfront Payment", line: "Preview First" },
  { Icon: Lock, title: "Zero Risk", line: "You Decide" },
  { Icon: CloudUpload, title: "We Migrate Everything", line: "Stress-Free" },
] as const;

interface HeroProps {
  onRequestDemo?: () => void;
}

const Hero = ({ onRequestDemo }: HeroProps) => {
  return (
    <section
      className="relative isolate box-border flex min-h-[100dvh] min-h-svh w-full flex-col overflow-x-hidden overflow-y-visible bg-transparent"
      aria-label="Home hero"
    >
      {/* High-key construction photo: right side only, fades into page background (lg+ two-column layout) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 right-0 -z-10 hidden overflow-hidden lg:block"
        aria-hidden
      >
        <img
          src={constructionBg}
          alt=""
          className="h-full w-full object-cover object-[58%_42%] opacity-[0.42] mix-blend-multiply [filter:grayscale(0.15)_saturate(0.9)_contrast(1.02)]"
          loading="eager"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-background from-[0%] via-background/88 via-[28%] to-transparent to-[72%]"
          aria-hidden
        />
      </div>
      <div className="relative z-10 flex w-full min-h-0 flex-1 flex-col justify-start px-3 pb-8 pt-[calc(7.5rem+env(safe-area-inset-top,0px))] sm:justify-center sm:px-0 sm:pb-0 sm:pt-14 md:px-4 md:pb-12 md:pt-[5.5rem] lg:pt-[6.5rem] xl:pt-[7.5rem]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:px-5 sm:py-2 md:gap-14 md:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center sm:pt-0 lg:max-w-xl lg:justify-self-start lg:text-left xl:max-w-[36rem]"
        >
          <p className="text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.2em] text-neutral-500 sm:text-xs sm:tracking-[0.22em]">
            {HERO_EYEBROW}
          </p>

          <h1 className="mt-3 text-balance text-3xl font-bold leading-[1.12] tracking-tight text-neutral-950 sm:mt-4 sm:text-4xl sm:leading-[1.1] md:text-5xl md:leading-[1.08] lg:text-[3.1rem]">
            <span className="block">We Build Your Website.</span>
            <span className="block text-neutral-600">You Preview It.</span>
            <span className="block text-neutral-600">
              Then You{" "}
              <span className="relative font-bold text-neutral-950">
                <span className="relative z-[1]">Decide</span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-0.5 left-[-2%] h-1.5 w-[104%] rounded-sm bg-brand/80 sm:bottom-0 sm:h-2"
                />
              </span>
              .
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-pretty text-[0.9375rem] font-medium leading-relaxed text-neutral-600 sm:mt-5 sm:text-base sm:leading-relaxed md:text-lg lg:mx-0">
            {HERO_BODY}
          </p>

          <div className="mt-6 flex w-full max-w-2xl flex-col gap-2.5 sm:mx-auto sm:mt-7 sm:max-w-none sm:flex-row sm:items-stretch sm:justify-center sm:gap-3 lg:mx-0 lg:max-w-lg lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToId("live-preview")}
              className="group flex min-h-[3.25rem] w-full flex-1 items-center gap-3 rounded-2xl border-0 bg-brand px-4 py-3.5 text-left text-brand-foreground shadow-lg shadow-brand/15 transition active:scale-[0.99] hover:bg-brand-muted sm:min-w-0"
            >
              <Calendar
                className="h-6 w-6 shrink-0 opacity-90"
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="min-w-0">
                <span className="block text-[0.95rem] font-semibold leading-tight sm:text-base">
                  See Your Website
                </span>
                <span className="mt-0.5 block text-xs font-medium text-brand-foreground/80">
                  Preview Your Live Site
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => onRequestDemo?.()}
              className="group flex min-h-[3.25rem] w-full flex-1 items-center gap-3 rounded-2xl border border-neutral-200/90 bg-white/90 px-4 py-3.5 text-left text-neutral-950 shadow-sm backdrop-blur-sm transition active:scale-[0.99] hover:border-neutral-300 hover:bg-white sm:min-w-0"
            >
              <Calendar
                className="h-6 w-6 shrink-0"
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="min-w-0">
                <span className="block text-[0.95rem] font-semibold leading-tight sm:text-base">Book a Demo</span>
                <span className="mt-0.5 block text-xs font-medium text-neutral-500">Talk to a Specialist</span>
              </span>
            </button>
          </div>

          <ul className="mt-5 grid w-full max-w-md grid-cols-1 gap-0 overflow-hidden text-left sm:mx-auto sm:mt-6 sm:max-w-2xl sm:grid-cols-3 sm:rounded-2xl sm:border sm:border-neutral-200/60 sm:bg-gradient-to-b sm:from-white/90 sm:to-neutral-50/50 sm:shadow-sm md:mt-7 lg:mx-0 lg:max-w-3xl">
            {HERO_TRUST_POINTS.map((item) => {
              const { Icon, title, line } = item;
              return (
                <li
                  key={title}
                  className="flex min-w-0 items-center gap-3.5 border-b border-neutral-200/55 py-2.5 last:border-b-0 sm:border-b-0 sm:border-l sm:border-l-neutral-200/70 sm:py-3.5 sm:pl-4 sm:pr-2 sm:first:border-l-0 sm:first:pl-3.5 sm:last:pr-3.5 md:gap-4 md:py-4 md:pl-5 md:pr-3 md:first:pl-4 md:last:pr-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-950 text-brand shadow-sm ring-1 ring-black/5">
                    <Icon className="h-[0.9rem] w-[0.9rem]" strokeWidth={2.25} aria-hidden />
                  </span>
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="text-[0.8125rem] font-medium tracking-tight text-neutral-900 sm:text-sm sm:leading-snug">
                      {title}
                    </span>
                    <span className="mt-0.5 text-[0.7rem] font-medium leading-snug text-neutral-500 sm:text-xs">
                      {line}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 w-full min-w-0 max-w-lg justify-self-center sm:mt-10 lg:mt-0 lg:max-w-none lg:justify-self-end"
        >
          <div className="glass-panel relative overflow-hidden rounded-2xl shadow-lg shadow-neutral-900/5 sm:rounded-3xl">
            <div className="flex items-stretch border-b border-neutral-200/60">
              <div
                className="flex min-w-0 items-center gap-1 bg-neutral-950 px-2 py-1 pl-1.5 text-[0.4rem] font-semibold uppercase leading-none tracking-[0.18em] text-white/95 sm:gap-1.5 sm:px-2.5 sm:py-1.5 sm:text-[0.45rem] sm:tracking-[0.2em]"
                aria-hidden
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-brand sm:h-1.5 sm:w-1.5" />
                LIVE PREVIEW
              </div>
            </div>

            <div className="border-t border-border/60 bg-white/95 px-1.5 pb-1.5 pt-0 sm:px-2.5 sm:pb-2.5 sm:pt-0">
              <div className="overflow-hidden rounded-b-2xl sm:rounded-b-[1.2rem]">
                <TemplateSiteChrome
                  constructionHeroSrc={LANDING_DESKTOP_HERO_CONSTRUCTION}
                />
              </div>
            </div>
          </div>

          {/* “Site ready” card — business-oriented, not dashboard UI */}
          <div className="relative z-20 mx-auto mt-3 w-full max-w-[18rem] sm:mx-0 sm:mt-0 sm:absolute sm:max-w-[15.5rem] sm:bottom-5 sm:-right-4 md:bottom-6 md:-right-6 lg:bottom-10 lg:-right-8 xl:bottom-12 xl:-right-10">
            <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-lg sm:p-4">
              <div className="mb-1 flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                  aria-hidden
                >
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-neutral-950">Your Site is Ready!</p>
                  <p className="text-xs text-neutral-500">Preview Live. No Commitment.</p>
                </div>
              </div>
              <ul className="mb-3.5 mt-2.5 space-y-1.5 text-xs font-medium text-neutral-700 sm:space-y-1">
                {["Pages Built", "Design Complete", "Content In Place", "Mobile Optimized", "SEO Ready"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50"
                        aria-hidden
                      >
                        <Check className="h-2.5 w-2.5 text-emerald-600" strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <Button
                type="button"
                onClick={() => scrollToId("live-preview")}
                className="h-10 w-full rounded-lg border-0 bg-neutral-950 text-xs font-semibold text-white shadow-sm hover:bg-neutral-800 sm:text-[0.8125rem]"
              >
                Preview Your Site
              </Button>
            </div>
          </div>
        </motion.div>
        </div>
      </div>

      <div className="mt-auto w-full shrink-0">
        <HeroTrustStrip />
        <div className="border-t border-neutral-800/80 bg-neutral-950 text-white">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-5 sm:py-7 md:px-6 md:py-8">
            <ul className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-5 sm:gap-y-6 md:grid-cols-4 md:gap-6 lg:gap-8">
              {HERO_BOTTOM_FEATURES.map(({ Icon, title, line }) => (
                <li key={title} className="flex gap-3 sm:gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand sm:h-8 md:h-9 sm:w-8 md:w-9">
                    <Icon className="h-4 w-4 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug text-white sm:text-[0.8rem] md:text-sm">{title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-white/60 sm:text-[0.7rem] md:text-xs">{line}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Scaled copy of @template/components/layout/Header (admin / preview) —
 * top bar + main row with wordmark, nav (Services + chevron), Get quote.
 */
function TemplateHeaderPreview() {
  const { primaryColor, secondaryColor } = THEME_DEFAULTS;
  const logoLetter = (COMPANY.name || "C").charAt(0).toUpperCase();
  const [logoWordPrimary, ...logoWordRest] = (COMPANY.legalName || COMPANY.name || "").split(" ");
  const logoWordSecondary = logoWordRest.join(" ") || COMPANY.tagline;
  const navPill = (active: boolean) =>
    active
      ? { color: secondaryColor, backgroundColor: `${secondaryColor}1a` }
      : undefined;

  return (
    <div className="pointer-events-none min-w-0 text-left select-none" aria-hidden>
      {/* Top utility bar — template Header: scales up on md+ for wide desktop preview */}
      <div
        className="flex items-center justify-between gap-0.5 border-b border-white/10 px-0.5 py-0.5 text-white min-[400px]:gap-1 min-[400px]:px-1 min-[400px]:py-0.5 sm:px-1.5 sm:py-1 md:gap-2 md:px-2.5 md:py-1.5 lg:px-3 lg:py-2"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex min-w-0 max-w-[58%] items-center gap-0.5 text-[0.16rem] font-medium leading-tight opacity-90 min-[400px]:text-[0.2rem] min-[480px]:text-[0.22rem] min-[520px]:text-[0.24rem] sm:max-w-[60%] sm:text-[0.26rem] md:max-w-[55%] md:gap-1.5 md:text-[0.3rem] md:opacity-100 lg:max-w-none lg:text-[0.36rem] xl:text-[0.4rem]">
          <span className="shrink-0">{SITE_TOP.line}</span>
          <span className="shrink-0 opacity-40">|</span>
          <span className="truncate">{SITE_TOP.locations}</span>
        </div>
        <div className="flex max-w-[42%] shrink-0 items-center justify-end gap-0.5 text-[0.16rem] min-[400px]:gap-1 min-[400px]:text-[0.2rem] min-[480px]:text-[0.22rem] sm:gap-1.5 sm:text-[0.26rem] md:max-w-[45%] md:gap-2 md:text-[0.3rem] lg:max-w-none lg:gap-2.5 lg:text-[0.36rem] xl:text-[0.4rem]">
          <Search
            className="h-1 w-1 shrink-0 opacity-80 min-[400px]:h-1.5 min-[400px]:w-1.5 md:h-1.5 md:w-1.5 md:opacity-90 lg:h-2 lg:w-2"
            strokeWidth={2}
          />
          <span className="hidden items-center gap-0.5 font-medium min-[420px]:flex md:gap-1">
            <Phone className="h-1 w-1 shrink-0 min-[400px]:h-1.5 min-[400px]:w-1.5 md:h-1.5 md:w-1.5 lg:h-2 lg:w-2" strokeWidth={2} />
            <span className="max-w-[2rem] truncate min-[500px]:max-w-[4.5rem] min-[500px]:whitespace-nowrap lg:max-w-[7rem]">
              {COMPANY.phone}
            </span>
          </span>
          <span className="whitespace-nowrap font-semibold md:tracking-tight">Request Estimate</span>
        </div>
      </div>

      {/* Sticky main row — grid: wordmark | centered nav | CTA (right-aligned, same vertical center) */}
      <div className="border-b border-neutral-200/90 bg-white/95 shadow-sm md:bg-white md:shadow-md">
        <div
          className="grid w-full min-h-0 min-w-0 [grid-template-columns:minmax(0,1fr)_minmax(0,2.4fr)_auto] items-center gap-x-1 px-0.5 py-0.5 min-[400px]:[grid-template-columns:minmax(0,1.1fr)_minmax(0,2.2fr)_auto] min-[480px]:gap-x-1.5 min-[480px]:px-1.5 min-[480px]:py-1 sm:px-2 sm:py-1.5 md:min-h-[1.65rem] md:gap-x-2 md:px-2.5 md:py-1.5 lg:min-h-[1.9rem] lg:gap-x-2.5 lg:px-3.5 lg:py-2 xl:min-h-[2.1rem] xl:gap-x-3 xl:px-4"
        >
          <div className="flex min-w-0 items-center gap-0.5 min-[480px]:gap-1 md:gap-1.5">
            <span
              className="flex h-2 w-2 shrink-0 items-center justify-center rounded-sm text-[0.2rem] font-black shadow-sm ring-1 ring-black/5 min-[480px]:h-3 min-[480px]:w-3 min-[480px]:text-[0.32rem] min-[480px]:rounded-md sm:h-3.5 sm:w-3.5 sm:text-[0.4rem] md:h-4 md:w-4 md:text-[0.48rem] md:shadow md:ring-black/5 lg:h-[1.15rem] lg:w-[1.15rem] lg:text-[0.55rem] xl:h-5 xl:w-5 xl:text-[0.6rem]"
              style={{ backgroundColor: secondaryColor, color: primaryColor }}
            >
              {logoLetter}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.2rem] font-extrabold leading-tight tracking-tight text-neutral-900 min-[480px]:text-[0.3rem] sm:text-[0.36rem] md:text-[0.38rem] lg:text-[0.44rem] xl:text-[0.5rem]">
                {logoWordPrimary || COMPANY.name}
              </p>
              <p className="truncate text-[0.16rem] font-semibold uppercase leading-tight text-neutral-500 min-[480px]:text-[0.2rem] min-[480px]:tracking-[0.08em] sm:text-[0.22rem] sm:tracking-[0.1em] md:text-[0.24rem] md:tracking-[0.1em] lg:text-[0.26rem] lg:tracking-[0.12em] xl:text-[0.28rem]">
                {logoWordSecondary}
              </p>
            </div>
          </div>

          <nav className="mx-auto flex w-full min-w-0 max-w-full items-center justify-center gap-0.5 self-center overflow-x-auto [&::-webkit-scrollbar]:hidden sm:gap-0 sm:px-0.5 md:gap-1 lg:gap-1.5 lg:px-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              if (link.path === "/services") {
                return (
                  <span
                    key={link.path}
                    className="inline-flex shrink-0 items-center gap-0.5 rounded px-0.5 py-px min-[480px]:gap-0.5 min-[480px]:px-0.5 md:rounded-md md:px-1.5 md:py-0.5 lg:px-2 lg:py-0.5"
                    style={navPill(true)}
                  >
                    <span className="whitespace-nowrap text-[0.15rem] font-semibold min-[480px]:text-[0.2rem] sm:text-[0.24rem] md:text-[0.28rem] md:tracking-wide lg:text-[0.32rem] xl:text-[0.35rem]">
                      {link.label}
                    </span>
                    <ChevronDown
                      className="h-1 w-1 shrink-0 min-[480px]:h-1.5 min-[480px]:w-1.5 sm:h-2 sm:w-2 md:h-2 md:w-2 lg:h-2.5 lg:w-2.5"
                      strokeWidth={2}
                    />
                  </span>
                );
              }
              const homeActive = link.path === "/";
              return (
                <span
                  key={link.path}
                  className={[
                    "shrink-0 whitespace-nowrap px-0.5 text-[0.15rem] font-semibold min-[480px]:px-0.5 min-[480px]:text-[0.2rem] sm:text-[0.24rem] md:text-[0.28rem] md:tracking-wide md:transition-colors lg:text-[0.32rem] xl:text-[0.35rem]",
                    homeActive
                      ? "rounded md:rounded-md md:px-1.5 md:py-0.5"
                      : "rounded-none text-neutral-800/90",
                  ].join(" ")}
                  style={homeActive ? navPill(true) : undefined}
                >
                  {link.label}
                </span>
              );
            })}
          </nav>

          <div className="flex h-full min-h-0 min-w-0 items-center justify-self-end pl-0.5 min-[400px]:pl-0.5 min-[480px]:pl-1 sm:pl-1.5">
            <span
              className="inline-flex w-max min-w-0 max-w-full items-center justify-center self-center leading-none px-0.5 py-1.5 text-[0.15rem] font-semibold min-[480px]:px-1 min-[480px]:text-[0.2rem] sm:px-1.5 sm:py-2 sm:text-[0.24rem] md:px-2 md:py-2 md:text-[0.28rem] md:shadow-sm md:ring-1 md:ring-black/5 lg:rounded-md lg:px-2.5 lg:py-2 lg:text-[0.32rem] lg:font-semibold lg:tracking-wide xl:px-3 xl:text-[0.35rem]"
              style={{ backgroundColor: secondaryColor, color: primaryColor }}
            >
              Get quote
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Minified in-product template preview: same header layout as admin, construction hero */
function TemplateSiteChrome({ constructionHeroSrc }: { constructionHeroSrc: string }) {
  return (
    <div className="pointer-events-none min-w-0 select-none text-left">
      <TemplateHeaderPreview />

      {/* Template hero: wide desktop band + construction photo */}
      <div className="relative min-h-0 w-full">
        <div className="relative aspect-[16/9] w-full min-h-0">
          <img
            src={constructionHeroSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-2.5 sm:p-3.5">
            <p className="text-[0.45rem] font-bold uppercase tracking-[0.16em] text-brand/90 sm:text-[0.5rem] sm:tracking-[0.18em]">
              {COMPANY.name} · {SITE_TOP.line}
            </p>
            <h2
              className="mt-1.5 line-clamp-2 text-balance text-[0.7rem] font-extrabold leading-tight text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] sm:mt-2 sm:line-clamp-3 sm:text-xs sm:leading-tight"
            >
              {HERO_LIVE_HEADLINE}
            </h2>
            <p className="mt-1.5 line-clamp-2 max-w-md text-[0.5rem] leading-relaxed text-white/90 sm:mt-2 sm:line-clamp-3 sm:text-[0.55rem] sm:leading-relaxed">
              {HERO_LIVE_PREAMBLE}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-2.5 sm:gap-2">
              <span className="inline-flex items-center justify-center rounded-sm bg-brand px-2 py-0.5 text-[0.45rem] font-bold text-brand-foreground sm:px-2.5 sm:py-1 sm:text-[0.5rem]">
                {HOME_HERO.primaryCta.label}
              </span>
              <span className="inline-flex items-center justify-center rounded-sm border border-white/45 bg-white/10 px-2 py-0.5 text-[0.45rem] font-semibold text-white sm:px-2.5 sm:py-1 sm:text-[0.5rem]">
                {HOME_HERO.secondaryCta.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row — from template homeStats */}
      <div className="grid grid-cols-2 border-t border-black/5 bg-neutral-900 px-1 py-1.5 sm:grid-cols-4 sm:px-1.5 sm:py-2">
        {HOME_STATS.slice(0, 4).map((s, i) => (
          <div
            key={s.label}
            className={`px-0.5 text-center ${i > 0 ? "sm:border-l sm:border-white/10" : ""}`}
          >
            <p className="text-[0.5rem] font-extrabold text-white sm:text-[0.55rem]">
              {s.value}
            </p>
            <p className="text-[0.3rem] font-medium uppercase leading-tight text-white/65 sm:text-[0.35rem]">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Project strip — from template projects list */}
      <div className="grid grid-cols-3 gap-0.5 border-t border-neutral-100 bg-white p-0.5 sm:gap-1 sm:p-1">
        {GALLERY.map((p) => (
          <div key={p.id} className="relative aspect-[4/3] overflow-hidden">
            <img
              src={p.image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0 ring-1 ring-inset ring-black/5"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
