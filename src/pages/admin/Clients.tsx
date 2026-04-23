import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, Pencil, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
              description="Create a draft website for a new client."
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
                  <th className="text-left font-medium px-4 py-2.5 hidden md:table-cell">Contact</th>
                  <th className="text-left font-medium px-4 py-2.5 hidden lg:table-cell">Updated</th>
                  <th className="text-right font-medium px-4 py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(c => (
                  <tr key={c.id} className="border-t hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <Link to={`/admin/clients/${c.id}`} className="font-medium hover:underline inline-flex items-center gap-1.5">
                        {c.name}
                        <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                      </Link>
                      {c.notes && <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{c.notes}</div>}
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editing && (
          <Dialog open onOpenChange={open => !open && setEditing(null)}>
            <ClientDialog
              title="Edit client"
              description="Update this client's name and contact details."
              initial={editing}
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
}

const ClientDialog = ({
  title,
  description,
  initial,
  onSubmit,
}: {
  title: string;
  description: string;
  initial?: Partial<Client>;
  onSubmit: (input: ClientInput) => Promise<void>;
}) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.contact_email ?? "");
  const [phone, setPhone] = useState(initial?.contact_phone ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
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
    });
    setSubmitting(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
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
