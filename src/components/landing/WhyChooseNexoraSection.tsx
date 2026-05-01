import { motion } from "framer-motion";
import { ArrowRight, Quote, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  allPortfolioClientStories,
  whyPillars,
  whyStatStrip,
  WHY_HEADLINE,
  WHY_SUB,
} from "@/data/whyChooseNexora";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface WhyChooseNexoraSectionProps {
  onRequestDemo?: () => void;
}

const WhyChooseNexoraSection = ({ onRequestDemo }: WhyChooseNexoraSectionProps) => {
  return (
    <section
      id="why-choose-us"
      className="scroll-mt-28 bg-gradient-to-b from-slate-50/80 via-background to-background py-24 md:py-32"
      aria-labelledby="why-choose-nexora-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
        >
          <p className="mb-4 inline-flex rounded-full border border-brand/25 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand shadow-sm">
            Why choose Nexora AGN
          </p>
          <h2
            id="why-choose-nexora-heading"
            className="text-balance text-3xl font-bold tracking-tight text-slate-950 md:text-[2.125rem] md:leading-[1.15] lg:text-[2.35rem]"
          >
            {WHY_HEADLINE}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">{WHY_SUB}</p>
        </motion.div>

        {/* 6-card grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {whyPillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.42, delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_12px_36px_-28px_rgba(15,23,42,0.35)] transition-shadow hover:shadow-[0_18px_44px_-26px_rgba(15,23,42,0.38)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-inner">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-950">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
              </motion.article>
            );
          })}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-14 rounded-2xl border border-slate-200/80 bg-white px-5 py-8 shadow-sm md:px-10 md:py-10"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-200/90">
            {whyStatStrip.map(row => {
              const Ico = row.icon;
              return (
                <div key={row.headline} className="flex gap-4 text-left lg:px-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Ico className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold leading-snug text-slate-950">{row.headline}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{row.subline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Reviews carousel (all portfolio clients) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
            }}
            className="w-full"
          >
            <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="mx-auto max-w-3xl text-center md:mx-0 md:max-w-xl md:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Client reviews</p>
                <h3
                  id="why-choose-client-results-heading"
                  className="mt-3 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
                >
                  Real Results. Real Clients.
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Every card matches a live site in{" "}
                  <span className="font-semibold text-slate-800">Work</span>: rankings, enquiries, and booked jobs after
                  launch (plus ongoing SEO hygiene).
                </p>
              </div>
              <div className="flex shrink-0 items-center justify-center gap-2 md:justify-end md:pb-0.5">
                <CarouselPrevious
                  type="button"
                  variant="outline"
                  size="icon"
                  className="static h-9 w-9 translate-x-0 translate-y-0 rounded-full border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-40"
                  aria-label="Previous client stories"
                />
                <CarouselNext
                  type="button"
                  variant="outline"
                  size="icon"
                  className="static h-9 w-9 translate-x-0 translate-y-0 rounded-full border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-40"
                  aria-label="Next client stories"
                />
              </div>
            </div>

            <CarouselContent className="-ml-3 md:-ml-4">
              {allPortfolioClientStories.map(t => (
                <CarouselItem
                  key={t.id}
                  className="pl-3 basis-full sm:basis-1/2 sm:pl-4 lg:basis-1/2 xl:basis-1/3"
                >
                  <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_14px_40px_-28px_rgba(15,23,42,0.4)]">
                    <div className="border-b border-slate-100 p-6">
                      <div className="flex items-start gap-3">
                        <img
                          src={t.avatarSrc}
                          alt=""
                          loading="lazy"
                          className="h-14 w-14 shrink-0 rounded-full object-cover object-center ring-2 ring-brand/15"
                          width={56}
                          height={56}
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-950">{t.name}</p>
                          <p className="text-xs leading-snug text-slate-500">{t.role}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={`s-${t.id}-${String(i)}`} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                        ))}
                      </div>
                      <div className="relative mt-4">
                        <Quote
                          className="absolute -left-1 -top-2 h-8 w-8 text-brand/20"
                          strokeWidth={1.25}
                          aria-hidden
                        />
                        <blockquote className="pl-8 text-[15px] italic leading-relaxed text-slate-700">
                          {t.quote}
                        </blockquote>
                      </div>
                    </div>
                    <div className="mt-auto bg-slate-50/95 px-4 py-3">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Indicative lift (campaign-dependent)
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs">
                        <div className="rounded-lg bg-white py-2 shadow-sm ring-1 ring-slate-200/80">
                          <p className="text-[10px] font-medium uppercase text-slate-500">Traffic</p>
                          <p className="font-bold tabular-nums text-brand">{t.lifts.traffic}</p>
                        </div>
                        <div className="rounded-lg bg-white py-2 shadow-sm ring-1 ring-slate-200/80">
                          <p className="text-[10px] font-medium uppercase text-slate-500">Leads</p>
                          <p className="font-bold tabular-nums text-brand">{t.lifts.leads}</p>
                        </div>
                        <div className="rounded-lg bg-white py-2 shadow-sm ring-1 ring-slate-200/80">
                          <p className="text-[10px] font-medium uppercase text-slate-500">Bookings</p>
                          <p className="font-bold tabular-nums text-brand">{t.lifts.appointments}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mt-16 overflow-hidden rounded-2xl border border-brand/35 bg-neutral-950 shadow-[0_24px_52px_-22px_rgba(0,0,0,0.5)] ring-1 ring-brand/20"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_80%_at_92%_-30%,rgba(245,197,23,0.22),transparent_52%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-4 left-0 w-1 rounded-full bg-gradient-to-b from-brand via-brand-muted to-transparent opacity-90"
            aria-hidden
          />
          <div className="relative flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-9">
            <div className="flex gap-4 pl-3 md:pl-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-[0_8px_24px_-8px_rgba(245,197,23,0.55)]">
                <Rocket className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight text-white md:text-xl">
                  Ready to grow your{" "}
                  <span className="text-brand">visibility</span>?
                </p>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-400">
                  More qualified traffic, more enquiries, and more booked conversations without guesswork. Start with a
                  short strategy call.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="h-12 shrink-0 rounded-xl border-0 bg-brand px-7 text-base font-semibold text-brand-foreground shadow-sm hover:bg-brand-muted"
              onClick={onRequestDemo}
            >
              Book a free strategy call
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseNexoraSection;
