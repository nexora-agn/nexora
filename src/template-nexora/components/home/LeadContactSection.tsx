import { useState, FormEvent } from "react";
import { ArrowRight, Phone, Lock, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";

const LeadContactSection = () => {
  const { leadForm: LEAD_FORM, services, company: COMPANY } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);
  const phoneHref = `tel:${(COMPANY.phone || "").replace(/[^+\d]/g, "")}`;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks! We'll be in touch within 24 hours.");
      (event.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <section className="bg-[hsl(var(--primary))] text-white py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT: copy + bullets */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl lg:text-3xl font-black uppercase leading-tight tracking-tight">
              {LEAD_FORM.title}
            </h2>
            <p className="text-[hsl(var(--secondary))] font-bold uppercase tracking-wide text-sm mt-2">
              {LEAD_FORM.description}
            </p>
            <ul className="space-y-2 mt-5">
              {LEAD_FORM.bullets.map(b => (
                <li key={b} className="flex items-center gap-2 text-sm text-white/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--secondary))]/20">
                    <Check className="h-3 w-3 text-[hsl(var(--secondary))]" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER: form */}
          <form onSubmit={onSubmit} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Full Name"
              className="rounded-md bg-white text-slate-900 placeholder:text-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))]"
            />
            <input
              type="tel"
              required
              placeholder="Phone Number"
              className="rounded-md bg-white text-slate-900 placeholder:text-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))]"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="rounded-md bg-white text-slate-900 placeholder:text-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))]"
            />
            <input
              type="text"
              placeholder="Address"
              className="rounded-md bg-white text-slate-900 placeholder:text-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))]"
            />
            <select
              defaultValue=""
              className="sm:col-span-2 rounded-md bg-white text-slate-900 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))]"
            >
              <option value="" disabled>Service Needed</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
            <textarea
              placeholder="Tell us about your roof (optional)"
              rows={3}
              className="sm:col-span-2 rounded-md bg-white text-slate-900 placeholder:text-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] resize-none"
            />
          </form>

          {/* RIGHT: CTA stack */}
          <div className="lg:col-span-3 space-y-3">
            <Button
              form=""
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90 font-bold uppercase tracking-wide py-6"
              onClick={e => {
                const form = (e.currentTarget.closest("section")?.querySelector("form") as HTMLFormElement | null);
                form?.requestSubmit();
              }}
            >
              {submitting ? "Sending…" : "Get Free Estimate"}
              {!submitting && <ArrowRight className="ml-1.5 h-4 w-4" />}
            </Button>
            <div className="flex items-center gap-3 text-white/50 text-xs">
              <span className="flex-1 h-px bg-white/15" />
              <span>or</span>
              <span className="flex-1 h-px bg-white/15" />
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full bg-transparent border-white/40 text-white hover:bg-white/10 font-bold uppercase tracking-wide py-6"
            >
              <a href={phoneHref} className="flex flex-col items-center leading-tight">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4" /> Call Now
                </span>
                <span className="text-xs font-bold opacity-90">{COMPANY.phone}</span>
              </a>
            </Button>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/55 pt-1">
              <Lock className="h-3 w-3" />
              <span>We respect your privacy. Your information is safe with us.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadContactSection;
