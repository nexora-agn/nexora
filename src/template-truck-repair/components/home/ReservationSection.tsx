import Layout from "@template-truck-repair/components/layout/Layout";
import ReservationForm from "@template-truck-repair/components/reservation/ReservationForm";
import Reveal from "@template-truck-repair/components/animations/Reveal";
import { RESTAURANT_IMAGES } from "@template-truck-repair/data/siteData";

const ReservationSection = () => (
  <section className="luxury-section bg-[hsl(var(--muted))] relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.04]">
      <img src={RESTAURANT_IMAGES.interior} alt="" className="w-full h-full object-cover" />
    </div>
    <div className="container-custom container-inset relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal direction="left">
          <div>
            <p className="luxury-eyebrow mb-4">Book Your Experience</p>
            <h2 className="luxury-heading mb-6">
              An Evening <span className="italic text-[hsl(var(--secondary))]">Awaiting You</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Reserve your table for an unforgettable dining experience. Our team will confirm your
              booking instantly and accommodate any special requests.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--secondary))]" />
                Instant confirmation for available times
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--secondary))]" />
                Indoor & outdoor seating available
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--secondary))]" />
                Dietary accommodations upon request
              </li>
            </ul>
          </div>
        </Reveal>
        <Reveal direction="right" delay={100}>
          <ReservationForm compact />
        </Reveal>
      </div>
    </div>
  </section>
);

export default ReservationSection;
