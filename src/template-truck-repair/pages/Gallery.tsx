import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@template-truck-repair/components/layout/Layout";
import Reveal from "@template-truck-repair/components/animations/Reveal";
import { GALLERY_IMAGES, TRUCK_IMAGES } from "@template-truck-repair/data/siteData";
import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "workshop", label: "Repair Bays" },
  { id: "mechanics", label: "Technicians" },
  { id: "fleet", label: "Fleet" },
  { id: "diagnostics", label: "Diagnostics" },
  { id: "engine", label: "Engine Work" },
  { id: "operations", label: "Operations" },
];

const Gallery = () => {
  const { company: COMPANY } = useSiteContent();
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === filter);

  const goNext = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % filtered.length);
  }, [lightbox, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  }, [lightbox, filtered.length]);

  return (
    <Layout>
      <Helmet>
        <title>Workshop Gallery | {COMPANY.name}</title>
        <meta name="description" content={`Industrial repair facility photos — bays, diagnostics, and fleet operations at ${COMPANY.name}.`} />
      </Helmet>

      <section className="relative h-[40vh] min-h-[280px] flex items-end pt-20">
        <img src={TRUCK_IMAGES.workshop} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/90 to-transparent" />
        <div className="container-custom container-inset relative pb-10">
          <h1 className="font-display text-4xl md:text-5xl text-white">Workshop Gallery</h1>
        </div>
      </section>

      <section className="sticky top-16 sm:top-24 z-40 bg-white border-b border-border">
        <div className="container-custom container-inset py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors whitespace-nowrap",
                  filter === cat.id ? "bg-[hsl(var(--primary))] text-white" : "text-muted-foreground hover:text-[hsl(var(--primary))]",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="industrial-section">
        <div className="container-custom container-inset">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <Reveal key={img.id} delay={(i % 6) * 40}>
                <button type="button" onClick={() => setLightbox(i)} className="block w-full group cursor-pointer overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full aspect-[4/3] object-cover group-hover:opacity-90 transition-opacity" loading="lazy" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" role="dialog" aria-modal>
          <button type="button" onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white/70 hover:text-white" aria-label="Close"><X className="h-8 w-8" /></button>
          <button type="button" onClick={goPrev} className="absolute left-4 text-white/70 hover:text-white p-2" aria-label="Previous"><ChevronLeft className="h-10 w-10" /></button>
          <img src={filtered[lightbox].src} alt={filtered[lightbox].alt} className="max-h-[85vh] max-w-[90vw] object-contain" />
          <button type="button" onClick={goNext} className="absolute right-4 text-white/70 hover:text-white p-2" aria-label="Next"><ChevronRight className="h-10 w-10" /></button>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
