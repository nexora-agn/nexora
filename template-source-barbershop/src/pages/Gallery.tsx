import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import CTASection from "@template-barbershop/components/sections/CTASection";
import GalleryMasonry from "@template-barbershop/components/gallery/GalleryMasonry";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { BARBERSHOP_IMAGES, COMPANY } from "@template-barbershop/data/siteData";
import { cn } from "@/lib/utils";

const Gallery = () => {
  const { projects } = useSiteContent();
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set(projects.map(p => p.category));
    return ["all", ...Array.from(set)];
  }, [projects]);

  const filtered = category === "all" ? projects : projects.filter(p => p.category === category);
  const images = filtered.map(p => ({ id: p.id, src: p.image, alt: p.title, category: p.category }));

  return (
    <Layout>
      <Helmet>
        <title>Gallery | {COMPANY.name}</title>
        <meta name="description" content="A look inside our shop — interiors, chairs, cuts, and the craft behind every visit." />
      </Helmet>

      <PageHeader eyebrow="Inside The Shop" title="Shop Gallery" subtitle="Interiors, barber chairs, fresh cuts, and the details that make Forge feel different." image={BARBERSHOP_IMAGES.galleryHero} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-2 text-xs font-sans-brand font-semibold uppercase tracking-wide border transition-colors capitalize",
                  category === cat ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-border text-muted-foreground hover:border-[hsl(var(--primary))]/40",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <GalleryMasonry images={images} />
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Gallery;
