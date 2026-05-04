import { useCallback, useEffect, useMemo, useState, type DragEvent } from "react";
import { LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import AdminShell from "./AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { listProjectRequests, updateProjectRequestStatus } from "@/lib/projectRequests";
import {
  type ProjectRequest,
  type ProjectRequestStatus,
  isPackageOnboardingPayload,
} from "@/lib/supabase";
import { onboardingTimelineLabel, PREFERRED_FEATURE_OPTIONS } from "@/lib/projectOnboardingConstants";
import { planLabelById } from "@/lib/pricingPlans";
import { createPayseraPaymentLink } from "@/lib/createPayseraPaymentLink";
import { fetchPayseraPaymentMethods } from "@/lib/fetchPayseraPaymentMethods";
import { supabase } from "@/lib/supabase";
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

/** RadioGroup value meaning “do not pass payment_details.key”. */
const PAYSERA_METHOD_ANY = "__paysera_any__";

function cardTitle(req: ProjectRequest): string {
  if (isPackageOnboardingPayload(req.payload)) {
    return req.payload.contact_email?.trim() || "Package request";
  }
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

  if (isPackageOnboardingPayload(req.payload)) {
    const pkg = req.payload;
    const payLabel = (v: string) =>
      v === "card" ? "Card (legacy)" : v === "stripe" ? "Card (Stripe)" : v === "paysera" ? "Paysera" : "PayPal";

    const logoNote = `Uploaded: ${pkg.logo_file_name}${pkg.logo_mime_type ? ` (${pkg.logo_mime_type})` : ""} — raster data in payload`;

    return [
      { label: "Form version", value: "Package onboarding (v2)" },
      {
        label: "Path",
        value: req.request_type === "new_website" ? "New website" : "Site migration",
      },
      { label: "Work email", value: pkg.contact_email },
      { label: "Logo", value: logoNote },
      { label: "Brand colors", value: pkg.brand_colors },
      { label: "Current website", value: pkg.current_website.trim() || "N/A" },
      { label: "Domain & hosting", value: pkg.domain_hosting_info },
      { label: "Content / site copy", value: pkg.content_text },
      { label: "Additional notes", value: pkg.additional_notes.trim() || "N/A" },
      { label: "Plan", value: planLabelById(pkg.selected_plan) },
      { label: "Payment option", value: payLabel(pkg.payment_preference) },
    ];
  }

  const lines: { label: string; value: string }[] = [];

  const cell = (label: string, value: string) => {
    lines.push({ label, value: value.trim() ? value : "N/A" });
  };

  const payLabel = (v: unknown) => {
    if (v === "card" || v === "paypal" || v === "stripe" || v === "paysera") {
      if (v === "card") return "Card (legacy)";
      if (v === "stripe") return "Card (Stripe)";
      if (v === "paysera") return "Paysera";
      return "PayPal";
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
  const [payseraBusyId, setPayseraBusyId] = useState<string | null>(null);
  const [payseraMethodsBusy, setPayseraMethodsBusy] = useState(false);
  const [payseraMethodsError, setPayseraMethodsError] = useState<string | null>(null);
  const [payseraMethodItems, setPayseraMethodItems] = useState<
    { key: string; title: string; type: string; flow: string }[] | null
  >(null);
  const [payseraMethodKey, setPayseraMethodKey] = useState(PAYSERA_METHOD_ANY);
  const [payseraFilterAmount, setPayseraFilterAmount] = useState("");
  const [payseraFilterCurrency, setPayseraFilterCurrency] = useState("EUR");

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

  useEffect(() => {
    setPayseraMethodKey(PAYSERA_METHOD_ANY);
    setPayseraMethodsError(null);
  }, [detail?.id]);

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

  const reloadPayseraMethods = async () => {
    setPayseraMethodsBusy(true);
    setPayseraMethodsError(null);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const amtRaw = payseraFilterAmount.trim();
      const amountNum = amtRaw === "" ? undefined : Number.parseInt(amtRaw, 10);
      const filters =
        amountNum != null &&
        Number.isFinite(amountNum) &&
        amountNum >= 1 &&
        payseraFilterCurrency.trim().length === 3
          ? { amount: amountNum, currency: payseraFilterCurrency.trim().toUpperCase() }
          : undefined;
      const result = await fetchPayseraPaymentMethods(token, filters);
      if (result.ok === true) {
        setPayseraMethodItems(
          result.items.map(i => ({ key: i.key, title: i.title, type: i.type, flow: i.flow })),
        );
      } else {
        setPayseraMethodsError(result.error ?? "Could not load methods.");
        setPayseraMethodItems(null);
      }
    } finally {
      setPayseraMethodsBusy(false);
    }
  };

  const openPayseraCheckout = async (req: ProjectRequest) => {
    setPayseraBusyId(req.id);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const key =
        payseraMethodKey === PAYSERA_METHOD_ANY ? "" : payseraMethodKey.trim();
      const result = await createPayseraPaymentLink(token, {
        projectRequestId: req.id,
        ...(key ? { payment_details: { key } } : {}),
      });
      if (result.ok !== true) {
        toast.error(result.error ?? "Could not create Paysera payment link.");
        return;
      }
      window.open(result.payment_URL, "_blank", "noopener,noreferrer");
      toast.success("Paysera checkout opened in a new tab.");
    } finally {
      setPayseraBusyId(null);
    }
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
              <div className="rounded-lg border border-border/70 bg-muted/15 px-3 py-3 space-y-3">
                <p className="text-xs font-medium text-foreground">Paysera checkout</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Creates a Paysera payment link using this request&apos;s UUID as <code className="text-foreground">order_id</code> and fills
                  payer details from the submission. Configure{" "}
                  <code className="text-foreground">PAYSERA_ACCESS_TOKEN</code> and optionally{" "}
                  <code className="text-foreground">PAYSERA_PAYMENT_AMOUNT_MINOR</code> on the server.
                </p>
                <div className="space-y-2 rounded-md border border-border/60 bg-background/40 p-3">
                  <p className="text-[11px] font-medium text-foreground">Payment methods (Paysera API)</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Leave amount empty to list all methods. With both amount (minor units) and currency, results are filtered per Paysera limits.
                  </p>
                  <div className="flex flex-wrap items-end gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="paysera-amt" className="text-[10px] text-muted-foreground">
                        Amount (minor)
                      </Label>
                      <Input
                        id="paysera-amt"
                        className="h-8 w-[7.5rem] text-xs"
                        inputMode="numeric"
                        placeholder="e.g. 2500"
                        value={payseraFilterAmount}
                        onChange={e => setPayseraFilterAmount(e.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="paysera-cur" className="text-[10px] text-muted-foreground">
                        Currency
                      </Label>
                      <Input
                        id="paysera-cur"
                        className="h-8 w-[4.5rem] text-xs uppercase"
                        maxLength={3}
                        placeholder="EUR"
                        value={payseraFilterCurrency}
                        onChange={e => setPayseraFilterCurrency(e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3))}
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8"
                      disabled={payseraMethodsBusy}
                      onClick={() => void reloadPayseraMethods()}
                    >
                      {payseraMethodsBusy ? "Loading…" : "Load methods"}
                    </Button>
                  </div>
                  {payseraMethodsError && (
                    <p className="text-[11px] text-destructive">{payseraMethodsError}</p>
                  )}
                  {payseraMethodItems && payseraMethodItems.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <p className="text-[10px] font-medium text-muted-foreground">Pre-select method (optional)</p>
                      <ScrollArea className="h-[200px] w-full rounded-md border border-border/60 bg-muted/20 pr-2">
                        <RadioGroup
                          value={payseraMethodKey}
                          onValueChange={setPayseraMethodKey}
                          className="gap-0 p-2"
                        >
                          <label
                            htmlFor="paysera-method-any"
                            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-muted/50"
                          >
                            <RadioGroupItem
                              value={PAYSERA_METHOD_ANY}
                              id="paysera-method-any"
                              className="shrink-0"
                            />
                            <span className="text-muted-foreground">No pre-selection (customer chooses)</span>
                          </label>
                          {payseraMethodItems.map((m, mi) => (
                            <label
                              key={m.key}
                              htmlFor={`paysera-m-${mi}`}
                              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-muted/50"
                            >
                              <RadioGroupItem value={m.key} id={`paysera-m-${mi}`} className="shrink-0" />
                              <span className="min-w-0 flex-1">
                                <span className="font-medium text-foreground">{m.title}</span>
                                <span className="text-muted-foreground">
                                  {" "}
                                  · {m.type} · {m.flow}
                                </span>
                              </span>
                            </label>
                          ))}
                        </RadioGroup>
                      </ScrollArea>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  disabled={payseraBusyId === detail.id}
                  onClick={() => void openPayseraCheckout(detail)}
                >
                  {payseraBusyId === detail.id ? "Creating link…" : "Open Paysera payment link"}
                </Button>
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
