import { useCallback, useEffect, useMemo, useState, type DragEvent } from "react";
import { LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import AdminShell from "./AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { listProjectRequests, updateProjectRequestStatus } from "@/lib/projectRequests";
import type { ProjectRequest, ProjectRequestStatus } from "@/lib/supabase";
import { PREFERRED_FEATURE_OPTIONS } from "@/lib/projectOnboardingConstants";
import { cn } from "@/lib/utils";

const COLUMNS: { status: ProjectRequestStatus; title: string; description: string }[] = [
  { status: "new", title: "New", description: "Just in—needs triage" },
  { status: "in_progress", title: "In progress", description: "Actively being worked" },
  { status: "completed", title: "Completed", description: "Wrapped up" },
];

const DND_MIME = "application/x-nexora-project-request";

const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const typeLabel = (t: ProjectRequest["request_type"]) => (t === "new_website" ? "New website" : "Migration");

const featureLabel = (id: string) => PREFERRED_FEATURE_OPTIONS.find(f => f.id === id)?.label ?? id;

function cardTitle(req: ProjectRequest): string {
  const p = req.payload as Record<string, unknown>;
  if (req.request_type === "new_website") {
    const name = p.business_name;
    if (typeof name === "string" && name.trim()) return name.trim();
  } else {
    const url = p.website_url;
    if (typeof url === "string" && url.trim()) return url.trim();
  }
  const email = p.contact_email;
  if (typeof email === "string" && email.trim()) return email.trim();
  return "Project request";
}

function formatPayloadLines(req: ProjectRequest): { label: string; value: string }[] {
  const p = req.payload as Record<string, unknown>;
  const lines: { label: string; value: string }[] = [];

  const push = (label: string, value: unknown) => {
    if (value === undefined || value === null || value === "") return;
    if (typeof value === "boolean") {
      lines.push({ label, value: value ? "Yes" : "No" });
      return;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) return;
      const mapped = value.map(v => (typeof v === "string" ? featureLabel(v) : String(v)));
      lines.push({ label, value: mapped.join(", ") });
      return;
    }
    lines.push({ label, value: String(value) });
  };

  push("Work email", p.contact_email);

  if (req.request_type === "new_website") {
    push("Business name", p.business_name);
    push("Industry", p.industry);
    push("ERP integration", p.erp_integration);
    push("AI chatbot", p.ai_chatbot);
    push("Preferred features", p.preferred_features);
    push("Additional notes", p.additional_notes);
  } else {
    push("Current website URL", p.website_url);
    push("ERP system", p.erp_system);
    push("ERP has API", p.erp_has_api);
    if (p.erp_has_api === false) push("Build API for you", p.build_api);
    push("AI chatbot", p.ai_chatbot);
    push("Migration requirements", p.migration_requirements);
    push("Additional notes", p.additional_notes);
  }

  return lines;
}

const ProjectRequests = () => {
  const [rows, setRows] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<ProjectRequest | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const next = await listProjectRequests();
      setRows(next);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "Project requests — Nexora admin";
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const byStatus = useMemo(() => {
    const map: Record<ProjectRequestStatus, ProjectRequest[]> = {
      new: [],
      in_progress: [],
      completed: [],
    };
    for (const r of rows) {
      map[r.status].push(r);
    }
    return map;
  }, [rows]);

  const move = async (id: string, status: ProjectRequestStatus) => {
    const prev = rows;
    setRows(curr => curr.map(r => (r.id === id ? { ...r, status } : r)));
    setDetail(d => (d?.id === id ? { ...d, status } : d));
    try {
      await updateProjectRequestStatus(id, status);
      toast.success("Updated status");
      const next = await listProjectRequests();
      setRows(next);
      setDetail(d => {
        if (!d || d.id !== id) return d;
        return next.find(r => r.id === id) ?? d;
      });
    } catch (err) {
      setRows(prev);
      setDetail(d => {
        if (!d || d.id !== id) return d;
        return prev.find(r => r.id === id) ?? d;
      });
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  const onDragStart = (e: DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.setData(DND_MIME, id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = () => setDraggingId(null);

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: DragEvent, status: ProjectRequestStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData(DND_MIME) || e.dataTransfer.getData("text/plain");
    setDraggingId(null);
    if (!id) return;
    const req = rows.find(r => r.id === id);
    if (!req || req.status === status) return;
    void move(id, status);
  };

  return (
    <AdminShell>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight inline-flex items-center gap-2">
            <LayoutGrid className="h-7 w-7 text-muted-foreground" aria-hidden />
            Project requests
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Inbound onboarding submissions. Drag cards between columns or open a card for full details.
          </p>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-lg border bg-card p-12 text-center text-sm text-muted-foreground">Loading…</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 items-start">
            {COLUMNS.map(col => (
              <section
                key={col.status}
                className="rounded-xl border bg-muted/20 min-h-[220px] flex flex-col"
                onDragOver={onDragOver}
                onDrop={e => onDrop(e, col.status)}
              >
                <header className="px-4 pt-4 pb-3 border-b border-border/60 bg-muted/30 rounded-t-xl">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-semibold text-sm">{col.title}</h2>
                    <Badge variant="secondary" className="tabular-nums">
                      {byStatus[col.status].length}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{col.description}</p>
                </header>
                <div className="p-3 flex flex-col gap-3 flex-1">
                  {byStatus[col.status].length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-8 px-2">Drop cards here</p>
                  ) : (
                    byStatus[col.status].map(req => (
                      <article
                        key={req.id}
                        draggable
                        onDragStart={e => onDragStart(e, req.id)}
                        onDragEnd={onDragEnd}
                        className={cn(
                          "rounded-lg border bg-card p-3 shadow-sm cursor-grab active:cursor-grabbing transition-opacity",
                          draggingId === req.id && "opacity-60",
                        )}
                        role="button"
                        tabIndex={0}
                        onClick={() => setDetail(req)}
                        onKeyDown={e => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setDetail(req);
                          }
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-snug line-clamp-2">{cardTitle(req)}</p>
                          <Badge variant="outline" className="shrink-0 text-[10px] uppercase tracking-wide">
                            {typeLabel(req.request_type)}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-2">{fmtDateTime(req.created_at)}</p>
                        <p className="text-[11px] text-muted-foreground capitalize mt-0.5">Status: {req.status.replace("_", " ")}</p>
                      </article>
                    ))
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!detail} onOpenChange={open => !open && setDetail(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{detail ? cardTitle(detail) : "Request"}</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-4 overflow-y-auto pr-1 text-sm">
              <div className="flex flex-wrap gap-2">
                <Badge>{typeLabel(detail.request_type)}</Badge>
                <Badge variant="secondary" className="capitalize">
                  {detail.status.replace("_", " ")}
                </Badge>
              </div>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Submitted</dt>
                  <dd className="mt-0.5">{fmtDateTime(detail.created_at)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Last updated</dt>
                  <dd className="mt-0.5">{fmtDateTime(detail.updated_at)}</dd>
                </div>
              </dl>
              <div className="rounded-lg border bg-muted/20 divide-y divide-border/80">
                {formatPayloadLines(detail).map(row => (
                  <div key={row.label} className="px-3 py-2.5 space-y-0.5">
                    <p className="text-xs font-medium text-muted-foreground">{row.label}</p>
                    <p className="text-sm whitespace-pre-wrap break-words">{row.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {COLUMNS.filter(c => c.status !== detail.status).map(c => (
                  <Button key={c.status} type="button" size="sm" variant="outline" onClick={() => void move(detail.id, c.status)}>
                    Move to {c.title}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
};

export default ProjectRequests;
