import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox = ({ images, index, onClose, onNavigate }: LightboxProps) => {
  const goNext = useCallback(() => onNavigate((index + 1) % images.length), [index, images.length, onNavigate]);
  const goPrev = useCallback(() => onNavigate((index - 1 + images.length) % images.length), [index, images.length, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  const current = images[index];
  if (!current) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in duration-300">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <X className="h-7 w-7" />
      </button>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous image"
        className="absolute left-4 sm:left-8 flex h-12 w-12 items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <img
        src={current.src}
        alt={current.alt}
        className="max-h-[85vh] max-w-[88vw] object-contain shadow-2xl"
        key={current.src}
      />

      <button
        type="button"
        onClick={goNext}
        aria-label="Next image"
        className="absolute right-4 sm:right-8 flex h-12 w-12 items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/50 uppercase tracking-widest">
        {index + 1} / {images.length}
      </p>
    </div>
  );
};

export default Lightbox;
