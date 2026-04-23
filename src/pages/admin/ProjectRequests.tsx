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
import { onboardingTimelineLabel, PREFERRED_FEATURE_OPTIONS } from "@/lib/projectOnboardingConstants";
import { planLabelById } from "@/lib/pricingPlans";
import { cn } from "@/lib/utils";

const COLUMNS: { status: ProjectRequestStatus; title: string; description: string }[] = [
  { status: "new", title: "New", description: "Just in, needs triage" },
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
    const co = p.company;
    if (typeof co === "string" && co.trim()) return co.trim();
    const legacy = p.business_name;
    if (typeof legacy === "string" && legacy.trim()) return legacy.trim();
  } else {
    const url = p.website_url;
    if (typeof url === "string" && url.trim()) return url.trim();
  }
  const email = p.contact_email;
  if (typeof email === "string" && email.trim()) return email.trim();
  return "Project request";
}

function str(v: unknown): string {
  if (v === undefined || v === null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "bigint") return String(v);
  return "";
}

/** Show every field from the public onboarding payload, including empty values (as N/A), for the admin team. */
function formatPayloadLines(req: ProjectRequest): { label: string; value: string }[] {
  const p = req.payload as Record<string, unknown>;
  const lines: { label: string; value: string }[] = [];

  const cell = (label: string, value: string) => {
    lines.push({ label, value: value.trim() ? value : "N/A" });
  };

  const payLabel = (v: unknown) => {
    if (v === "card" || v === "paypal" || v === "stripe") {
      return v === "card" ? "Card (legacy)" : v === "stripe" ? "Card (Stripe)" : "PayPal";
    }
    return str(v) || "N/A";
  };

  // Shared contact & checkout (all submission types)
  cell("Full name", str(p.full_name));
  cell("Work email", str(p.contact_email));
  cell("Phone", str(p.contact_phone));
  const companyValue =
    str(p.company).trim() || str(p.business_name).trim();
  cell("Company", companyValue);
  {
    const t = str(p.timeline);
    cell("Timeline", t ? onboardingTimelineLabel(t) : "");
  }
  {
    const plan = str(p.selected_plan);
    cell("Plan", plan ? planLabelById(plan) : "");
  }
  cell("Payment preference", payLabel(p.payment_preference));

  if (req.request_type === "new_website") {
    cell("Industry", str(p.industry));
    {
      const erp = p.erp_integration;
      if (typeof erp === "boolean") {
        lines.push({ label: "ERP integration", value: erp ? "Yes" : "No" });
        if (erp) {
          cell("Current ERP system", str(p.current_erp_system));
        } else {
          cell("Current ERP system", "Not applicable");
        }
      } else {
        cell("ERP integration", "");
        cell("Current ERP system", "");
      }
    }
    {
      const ai = p.ai_chatbot;
      if (typeof ai === "boolean") {
        lines.push({ label: "AI chatbot", value: ai ? "Yes" : "No" });
        if (ai) {
          cell("Chatbot requirements", str(p.ai_chatbot_requirements));
        } else {
          cell("Chatbot requirements", "Not applicable");
        }
      } else {
        cell("AI chatbot", "");
        cell("Chatbot requirements", "");
      }
    }
    {
      const pf = p.preferred_features;
      if (Array.isArray(pf) && pf.length > 0) {
        const mapped = pf.map(x => (typeof x === "string" ? featureLabel(x) : String(x)));
        cell("Preferred features", mapped.join(", "));
      } else {
        cell("Preferred features", "");
      }
    }
    cell("Other preferred features", str(p.other_preferred_features));
    cell("Additional notes", str(p.additional_notes));
  } else {
    cell("Current website URL", str(p.website_url));
    cell("ERP system", str(p.erp_system));
    {
      const hasApi = p.erp_has_api;
      if (typeof hasApi === "boolean") {
        lines.push({ label: "ERP has API", value: hasApi ? "Yes" : "No" });
        if (hasApi === false) {
          const b = p.build_api;
          if (typeof b === "boolean") {
            lines.push({ label: "Build API for you", value: b ? "Yes" : "No" });
          } else {
            cell("Build API for you", "");
          }
        } else {
          cell("Build API for you", "Not applicable");
        }
      } else {
        cell("ERP has API", "");
        cell("Build API for you", "");
      }
    }
    {
      const ai = p.ai_chatbot;
      if (typeof ai === "boolean") {
        lines.push({ label: "AI chatbot", value: ai ? "Yes" : "No" });
        if (ai) {
          cell("Chatbot requirements", str(p.ai_chatbot_requirements));
        } else {
          cell("Chatbot requirements", "Not applicable");
        }
      } else {
        cell("AI chatbot", "");
        cell("Chatbot requirements", "");
      }
    }
    cell("Migration requirements", str(p.migration_requirements));
    cell("Additional notes", str(p.additional_notes));
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
    document.title = "Project requests | Nexora admin";
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
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
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
              <dl className="space-y-2">
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Request ID</dt>
                  <dd className="mt-0.5 font-mono text-xs break-all text-foreground">{detail.id}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Submitted</dt>
                  <dd className="mt-0.5">{fmtDateTime(detail.created_at)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Last updated</dt>
                  <dd className="mt-0.5">{fmtDateTime(detail.updated_at)}</dd>
                </div>
              </dl>
              <p className="text-xs text-muted-foreground">Full payload as submitted from the start-project flow (all fields below).</p>
              <div className="rounded-lg border bg-muted/20 divide-y divide-border/80">
                {formatPayloadLines(detail).map((row, i) => (
                  <div key={`${row.label}-${i}`} className="px-3 py-2.5 space-y-0.5">
                    <p className="text-xs font-medium text-muted-foreground">{row.label}</p>
                    <p className="text-sm whitespace-pre-wrap break-words">{row.value}</p>
                  </div>
                ))}
              </div>
              <details className="rounded-lg border border-border/60 bg-background/50 px-3 py-2 text-xs">
                <summary className="cursor-pointer font-medium text-muted-foreground">Raw JSON (payload)</summary>
                <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md bg-muted/40 p-2 font-mono text-[11px] leading-relaxed">
                  {JSON.stringify(detail.payload, null, 2)}
                </pre>
              </details>
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
