import Reveal from "@template-barbershop/components/animations/Reveal";
import BookingForm from "@template-barbershop/components/booking/BookingForm";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";

const BookingTeaser = () => {
  const { leadForm } = useSiteContent();

  return (
    <section id="home-booking" className="luxury-section bg-[hsl(var(--muted))]">
      <div className="container-custom container-inset grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
        <Reveal direction="right">
          <p className="luxury-eyebrow mb-4">Book Online</p>
          <h2 className="luxury-heading">{leadForm.title}</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">{leadForm.description}</p>
          <ul className="mt-8 space-y-3">
            {leadForm.bullets.map(b => (
              <li key={b} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[hsl(var(--secondary))]" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal direction="left" delay={120}>
          <BookingForm variant="full" />
        </Reveal>
      </div>
    </section>
  );
};

export default BookingTeaser;
