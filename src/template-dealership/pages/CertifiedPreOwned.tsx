import { ShieldCheck, BadgeCheck, Wrench } from "lucide-react";
import VehicleCategoryList from "@template-dealership/components/inventory/VehicleCategoryList";

const benefits = [
  { icon: ShieldCheck, title: "Rigorous inspection", text: "Multi-point inspection on every certified unit." },
  { icon: BadgeCheck, title: "Extended warranty", text: "Factory-backed limited warranty included." },
  { icon: Wrench, title: "Roadside assistance", text: "24/7 support for peace of mind on every drive." },
];

const CertifiedPreOwned = () => (
  <VehicleCategoryList
    listingType="cpo"
    eyebrow="Certified"
    title="Certified Pre-Owned"
    description="Hand-selected vehicles with added protection and dealer certification."
    extraSection={
      <section className="section-padding-inset bg-[hsl(var(--muted))]">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map(b => (
            <div key={b.title} className="bg-white border border-border p-6">
              <b.icon className="h-8 w-8 text-[hsl(var(--secondary))] mb-3" />
              <h3 className="font-display font-semibold text-[hsl(var(--primary))]">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{b.text}</p>
            </div>
          ))}
        </div>
      </section>
    }
  />
);

export default CertifiedPreOwned;
