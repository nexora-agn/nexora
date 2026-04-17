import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CloudOff,
  ExternalLink,
  Loader2,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminShell from "./AdminShell";
import { useClientDraft } from "@/hooks/useClientDraft";
import type { Client } from "@/lib/supabase";
import { getClient } from "@/lib/clients";
import EditorPanel from "./EditorPanel";
import { ExportButton } from "./ExportButton";

type Viewport = "desktop" | "tablet" | "mobile";

const viewports: Record<Viewport, { label: string; width: string; icon: React.ReactNode }> = {
  desktop: { label: "Desktop", width: "100%", icon: <Monitor className="h-4 w-4" /> },
  tablet: { label: "Tablet", width: "820px", icon: <Tablet className="h-4 w-4" /> },
  mobile: { label: "Mobile", width: "390px", icon: <Smartphone className="h-4 w-4" /> },
};

const SaveIndicator = ({ status }: { status: "idle" | "saving" | "saved" | "error" }) => {
  if (status === "saving")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Saving…
      </span>
    );
  if (status === "saved")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600">
        <Check className="h-3.5 w-3.5" />
        Saved
      </span>
    );
  if (status === "error")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-destructive">
        <CloudOff className="h-3.5 w-3.5" />
        Save failed
      </span>
    );
  return null;
};

const ClientEditor = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const draft = useClientDraft(id);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [viewport, setViewport] = useState<Viewport>("desktop");

  useEffect(() => {
    document.title = client ? `${client.name} — editor — Webready` : "Client editor — Webready";
  }, [client]);

  useEffect(() => {
    if (!id) return;
    let active = true;
    getClient(id)
      .then(c => {
        if (!active) return;
        if (!c) setClientError("Client not found");
        else setClient(c);
      })
      .catch(err => {
        if (active) setClientError(err instanceof Error ? err.message : "Failed to load client");
      });
    return () => {
      active = false;
    };
  }, [id]);

  const previewSrc = useMemo(() => (id ? `/preview.html?c=${id}` : undefined), [id]);

  const reloadIframe = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  }, []);

  const openPreviewTab = useCallback(() => {
    if (previewSrc) window.open(previewSrc, "_blank", "noopener");
  }, [previewSrc]);

  if (clientError) {
    return (
      <AdminShell>
        <div className="max-w-md mx-auto p-8 text-center space-y-3">
          <h1 className="text-xl font-bold">{clientError}</h1>
          <Button asChild variant="outline">
            <Link to="/admin/clients">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back to clients
            </Link>
          </Button>
        </div>
      </AdminShell>
    );
  }

  if (!client) {
    return (
      <AdminShell>
        <div className="max-w-md mx-auto p-8 text-center text-sm text-muted-foreground">Loading client…</div>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      rightSlot={
        <div className="hidden md:flex items-center gap-3 border-r pr-3 mr-1">
          <SaveIndicator status={draft.status} />
        </div>
      }
    >
      <div className="h-[calc(100vh-3.5rem)] flex flex-col lg:flex-row">
        {/* LEFT: controls */}
        <aside className="w-full lg:w-[380px] lg:border-r border-b lg:border-b-0 flex flex-col min-h-0">
          <div className="border-b px-4 py-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <Link
                to="/admin/clients"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Clients
              </Link>
              <h2 className="font-semibold text-sm truncate">{client.name}</h2>
            </div>
            <div className="lg:hidden">
              <SaveIndicator status={draft.status} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {draft.loading ? (
              <div className="p-6 text-sm text-muted-foreground">Loading draft…</div>
            ) : (
              <EditorPanel
                state={draft.state}
                onChange={draft.setState}
                clientId={client.id}
              />
            )}
          </div>

          <div className="border-t p-3 flex items-center gap-2">
            <ExportButton clientId={client.id} clientName={client.name} onBeforeExport={draft.flush} />
          </div>
        </aside>

        {/* RIGHT: preview */}
        <div className="flex-1 flex flex-col bg-muted/30 min-h-[500px]">
          <div className="flex items-center gap-2 border-b px-4 py-2 bg-card">
            <div className="inline-flex rounded-md border overflow-hidden text-xs">
              {(Object.keys(viewports) as Viewport[]).map(vp => (
                <button
                  key={vp}
                  type="button"
                  onClick={() => setViewport(vp)}
                  className={`px-2.5 py-1.5 inline-flex items-center gap-1.5 ${
                    viewport === vp ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={viewports[vp].label}
                >
                  {viewports[vp].icon}
                  <span className="hidden sm:inline">{viewports[vp].label}</span>
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={reloadIframe} aria-label="Reload preview">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={openPreviewTab}>
                <ExternalLink className="h-4 w-4 mr-1.5" />
                Open in new tab
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 flex items-start justify-center">
            <div
              className="bg-background shadow-xl border rounded-md transition-all overflow-hidden"
              style={{ width: viewports[viewport].width, maxWidth: "100%", minHeight: "100%" }}
            >
              {previewSrc && (
                <iframe
                  ref={iframeRef}
                  title="Website preview"
                  src={previewSrc}
                  className="w-full h-full min-h-[calc(100vh-7rem)] border-0"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
};

export default ClientEditor;
