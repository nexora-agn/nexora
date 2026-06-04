import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  Star,
  Calendar,
  Tag,
  ShieldCheck,
  Award,
  Clock,
  BadgeCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/contexts/SiteContentContext";

const trustIconMap = {
  Calendar,
  Tag,
  ShieldCheck,
  Award,
  Clock,
  BadgeCheck,
  Users,
} as const;

type TrustPill = {
  id: string;
  label: string;
  sub: string;
  icon: keyof typeof trustIconMap | string;
};

const GoogleMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className ?? "h-6 w-6 shrink-0"} aria-hidden>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

type HeroGoogleReviewsProps = {
  score: string;
  countLabel: string;
  avatars: string[];
};

const DEFAULT_REVIEW_AVATARS = [
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
];

const HeroGoogleReviews = ({ score, countLabel, avatars }: HeroGoogleReviewsProps) => (
  <div className="w-full max-w-[220px] overflow-hidden rounded-lg border border-white/25 bg-white text-slate-900 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] sm:max-w-[280px] sm:rounded-xl lg:max-w-[300px] xl:max-w-[320px] lg:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.55)]">
    <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2 sm:gap-3 sm:px-5 sm:py-3.5">
      <GoogleMark className="h-4 w-4 shrink-0 sm:h-6 sm:w-6" />
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-700 sm:text-[11px] sm:tracking-[0.14em]">
          Google Reviews
        </p>
        <p className="text-[8px] font-medium text-slate-500 sm:text-[10px]">Verified NYC homeowners</p>
      </div>
    </div>
    <div className="px-3 py-2.5 sm:px-5 sm:py-4">
      <div className="flex items-end gap-2 sm:gap-3">
        <span className="text-[1.75rem] font-black tabular-nums leading-none tracking-tight text-slate-900 sm:text-[2.75rem]">
          {score}
        </span>
        <div className="pb-0.5">
          <div className="flex gap-0.5" aria-hidden>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-4 sm:w-4"
              />
            ))}
          </div>
          <p className="mt-0.5 text-[10px] font-semibold leading-tight text-slate-600 sm:mt-1.5 sm:text-xs">
            {countLabel}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 pt-2 sm:mt-4 sm:gap-3 sm:pt-4">
        <div className="flex -space-x-1.5 sm:-space-x-2.5">
          {avatars.map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt=""
              className={
                i > 2
                  ? "hidden h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-slate-200 sm:block"
                  : "h-6 w-6 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-slate-200 sm:h-9 sm:w-9"
              }
              loading="lazy"
            />
          ))}
        </div>
        <Link
          to="/reviews"
          className="shrink-0 text-[8px] font-bold uppercase tracking-[0.1em] text-secondary hover:text-secondary/80 transition-colors sm:text-[10px] sm:tracking-[0.12em]"
        >
          Read all →
        </Link>
      </div>
    </div>
  </div>
);

const HomeHero = () => {
  const {
    homeHero: HOME_HERO,
    company: COMPANY,
    siteTop: SITE_TOP,
  } = useSiteContent();
  const trustPills: TrustPill[] =
    (HOME_HERO as { trustPills?: TrustPill[] }).trustPills ?? [
      { id: "inspect", label: "Free Inspection", sub: "in 24 Hours", icon: "Calendar" },
      { id: "pricing", label: "Upfront Pricing", sub: "No Hidden Fees", icon: "Tag" },
      {
        id: "warranty",
        label: "Workmanship Warranty",
        sub: "You Can Trust",
        icon: "ShieldCheck",
      },
    ];
  const eyebrow =
    (HOME_HERO as { eyebrow?: string }).eyebrow ||
    "PROFESSIONAL ROOFING CONTRACTORS";
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const ratingCard = (HOME_HERO as { ratingCard?: { score: string; countLabel: string; avatars: string[] } })
    .ratingCard;
  const ratingValue = ratingCard?.score ?? (SITE_TOP as { ratingValue?: string }).ratingValue ?? "4.9";
  const ratingCount =
    ratingCard?.countLabel ??
    `Based on ${(SITE_TOP as { ratingCount?: string }).ratingCount ?? "320+"}`;

  const heroImage = HOME_HERO.image;

  const heroImageOverlays = (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-r from-primary from-[0%] via-primary/90 via-[20%] to-transparent to-[52%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/95 from-[0%] via-primary/50 via-[18%] to-transparent to-[42%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-secondary/30" />
    </div>
  );

  const heroReviewsOverlay =
    (ratingCard || ratingValue) ? (
      <div className="absolute inset-x-0 bottom-3 z-20 flex justify-end px-3 sm:bottom-6 sm:justify-center sm:px-4 lg:inset-x-auto lg:bottom-10 lg:right-8 lg:justify-end lg:px-0 xl:bottom-12 xl:right-12">
        <HeroGoogleReviews
          score={ratingValue}
          countLabel={ratingCount}
          avatars={ratingCard?.avatars ?? DEFAULT_REVIEW_AVATARS}
        />
      </div>
    ) : null;

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground border-b border-white/10">
      {heroImage && (
        <div className="absolute inset-y-0 left-1/2 right-0 hidden lg:block">
          <div className="absolute inset-0 min-h-full bg-primary">
            <img
              src={heroImage}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          {heroImageOverlays}
          {heroReviewsOverlay}
        </div>
      )}

      <div className="relative z-10">
        <div className="container-custom px-4 md:px-8">
          <div className="flex flex-col lg:max-w-2xl lg:pr-8">
            <div className="flex flex-1 flex-col justify-center py-10 sm:py-14 md:py-20 lg:py-24 min-w-0 space-y-4 sm:space-y-5 lg:space-y-6">
              <p className="text-xs sm:text-sm font-bold tracking-[0.22em] text-secondary">
                {eyebrow}
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-black tracking-tight leading-[1.02] uppercase">
                {HOME_HERO.headlineBefore}
                {HOME_HERO.headlineHighlight && (
                  <>
                    {" "}
                    <span className="block lg:inline text-secondary">
                      {HOME_HERO.headlineHighlight}
                    </span>
                  </>
                )}
                {HOME_HERO.headlineAfter && (
                  <span className="block text-primary-foreground">{HOME_HERO.headlineAfter}</span>
                )}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-xl leading-relaxed">
                {HOME_HERO.body}
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1 sm:gap-3 sm:pt-2">
                <Button
                  asChild
                  size="lg"
                  className="rounded-md h-12 px-6 text-xs font-extrabold tracking-wider sm:h-14 sm:px-8 sm:text-sm bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl shadow-black/25 group"
                >
                  <Link
                    to={HOME_HERO.primaryCta.to}
                    className="inline-flex items-center gap-2"
                  >
                    {HOME_HERO.primaryCta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-md h-12 px-6 text-xs font-extrabold tracking-wider sm:h-14 sm:px-8 sm:text-sm bg-transparent border-2 border-white/40 text-white hover:bg-white/10"
                >
                  <a
                    href={cleanPhone ? `tel:${cleanPhone}` : HOME_HERO.secondaryCta.to}
                    className="inline-flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    {HOME_HERO.secondaryCta.label}
                  </a>
                </Button>
              </div>
            </div>

            {trustPills.length > 0 && (
              <div className="pb-8 pt-1 sm:pb-12 sm:pt-2 md:pb-14 lg:pb-10 lg:-mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
                {trustPills.map(pill => {
                  const Icon =
                    trustIconMap[pill.icon as keyof typeof trustIconMap] || ShieldCheck;
                  return (
                    <div
                      key={pill.id}
                      className={
                        pill.id === "warranty"
                          ? "flex shrink-0 items-start gap-2.5 rounded-md"
                          : "flex items-start gap-2.5 rounded-md"
                      }
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary/15 ring-1 ring-secondary/30">
                        <Icon className="h-4 w-4 text-secondary" />
                      </span>
                      <div
                        className={
                          pill.id === "warranty" ? "leading-tight" : "min-w-0 leading-tight"
                        }
                      >
                        <span
                          className={
                            pill.id === "warranty"
                              ? "block text-sm font-bold whitespace-nowrap"
                              : "block text-sm font-bold"
                          }
                        >
                          {pill.label}
                        </span>
                        <span className="block text-xs text-white/70">{pill.sub}</span>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
