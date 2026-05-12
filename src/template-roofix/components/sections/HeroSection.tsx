import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  cta?: { label: string; to: string };
  cta2?: { label: string; to: string };
  image?: string;
  overlay?: boolean;
}

const HeroSection = ({ title, subtitle, cta, cta2, image, overlay = true }: HeroSectionProps) => (
  <section
    className="relative flex items-center min-h-[500px] md:min-h-[600px] bg-primary"
    style={image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
  >
    {overlay && <div className="absolute inset-0 bg-primary/75" />}
    <div className="relative container-custom px-4 md:px-8 py-20 text-primary-foreground">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight mb-6">{title}</h1>
      <p className="text-lg md:text-xl max-w-2xl opacity-90 mb-8">{subtitle}</p>
      <div className="flex flex-wrap gap-4">
        {cta && (
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link to={cta.to}>{cta.label}</Link>
          </Button>
        )}
        {cta2 && (
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
            <Link to={cta2.to}>{cta2.label}</Link>
          </Button>
        )}
      </div>
    </div>
  </section>
);

export default HeroSection;
