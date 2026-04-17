import React, { createContext, useContext, useMemo, useState } from "react";
import { PROJECTS, SERVICES, SERVICE_DEEP_DIVES, TEAM } from "@/data/siteData";

type Service = (typeof SERVICES)[number];
type ServiceSection = (typeof SERVICE_DEEP_DIVES)[number];
type TeamMember = (typeof TEAM)[number];
type Project = (typeof PROJECTS)[number];

interface SiteContentContextType {
  services: Service[];
  serviceSections: ServiceSection[];
  team: TeamMember[];
  projects: Project[];
  sectionVisibility: Record<string, boolean>;
  addService: () => void;
  updateService: (id: string, patch: Partial<Service>) => void;
  removeService: (id: string) => void;
  addServiceSection: () => void;
  updateServiceSection: (id: string, patch: Partial<ServiceSection>) => void;
  removeServiceSection: (id: string) => void;
  addTeamMember: () => void;
  updateTeamMember: (id: string, patch: Partial<TeamMember>) => void;
  removeTeamMember: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;
  setSectionVisibility: (sectionId: string, visible: boolean) => void;
  resetContent: () => void;
}

const STORAGE_KEY = "constructco-site-content-v1";
const EXPORT_MARKER_KEY = "constructco-export-applied-at";

const defaults = {
  services: SERVICES,
  serviceSections: SERVICE_DEEP_DIVES,
  team: TEAM,
  projects: PROJECTS,
  sectionVisibility: {
    "home.hero": true,
    "home.servicesRibbon": true,
    "home.capabilities": true,
    "home.signatureProjects": true,
    "home.stats": true,
    "home.process": true,
    "home.clientStories": true,
    "home.whyTeam": true,
    "home.leadContact": true,
    "about.story": true,
    "about.values": true,
    "about.stats": true,
    "about.directors": true,
    "about.process": true,
    "about.certifications": true,
    "about.cta": true,
    "services.grid": true,
    "services.deepDives": true,
    "services.fitouts": true,
    "services.cta": true,
    "projects.stats": true,
    "projects.list": true,
    "projects.cta": true,
    "team.grid": true,
    "team.cta": true,
    "contact.main": true,
    "contact.map": true,
    "contact.cta": true,
    "blog.main": true,
    "blog.subscribe": true,
    "faq.main": true,
    "faq.cta": true,
  },
};

const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return defaults;
      return { ...defaults, ...JSON.parse(saved) };
    } catch {
      return defaults;
    }
  });

  const save = (next: typeof defaults) => {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  React.useEffect(() => {
    let mounted = true;
    fetch("/site-builder-export.json")
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!mounted || !data?.content) return;
        const generatedAt = String(data?.generatedAt || "");
        const alreadyApplied = localStorage.getItem(EXPORT_MARKER_KEY);
        if (generatedAt && alreadyApplied === generatedAt) return;
        const next = { ...defaults, ...data.content };
        setState(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        if (generatedAt) localStorage.setItem(EXPORT_MARKER_KEY, generatedAt);
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, []);

  const api = useMemo<SiteContentContextType>(() => ({
    services: state.services,
    serviceSections: state.serviceSections,
    team: state.team,
    projects: state.projects,
    sectionVisibility: state.sectionVisibility,
    addService: () =>
      save({
        ...state,
        services: [
          ...state.services,
          {
            id: uid("service"),
            title: "New Service",
            icon: "Building2",
            description: "Describe this service.",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
          },
        ],
      }),
    updateService: (id, patch) =>
      save({ ...state, services: state.services.map(s => (s.id === id ? { ...s, ...patch } : s)) }),
    removeService: id => save({ ...state, services: state.services.filter(s => s.id !== id) }),
    addServiceSection: () =>
      save({
        ...state,
        serviceSections: [
          ...state.serviceSections,
          {
            id: uid("section"),
            category: "CATEGORY",
            title: "New Service Section",
            subtitle: "ADD A SUBTITLE",
            body: ["Describe the first paragraph.", "Describe the second paragraph."],
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop",
            inclusions: ["Inclusion one", "Inclusion two", "Inclusion three"],
          },
        ],
      }),
    updateServiceSection: (id, patch) =>
      save({
        ...state,
        serviceSections: state.serviceSections.map(s => (s.id === id ? { ...s, ...patch } : s)),
      }),
    removeServiceSection: id =>
      save({ ...state, serviceSections: state.serviceSections.filter(s => s.id !== id) }),
    addTeamMember: () =>
      save({
        ...state,
        team: [
          ...state.team,
          {
            id: uid("member"),
            name: "New Member",
            role: "Role",
            bio: "Short bio for this team member.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
            social: { linkedin: "#", twitter: "#" },
          },
        ],
      }),
    updateTeamMember: (id, patch) =>
      save({ ...state, team: state.team.map(m => (m.id === id ? { ...m, ...patch } : m)) }),
    removeTeamMember: id => save({ ...state, team: state.team.filter(m => m.id !== id) }),
    addProject: () =>
      save({
        ...state,
        projects: [
          ...state.projects,
          {
            id: uid("project"),
            title: "New Project",
            category: "Residential",
            location: "City, Country",
            year: "2026",
            client: "Client Name",
            value: "$0M",
            description: "Project description.",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
            gallery: [],
          },
        ],
      }),
    updateProject: (id, patch) =>
      save({ ...state, projects: state.projects.map(p => (p.id === id ? { ...p, ...patch } : p)) }),
    removeProject: id => save({ ...state, projects: state.projects.filter(p => p.id !== id) }),
    setSectionVisibility: (sectionId, visible) =>
      save({ ...state, sectionVisibility: { ...state.sectionVisibility, [sectionId]: visible } }),
    resetContent: () => save(defaults),
  }), [state]);

  return <SiteContentContext.Provider value={api}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
};

