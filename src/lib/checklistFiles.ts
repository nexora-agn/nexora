import { CHECKLIST_UPLOAD } from "@/data/clientChecklist";

export type ChecklistFilePayload = {
  fileName: string;
  mimeType: string;
  base64: string;
};

function stripDataUrl(dataUrl: string): { mimeType: string; base64: string } | null {
  const m = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl);
  if (!m) return null;
  return { mimeType: m[1].trim(), base64: m[2] };
}

export function readFileAsPayload(file: File): Promise<ChecklistFilePayload> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const parsed = stripDataUrl(result);
      if (!parsed) {
        reject(new Error(`Could not read ${file.name}`));
        return;
      }
      resolve({
        fileName: file.name.replace(/[^\w.\- ()]+/g, "_").slice(0, 120),
        mimeType: file.type || parsed.mimeType,
        base64: parsed.base64,
      });
    };
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

export function validateChecklistImage(
  file: File,
  maxBytes: number
): string | null {
  if (!CHECKLIST_UPLOAD.allowedMime.has(file.type) && !/\.(png|jpe?g|webp|svg|gif)$/i.test(file.name)) {
    return `${file.name}: use PNG, JPG, WEBP, or SVG.`;
  }
  if (file.size > maxBytes) {
    const mb = (maxBytes / (1024 * 1024)).toFixed(1);
    return `${file.name}: max ${mb} MB per file.`;
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
