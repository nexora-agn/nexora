import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, Mail, Clock, ParkingCircle, CalendarDays, Instagram, Facebook, Youtube } from "lucide-react";
import * as Icons from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent } from "@template-barbershop/contexts/SiteContentContext";
import { BARBERSHOP_IMAGES, CONTACT_TRUST_STRIP, PARKING_INFO, COMPANY } from "@template-barbershop/data/siteData";

const Contact = () => {
  const { officeHours, mapEmbedUrl } = useSiteContent();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact | {COMPANY.name}</title>
        <meta name="description" content="Get in touch, find us on the map, or book your next appointment." />
      </Helmet>

      <PageHeader eyebrow="Get In Touch" title="Contact Us" subtitle="Questions, group bookings, or press inquiries — we'd love to hear from you." image={BARBERSHOP_IMAGES.contactHero} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset grid lg:grid-cols-2 gap-6 mb-16">
          {CONTACT_TRUST_STRIP.map((item, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[item.icon] ?? Icons.ShieldCheck;
            return (
              <Reveal key={item.id} direction="up" delay={i * 60} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[hsl(var(--secondary))]/40 text-[hsl(var(--secondary))]">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="container-custom container-inset grid lg:grid-cols-2 gap-12">
          <Reveal direction="right">
            <h2 className="luxury-heading !text-3xl mb-6">Send a Message</h2>
            {submitted ? (
              <div className="border border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))]/5 p-8 text-center">
                <p className="font-display text-xl uppercase mb-2">Message Sent</p>
                <p className="text-sm text-muted-foreground">We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Name"
                    className="h-12 border border-border px-4 text-sm focus:outline-none focus:border-[hsl(var(--secondary))]"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="Email Address"
                    className="h-12 border border-border px-4 text-sm focus:outline-none focus:border-[hsl(var(--secondary))]"
                  />
                </div>
                <input
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone (optional)"
                  className="h-12 w-full border border-border px-4 text-sm focus:outline-none focus:border-[hsl(var(--secondary))]"
                />
                <Textarea
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message"
                  rows={5}
                  className="resize-none rounded-none border-border focus-visible:ring-0 focus-visible:border-[hsl(var(--secondary))]"
                />
                <button type="submit" className="btn-luxury-primary w-full sm:w-auto">Send Message</button>
              </form>
            )}

            <div className="mt-10 pt-8 border-t border-border">
              <Link to="/booking" className="btn-luxury-outline">
                <CalendarDays className="h-4 w-4 mr-2" /> Book an Appointment Instead
              </Link>
            </div>
          </Reveal>

          <Reveal direction="left" delay={100} className="space-y-6">
            <div className="border border-border overflow-hidden h-64">
              <iframe title="Map" src={mapEmbedUrl} className="w-full h-full" loading="lazy" />
            </div>

            <div className="space-y-4 text-sm">
              <p className="flex items-start gap-3"><MapPin className="h-4.5 w-4.5 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" /> {COMPANY.address}</p>
              <p className="flex items-center gap-3"><Phone className="h-4.5 w-4.5 shrink-0 text-[hsl(var(--secondary))]" /> <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`} className="hover:text-[hsl(var(--secondary))]">{COMPANY.phone}</a></p>
              <p className="flex items-center gap-3"><Mail className="h-4.5 w-4.5 shrink-0 text-[hsl(var(--secondary))]" /> <a href={`mailto:${COMPANY.email}`} className="hover:text-[hsl(var(--secondary))]">{COMPANY.email}</a></p>
              <div className="flex items-start gap-3">
                <Clock className="h-4.5 w-4.5 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" />
                <div>
                  {officeHours.map(row => (
                    <p key={row.days} className="text-muted-foreground">{row.days}: <span className="text-foreground">{row.hours}</span></p>
                  ))}
                </div>
              </div>
              <p className="flex items-start gap-3"><ParkingCircle className="h-4.5 w-4.5 mt-0.5 shrink-0 text-[hsl(var(--secondary))]" /> <span className="text-muted-foreground">{PARKING_INFO}</span></p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social media" className="flex h-10 w-10 items-center justify-center border border-border hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))] transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
