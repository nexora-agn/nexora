import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  PROJECTS,
  SERVICES,
  SERVICE_DEEP_DIVES,
  TEAM,
  COMPANY,
  SITE_TOP,
  OFFICE_HOURS,
  MAP_EMBED_URL,
  HOME_HERO,
  SERVICES_RIBBON,
  CAPABILITIES,
  PROCESS_STEPS,
  HOME_STATS,
  WHY_BENEFITS,
  TESTIMONIALS,
  STATS,
  FAQ_ITEMS,
  NAV_LINKS,
  FOOTER_SERVICE_LINKS,
  FOOTER_COMPANY_LINKS,
  PROJECTS_PAGE_STATS,
  ABOUT_STATS,
  CORE_VALUES,
  CERTIFICATIONS,
  SERVICES_PAGE_INTRO,
  COMMERCIAL_FITOUT_CARDS,
  LEAD_FORM,
  BLOG_TAGS,
  BARBERSHOP_IMAGES,
} from "@template-barbershop/data/siteData";

type Service = (typeof SERVICES)[number];
type ServiceSection = (typeof SERVICE_DEEP_DIVES)[number];
type TeamMember = (typeof TEAM)[number];
type Project = (typeof PROJECTS)[number];

type Company = typeof COMPANY;
type SiteTop = typeof SITE_TOP;
type OfficeHours = typeof OFFICE_HOURS;
type HomeHero = typeof HOME_HERO;
type ServicesRibbon = typeof SERVICES_RIBBON;
type Capability = (typeof CAPABILITIES)[number];
type ProcessStep = (typeof PROCESS_STEPS)[number];
type HomeStat = (typeof HOME_STATS)[number];
type WhyBenefit = (typeof WHY_BENEFITS)[number];
type Testimonial = (typeof TESTIMONIALS)[number];
type Stat = (typeof STATS)[number];
type FaqItem = (typeof FAQ_ITEMS)[number];
type NavLink = (typeof NAV_LINKS)[number];
type FooterLink = (typeof FOOTER_SERVICE_LINKS)[number];
type ProjectsPageStat = (typeof PROJECTS_PAGE_STATS)[number];
type AboutStat = (typeof ABOUT_STATS)[number];
type CoreValue = (typeof CORE_VALUES)[number];
type Certification = (typeof CERTIFICATIONS)[number];
type CommercialFitoutCard = (typeof COMMERCIAL_FITOUT_CARDS)[number];
type LeadForm = typeof LEAD_FORM;

export interface SiteContentState {
  /* repeatable lists */
  services: Service[];
  serviceSections: ServiceSection[];
  team: TeamMember[];
  projects: Project[];
  sectionVisibility: Record<string, boolean>;

  /* site-wide copy */
  company: Company;
  siteTop: SiteTop;
  officeHours: OfficeHours;
  mapEmbedUrl: string;

  /* homepage */
  homeHero: HomeHero;
  servicesRibbon: ServicesRibbon;
  capabilities: Capability[];
  processSteps: ProcessStep[];
  homeStats: HomeStat[];
  whyBenefits: WhyBenefit[];
  testimonials: Testimonial[];
  leadForm: LeadForm;

  /* other pages */
  stats: Stat[];
  projectsPageStats: ProjectsPageStat[];
  aboutStats: AboutStat[];
  coreValues: CoreValue[];
  certifications: Certification[];
  servicesPageIntro: string;
  commercialFitoutCards: CommercialFitoutCard[];
  faqItems: FaqItem[];

  /* navigation */
  navLinks: NavLink[];
  footerServiceLinks: FooterLink[];
  footerCompanyLinks: FooterLink[];
  blogTags: string[];
}

interface SiteContentContextType extends SiteContentState {
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
  patch: (patch: Partial<SiteContentState>) => void;
  resetContent: () => void;
}

const STORAGE_KEY = "forge-barbershop-site-content-v1";
const EXPORT_MARKER_KEY = "nexora-export-applied-at";

export const SITE_CONTENT_DEFAULTS: SiteContentState = {
  services: SERVICES,
  serviceSections: SERVICE_DEEP_DIVES,
  team: TEAM,
  projects: PROJECTS,
  sectionVisibility: {
    "home.hero": true,
    "home.booking": true,
    "home.services": true,
    "home.packages": true,
    "home.barbers": true,
    "home.whyChoose": true,
    "home.gallery": true,
    "home.testimonials": true,
    "home.stats": true,
    "home.products": true,
    "home.loyalty": true,
    "home.blog": true,
    "home.faq": true,
    "home.cta": true,
    "about.story": true,
    "about.values": true,
    "about.stats": true,
    "about.timeline": true,
    "about.certifications": true,
    "about.cta": true,
    "services.grid": true,
    "services.deepDives": true,
    "services.packages": true,
    "services.cta": true,
    "barbers.grid": true,
    "barbers.cta": true,
    "contact.main": true,
    "contact.map": true,
    "contact.cta": true,
    "blog.main": true,
    "blog.subscribe": true,
    "faq.main": true,
    "faq.cta": true,
  },
  company: COMPANY,
  siteTop: SITE_TOP,
  officeHours: OFFICE_HOURS,
  mapEmbedUrl: MAP_EMBED_URL,
  homeHero: HOME_HERO,
  servicesRibbon: SERVICES_RIBBON,
  capabilities: CAPABILITIES,
  processSteps: PROCESS_STEPS,
  homeStats: HOME_STATS,
  whyBenefits: WHY_BENEFITS,
  testimonials: TESTIMONIALS,
  leadForm: LEAD_FORM,
  stats: STATS,
  projectsPageStats: PROJECTS_PAGE_STATS,
  aboutStats: ABOUT_STATS,
  coreValues: CORE_VALUES,
  certifications: CERTIFICATIONS,
  servicesPageIntro: SERVICES_PAGE_INTRO,
  commercialFitoutCards: COMMERCIAL_FITOUT_CARDS,
  faqItems: FAQ_ITEMS,
  navLinks: NAV_LINKS,
  footerServiceLinks: FOOTER_SERVICE_LINKS,
  footerCompanyLinks: FOOTER_COMPANY_LINKS,
  blogTags: BLOG_TAGS,
};

const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
  value?: SiteContentState;
  onChange?: (next: SiteContentState) => void;
  external?: boolean;
}

const mergeWithDefaults = (partial: Partial<SiteContentState> | undefined): SiteContentState => ({
  ...SITE_CONTENT_DEFAULTS,
  ...(partial ?? {}),
  company: { ...SITE_CONTENT_DEFAULTS.company, ...(partial?.company ?? {}) },
  siteTop: { ...SITE_CONTENT_DEFAULTS.siteTop, ...(partial?.siteTop ?? {}) },
  homeHero: {
    ...SITE_CONTENT_DEFAULTS.homeHero,
    ...(partial?.homeHero ?? {}),
    primaryCta: {
      ...SITE_CONTENT_DEFAULTS.homeHero.primaryCta,
      ...(partial?.homeHero?.primaryCta ?? {}),
    },
    secondaryCta: {
      ...SITE_CONTENT_DEFAULTS.homeHero.secondaryCta,
      ...(partial?.homeHero?.secondaryCta ?? {}),
    },
  },
  leadForm: { ...SITE_CONTENT_DEFAULTS.leadForm, ...(partial?.leadForm ?? {}) },
  sectionVisibility: {
    ...SITE_CONTENT_DEFAULTS.sectionVisibility,
    ...(partial?.sectionVisibility ?? {}),
  },
});

export const SiteContentProvider: React.FC<ProviderProps> = ({ children, value, onChange, external }) => {
  const isControlled = value !== undefined && typeof onChange === "function";

  const [internalState, setInternalState] = useState<SiteContentState>(() => {
    if (isControlled) return value as SiteContentState;
    if (external) return SITE_CONTENT_DEFAULTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return SITE_CONTENT_DEFAULTS;
      return mergeWithDefaults(JSON.parse(saved));
    } catch {
      return SITE_CONTENT_DEFAULTS;
    }
  });

  const state = isControlled ? (value as SiteContentState) : internalState;

  const save = (next: SiteContentState) => {
    if (isControlled) {
      onChange!(next);
      return;
    }
    setInternalState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  };

  useEffect(() => {
    if (isControlled || external) return;
    let mounted = true;
    fetch("/site-builder-export.json")
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!mounted || !data?.content) return;
        const generatedAt = String(data?.generatedAt || "");
        const alreadyApplied = localStorage.getItem(EXPORT_MARKER_KEY);
        if (generatedAt && alreadyApplied === generatedAt) return;
        const next = mergeWithDefaults(data.content as Partial<SiteContentState>);
        setInternalState(next);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          if (generatedAt) localStorage.setItem(EXPORT_MARKER_KEY, generatedAt);
        } catch {
          // ignore
        }
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, [isControlled, external]);

  const api = useMemo<SiteContentContextType>(() => ({
    ...state,

    addService: () =>
      save({
        ...state,
        services: [
          ...state.services,
          {
            id: uid("service"),
            categoryId: "haircuts",
            title: "New Service",
            name: "New Service",
            icon: "Scissors",
            description: "Describe this service.",
            image: BARBERSHOP_IMAGES.haircut,
            price: 0,
            priceLabel: "$0",
            duration: "30 min",
            popular: false,
            badges: [],
          } as unknown as Service,
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
            image: BARBERSHOP_IMAGES.haircut,
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
            id: uid("barber"),
            name: "New Barber",
            role: "Barber",
            bio: "Short bio for this barber.",
            image: BARBERSHOP_IMAGES.barberA,
            experience: "1 year",
            specialties: ["Haircuts"],
            rating: 5,
            reviewCount: 0,
            social: { instagram: "#", linkedin: "#", email: "" },
          } as unknown as TeamMember,
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
            id: uid("gallery"),
            title: "New Gallery Item",
            category: "interior",
            location: "interior",
            year: "2026",
            client: "",
            value: "",
            description: "Gallery item description.",
            image: BARBERSHOP_IMAGES.interior,
            gallery: [],
            number: state.projects.length + 1,
          },
        ],
      }),
    updateProject: (id, patch) =>
      save({ ...state, projects: state.projects.map(p => (p.id === id ? { ...p, ...patch } : p)) }),
    removeProject: id => save({ ...state, projects: state.projects.filter(p => p.id !== id) }),
    setSectionVisibility: (sectionId, visible) =>
      save({ ...state, sectionVisibility: { ...state.sectionVisibility, [sectionId]: visible } }),
    patch: patch => save({ ...state, ...patch }),
    resetContent: () => save(SITE_CONTENT_DEFAULTS),
  }), [state, isControlled]);

  return <SiteContentContext.Provider value={api}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
};
