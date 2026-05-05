import { useState, FormEvent } from "react";
import { ArrowRight, Phone, Check, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSiteContent } from "@/contexts/SiteContentContext";

const LeadContactSection = () => {
  const { services, leadForm: LEAD_FORM, company: COMPANY } = useSiteContent();
  const [service, setService] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!service) {
      toast.error("Please select a service.");
      return;
    }
    toast.success("Thanks. We’ll be in touch within one business day.");
    (e.target as HTMLFormElement).reset();
    setService("");
  };

  const eyebrow =
    (LEAD_FORM as { eyebrow?: string }).eyebrow ||
    "LET'S BUILD SOMETHING GREAT TOGETHER";
  const cleanPhone = (COMPANY.phone || "").replace(/[^\d+]/g, "");

  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Subtle blueprint pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="container-custom relative px-4 md:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left intro */}
          <div className="lg:col-span-4">
            <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-3">
              {eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.05]">
              {LEAD_FORM.title}
            </h2>
            <ul className="mt-6 space-y-3">
              {LEAD_FORM.bullets.map(line => (
                <li key={line} className="flex items-center gap-3 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-white/95 font-medium">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-5">
            <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                name="name"
                required
                placeholder="Full Name"
                className="bg-white text-foreground h-12 placeholder:text-muted-foreground"
              />
              <Input
                name="phone"
                placeholder="Phone Number"
                className="bg-white text-foreground h-12 placeholder:text-muted-foreground"
              />
              <Input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="bg-white text-foreground h-12 placeholder:text-muted-foreground"
              />
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="bg-white text-foreground h-12">
                  <SelectValue placeholder="Service Needed" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                name="message"
                rows={4}
                placeholder="Project Details"
                className="bg-white text-foreground sm:col-span-2 resize-none placeholder:text-muted-foreground"
              />
              <p className="hidden sm:flex items-center gap-2 text-xs text-white/70 sm:col-span-2">
                <Lock className="h-3 w-3" />
                We respect your privacy. Your information is safe with us.
              </p>
            </form>
          </div>

          {/* CTAs sidebar */}
          <div className="lg:col-span-3">
            <Button
              form=""
              type="submit"
              onClick={e => {
                const form = (e.currentTarget.closest("section")?.querySelector(
                  "form",
                ) as HTMLFormElement | null);
                form?.requestSubmit();
              }}
              className="w-full h-14 rounded-md text-sm font-extrabold tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg group"
            >
              <span className="inline-flex items-center gap-2">
                {LEAD_FORM.primaryCta || "GET A FREE ESTIMATE"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Button>
            <div className="my-3 flex items-center gap-3 text-xs font-bold tracking-widest text-white/60">
              <span className="h-px flex-1 bg-white/15" />
              OR
              <span className="h-px flex-1 bg-white/15" />
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full h-14 rounded-md text-sm font-extrabold tracking-wider bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <a
                href={cleanPhone ? `tel:${cleanPhone}` : "#"}
                className="inline-flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                <span className="leading-tight">
                  {LEAD_FORM.secondaryCta || "CALL NOW"}
                  {COMPANY.phone && (
                    <span className="block text-[11px] font-bold tracking-normal opacity-90 normal-case">
                      {COMPANY.phone}
                    </span>
                  )}
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadContactSection;
