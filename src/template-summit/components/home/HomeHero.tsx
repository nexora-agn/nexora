import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  Star,
  ShieldCheck,
  Award,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";

const trustIconMap = {
  Clock,
  Award,
  ShieldCheck,
  BadgeCheck,
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
      { id: "ontime", label: "On Time", sub: "On Budget", icon: "Clock" },
      { id: "premium", label: "Premium", sub: "Quality", icon: "Award" },
      {
        id: "licensed",
        label: "Licensed",
        sub: "& Insured",
        icon: "ShieldCheck",
      },
      {
        id: "satisfaction",
        label: "Satisfaction",
        sub: "Guaranteed",
        icon: "BadgeCheck",
      },
    ];
  const eyebrow =
    (HOME_HERO as { eyebrow?: string }).eyebrow ||
    "FULL-SERVICE CONSTRUCTION COMPANY";
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");
  const ratingValue =
    (SITE_TOP as { ratingValue?: string }).ratingValue || "4.9";
  const ratingCount =
    (SITE_TOP as { ratingCount?: string }).ratingCount || "260+ Reviews";

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src={HOME_HERO.image}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/35"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"
        />
      </div>

      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container-custom relative px-4 md:px-8 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs sm:text-sm font-bold tracking-[0.22em] text-secondary mb-5">
              {eyebrow}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.02] uppercase">
              {HOME_HERO.headlineBefore}
              {HOME_HERO.headlineAfter && (
                <>
                  <br />
                  {HOME_HERO.headlineAfter}{" "}
                </>
              )}{" "}
              <span className="text-secondary">{HOME_HERO.headlineHighlight}</span>
            </h1>

            <p className="mt-7 text-base md:text-lg text-white/85 max-w-xl leading-relaxed">
              {HOME_HERO.body}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-md h-14 px-8 text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl shadow-black/30 group"
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
                className="rounded-md h-14 px-8 text-sm font-extrabold tracking-wider bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary"
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

            {/* Trust pills */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
              {trustPills.map(pill => {
                const Icon =
                  trustIconMap[pill.icon as keyof typeof trustIconMap] ||
                  ShieldCheck;
                return (
                  <div
                    key={pill.id}
                    className="flex items-center gap-3 min-w-0"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-secondary ring-1 ring-white/15">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="leading-tight min-w-0">
                      <p className="text-sm font-bold truncate">{pill.label}</p>
                      <p className="text-[11px] text-white/70 truncate">
                        {pill.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating Google review card */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="ml-auto max-w-sm rounded-xl bg-white text-foreground shadow-2xl shadow-black/40 p-5 border border-border">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-border shadow-sm">
                  <span className="text-xl font-black bg-gradient-to-br from-blue-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                    G
                  </span>
                </span>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-black">{ratingValue}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-secondary text-secondary"
                          aria-hidden
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {ratingCount}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-9 w-9 rounded-full ring-2 ring-white object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
