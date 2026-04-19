import { useState, FormEvent } from "react";
import { Check, Mail, Phone, MapPin, Lock, Send } from "lucide-react";
import { toast } from "sonner";
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
import { useSiteContent } from "@template/contexts/SiteContentContext";

const LeadContactSection = () => {
  const { services, leadForm: LEAD_FORM, company: COMPANY } = useSiteContent();
  const [service, setService] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!service) {
      toast.error("Please select a service.");
      return;
    }
    toast.success("Thanks — we'll be in touch within one business day.");
    (e.target as HTMLFormElement).reset();
    setService("");
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl border border-border max-w-6xl mx-auto bg-card">
          {/* Left panel */}
          <div className="relative overflow-hidden bg-secondary p-8 md:p-12 lg:p-14 flex flex-col justify-center text-secondary-foreground">
            {/* Decorative pattern */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary-foreground/10 blur-3xl"
            />

            <div className="relative">
              <p className="text-xs font-bold tracking-[0.22em] opacity-90 mb-3">
                GET A QUOTE
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                {LEAD_FORM.title}
              </h2>
              <p className="mt-4 leading-relaxed opacity-95">
                {LEAD_FORM.description}
              </p>
              <ul className="mt-8 space-y-4">
                {LEAD_FORM.bullets.map(line => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-foreground/20 text-secondary-foreground">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="font-medium">{line}</span>
                  </li>
                ))}
              </ul>

              {/* Contact details */}
              <div className="mt-10 pt-8 border-t border-secondary-foreground/20 space-y-4 text-sm">
                {COMPANY.phone && (
                  <a
                    href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/15">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="font-medium">{COMPANY.phone}</span>
                  </a>
                )}
                {COMPANY.email && (
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/15">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="font-medium">{COMPANY.email}</span>
                  </a>
                )}
                {COMPANY.address && (
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/15">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="font-medium">{COMPANY.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right panel - form */}
          <div className="bg-card p-8 md:p-12 lg:p-14">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="lead-name">Name</Label>
                  <Input
                    id="lead-name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="bg-background h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-email">Email</Label>
                  <Input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="bg-background h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Select Service</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="bg-background h-11">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(s => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-msg">Message</Label>
                <Textarea
                  id="lead-msg"
                  name="message"
                  rows={4}
                  placeholder="Project location, timeline, goals…"
                  className="bg-background resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-sm py-6 text-base font-bold tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 group"
              >
                <span>SEND MESSAGE</span>
                <Send className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" />
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
                <Lock className="h-3 w-3" />
                We reply within 1 business day. Your details stay private.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadContactSection;
