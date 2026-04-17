import { Helmet } from "react-helmet-async";
import { useState, FormEvent } from "react";
import Layout from "@template/components/layout/Layout";
import PageHeader from "@template/components/sections/PageHeader";
import Reveal from "@template/components/animations/Reveal";
import { COMPANY, OFFICE_HOURS, MAP_EMBED_URL } from "@template/data/siteData";
import { useSiteContent } from "@template/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const { services, sectionVisibility } = useSiteContent();
  const [projectType, setProjectType] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectType) {
      toast({ title: "Project type required", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent", description: "We'll get back to you within 24 hours." });
    (e.target as HTMLFormElement).reset();
    setProjectType("");
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us — {COMPANY.name}</title>
        <meta name="description" content={`Contact ${COMPANY.name} — New York office, hours, and project inquiries.`} />
      </Helmet>

      <Reveal direction="zoom" duration={650}>
        <PageHeader
          eyebrow="CONTACT"
          title="Contact us"
          subtitle="We are here to discuss your next visionary project. Let's build something extraordinary together."
        />
      </Reveal>

      {sectionVisibility["contact.main"] && <Reveal delay={70}>
        <section className="section-padding bg-background">
        <div className="container-custom px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="text-xl font-bold text-primary mb-6">Headquarters</h2>
            <p className="text-sm font-semibold text-foreground mb-4">New York Office</p>
            <ul className="space-y-5">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-secondary mt-0.5" />
                <span className="text-muted-foreground leading-relaxed">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-secondary" />
                <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`} className="text-foreground font-medium hover:text-secondary">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-secondary" />
                <a href={`mailto:${COMPANY.email}`} className="text-foreground font-medium hover:text-secondary">
                  {COMPANY.email}
                </a>
              </li>
            </ul>

            <div className="mt-10 rounded-xl bg-muted/80 border border-border p-6">
              <h3 className="font-bold text-foreground mb-4">Office Hours</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {OFFICE_HOURS.map(row => (
                  <li key={row.days} className="flex justify-between gap-4 border-b border-border/60 last:border-0 pb-2 last:pb-0">
                    <span>{row.days}</span>
                    <span className="font-medium text-foreground">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="contact-form" className="rounded-2xl border border-border bg-muted/40 p-6 md:p-8 shadow-sm scroll-mt-28">
            <h3 className="text-xl font-bold text-foreground mb-1">Send us a message</h3>
            <p className="text-sm text-muted-foreground mb-6">Fill out the form below and our team will get back to you within 24 hours.</p>
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full name</Label>
                  <Input id="full-name" name="name" required className="bg-background" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" name="email" type="email" required className="bg-background" placeholder="you@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" className="bg-background" placeholder="+1 …" />
                </div>
                <div className="space-y-2">
                  <Label>Project type</Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select…" />
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="msg">Message</Label>
                <Textarea id="msg" name="message" rows={5} required className="bg-background resize-none" placeholder="Tell us about your site, scope, and timeline…" />
              </div>
              <Button type="submit" className="rounded-sm font-bold px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                SEND MESSAGE
              </Button>
            </form>
          </div>
        </div>
        </section>
      </Reveal>}

      {sectionVisibility["contact.map"] && <Reveal delay={100}>
        <section className="h-[380px] w-full border-y border-border bg-muted">
        <iframe title="Map" src={MAP_EMBED_URL} className="w-full h-full grayscale-[20%] contrast-[0.95]" loading="lazy" />
        </section>
      </Reveal>}

      {sectionVisibility["contact.cta"] && <Reveal delay={130}>
        <section className="section-padding bg-background border-t border-border">
        <div className="container-custom px-4 md:px-8 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-8">Ready to start your project?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-sm font-bold px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <a href="#contact-form">REQUEST ESTIMATE</a>
            </Button>
            <Button asChild variant="outline" className="rounded-sm font-bold px-8 border-primary text-primary">
              <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}>BOOK A CALL</a>
            </Button>
          </div>
        </div>
        </section>
      </Reveal>}
    </Layout>
  );
};

export default Contact;
