import { useTheme } from "@template-summit/contexts/ThemeContext";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";

const LoadingScreen = () => {
  const { faviconUrl, logoUrl } = useTheme();
  const { company } = useSiteContent();
  const displayName = company?.name || "Loading";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 z-[120] bg-background text-foreground flex items-center justify-center">
      <div className="relative w-full max-w-xl px-6 text-center">
        {faviconUrl || logoUrl ? (
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl overflow-hidden loading-logo-pulse">
            <img
              src={faviconUrl ?? logoUrl!}
              alt={displayName}
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-secondary text-secondary-foreground font-black text-3xl flex items-center justify-center shadow-2xl loading-logo-pulse">
            {initial}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{displayName.toUpperCase()}</h1>
        <p className="mt-3 text-sm md:text-base text-muted-foreground">
          Preparing your experience
        </p>

        <div className="mt-8 h-1.5 w-full max-w-[260px] mx-auto rounded-full bg-muted overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-secondary loading-progress" />
        </div>
        <div className="mt-3 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          Loading
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
