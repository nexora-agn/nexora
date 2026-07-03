import { Link } from "react-router-dom";
import Reveal from "@template-barbershop/components/animations/Reveal";
import GalleryMasonry from "@template-barbershop/components/gallery/GalleryMasonry";
import { GALLERY_IMAGES } from "@template-barbershop/data/siteData";

const GallerySection = () => {
  return (
    <section className="luxury-section bg-background">
      <div className="container-custom container-inset">
        <Reveal direction="up" className="max-w-2xl mx-auto text-center mb-14">
          <p className="luxury-eyebrow mb-4">Inside The Shop</p>
          <h2 className="luxury-heading">Shop Gallery</h2>
          <p className="mt-5 text-muted-foreground">A look at our space, our craft, and the details that make Forge feel different.</p>
        </Reveal>

        <GalleryMasonry images={GALLERY_IMAGES.slice(0, 9)} />

        <div className="mt-12 text-center">
          <Link to="/gallery" className="btn-luxury-outline">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
