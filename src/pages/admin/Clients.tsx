import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, Pencil, ArrowRight, Check, Lock } from "lucide-react";
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
                      <Link
                        to={`/admin/clients/${c.id}`}
                        className="flex items-center gap-3 min-w-0 max-w-[220px] rounded-md -m-1 p-1 -ml-1 hover:bg-muted/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
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
                      </Link>
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
        showTemplatePicker &&
          "flex flex-col w-[calc(100vw-1rem)] max-w-[min(92vw,56rem)] max-h-[min(92dvh,920px)] gap-0 overflow-hidden p-0 sm:rounded-xl top-[max(0.5rem,env(safe-area-inset-top,0px))] translate-y-0 sm:top-[50%] sm:translate-y-[-50%]",
      )}
    >
      {showTemplatePicker ? (
        <div className="shrink-0 space-y-1 border-b bg-muted/30 px-4 py-4 pr-12 sm:px-6 sm:py-5">
          <DialogHeader className="space-y-1.5 text-left">
            <DialogTitle className="text-lg sm:text-xl tracking-tight">{title}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">{description}</DialogDescription>
          </DialogHeader>
        </div>
      ) : (
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      )}

      <form onSubmit={handleSubmit} className={cn("flex min-h-0 flex-1 flex-col", showTemplatePicker && "overflow-hidden")}>
        <div
          className={cn(
            "min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain",
            showTemplatePicker ? "px-4 py-4 sm:px-6 sm:py-5" : "space-y-5",
          )}
        >
          {showTemplatePicker && (
            <fieldset className="space-y-3">
              <legend className="sr-only">Website template</legend>
              <div className="flex flex-wrap items-end justify-between gap-2">
              <div className="space-y-0.5 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Website template
                </p>
                <p className="text-sm font-medium text-foreground">Starting layout</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tap a layout to select it. You can customize everything in the editor after saving.
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0 font-normal text-muted-foreground border-transparent">
                {TEMPLATES.filter(t => t.available).length} layouts
              </Badge>
              </div>

              <div
                role="listbox"
                aria-label="Website templates"
                className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3"
              >
                {TEMPLATES.map(t => {
                  const selected = templateId === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => t.available && setTemplateId(t.id)}
                      disabled={!t.available}
                      className={cn(
                        "group relative flex flex-col overflow-hidden rounded-lg border text-left outline-none transition-colors",
                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        "disabled:cursor-not-allowed disabled:opacity-60",
                        selected
                          ? "border-primary bg-primary/[0.06] ring-2 ring-primary/25"
                          : "border-border/80 bg-card hover:border-border hover:bg-muted/40",
                      )}
                    >
                      <div className="h-0.5 w-full shrink-0" style={{ backgroundColor: t.accent }} aria-hidden />
                      <div className="relative aspect-[5/3] overflow-hidden bg-muted">
                        <img
                          src={t.thumbnail}
                          alt=""
                          className={cn(
                            "h-full w-full object-cover",
                            !t.available && "grayscale-[40%]",
                            t.available && !selected && "group-hover:scale-[1.02] transition-transform duration-200",
                          )}
                          loading="lazy"
                        />
                        {selected && (
                          <div
                            className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                            aria-hidden
                          >
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </div>
                        )}
                        {!t.available && (
                          <Badge
                            variant="secondary"
                            className="absolute left-1.5 top-1.5 h-5 gap-0.5 border-border/80 bg-background/95 px-1.5 text-[9px] font-semibold uppercase backdrop-blur-sm"
                          >
                            <Lock className="h-2.5 w-2.5" aria-hidden />
                            Soon
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-0.5 p-2 sm:p-2.5">
                        <p className="text-xs font-semibold leading-tight text-foreground line-clamp-2 sm:text-sm">{t.name}</p>
                        <p className="hidden text-[11px] text-muted-foreground leading-snug line-clamp-2 sm:block">{t.tagline}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}
          <div className={cn(showTemplatePicker && "space-y-4 border-t pt-4")}>
            {showTemplatePicker && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Client details</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="client-name">Client name</Label>
              <Input
                id="client-name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={submitting}
                placeholder="Acme Construction"
                autoComplete="organization"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <Input
                  id="client-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone">Phone</Label>
                <Input
                  id="client-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  disabled={submitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-notes">Notes</Label>
              <Textarea
                id="client-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                disabled={submitting}
                rows={3}
                placeholder="Internal sales notes…"
                className="resize-none min-h-[4.5rem]"
              />
            </div>
          </div>
        </div>

        <DialogFooter
          className={cn(
            "shrink-0 gap-2 border-t bg-background px-4 py-3 sm:px-6 sm:py-4",
            showTemplatePicker && "mt-0 sm:flex-row sm:justify-end",
          )}
        >
          <Button type="submit" className="w-full sm:w-auto" disabled={submitting || !name.trim()}>
            {submitting ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AdminClients;
