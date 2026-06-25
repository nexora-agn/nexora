import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@template-restaurant/components/layout/Layout";
import Reveal from "@template-restaurant/components/animations/Reveal";
import { GALLERY_IMAGES, RESTAURANT_IMAGES } from "@template-restaurant/data/siteData";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "interior", label: "Interior" },
  { id: "exterior", label: "Exterior" },
  { id: "food", label: "Food" },
  { id: "drinks", label: "Drinks" },
  { id: "chef", label: "Chef" },
  { id: "guests", label: "Guests" },
  { id: "events", label: "Events" },
  { id: "terrace", label: "Terrace" },
  { id: "wine-cellar", label: "Wine Cellar" },
];

const Gallery = () => {
  const { company: COMPANY } = useSiteContent();
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

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
        <title>Gallery | {COMPANY.name}</title>
        <meta name="description" content={`Explore the ambiance, cuisine, and experiences at ${COMPANY.name}.`} />
      </Helmet>

      <section className="relative h-[45vh] min-h-[320px] flex items-end">
        <img src={RESTAURANT_IMAGES.interior} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="container-custom container-inset relative pb-10 pt-32">
          <h1 className="font-display text-5xl text-white font-medium">Gallery</h1>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container-custom container-inset py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors whitespace-nowrap",
                  filter === cat.id
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "text-muted-foreground hover:text-[hsl(var(--primary))]",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-section">
        <div className="container-custom container-inset">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <Reveal key={img.id} delay={(i % 6) * 40}>
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  className="image-zoom block w-full break-inside-avoid mb-4 group cursor-pointer"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" role="dialog" aria-modal>
          <button type="button" onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white" aria-label="Close">
            <X className="h-8 w-8" />
          </button>
          <button type="button" onClick={goPrev} className="absolute left-4 text-white/70 hover:text-white p-2" aria-label="Previous">
            <ChevronLeft className="h-10 w-10" />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain animate-in fade-in duration-300"
          />
          <button type="button" onClick={goNext} className="absolute right-4 text-white/70 hover:text-white p-2" aria-label="Next">
            <ChevronRight className="h-10 w-10" />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {filtered[lightbox].alt}
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
