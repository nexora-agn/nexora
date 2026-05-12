import { FormEvent, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { Plus, Trash2, Pencil, ArrowRight, LayoutTemplate, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import AdminShell from "./AdminShell";
import type { Client } from "@/lib/supabase";
import { createClient, deleteClient, listClients, updateClient } from "@/lib/clients";
import { TEMPLATES, DEFAULT_TEMPLATE_ID, getTemplate } from "@/lib/templates";
import { cn } from "@/lib/utils";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

const AdminClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);

  useEffect(() => {
    document.title = "Clients | Nexora admin";
  }, []);

  const reload = async () => {
    setLoading(true);
    try {
      const next = await listClients();
      setClients(next);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const onDelete = async (client: Client) => {
    if (!window.confirm(`Delete client "${client.name}"? This removes the draft and cannot be undone.`)) return;
    try {
      await deleteClient(client.id);
      toast.success(`Deleted ${client.name}`);
      await reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Each client has a saved draft of their website. Open one to customize it live during a call.
            </p>
          </div>

          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-1.5" />
                New client
              </Button>
            </DialogTrigger>
            <ClientDialog
              title="New client"
              description="Create a draft website for a new client. Pick a template to start from — you can keep customizing colors, copy, and content from the editor."
              showTemplatePicker
              onSubmit={async input => {
                try {
                  const next = await createClient(input);
                  toast.success(`Created ${next.name}`);
                  setCreateOpen(false);
                  await reload();
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Create failed");
                }
              }}
            />
          </Dialog>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-lg border bg-card p-12 text-center text-sm text-muted-foreground">
            Loading clients…
          </div>
        ) : clients.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center space-y-3">
            <h2 className="font-semibold">No clients yet</h2>
            <p className="text-sm text-muted-foreground">Create your first client to start customizing their website.</p>
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-1.5" />
              New client
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left font-medium px-4 py-2.5">Client</th>
                  <th className="text-left font-medium px-4 py-2.5 hidden sm:table-cell">Template</th>
                  <th className="text-left font-medium px-4 py-2.5 hidden md:table-cell">Contact</th>
                  <th className="text-left font-medium px-4 py-2.5 hidden lg:table-cell">Updated</th>
                  <th className="text-right font-medium px-4 py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(c => {
                  const tpl = getTemplate(c.template_id);
                  return (
                  <tr key={c.id} className="border-t hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <Link to={`/admin/clients/${c.id}`} className="font-medium hover:underline inline-flex items-center gap-1.5">
                        {c.name}
                        <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                      </Link>
                      {c.notes && <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{c.notes}</div>}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-3 min-w-0 max-w-[220px]">
                        <div
                          className="relative h-11 w-[4.75rem] shrink-0 overflow-hidden rounded-md border bg-muted shadow-sm"
                          aria-hidden
                        >
                          <img
                            src={tpl.thumbnail}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                          <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5"
                            style={{ backgroundColor: tpl.accent }}
                          />
                          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.06]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium leading-snug truncate">{tpl.name}</div>
                          <div className="text-[11px] text-muted-foreground leading-snug truncate">{tpl.tagline}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                      {c.contact_email || c.contact_phone || <span className="text-muted-foreground/60">N/A</span>}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{fmtDate(c.updated_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setEditing(c)} aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onDelete(c)} aria-label="Delete">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {editing && (
          <Dialog open onOpenChange={open => !open && setEditing(null)}>
            <ClientDialog
              title="Edit client"
              description="Update this client's name, contact details, or template."
              initial={editing}
              showTemplatePicker
              onSubmit={async input => {
                try {
                  await updateClient(editing.id, input);
                  toast.success("Client updated");
                  setEditing(null);
                  await reload();
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Update failed");
                }
              }}
            />
          </Dialog>
        )}
      </div>
    </AdminShell>
  );
};

interface ClientInput {
  name: string;
  contact_email?: string;
  contact_phone?: string;
  notes?: string;
  template_id?: string;
}

const ClientDialog = ({
  title,
  description,
  initial,
  showTemplatePicker = false,
  onSubmit,
}: {
  title: string;
  description: string;
  initial?: Partial<Client>;
  showTemplatePicker?: boolean;
  onSubmit: (input: ClientInput) => Promise<void>;
}) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.contact_email ?? "");
  const [phone, setPhone] = useState(initial?.contact_phone ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [templateId, setTemplateId] = useState<string>(initial?.template_id ?? DEFAULT_TEMPLATE_ID);
  const [submitting, setSubmitting] = useState(false);
  const [templateCarouselApi, setTemplateCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!templateCarouselApi) return;
    const i = TEMPLATES.findIndex(t => t.id === templateId);
    if (i >= 0) templateCarouselApi.scrollTo(i);
  }, [templateCarouselApi, templateId]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    await onSubmit({
      name: name.trim(),
      contact_email: email.trim() || undefined,
      contact_phone: phone.trim() || undefined,
      notes: notes.trim() || undefined,
      template_id: templateId,
    });
    setSubmitting(false);
  };

  return (
    <DialogContent
      className={cn(
        showTemplatePicker && "sm:max-w-[min(92vw,56rem)] max-h-[min(90vh,920px)] gap-0 overflow-y-auto p-0 sm:rounded-xl",
      )}
    >
      {showTemplatePicker ? (
        <div className="p-6 pb-5 space-y-1 border-b bg-muted/30">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-xl tracking-tight">{title}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">{description}</DialogDescription>
          </DialogHeader>
        </div>
      ) : (
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      )}

      <form onSubmit={handleSubmit} className={cn("space-y-5", showTemplatePicker && "p-6 pt-5")}>
        {showTemplatePicker && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Website template
                </p>
                <p className="text-sm font-medium text-foreground">Starting layout</p>
                <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                  Applies to this client only. Customize colors, copy, and modules in the editor after you save.
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0 w-fit font-normal text-muted-foreground border-transparent">
                {TEMPLATES.filter(t => t.available).length} of {TEMPLATES.length} selectable
              </Badge>
            </div>

            <div className="rounded-xl border bg-card/80 shadow-sm overflow-hidden">
              <div className="relative px-10 sm:px-11 py-3">
                <Carousel
                  setApi={setTemplateCarouselApi}
                  opts={{ align: "start", loop: false }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 sm:-ml-3">
                    {TEMPLATES.map(t => {
                      const selected = templateId === t.id;
                      return (
                        <CarouselItem
                          key={t.id}
                          className="pl-2 sm:pl-3 basis-full min-w-0 sm:basis-1/2 xl:basis-1/3"
                        >
                          <button
                            type="button"
                            onClick={() => t.available && setTemplateId(t.id)}
                            disabled={!t.available}
                            aria-pressed={selected}
                            aria-label={`${t.name}. ${t.tagline}.${selected ? " Selected." : ""}${!t.available ? " Unavailable." : ""}`}
                            className={cn(
                              "group relative flex h-full w-full flex-col text-left transition-colors outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                              "rounded-lg border border-border/80 shadow-sm",
                              "disabled:cursor-not-allowed disabled:opacity-[0.72]",
                              selected ? "bg-primary/[0.06] ring-1 ring-primary/20" : "bg-card hover:bg-muted/40",
                            )}
                          >
                            <div className="h-1 w-full shrink-0 rounded-t-[inherit]" style={{ backgroundColor: t.accent }} aria-hidden />

                            <div className="flex flex-1 flex-col p-3 sm:p-4 space-y-2.5">
                              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted shadow-inner ring-1 ring-black/[0.06]">
                                <img
                                  src={t.thumbnail}
                                  alt={`${t.name} preview`}
                                  className={cn(
                                    "absolute inset-0 h-full w-full object-cover transition-transform duration-300",
                                    !t.available && "grayscale-[35%]",
                                    t.available && !selected && "group-hover:scale-[1.02]",
                                  )}
                                  loading="lazy"
                                />
                                <div
                                  aria-hidden
                                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80"
                                />

                                {!t.available && (
                                  <div className="absolute left-3 top-3 flex items-center gap-1">
                                    <Badge
                                      variant="secondary"
                                      className="h-6 gap-1 border-border/80 bg-background/95 px-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground backdrop-blur-sm shadow-sm"
                                    >
                                      <Lock className="h-3 w-3" aria-hidden />
                                      Soon
                                    </Badge>
                                  </div>
                                )}
                              </div>

                              <div className="space-y-1.5 min-h-[4.75rem] flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-semibold text-[15px] leading-snug tracking-tight text-foreground">
                                    {t.name}
                                  </h4>
                                  <span
                                    aria-hidden
                                    className="mt-1 h-2 w-2 shrink-0 rounded-full ring-2 ring-background shadow-sm"
                                    style={{ backgroundColor: t.accent }}
                                  />
                                </div>
                                <p className="text-xs font-medium text-muted-foreground leading-snug">{t.tagline}</p>
                                <p className="text-[11px] text-muted-foreground/95 leading-relaxed line-clamp-2">
                                  {t.description}
                                </p>
                                {t.features.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                                    {t.features.slice(0, 2).map(f => (
                                      <Badge
                                        key={f}
                                        variant="outline"
                                        className="h-5 border-border/70 px-2 text-[10px] font-normal text-muted-foreground hover:bg-transparent"
                                      >
                                        {f}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious
                    type="button"
                    className="left-1 size-8 border bg-background/95 shadow-sm disabled:opacity-40"
                  />
                  <CarouselNext
                    type="button"
                    className="right-1 size-8 border bg-background/95 shadow-sm disabled:opacity-40"
                  />
                </Carousel>
              </div>

              <div className="flex gap-2.5 border-t border-border/80 bg-muted/25 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
                <LayoutTemplate className="h-4 w-4 shrink-0 text-muted-foreground/80 mt-0.5" aria-hidden />
                <span>
                  Use the arrows or swipe sideways to compare layouts. Each includes a live preview and ZIP export; new presets appear here as they ship.
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="client-name">Client name</Label>
          <Input id="client-name" required value={name} onChange={e => setName(e.target.value)} disabled={submitting} placeholder="Acme Construction" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="client-email">Email</Label>
            <Input id="client-email" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={submitting} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-phone">Phone</Label>
            <Input id="client-phone" value={phone} onChange={e => setPhone(e.target.value)} disabled={submitting} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="client-notes">Notes</Label>
          <Textarea id="client-notes" value={notes} onChange={e => setNotes(e.target.value)} disabled={submitting} rows={3} placeholder="Internal sales notes…" />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={submitting || !name.trim()}>
            {submitting ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AdminClients;
