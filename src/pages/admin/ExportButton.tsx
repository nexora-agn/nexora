import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Props {
  clientId: string;
  clientName: string;
  onBeforeExport?: () => Promise<void> | void;
}

const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "website";

export const ExportButton = ({ clientId, clientName, onBeforeExport }: Props) => {
  const [busy, setBusy] = useState(false);

  const handle = async () => {
    setBusy(true);
    try {
      await onBeforeExport?.();

      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) throw new Error("Not signed in");

      const isLocalhost =
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const explicit = (import.meta.env.VITE_EXPORT_API_URL as string | undefined)?.trim();

      const endpoints = [
        // 1. explicit override (set in .env.production for e.g. Hostinger builds)
        explicit || null,
        // 2. local dev API
        isLocalhost ? "http://localhost:8787/api/export-site" : null,
        // 3. co-located serverless function (Vercel/Netlify deployment of this app)
        "/api/export-site",
      ].filter(Boolean) as string[];

      let response: Response | null = null;
      let lastError = "Export server unreachable";
      for (const url of endpoints) {
        try {
          const attempt = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ clientId }),
          });
          if (!attempt.ok) {
            const text = await attempt.text();
            lastError = text || `HTTP ${attempt.status}`;
            continue;
          }
          if (!(attempt.headers.get("content-type") ?? "").includes("application/zip")) {
            const text = await attempt.text();
            lastError = text || "Unexpected response";
            continue;
          }
          response = attempt;
          break;
        } catch (err) {
          lastError = err instanceof Error ? err.message : "Network error";
        }
      }

      if (!response) throw new Error(lastError);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slugify(clientName)}-website.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Website ZIP downloaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Export failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button className="w-full" onClick={handle} disabled={busy}>
      {busy ? (
        <>
          <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
          Preparing ZIP…
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-1.5" />
          Download client ZIP
        </>
      )}
    </Button>
  );
};
