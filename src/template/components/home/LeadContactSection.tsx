import { useState, FormEvent } from "react";
import { Check } from "lucide-react";
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
import { LEAD_FORM } from "@template/data/siteData";
import { useSiteContent } from "@template/contexts/SiteContentContext";

const LeadContactSection = () => {
  const { services } = useSiteContent();
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
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl border border-border max-w-6xl mx-auto">
          <div className="bg-secondary p-8 md:p-12 lg:p-14 flex flex-col justify-center text-secondary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">{LEAD_FORM.title}</h2>
            <p className="mt-4 leading-relaxed opacity-95">{LEAD_FORM.description}</p>
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
          </div>

          <div className="bg-card p-8 md:p-12 lg:p-14">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="lead-name">Name</Label>
                <Input id="lead-name" name="name" required placeholder="Your name" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead-email">Email</Label>
                <Input id="lead-email" name="email" type="email" required placeholder="you@company.com" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Select Service</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="bg-background">
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
                <Textarea id="lead-msg" name="message" rows={4} placeholder="Project location, timeline, goals…" className="bg-background resize-none" />
              </div>
              <Button type="submit" className="w-full rounded-sm py-6 text-base font-bold tracking-wide bg-primary text-primary-foreground hover:bg-primary/90">
                SEND MESSAGE
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadContactSection;
