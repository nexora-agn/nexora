import { useCallback, useRef } from "react";
import { NotebookPen, Plus, RotateCcw, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { DEFAULT_DRAFT_STATE, type DraftState } from "@/lib/drafts";
import { supabase } from "@/lib/supabase";

interface EditorPanelProps {
  state: DraftState;
  onChange: (updater: (prev: DraftState) => DraftState) => void;
  clientId: string;
}

const UID = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

async function uploadImageToStorage(clientId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `${clientId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("client-assets").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("client-assets").getPublicUrl(path);
  return data.publicUrl;
}

const EditorPanel = ({ state, onChange, clientId }: EditorPanelProps) => {
  const { theme, content } = state;

  const setTheme = useCallback(
    (patch: Partial<DraftState["theme"]>) => {
      onChange(prev => ({ ...prev, theme: { ...prev.theme, ...patch } }));
    },
    [onChange],
  );

  const setContent = useCallback(
    (patch: Partial<DraftState["content"]>) => {
      onChange(prev => ({ ...prev, content: { ...prev.content, ...patch } }));
    },
    [onChange],
  );

  const handleUpload = useCallback(
    async (file: File | undefined, apply: (url: string) => void) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      try {
        const url = await uploadImageToStorage(clientId, file);
        apply(url);
      } catch (err) {
        try {
          const dataUrl = await readFileAsDataUrl(file);
          apply(dataUrl);
          toast.warning("Image stored inline (Supabase Storage unavailable)");
        } catch {
          toast.error(err instanceof Error ? err.message : "Upload failed");
        }
      }
    },
    [clientId],
  );

  /* helpers for editing simple sub-objects */
  const setCompany = (patch: Partial<DraftState["content"]["company"]>) =>
    setContent({ company: { ...content.company, ...patch } });
  const setSiteTop = (patch: Partial<DraftState["content"]["siteTop"]>) =>
    setContent({ siteTop: { ...content.siteTop, ...patch } });
  const setHomeHero = (patch: Partial<DraftState["content"]["homeHero"]>) =>
    setContent({ homeHero: { ...content.homeHero, ...patch } });
  const setLeadForm = (patch: Partial<DraftState["content"]["leadForm"]>) =>
    setContent({ leadForm: { ...content.leadForm, ...patch } });

  const setNotes = useCallback(
    (value: string) => onChange(prev => ({ ...prev, notes: value })),
    [onChange],
  );

  return (
    <div className="p-4 space-y-6">
      {/* NOTES FOR DEV TEAM */}
      <section className="space-y-2 rounded-md border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-400/30 dark:bg-amber-500/5">
        <div className="flex items-center gap-2">
          <NotebookPen className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            Notes for dev team
          </h3>
        </div>
        <Textarea
          rows={5}
          value={state.notes ?? ""}
          onChange={e => setNotes(e.target.value)}
          placeholder="e.g. Client wants a multilingual blog; booking system integration; custom newsletter signup in the footer…"
          className="bg-background/80 text-sm"
        />
      </section>

      {/* BRANDING */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Branding</h3>

        <AssetDropzone
          label="Logo"
          previewSrc={theme.logoUrl}
          previewClass="h-12 object-contain"
          onFile={file => handleUpload(file, url => setTheme({ logoUrl: url }))}
          onRemove={() => setTheme({ logoUrl: null })}
        />

        <AssetDropzone
          label="Favicon"
          previewSrc={theme.faviconUrl}
          previewClass="h-10 w-10 object-contain rounded"
          onFile={file => handleUpload(file, url => setTheme({ faviconUrl: url }))}
          onRemove={() => setTheme({ faviconUrl: null })}
        />

        <ColorField label="Brand dark (primary)" value={theme.primaryColor} onChange={v => setTheme({ primaryColor: v })} />
        <ColorField label="Accent (secondary)" value={theme.secondaryColor} onChange={v => setTheme({ secondaryColor: v })} />

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() =>
            setTheme({
              primaryColor: DEFAULT_DRAFT_STATE.theme.primaryColor,
              secondaryColor: DEFAULT_DRAFT_STATE.theme.secondaryColor,
              logoUrl: null,
              faviconUrl: null,
            })
          }
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          Reset branding
        </Button>
      </section>

      {/* CONTENT — organized as collapsible sections */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</h3>

        <Accordion type="multiple" className="w-full" defaultValue={["company"]}>
          {/* === COMPANY === */}
          <AccordionItem value="company">
            <AccordionTrigger className="text-sm font-semibold">Company</AccordionTrigger>
            <AccordionContent className="space-y-3">
              <TextField label="Company name" value={content.company.name} onChange={v => setCompany({ name: v })} />
              <TextField label="Legal / long name" value={content.company.legalName} onChange={v => setCompany({ legalName: v })} />
              <TextAreaField label="Tagline" rows={2} value={content.company.tagline} onChange={v => setCompany({ tagline: v })} />
              <TextField label="Phone" value={content.company.phone} onChange={v => setCompany({ phone: v })} />
              <TextField label="Email" value={content.company.email} onChange={v => setCompany({ email: v })} />
              <TextAreaField label="Address" rows={2} value={content.company.address} onChange={v => setCompany({ address: v })} />
              <TextField label="Hours" value={content.company.hours} onChange={v => setCompany({ hours: v })} />

              <div className="pt-2 border-t border-border">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Top bar (header)</p>
                <TextField label="Line" value={content.siteTop.line} onChange={v => setSiteTop({ line: v })} />
                <TextField label="Locations" value={content.siteTop.locations} onChange={v => setSiteTop({ locations: v })} />
              </div>

              <div className="pt-2 border-t border-border space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Office hours (Contact page)</p>
                {content.officeHours.map((row, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <Input
                      value={row.days}
                      placeholder="Days"
                      onChange={e =>
                        setContent({
                          officeHours: content.officeHours.map((r, idx) => (idx === i ? { ...r, days: e.target.value } : r)),
                        })
                      }
                    />
                    <Input
                      value={row.hours}
                      placeholder="Hours"
                      onChange={e =>
                        setContent({
                          officeHours: content.officeHours.map((r, idx) => (idx === i ? { ...r, hours: e.target.value } : r)),
                        })
                      }
                    />
                  </div>
                ))}
                <TextField
                  label="Map embed URL"
                  value={content.mapEmbedUrl}
                  onChange={v => setContent({ mapEmbedUrl: v })}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* === HOME HERO === */}
          <AccordionItem value="hero">
            <AccordionTrigger className="text-sm font-semibold">Home hero</AccordionTrigger>
            <AccordionContent className="space-y-3">
              <TextField label="Headline (before highlight)" value={content.homeHero.headlineBefore} onChange={v => setHomeHero({ headlineBefore: v })} />
              <TextField label="Highlight word (gold)" value={content.homeHero.headlineHighlight} onChange={v => setHomeHero({ headlineHighlight: v })} />
              <TextField label="Headline (after highlight)" value={content.homeHero.headlineAfter} onChange={v => setHomeHero({ headlineAfter: v })} />
              <TextAreaField label="Body copy" rows={3} value={content.homeHero.body} onChange={v => setHomeHero({ body: v })} />

              <div className="grid grid-cols-2 gap-2">
                <TextField label="Primary CTA label" value={content.homeHero.primaryCta.label} onChange={v => setHomeHero({ primaryCta: { ...content.homeHero.primaryCta, label: v } })} />
                <TextField label="Primary CTA link" value={content.homeHero.primaryCta.to} onChange={v => setHomeHero({ primaryCta: { ...content.homeHero.primaryCta, to: v } })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <TextField label="Secondary CTA label" value={content.homeHero.secondaryCta.label} onChange={v => setHomeHero({ secondaryCta: { ...content.homeHero.secondaryCta, label: v } })} />
                <TextField label="Secondary CTA link" value={content.homeHero.secondaryCta.to} onChange={v => setHomeHero({ secondaryCta: { ...content.homeHero.secondaryCta, to: v } })} />
              </div>

              <AssetDropzone
                label="Hero image"
                previewSrc={content.homeHero.image}
                previewClass="h-28 w-full object-cover rounded"
                onFile={file => handleUpload(file, url => setHomeHero({ image: url }))}
                onRemove={() => setHomeHero({ image: "" })}
              />

              <div className="pt-2 border-t border-border">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Featured project badge</p>
                <TextField label="Eyebrow" value={content.homeHero.featuredEyebrow} onChange={v => setHomeHero({ featuredEyebrow: v })} />
                <TextField label="Title" value={content.homeHero.featuredTitle} onChange={v => setHomeHero({ featuredTitle: v })} />
                <TextField label="Meta" value={content.homeHero.featuredMeta} onChange={v => setHomeHero({ featuredMeta: v })} />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* === HOME SECTIONS === */}
          <AccordionItem value="home-sections">
            <AccordionTrigger className="text-sm font-semibold">Home sections</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {/* Stats */}
              <CollapseBlock label="Stats band (4 numbers)">
                {content.homeStats.map((s, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 mb-2">
                    <Input
                      value={s.value}
                      placeholder="350+"
                      onChange={e =>
                        setContent({
                          homeStats: content.homeStats.map((x, idx) => (idx === i ? { ...x, value: e.target.value } : x)),
                        })
                      }
                    />
                    <Input
                      value={s.label}
                      placeholder="Projects Completed"
                      onChange={e =>
                        setContent({
                          homeStats: content.homeStats.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)),
                        })
                      }
                    />
                  </div>
                ))}
              </CollapseBlock>

              {/* Capabilities */}
              <CollapseBlock label="Capabilities (home cards)">
                <AddBtn
                  onClick={() =>
                    setContent({
                      capabilities: [
                        ...content.capabilities,
                        { id: UID("cap"), title: "New capability", description: "Short description.", icon: "Building2" as const, to: "/services" },
                      ],
                    })
                  }
                  label="capability"
                />
                {content.capabilities.map(c => (
                  <Card key={c.id} onRemove={() => setContent({ capabilities: content.capabilities.filter(x => x.id !== c.id) })}>
                    <Input
                      value={c.title}
                      placeholder="Title"
                      onChange={e =>
                        setContent({
                          capabilities: content.capabilities.map(x => (x.id === c.id ? { ...x, title: e.target.value } : x)),
                        })
                      }
                    />
                    <Textarea
                      rows={2}
                      value={c.description}
                      placeholder="Description"
                      onChange={e =>
                        setContent({
                          capabilities: content.capabilities.map(x => (x.id === c.id ? { ...x, description: e.target.value } : x)),
                        })
                      }
                    />
                    <Input
                      value={c.to}
                      placeholder="Link (e.g. /services)"
                      onChange={e =>
                        setContent({
                          capabilities: content.capabilities.map(x => (x.id === c.id ? { ...x, to: e.target.value } : x)),
                        })
                      }
                    />
                  </Card>
                ))}
              </CollapseBlock>

              {/* Process steps */}
              <CollapseBlock label="Process steps (timeline)">
                <AddBtn
                  onClick={() =>
                    setContent({
                      processSteps: [
                        ...content.processSteps,
                        { id: UID("step"), label: "New Step", description: "What happens here." },
                      ],
                    })
                  }
                  label="step"
                />
                {content.processSteps.map(s => (
                  <Card key={s.id} onRemove={() => setContent({ processSteps: content.processSteps.filter(x => x.id !== s.id) })}>
                    <Input
                      value={s.label}
                      placeholder="Step label"
                      onChange={e =>
                        setContent({
                          processSteps: content.processSteps.map(x => (x.id === s.id ? { ...x, label: e.target.value } : x)),
                        })
                      }
                    />
                    <Textarea
                      rows={2}
                      value={s.description}
                      placeholder="Step description"
                      onChange={e =>
                        setContent({
                          processSteps: content.processSteps.map(x => (x.id === s.id ? { ...x, description: e.target.value } : x)),
                        })
                      }
                    />
                  </Card>
                ))}
              </CollapseBlock>

              {/* Why benefits */}
              <CollapseBlock label="Why choose us (benefits)">
                <AddBtn
                  onClick={() =>
                    setContent({
                      whyBenefits: [
                        ...content.whyBenefits,
                        { title: "New benefit", description: "Why it matters.", icon: "ClipboardCheck" as const },
                      ],
                    })
                  }
                  label="benefit"
                />
                {content.whyBenefits.map((b, i) => (
                  <Card key={i} onRemove={() => setContent({ whyBenefits: content.whyBenefits.filter((_, idx) => idx !== i) })}>
                    <Input
                      value={b.title}
                      placeholder="Title"
                      onChange={e =>
                        setContent({
                          whyBenefits: content.whyBenefits.map((x, idx) => (idx === i ? { ...x, title: e.target.value } : x)),
                        })
                      }
                    />
                    <Textarea
                      rows={2}
                      value={b.description}
                      placeholder="Description"
                      onChange={e =>
                        setContent({
                          whyBenefits: content.whyBenefits.map((x, idx) => (idx === i ? { ...x, description: e.target.value } : x)),
                        })
                      }
                    />
                  </Card>
                ))}
              </CollapseBlock>

              {/* Testimonials */}
              <CollapseBlock label="Testimonials / client stories">
                <AddBtn
                  onClick={() =>
                    setContent({
                      testimonials: [
                        ...content.testimonials,
                        { name: "New Name", role: "Role, Company", quote: "What they said.", avatar: "" },
                      ],
                    })
                  }
                  label="testimonial"
                />
                {content.testimonials.map((t, i) => (
                  <Card key={i} onRemove={() => setContent({ testimonials: content.testimonials.filter((_, idx) => idx !== i) })}>
                    <Input
                      value={t.name}
                      placeholder="Name"
                      onChange={e =>
                        setContent({
                          testimonials: content.testimonials.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)),
                        })
                      }
                    />
                    <Input
                      value={t.role}
                      placeholder="Role / Company"
                      onChange={e =>
                        setContent({
                          testimonials: content.testimonials.map((x, idx) => (idx === i ? { ...x, role: e.target.value } : x)),
                        })
                      }
                    />
                    <Textarea
                      rows={3}
                      value={t.quote}
                      placeholder="Quote"
                      onChange={e =>
                        setContent({
                          testimonials: content.testimonials.map((x, idx) => (idx === i ? { ...x, quote: e.target.value } : x)),
                        })
                      }
                    />
                    <AssetDropzone
                      label="Avatar"
                      previewSrc={t.avatar}
                      previewClass="h-14 w-14 rounded-full object-cover"
                      onFile={file =>
                        handleUpload(file, url =>
                          setContent({
                            testimonials: content.testimonials.map((x, idx) => (idx === i ? { ...x, avatar: url } : x)),
                          }),
                        )
                      }
                      onRemove={() =>
                        setContent({
                          testimonials: content.testimonials.map((x, idx) => (idx === i ? { ...x, avatar: "" } : x)),
                        })
                      }
                    />
                  </Card>
                ))}
              </CollapseBlock>

              {/* Lead form */}
              <CollapseBlock label="Lead contact form (home)">
                <TextField label="Title" value={content.leadForm.title} onChange={v => setLeadForm({ title: v })} />
                <TextAreaField label="Description" rows={2} value={content.leadForm.description} onChange={v => setLeadForm({ description: v })} />
                <Label className="text-xs font-medium">Bullets</Label>
                {content.leadForm.bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={b}
                      onChange={e =>
                        setLeadForm({
                          bullets: content.leadForm.bullets.map((x, idx) => (idx === i ? e.target.value : x)),
                        })
                      }
                    />
                    <button
                      type="button"
                      className="text-xs text-destructive"
                      onClick={() => setLeadForm({ bullets: content.leadForm.bullets.filter((_, idx) => idx !== i) })}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setLeadForm({ bullets: [...content.leadForm.bullets, "New benefit"] })}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add bullet
                </Button>
              </CollapseBlock>
            </AccordionContent>
          </AccordionItem>

          {/* === SERVICES (existing) === */}
          <AccordionItem value="services">
            <AccordionTrigger className="text-sm font-semibold">Services</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <AddBtn
                label="service"
                onClick={() =>
                  setContent({
                    services: [
                      ...content.services,
                      { id: UID("service"), title: "New Service", icon: "Building2", description: "Describe this service.", image: "" },
                    ],
                  })
                }
              />
              {content.services.map(item => (
                <Card key={item.id} onRemove={() => setContent({ services: content.services.filter(s => s.id !== item.id) })}>
                  <Input
                    value={item.title}
                    placeholder="Title"
                    onChange={e =>
                      setContent({ services: content.services.map(s => (s.id === item.id ? { ...s, title: e.target.value } : s)) })
                    }
                  />
                  <Textarea
                    rows={2}
                    value={item.description}
                    placeholder="Description"
                    onChange={e =>
                      setContent({ services: content.services.map(s => (s.id === item.id ? { ...s, description: e.target.value } : s)) })
                    }
                  />
                  <AssetDropzone
                    label="Image"
                    previewSrc={item.image}
                    previewClass="h-20 w-full object-cover rounded"
                    onFile={file =>
                      handleUpload(file, url =>
                        setContent({ services: content.services.map(s => (s.id === item.id ? { ...s, image: url } : s)) }),
                      )
                    }
                    onRemove={() =>
                      setContent({ services: content.services.map(s => (s.id === item.id ? { ...s, image: "" } : s)) })
                    }
                  />
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* === SERVICE SECTIONS === */}
          <AccordionItem value="service-sections">
            <AccordionTrigger className="text-sm font-semibold">Service sections (deep dives)</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <AddBtn
                label="section"
                onClick={() =>
                  setContent({
                    serviceSections: [
                      ...content.serviceSections,
                      {
                        id: UID("section"),
                        category: "CATEGORY",
                        title: "New Section",
                        subtitle: "ADD A SUBTITLE",
                        body: ["First paragraph.", "Second paragraph."],
                        image: "",
                        inclusions: ["Inclusion one", "Inclusion two"],
                      },
                    ],
                  })
                }
              />
              {content.serviceSections.map(item => (
                <Card key={item.id} onRemove={() => setContent({ serviceSections: content.serviceSections.filter(s => s.id !== item.id) })}>
                  <Input
                    value={item.title}
                    placeholder="Title"
                    onChange={e =>
                      setContent({ serviceSections: content.serviceSections.map(s => (s.id === item.id ? { ...s, title: e.target.value } : s)) })
                    }
                  />
                  <Input
                    value={item.subtitle}
                    placeholder="Subtitle"
                    onChange={e =>
                      setContent({ serviceSections: content.serviceSections.map(s => (s.id === item.id ? { ...s, subtitle: e.target.value } : s)) })
                    }
                  />
                  <AssetDropzone
                    label="Image"
                    previewSrc={item.image}
                    previewClass="h-20 w-full object-cover rounded"
                    onFile={file =>
                      handleUpload(file, url =>
                        setContent({ serviceSections: content.serviceSections.map(s => (s.id === item.id ? { ...s, image: url } : s)) }),
                      )
                    }
                    onRemove={() =>
                      setContent({ serviceSections: content.serviceSections.map(s => (s.id === item.id ? { ...s, image: "" } : s)) })
                    }
                  />
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* === PROJECTS (existing) === */}
          <AccordionItem value="projects">
            <AccordionTrigger className="text-sm font-semibold">Projects</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <AddBtn
                label="project"
                onClick={() =>
                  setContent({
                    projects: [
                      ...content.projects,
                      {
                        id: UID("project"),
                        title: "New Project",
                        category: "Residential",
                        location: "City, Country",
                        year: "2026",
                        client: "Client Name",
                        value: "$0M",
                        description: "Project description.",
                        image: "",
                        gallery: [],
                      },
                    ],
                  })
                }
              />
              {content.projects.map(item => (
                <Card key={item.id} onRemove={() => setContent({ projects: content.projects.filter(p => p.id !== item.id) })}>
                  <Input
                    value={item.title}
                    placeholder="Title"
                    onChange={e =>
                      setContent({ projects: content.projects.map(p => (p.id === item.id ? { ...p, title: e.target.value } : p)) })
                    }
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={item.location} placeholder="Location" onChange={e => setContent({ projects: content.projects.map(p => (p.id === item.id ? { ...p, location: e.target.value } : p)) })} />
                    <Input value={item.year} placeholder="Year" onChange={e => setContent({ projects: content.projects.map(p => (p.id === item.id ? { ...p, year: e.target.value } : p)) })} />
                  </div>
                  <Textarea
                    rows={2}
                    value={item.description}
                    placeholder="Description"
                    onChange={e =>
                      setContent({ projects: content.projects.map(p => (p.id === item.id ? { ...p, description: e.target.value } : p)) })
                    }
                  />
                  <AssetDropzone
                    label="Image"
                    previewSrc={item.image}
                    previewClass="h-20 w-full object-cover rounded"
                    onFile={file =>
                      handleUpload(file, url =>
                        setContent({ projects: content.projects.map(p => (p.id === item.id ? { ...p, image: url } : p)) }),
                      )
                    }
                    onRemove={() =>
                      setContent({ projects: content.projects.map(p => (p.id === item.id ? { ...p, image: "" } : p)) })
                    }
                  />
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* === TEAM (existing) === */}
          <AccordionItem value="team">
            <AccordionTrigger className="text-sm font-semibold">Team</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <AddBtn
                label="member"
                onClick={() =>
                  setContent({
                    team: [
                      ...content.team,
                      { id: UID("member"), name: "New Member", role: "Role", bio: "Short bio.", image: "", social: { linkedin: "#", twitter: "#" } },
                    ],
                  })
                }
              />
              {content.team.map(item => (
                <Card key={item.id} onRemove={() => setContent({ team: content.team.filter(m => m.id !== item.id) })}>
                  <Input
                    value={item.name}
                    placeholder="Name"
                    onChange={e => setContent({ team: content.team.map(m => (m.id === item.id ? { ...m, name: e.target.value } : m)) })}
                  />
                  <Input
                    value={item.role}
                    placeholder="Role"
                    onChange={e => setContent({ team: content.team.map(m => (m.id === item.id ? { ...m, role: e.target.value } : m)) })}
                  />
                  <Textarea
                    rows={2}
                    value={item.bio}
                    placeholder="Bio"
                    onChange={e => setContent({ team: content.team.map(m => (m.id === item.id ? { ...m, bio: e.target.value } : m)) })}
                  />
                  <AssetDropzone
                    label="Photo"
                    previewSrc={item.image}
                    previewClass="h-20 w-20 rounded-full object-cover"
                    onFile={file =>
                      handleUpload(file, url =>
                        setContent({ team: content.team.map(m => (m.id === item.id ? { ...m, image: url } : m)) }),
                      )
                    }
                    onRemove={() =>
                      setContent({ team: content.team.map(m => (m.id === item.id ? { ...m, image: "" } : m)) })
                    }
                  />
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* === ABOUT === */}
          <AccordionItem value="about">
            <AccordionTrigger className="text-sm font-semibold">About page</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <CollapseBlock label="About stats band">
                {content.aboutStats.map((s, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 mb-2">
                    <Input
                      value={s.value}
                      placeholder="Value"
                      onChange={e =>
                        setContent({
                          aboutStats: content.aboutStats.map((x, idx) => (idx === i ? { ...x, value: e.target.value } : x)),
                        })
                      }
                    />
                    <Input
                      value={s.label}
                      placeholder="Label"
                      onChange={e =>
                        setContent({
                          aboutStats: content.aboutStats.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)),
                        })
                      }
                    />
                  </div>
                ))}
              </CollapseBlock>

              <CollapseBlock label="Animated counter stats (other pages)">
                {content.stats.map((s, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                    <Input
                      type="number"
                      value={s.value}
                      placeholder="Value"
                      onChange={e =>
                        setContent({
                          stats: content.stats.map((x, idx) => (idx === i ? { ...x, value: Number(e.target.value) || 0 } : x)),
                        })
                      }
                    />
                    <Input
                      value={s.suffix}
                      placeholder="Suffix"
                      onChange={e =>
                        setContent({
                          stats: content.stats.map((x, idx) => (idx === i ? { ...x, suffix: e.target.value } : x)),
                        })
                      }
                    />
                    <Input
                      value={s.label}
                      placeholder="Label"
                      onChange={e =>
                        setContent({
                          stats: content.stats.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)),
                        })
                      }
                    />
                  </div>
                ))}
              </CollapseBlock>

              <CollapseBlock label="Projects page stats">
                {content.projectsPageStats.map((s, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 mb-2">
                    <Input
                      value={s.value}
                      placeholder="Value"
                      onChange={e =>
                        setContent({
                          projectsPageStats: content.projectsPageStats.map((x, idx) => (idx === i ? { ...x, value: e.target.value } : x)),
                        })
                      }
                    />
                    <Input
                      value={s.label}
                      placeholder="Label"
                      onChange={e =>
                        setContent({
                          projectsPageStats: content.projectsPageStats.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)),
                        })
                      }
                    />
                  </div>
                ))}
              </CollapseBlock>

              <CollapseBlock label="Core values">
                <AddBtn
                  label="value"
                  onClick={() =>
                    setContent({
                      coreValues: [
                        ...content.coreValues,
                        { id: UID("val"), title: "New value", description: "Why it matters.", icon: "Award" as const },
                      ],
                    })
                  }
                />
                {content.coreValues.map(v => (
                  <Card key={v.id} onRemove={() => setContent({ coreValues: content.coreValues.filter(x => x.id !== v.id) })}>
                    <Input
                      value={v.title}
                      placeholder="Title"
                      onChange={e =>
                        setContent({ coreValues: content.coreValues.map(x => (x.id === v.id ? { ...x, title: e.target.value } : x)) })
                      }
                    />
                    <Textarea
                      rows={2}
                      value={v.description}
                      placeholder="Description"
                      onChange={e =>
                        setContent({ coreValues: content.coreValues.map(x => (x.id === v.id ? { ...x, description: e.target.value } : x)) })
                      }
                    />
                  </Card>
                ))}
              </CollapseBlock>

              <CollapseBlock label="Certifications">
                <AddBtn
                  label="cert"
                  onClick={() =>
                    setContent({
                      certifications: [...content.certifications, { id: UID("cert"), label: "Certification", sub: "Details" }],
                    })
                  }
                />
                {content.certifications.map(c => (
                  <Card key={c.id} onRemove={() => setContent({ certifications: content.certifications.filter(x => x.id !== c.id) })}>
                    <Input
                      value={c.label}
                      placeholder="Label"
                      onChange={e =>
                        setContent({ certifications: content.certifications.map(x => (x.id === c.id ? { ...x, label: e.target.value } : x)) })
                      }
                    />
                    <Input
                      value={c.sub}
                      placeholder="Sub"
                      onChange={e =>
                        setContent({ certifications: content.certifications.map(x => (x.id === c.id ? { ...x, sub: e.target.value } : x)) })
                      }
                    />
                  </Card>
                ))}
              </CollapseBlock>
            </AccordionContent>
          </AccordionItem>

          {/* === SERVICES PAGE META === */}
          <AccordionItem value="services-page">
            <AccordionTrigger className="text-sm font-semibold">Services page copy</AccordionTrigger>
            <AccordionContent className="space-y-3">
              <TextAreaField
                label="Services page intro"
                rows={3}
                value={content.servicesPageIntro}
                onChange={v => setContent({ servicesPageIntro: v })}
              />

              <CollapseBlock label="Commercial fit-out cards">
                <AddBtn
                  label="card"
                  onClick={() =>
                    setContent({
                      commercialFitoutCards: [
                        ...content.commercialFitoutCards,
                        { id: UID("card"), title: "New card", description: "Description.", icon: "Zap" as const },
                      ],
                    })
                  }
                />
                {content.commercialFitoutCards.map(c => (
                  <Card key={c.id} onRemove={() => setContent({ commercialFitoutCards: content.commercialFitoutCards.filter(x => x.id !== c.id) })}>
                    <Input
                      value={c.title}
                      placeholder="Title"
                      onChange={e =>
                        setContent({
                          commercialFitoutCards: content.commercialFitoutCards.map(x => (x.id === c.id ? { ...x, title: e.target.value } : x)),
                        })
                      }
                    />
                    <Textarea
                      rows={2}
                      value={c.description}
                      placeholder="Description"
                      onChange={e =>
                        setContent({
                          commercialFitoutCards: content.commercialFitoutCards.map(x => (x.id === c.id ? { ...x, description: e.target.value } : x)),
                        })
                      }
                    />
                  </Card>
                ))}
              </CollapseBlock>
            </AccordionContent>
          </AccordionItem>

          {/* === FAQ === */}
          <AccordionItem value="faq">
            <AccordionTrigger className="text-sm font-semibold">FAQ</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <p className="text-[11px] text-muted-foreground">Editing these switches the FAQ page to a single flat list (replaces tabbed categories).</p>
              <AddBtn
                label="FAQ item"
                onClick={() =>
                  setContent({
                    faqItems: [...content.faqItems, { question: "New question?", answer: "Answer here." }],
                  })
                }
              />
              {content.faqItems.map((f, i) => (
                <Card key={i} onRemove={() => setContent({ faqItems: content.faqItems.filter((_, idx) => idx !== i) })}>
                  <Input
                    value={f.question}
                    placeholder="Question"
                    onChange={e =>
                      setContent({
                        faqItems: content.faqItems.map((x, idx) => (idx === i ? { ...x, question: e.target.value } : x)),
                      })
                    }
                  />
                  <Textarea
                    rows={3}
                    value={f.answer}
                    placeholder="Answer"
                    onChange={e =>
                      setContent({
                        faqItems: content.faqItems.map((x, idx) => (idx === i ? { ...x, answer: e.target.value } : x)),
                      })
                    }
                  />
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* === NAV + FOOTER === */}
          <AccordionItem value="nav-footer">
            <AccordionTrigger className="text-sm font-semibold">Nav & footer</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <CollapseBlock label="Nav links (header)">
                <AddBtn
                  label="link"
                  onClick={() => setContent({ navLinks: [...content.navLinks, { label: "New", path: "/new" }] })}
                />
                {content.navLinks.map((l, i) => (
                  <Card key={i} onRemove={() => setContent({ navLinks: content.navLinks.filter((_, idx) => idx !== i) })}>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={l.label}
                        placeholder="Label"
                        onChange={e =>
                          setContent({
                            navLinks: content.navLinks.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)),
                          })
                        }
                      />
                      <Input
                        value={l.path}
                        placeholder="/path"
                        onChange={e =>
                          setContent({
                            navLinks: content.navLinks.map((x, idx) => (idx === i ? { ...x, path: e.target.value } : x)),
                          })
                        }
                      />
                    </div>
                  </Card>
                ))}
              </CollapseBlock>

              <CollapseBlock label="Footer services column">
                <AddBtn
                  label="link"
                  onClick={() =>
                    setContent({ footerServiceLinks: [...content.footerServiceLinks, { label: "New", to: "/services" }] })
                  }
                />
                {content.footerServiceLinks.map((l, i) => (
                  <Card key={i} onRemove={() => setContent({ footerServiceLinks: content.footerServiceLinks.filter((_, idx) => idx !== i) })}>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={l.label}
                        placeholder="Label"
                        onChange={e =>
                          setContent({
                            footerServiceLinks: content.footerServiceLinks.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)),
                          })
                        }
                      />
                      <Input
                        value={l.to}
                        placeholder="/path"
                        onChange={e =>
                          setContent({
                            footerServiceLinks: content.footerServiceLinks.map((x, idx) => (idx === i ? { ...x, to: e.target.value } : x)),
                          })
                        }
                      />
                    </div>
                  </Card>
                ))}
              </CollapseBlock>

              <CollapseBlock label="Footer company column">
                <AddBtn
                  label="link"
                  onClick={() =>
                    setContent({ footerCompanyLinks: [...content.footerCompanyLinks, { label: "New", to: "/about" }] })
                  }
                />
                {content.footerCompanyLinks.map((l, i) => (
                  <Card key={i} onRemove={() => setContent({ footerCompanyLinks: content.footerCompanyLinks.filter((_, idx) => idx !== i) })}>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={l.label}
                        placeholder="Label"
                        onChange={e =>
                          setContent({
                            footerCompanyLinks: content.footerCompanyLinks.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)),
                          })
                        }
                      />
                      <Input
                        value={l.to}
                        placeholder="/path"
                        onChange={e =>
                          setContent({
                            footerCompanyLinks: content.footerCompanyLinks.map((x, idx) => (idx === i ? { ...x, to: e.target.value } : x)),
                          })
                        }
                      />
                    </div>
                  </Card>
                ))}
              </CollapseBlock>
            </AccordionContent>
          </AccordionItem>

          {/* === PAGE VISIBILITY === */}
          <AccordionItem value="visibility">
            <AccordionTrigger className="text-sm font-semibold">Section visibility</AccordionTrigger>
            <AccordionContent className="space-y-1.5">
              {Object.entries(content.sectionVisibility).map(([key, visible]) => (
                <label
                  key={key}
                  className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-xs cursor-pointer hover:bg-muted/50"
                >
                  <span className="font-medium font-mono">{key}</span>
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={e =>
                      setContent({
                        sectionVisibility: { ...content.sectionVisibility, [key]: e.target.checked },
                      })
                    }
                  />
                </label>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* DANGER ZONE */}
      <section className="space-y-2 pt-2 border-t border-border">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-destructive">Danger zone</h3>
        <p className="text-xs text-muted-foreground">
          Wipes every customization for this client (branding, colors, logo, and all content) and
          restores the original template defaults. This can't be undone.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="w-full">
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Reset everything to defaults
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset this client's entire draft?</AlertDialogTitle>
              <AlertDialogDescription>
                Every customization — logo, favicon, colors, company info, hero, sections,
                services, projects, team, FAQ, nav, footer, everything — will be restored to
                the original template defaults. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onChange(() => DEFAULT_DRAFT_STATE);
                  toast.success("Draft reset to template defaults");
                }}
              >
                Yes, reset everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  );
};

/* === Building blocks === */

const TextField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium">{label}</Label>
    <Input value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

const TextAreaField = ({
  label,
  rows = 2,
  value,
  onChange,
}: {
  label: string;
  rows?: number;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium">{label}</Label>
    <Textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

const AddBtn = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <Button variant="outline" size="sm" className="w-full" onClick={onClick}>
    <Plus className="h-3.5 w-3.5 mr-1" /> Add {label}
  </Button>
);

const CollapseBlock = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <details className="rounded-md border border-border/70 bg-muted/20 open:bg-muted/30">
    <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-foreground/80 hover:text-foreground">
      {label}
    </summary>
    <div className="px-3 pb-3 pt-1 space-y-2">{children}</div>
  </details>
);

const Card = ({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) => (
  <div className="rounded-md border p-2.5 space-y-2 bg-card">
    {children}
    <button
      type="button"
      onClick={onRemove}
      className="text-xs text-destructive inline-flex items-center gap-1 hover:underline"
    >
      <Trash2 className="h-3 w-3" />
      Remove
    </button>
  </div>
);

const ColorField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-2">
    <Label className="text-xs font-medium">{label}</Label>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-9 w-12 rounded cursor-pointer border"
      />
      <Input value={value} onChange={e => onChange(e.target.value)} className="font-mono text-xs" />
    </div>
  </div>
);

const AssetDropzone = ({
  label,
  previewSrc,
  previewClass,
  onFile,
  onRemove,
}: {
  label: string;
  previewSrc: string | null | undefined;
  previewClass: string;
  onFile: (file: File) => void;
  onRemove: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) onFile(file);
        }}
        className="border-2 border-dashed rounded-md p-2.5 text-center cursor-pointer hover:border-primary/50 transition-colors"
      >
        {previewSrc ? (
          <div className="flex flex-col items-center gap-1.5">
            <img src={previewSrc} alt="" className={previewClass} />
            <span className="text-[10px] text-muted-foreground">Click to replace</span>
          </div>
        ) : (
          <div className="py-3 space-y-1">
            <Upload className="h-5 w-5 mx-auto text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Click or drop an image</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {previewSrc && (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-[11px] text-muted-foreground hover:text-destructive"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default EditorPanel;
