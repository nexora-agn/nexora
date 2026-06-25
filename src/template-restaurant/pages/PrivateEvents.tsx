import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import Layout from "@template-restaurant/components/layout/Layout";
import Reveal from "@template-restaurant/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRIVATE_EVENT_TYPES, EVENTS, RESTAURANT_IMAGES } from "@template-restaurant/data/siteData";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";

const PrivateEvents = () => {
  const { company: COMPANY } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    toast.success("Inquiry received! Our events team will contact you within 24 hours.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <Helmet>
        <title>Private Events | {COMPANY.name}</title>
        <meta name="description" content={`Host weddings, corporate events, and private celebrations at ${COMPANY.name}.`} />
      </Helmet>

      <section className="relative h-[45vh] min-h-[320px] flex items-end">
        <img src={RESTAURANT_IMAGES.eventsHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="container-custom container-inset relative pb-10 pt-32">
          <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-3">Private Dining</p>
          <h1 className="font-display text-5xl text-white font-medium">Events & Celebrations</h1>
        </div>
      </section>

      <section className="luxury-section">
        <div className="container-custom container-inset">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {PRIVATE_EVENT_TYPES.map((event, i) => (
              <Reveal key={event.id} delay={i * 50}>
                <article className="card-luxury overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full aspect-[16/10] object-cover" loading="lazy" />
                  <div className="p-6">
                    <h3 className="font-display text-xl mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--secondary))]">
                      Capacity: {event.capacity} guests
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {EVENTS.length > 0 && (
            <div className="mb-20">
              <h2 className="font-display text-3xl text-center mb-10">Upcoming Events</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {EVENTS.map(event => (
                  <div key={event.id} className="flex gap-5 border border-border p-5">
                    <img src={event.image} alt="" className="w-24 h-24 object-cover shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--secondary))] mb-1">{event.date}</p>
                      <h3 className="font-display text-xl mb-1">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl mb-3">Event Inquiry</h2>
                <p className="text-muted-foreground">Tell us about your celebration and we'll craft a bespoke experience.</p>
              </div>
            </Reveal>
            <form onSubmit={handleSubmit} className="space-y-4 bg-[hsl(var(--muted))] p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input name="name" required className="rounded-none h-11 mt-1" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input name="email" type="email" required className="rounded-none h-11 mt-1" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input name="phone" type="tel" required className="rounded-none h-11 mt-1" />
                </div>
                <div>
                  <Label>Event Type</Label>
                  <Select name="eventType" required>
                    <SelectTrigger className="rounded-none h-11 mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIVATE_EVENT_TYPES.map(e => (
                        <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Preferred Date</Label>
                  <Input name="date" type="date" className="rounded-none h-11 mt-1" />
                </div>
                <div>
                  <Label>Guest Count</Label>
                  <Input name="guests" type="number" min={1} className="rounded-none h-11 mt-1" />
                </div>
              </div>
              <div>
                <Label>Details</Label>
                <Textarea name="details" placeholder="Menu preferences, setup needs, budget..." className="rounded-none mt-1 min-h-[100px]" />
              </div>
              <Button type="submit" disabled={submitting} className="w-full rounded-none h-12 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] uppercase text-xs tracking-wider">
                {submitting ? "Sending..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivateEvents;
