import { useState } from "react";
import { Expand } from "lucide-react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import Lightbox from "./Lightbox";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

interface GalleryMasonryProps {
  images: GalleryItem[];
}

const spanClasses = ["row-span-2", "row-span-1", "row-span-1", "row-span-2", "row-span-1", "row-span-1"];

const GalleryMasonry = ({ images }: GalleryMasonryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-3">
        {images.map((img, i) => (
          <Reveal key={img.id} direction="zoom" delay={(i % 6) * 70} className={spanClasses[i % spanClasses.length]}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="image-zoom group relative h-full w-full overflow-hidden block"
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Expand className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images.map(i => ({ src: i.src, alt: i.alt }))}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
};

export default GalleryMasonry;
