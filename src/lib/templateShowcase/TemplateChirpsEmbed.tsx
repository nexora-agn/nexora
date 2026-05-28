import ChirpsEmbed from "@/components/ChirpsEmbed";
import { getChirpsAssistantIdForSlug } from "@/lib/chirpsConfig";

/** Chirps widget for public `/templates/{slug}` pages (must render inside BrowserRouter). */
export function TemplateChirpsEmbed({ chirpsSlug }: { chirpsSlug: string }) {
  const assistantId = getChirpsAssistantIdForSlug(chirpsSlug);
  if (!assistantId) return null;
  return <ChirpsEmbed assistantId={assistantId} />;
}
