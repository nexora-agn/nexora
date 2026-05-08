import { useState, useCallback, useRef } from "react";
import { Settings, X, Upload, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const tabs = [
  { id: "services", label: "Services" },
  { id: "sections", label: "Service Sections" },
  { id: "team", label: "Team" },
  { id: "projects", label: "Projects" },
  { id: "visibility", label: "Page Sections" },
] as const;

const CustomizationPanel = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("services");
  const [exporting, setExporting] = useState(false);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const faviconInputRef = useRef<HTMLInputElement | null>(null);
  const {
    primaryColor,
    secondaryColor,
    logoUrl,
    faviconUrl,
    setPrimaryColor,
    setSecondaryColor,
    setLogoUrl,
    setFaviconUrl,
    resetTheme,
  } = useTheme();
  const {
    services,
    serviceSections,
    team,
    projects,
    addService,
    updateService,
    removeService,
    addServiceSection,
    updateServiceSection,
    removeServiceSection,
    addTeamMember,
    updateTeamMember,
    removeTeamMember,
    addProject,
    updateProject,
    removeProject,
    sectionVisibility,
    setSectionVisibility,
    resetContent,
  } = useSiteContent();

  const handleExportCode = useCallback(async () => {
    const payload = {
      theme: { primaryColor, secondaryColor, logoUrl, faviconUrl },
      content: { services, serviceSections, team, projects, sectionVisibility },
    };
    setExporting(true);
    try {
      const endpoints: string[] = [];
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        endpoints.push("http://localhost:8787/api/export-site");
      }
      endpoints.push("/api/export-site");

      let res: Response | null = null;
      let lastError = "Export endpoint unavailable";
      for (const endpoint of endpoints) {
        try {
          const attempt = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!attempt.ok) {
            const details = await attempt.text();
            lastError = details || `Export failed (${attempt.status})`;
            continue;
          }
          const type = attempt.headers.get("content-type") || "";
          if (!type.includes("application/zip")) {
            const details = await attempt.text();
            lastError = details || "Export did not return ZIP file";
            continue;
          }
          res = attempt;
          break;
        } catch (error) {
          lastError = error instanceof Error ? error.message : "Network error";
        }
      }

      if (!res) throw new Error(lastError);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "constructo-website-export.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Export failed";
      window.alert(`ZIP export failed: ${message}\n\nMake sure both servers are running:\n- npm run dev\n- npm run dev:api`);
    } finally {
      setExporting(false);
    }
  }, [primaryColor, secondaryColor, logoUrl, faviconUrl, services, serviceSections, team, projects, sectionVisibility]);

  const readAsDataUrl = useCallback((file: File, onLoaded: (src: string) => void) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onLoaded(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const pickImage = useCallback((onLoaded: (src: string) => void) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) readAsDataUrl(file, onLoaded);
    };
    input.click();
  }, [readAsDataUrl]);

  const AssetPicker = ({ previewSrc, onSet, onRemove }: { previewSrc: string; onSet: (src: string) => void; onRemove: () => void }) => (
    <div>
      <label className="text-xs font-medium text-muted-foreground block mb-1">Image</label>
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) readAsDataUrl(file, onSet);
        }}
        onClick={() => pickImage(onSet)}
        className="border-2 border-dashed border-border rounded-lg p-3 text-center cursor-pointer hover:border-primary transition-colors"
      >
        {previewSrc ? (
          <img src={previewSrc} alt="" className="h-20 w-full rounded object-cover" />
        ) : (
          <div className="space-y-1">
            <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Upload image</p>
          </div>
        )}
      </div>
      <button onClick={onRemove} className="mt-1 text-xs text-muted-foreground hover:text-destructive">
        Remove image
      </button>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-secondary text-secondary-foreground p-3 rounded-l-lg shadow-lg hover:pr-5 transition-all"
        aria-label="Open customization panel"
      >
        <Settings className="h-5 w-5" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-50 bg-foreground/50" onClick={() => setOpen(false)} />
          <aside className="fixed right-0 top-0 h-full w-80 z-50 bg-background shadow-2xl border-l overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold text-lg text-foreground">Customize</h2>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Logo</label>
                <div
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) readAsDataUrl(file, src => setLogoUrl(src));
                  }}
                  onClick={() => logoInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  {logoUrl ? (
                    <div className="space-y-2">
                      <img src={logoUrl} alt="Logo" className="h-12 mx-auto object-contain" />
                      <button onClick={e => { e.stopPropagation(); setLogoUrl(null); }} className="text-xs text-muted-foreground hover:text-destructive">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                      <p className="text-xs text-muted-foreground">PNG or SVG</p>
                    </div>
                  )}
                  <Input ref={logoInputRef} type="file" accept=".png,.svg,image/png,image/svg+xml" className="hidden" onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) readAsDataUrl(file, src => setLogoUrl(src));
                  }} />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Favicon</label>
                <div
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) readAsDataUrl(file, src => setFaviconUrl(src));
                  }}
                  onClick={() => faviconInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  {faviconUrl ? (
                    <div className="space-y-2">
                      <img src={faviconUrl} alt="Favicon" className="h-10 w-10 mx-auto object-contain rounded" />
                      <button onClick={e => { e.stopPropagation(); setFaviconUrl(null); }} className="text-xs text-muted-foreground hover:text-destructive">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Click to upload favicon</p>
                    </div>
                  )}
                  <Input
                    ref={faviconInputRef}
                    type="file"
                    accept=".png,.svg,image/png,image/svg+xml"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) readAsDataUrl(file, src => setFaviconUrl(src));
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Brand dark (primary)</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="h-10 w-14 rounded cursor-pointer border-0" />
                  <Input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="font-mono text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Accent (secondary)</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="h-10 w-14 rounded cursor-pointer border-0" />
                  <Input value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="font-mono text-sm" />
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={resetTheme}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Theme
              </Button>

              <div className="border-t pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {tabs.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id)}
                      className={`rounded-md border px-2 py-1.5 text-xs font-semibold ${
                        activeTab === t.id ? "border-secondary text-secondary bg-secondary/10" : "border-border text-muted-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {activeTab === "services" && (
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full" onClick={addService}><Plus className="h-3.5 w-3.5 mr-1" /> Add Service</Button>
                    {services.map(item => (
                      <div key={item.id} className="rounded-lg border border-border p-3 space-y-2">
                        <Input value={item.title} onChange={e => updateService(item.id, { title: e.target.value })} />
                        <Input value={item.description} onChange={e => updateService(item.id, { description: e.target.value })} />
                        <AssetPicker previewSrc={item.image} onSet={src => updateService(item.id, { image: src })} onRemove={() => updateService(item.id, { image: "" })} />
                        <button type="button" onClick={() => removeService(item.id)} className="text-xs text-destructive inline-flex items-center gap-1"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "sections" && (
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full" onClick={addServiceSection}><Plus className="h-3.5 w-3.5 mr-1" /> Add Section</Button>
                    {serviceSections.map(item => (
                      <div key={item.id} className="rounded-lg border border-border p-3 space-y-2">
                        <Input value={item.title} onChange={e => updateServiceSection(item.id, { title: e.target.value })} />
                        <Input value={item.subtitle} onChange={e => updateServiceSection(item.id, { subtitle: e.target.value })} />
                        <AssetPicker previewSrc={item.image} onSet={src => updateServiceSection(item.id, { image: src })} onRemove={() => updateServiceSection(item.id, { image: "" })} />
                        <button type="button" onClick={() => removeServiceSection(item.id)} className="text-xs text-destructive inline-flex items-center gap-1"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "team" && (
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full" onClick={addTeamMember}><Plus className="h-3.5 w-3.5 mr-1" /> Add Team Member</Button>
                    {team.map(item => (
                      <div key={item.id} className="rounded-lg border border-border p-3 space-y-2">
                        <Input value={item.name} onChange={e => updateTeamMember(item.id, { name: e.target.value })} />
                        <Input value={item.role} onChange={e => updateTeamMember(item.id, { role: e.target.value })} />
                        <Input value={item.bio} onChange={e => updateTeamMember(item.id, { bio: e.target.value })} />
                        <AssetPicker previewSrc={item.image} onSet={src => updateTeamMember(item.id, { image: src })} onRemove={() => updateTeamMember(item.id, { image: "" })} />
                        <button type="button" onClick={() => removeTeamMember(item.id)} className="text-xs text-destructive inline-flex items-center gap-1"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "projects" && (
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full" onClick={addProject}><Plus className="h-3.5 w-3.5 mr-1" /> Add Project</Button>
                    {projects.map(item => (
                      <div key={item.id} className="rounded-lg border border-border p-3 space-y-2">
                        <Input value={item.title} onChange={e => updateProject(item.id, { title: e.target.value })} />
                        <Input value={item.location} onChange={e => updateProject(item.id, { location: e.target.value })} />
                        <Input value={item.description} onChange={e => updateProject(item.id, { description: e.target.value })} />
                        <AssetPicker previewSrc={item.image} onSet={src => updateProject(item.id, { image: src })} onRemove={() => updateProject(item.id, { image: "" })} />
                        <button type="button" onClick={() => removeProject(item.id)} className="text-xs text-destructive inline-flex items-center gap-1"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "visibility" && (
                  <div className="space-y-2">
                    {Object.entries(sectionVisibility).map(([key, visible]) => (
                      <label key={key} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-xs">
                        <span className="font-medium text-foreground">{key}</span>
                        <input
                          type="checkbox"
                          checked={visible}
                          onChange={e => setSectionVisibility(key, e.target.checked)}
                        />
                      </label>
                    ))}
                  </div>
                )}

                <Button variant="outline" className="w-full" onClick={resetContent}>Reset Content</Button>
                <Button className="w-full" onClick={handleExportCode} disabled={exporting}>
                  {exporting ? "Preparing export..." : "Download Full Website Code"}
                </Button>
                <p className="text-[11px] text-muted-foreground">
                  ZIP export requires both servers: <code>npm run dev</code> and <code>npm run dev:api</code>.
                </p>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default CustomizationPanel;
