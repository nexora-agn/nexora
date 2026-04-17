import { useCallback, useRef } from "react";
import { Plus, RotateCcw, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DEFAULT_DRAFT_STATE, type DraftState } from "@/lib/drafts";
import { supabase } from "@/lib/supabase";

interface EditorPanelProps {
  state: DraftState;
  onChange: (updater: (prev: DraftState) => DraftState) => void;
  clientId: string;
}

const UID = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

async function uploadImageToStorage(clientId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `${clientId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("client-assets").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("client-assets").getPublicUrl(path);
  return data.publicUrl;
}

const EditorPanel = ({ state, onChange, clientId }: EditorPanelProps) => {
  const { theme, content } = state;

  const setTheme = useCallback(
    (patch: Partial<DraftState["theme"]>) => {
      onChange(prev => ({ ...prev, theme: { ...prev.theme, ...patch } }));
    },
    [onChange],
  );

  const setContent = useCallback(
    (patch: Partial<DraftState["content"]>) => {
      onChange(prev => ({ ...prev, content: { ...prev.content, ...patch } }));
    },
    [onChange],
  );

  const handleUpload = useCallback(
    async (file: File | undefined, apply: (url: string) => void) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      try {
        const url = await uploadImageToStorage(clientId, file);
        apply(url);
      } catch (err) {
        // fall back to inline data URL if storage upload fails (e.g. offline / bucket not configured)
        try {
          const dataUrl = await readFileAsDataUrl(file);
          apply(dataUrl);
          toast.warning("Image stored inline (Supabase Storage unavailable)");
        } catch {
          toast.error(err instanceof Error ? err.message : "Upload failed");
        }
      }
    },
    [clientId],
  );

  return (
    <div className="p-4 space-y-6">
      {/* BRANDING */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Branding</h3>

        <AssetDropzone
          label="Logo"
          previewSrc={theme.logoUrl}
          previewClass="h-12 object-contain"
          onFile={file => handleUpload(file, url => setTheme({ logoUrl: url }))}
          onRemove={() => setTheme({ logoUrl: null })}
        />

        <AssetDropzone
          label="Favicon"
          previewSrc={theme.faviconUrl}
          previewClass="h-10 w-10 object-contain rounded"
          onFile={file => handleUpload(file, url => setTheme({ faviconUrl: url }))}
          onRemove={() => setTheme({ faviconUrl: null })}
        />

        <ColorField label="Brand dark (primary)" value={theme.primaryColor} onChange={v => setTheme({ primaryColor: v })} />
        <ColorField label="Accent (secondary)" value={theme.secondaryColor} onChange={v => setTheme({ secondaryColor: v })} />

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() =>
            setTheme({
              primaryColor: DEFAULT_DRAFT_STATE.theme.primaryColor,
              secondaryColor: DEFAULT_DRAFT_STATE.theme.secondaryColor,
              logoUrl: null,
              faviconUrl: null,
            })
          }
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          Reset branding
        </Button>
      </section>

      {/* CONTENT TABS */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</h3>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid grid-cols-3 w-full h-auto">
            <TabsTrigger value="services" className="text-xs">Services</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
            <TabsTrigger value="team" className="text-xs">Team</TabsTrigger>
          </TabsList>
          <TabsList className="grid grid-cols-2 w-full h-auto mt-1">
            <TabsTrigger value="sections" className="text-xs">Sections</TabsTrigger>
            <TabsTrigger value="visibility" className="text-xs">Pages</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() =>
                setContent({
                  services: [
                    ...content.services,
                    {
                      id: UID("service"),
                      title: "New Service",
                      icon: "Building2",
                      description: "Describe this service.",
                      image: "",
                    },
                  ],
                })
              }
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add service
            </Button>
            {content.services.map(item => (
              <Card
                key={item.id}
                onRemove={() =>
                  setContent({ services: content.services.filter(s => s.id !== item.id) })
                }
              >
                <Input
                  value={item.title}
                  onChange={e =>
                    setContent({
                      services: content.services.map(s =>
                        s.id === item.id ? { ...s, title: e.target.value } : s,
                      ),
                    })
                  }
                  placeholder="Title"
                />
                <Textarea
                  rows={2}
                  value={item.description}
                  onChange={e =>
                    setContent({
                      services: content.services.map(s =>
                        s.id === item.id ? { ...s, description: e.target.value } : s,
                      ),
                    })
                  }
                  placeholder="Description"
                />
                <AssetDropzone
                  label="Image"
                  previewSrc={item.image}
                  previewClass="h-20 w-full object-cover rounded"
                  onFile={file =>
                    handleUpload(file, url =>
                      setContent({
                        services: content.services.map(s =>
                          s.id === item.id ? { ...s, image: url } : s,
                        ),
                      }),
                    )
                  }
                  onRemove={() =>
                    setContent({
                      services: content.services.map(s =>
                        s.id === item.id ? { ...s, image: "" } : s,
                      ),
                    })
                  }
                />
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="projects" className="space-y-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() =>
                setContent({
                  projects: [
                    ...content.projects,
                    {
                      id: UID("project"),
                      title: "New Project",
                      category: "Residential",
                      location: "City, Country",
                      year: "2026",
                      client: "Client Name",
                      value: "$0M",
                      description: "Project description.",
                      image: "",
                      gallery: [],
                    },
                  ],
                })
              }
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add project
            </Button>
            {content.projects.map(item => (
              <Card
                key={item.id}
                onRemove={() => setContent({ projects: content.projects.filter(p => p.id !== item.id) })}
              >
                <Input
                  value={item.title}
                  onChange={e =>
                    setContent({
                      projects: content.projects.map(p =>
                        p.id === item.id ? { ...p, title: e.target.value } : p,
                      ),
                    })
                  }
                  placeholder="Title"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={item.location}
                    onChange={e =>
                      setContent({
                        projects: content.projects.map(p =>
                          p.id === item.id ? { ...p, location: e.target.value } : p,
                        ),
                      })
                    }
                    placeholder="Location"
                  />
                  <Input
                    value={item.year}
                    onChange={e =>
                      setContent({
                        projects: content.projects.map(p =>
                          p.id === item.id ? { ...p, year: e.target.value } : p,
                        ),
                      })
                    }
                    placeholder="Year"
                  />
                </div>
                <Textarea
                  rows={2}
                  value={item.description}
                  onChange={e =>
                    setContent({
                      projects: content.projects.map(p =>
                        p.id === item.id ? { ...p, description: e.target.value } : p,
                      ),
                    })
                  }
                  placeholder="Description"
                />
                <AssetDropzone
                  label="Image"
                  previewSrc={item.image}
                  previewClass="h-20 w-full object-cover rounded"
                  onFile={file =>
                    handleUpload(file, url =>
                      setContent({
                        projects: content.projects.map(p =>
                          p.id === item.id ? { ...p, image: url } : p,
                        ),
                      }),
                    )
                  }
                  onRemove={() =>
                    setContent({
                      projects: content.projects.map(p =>
                        p.id === item.id ? { ...p, image: "" } : p,
                      ),
                    })
                  }
                />
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="team" className="space-y-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() =>
                setContent({
                  team: [
                    ...content.team,
                    {
                      id: UID("member"),
                      name: "New Member",
                      role: "Role",
                      bio: "Short bio.",
                      image: "",
                      social: { linkedin: "#", twitter: "#" },
                    },
                  ],
                })
              }
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add member
            </Button>
            {content.team.map(item => (
              <Card
                key={item.id}
                onRemove={() => setContent({ team: content.team.filter(m => m.id !== item.id) })}
              >
                <Input
                  value={item.name}
                  onChange={e =>
                    setContent({
                      team: content.team.map(m => (m.id === item.id ? { ...m, name: e.target.value } : m)),
                    })
                  }
                  placeholder="Name"
                />
                <Input
                  value={item.role}
                  onChange={e =>
                    setContent({
                      team: content.team.map(m => (m.id === item.id ? { ...m, role: e.target.value } : m)),
                    })
                  }
                  placeholder="Role"
                />
                <Textarea
                  rows={2}
                  value={item.bio}
                  onChange={e =>
                    setContent({
                      team: content.team.map(m => (m.id === item.id ? { ...m, bio: e.target.value } : m)),
                    })
                  }
                  placeholder="Bio"
                />
                <AssetDropzone
                  label="Photo"
                  previewSrc={item.image}
                  previewClass="h-20 w-20 rounded-full object-cover"
                  onFile={file =>
                    handleUpload(file, url =>
                      setContent({
                        team: content.team.map(m => (m.id === item.id ? { ...m, image: url } : m)),
                      }),
                    )
                  }
                  onRemove={() =>
                    setContent({
                      team: content.team.map(m => (m.id === item.id ? { ...m, image: "" } : m)),
                    })
                  }
                />
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="sections" className="space-y-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() =>
                setContent({
                  serviceSections: [
                    ...content.serviceSections,
                    {
                      id: UID("section"),
                      category: "CATEGORY",
                      title: "New Section",
                      subtitle: "ADD A SUBTITLE",
                      body: ["First paragraph.", "Second paragraph."],
                      image: "",
                      inclusions: ["Inclusion one", "Inclusion two"],
                    },
                  ],
                })
              }
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add section
            </Button>
            {content.serviceSections.map(item => (
              <Card
                key={item.id}
                onRemove={() =>
                  setContent({ serviceSections: content.serviceSections.filter(s => s.id !== item.id) })
                }
              >
                <Input
                  value={item.title}
                  onChange={e =>
                    setContent({
                      serviceSections: content.serviceSections.map(s =>
                        s.id === item.id ? { ...s, title: e.target.value } : s,
                      ),
                    })
                  }
                  placeholder="Title"
                />
                <Input
                  value={item.subtitle}
                  onChange={e =>
                    setContent({
                      serviceSections: content.serviceSections.map(s =>
                        s.id === item.id ? { ...s, subtitle: e.target.value } : s,
                      ),
                    })
                  }
                  placeholder="Subtitle"
                />
                <AssetDropzone
                  label="Image"
                  previewSrc={item.image}
                  previewClass="h-20 w-full object-cover rounded"
                  onFile={file =>
                    handleUpload(file, url =>
                      setContent({
                        serviceSections: content.serviceSections.map(s =>
                          s.id === item.id ? { ...s, image: url } : s,
                        ),
                      }),
                    )
                  }
                  onRemove={() =>
                    setContent({
                      serviceSections: content.serviceSections.map(s =>
                        s.id === item.id ? { ...s, image: "" } : s,
                      ),
                    })
                  }
                />
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="visibility" className="mt-3 space-y-1.5">
            {Object.entries(content.sectionVisibility).map(([key, visible]) => (
              <label
                key={key}
                className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-xs cursor-pointer hover:bg-muted/50"
              >
                <span className="font-medium font-mono">{key}</span>
                <input
                  type="checkbox"
                  checked={visible}
                  onChange={e =>
                    setContent({
                      sectionVisibility: { ...content.sectionVisibility, [key]: e.target.checked },
                    })
                  }
                />
              </label>
            ))}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

const Card = ({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) => (
  <div className="rounded-md border p-2.5 space-y-2 bg-card">
    {children}
    <button
      type="button"
      onClick={onRemove}
      className="text-xs text-destructive inline-flex items-center gap-1 hover:underline"
    >
      <Trash2 className="h-3 w-3" />
      Remove
    </button>
  </div>
);

const ColorField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-2">
    <Label className="text-xs font-medium">{label}</Label>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-9 w-12 rounded cursor-pointer border"
      />
      <Input value={value} onChange={e => onChange(e.target.value)} className="font-mono text-xs" />
    </div>
  </div>
);

const AssetDropzone = ({
  label,
  previewSrc,
  previewClass,
  onFile,
  onRemove,
}: {
  label: string;
  previewSrc: string | null | undefined;
  previewClass: string;
  onFile: (file: File) => void;
  onRemove: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) onFile(file);
        }}
        className="border-2 border-dashed rounded-md p-2.5 text-center cursor-pointer hover:border-primary/50 transition-colors"
      >
        {previewSrc ? (
          <div className="flex flex-col items-center gap-1.5">
            <img src={previewSrc} alt="" className={previewClass} />
            <span className="text-[10px] text-muted-foreground">Click to replace</span>
          </div>
        ) : (
          <div className="py-3 space-y-1">
            <Upload className="h-5 w-5 mx-auto text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Click or drop an image</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {previewSrc && (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-[11px] text-muted-foreground hover:text-destructive"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default EditorPanel;
