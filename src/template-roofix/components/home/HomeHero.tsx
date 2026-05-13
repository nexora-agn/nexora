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
  MapPinned,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";

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

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {HOME_HERO.image && (
        <>
          <img
            src={HOME_HERO.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full min-h-[520px] w-full scale-105 object-cover object-[52%_30%] sm:object-center opacity-[0.72]"
            loading="eager"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-primary from-25% via-primary/88 to-primary/20"
          />
        </>
      )}

      <div className="container-custom relative px-4 md:px-8 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs sm:text-sm font-bold tracking-[0.22em] text-secondary">
              {eyebrow}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.02] uppercase">
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

            <p className="text-base md:text-lg text-white/85 max-w-xl leading-relaxed">
              {HOME_HERO.body}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-md h-14 px-8 text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl shadow-black/25 group"
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
                className="rounded-md h-14 px-8 text-sm font-extrabold tracking-wider bg-transparent border-2 border-white/40 text-white hover:bg-white/10"
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

            {trustPills.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-xl">
                {trustPills.map(pill => {
                  const Icon =
                    trustIconMap[pill.icon as keyof typeof trustIconMap] ||
                    ShieldCheck;
                  return (
                    <div
                      key={pill.id}
                      className="flex items-start gap-2.5 rounded-md"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary/15 ring-1 ring-secondary/30">
                        <Icon className="h-4 w-4 text-secondary" />
                      </span>
                      <div className="leading-tight min-w-0">
                        <span className="block text-sm font-bold">{pill.label}</span>
                        <span className="block text-xs text-white/70">{pill.sub}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {(ratingCard || ratingValue) && (
            <div className="lg:col-span-5 lg:justify-self-end w-full">
              <div className="relative w-full lg:w-auto lg:max-w-sm">
                <div
                  className="absolute left-5 right-5 top-0 h-[3px] rounded-b-sm bg-secondary shadow-[0_0_18px_-2px_hsl(var(--secondary))]"
                  aria-hidden
                />
                <div className="rounded-sm border border-white/15 bg-neutral-950/90 text-white backdrop-blur-md shadow-2xl shadow-black/55 pt-8 px-5 pb-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-black tracking-[0.22em] text-secondary uppercase mb-3">
                        Local homeowners
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[40px] font-black tabular-nums leading-none tracking-tight">
                          {ratingValue}
                        </span>
                        <div className="flex gap-0.5 shrink-0" aria-hidden>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 font-medium mt-2 max-w-[16rem] leading-relaxed">
                        {ratingCount}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-secondary/25 ring-2 ring-secondary/40">
                      <MapPinned className="h-5 w-5 text-secondary" strokeWidth={2} aria-hidden />
                    </span>
                  </div>
                  <div className="mt-5 flex gap-1.5">
                    {(ratingCard?.avatars ?? [
                      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=80&h=80&fit=crop",
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
                      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=80&h=80&fit=crop",
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
                    ]).map((src, i) => (
                      <img
                        key={src + i}
                        src={src}
                        alt=""
                        className="h-10 w-10 rounded-sm ring-2 ring-neutral-700 object-cover hover:ring-secondary/70 transition-colors"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
