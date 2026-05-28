import { useEffect, useState } from "react";
import { getTemplateByChirpsSlug } from "@/lib/templates";
import { parseChirpsTemplateSlug } from "@/lib/chirpsConfig";
import { loadTemplateShowcase, type TemplateShowcaseModule } from "@/lib/templateShowcase/registry";

const ShowcaseRoot = () => {
  const slug = parseChirpsTemplateSlug(window.location.pathname);
  const [Showcase, setShowcase] = useState<TemplateShowcaseModule | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Missing template slug in URL.");
      return;
    }
    if (!getTemplateByChirpsSlug(slug)) {
      setError(`Unknown template "${slug}".`);
      return;
    }
    let active = true;
    loadTemplateShowcase(slug)
      .then(mod => {
        if (!active) return;
        if (!mod) setError(`Showcase not available for "${slug}".`);
        else setShowcase(() => mod);
      })
      .catch(() => {
        if (active) setError("Could not load template showcase.");
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 text-center">
        <div className="max-w-md space-y-2">
          <h1 className="text-xl font-semibold text-neutral-950">Template not found</h1>
          <p className="text-sm text-neutral-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!Showcase || !slug) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-700" />
      </div>
    );
  }

  return <Showcase chirpsSlug={slug} />;
};

export default ShowcaseRoot;
