import React, { createContext, useContext, useState, useEffect } from "react";
import {
  applyThemePalette,
  buildThemeDefaults,
  normalizeThemeConfig,
  type ThemeColorFields,
  type ThemeConfig,
} from "@/lib/templateTheme";

export type { ThemeConfig };

interface ThemeContextType extends ThemeConfig {
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  updateThemeColors: (patch: Partial<ThemeColorFields>) => void;
  setLogoUrl: (url: string | null) => void;
  setFaviconUrl: (url: string | null) => void;
  setServiceImage: (id: string, url: string | null) => void;
  setServiceSectionImage: (id: string, url: string | null) => void;
  setTeamImage: (id: string, url: string | null) => void;
  setProjectImage: (id: string, url: string | null) => void;
  resolveServiceImage: (id: string, fallback: string) => string;
  resolveServiceSectionImage: (id: string, fallback: string) => string;
  resolveTeamImage: (id: string, fallback: string) => string;
  resolveProjectImage: (id: string, fallback: string) => string;
  resetTheme: () => void;
}

const BRAND = buildThemeDefaults({
  primaryColor: "#1e3a5f",
  secondaryColor: "#f59e0b",
});

export const THEME_DEFAULTS: ThemeConfig = {
  ...BRAND,
  logoUrl: null,
  faviconUrl: null,
  serviceImages: {},
  serviceSectionImages: {},
  teamImages: {},
  projectImages: {},
};

const STORAGE_KEY = "summit-theme";
const EXPORT_MARKER_KEY = "nexora-export-applied-at";

function migrateSavedTheme(partial: Partial<ThemeConfig>): ThemeConfig {
  return normalizeThemeConfig(THEME_DEFAULTS, partial);
}
const wrapTheme = (cfg: ThemeConfig) => cfg;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
  value?: ThemeConfig;
  onChange?: (next: ThemeConfig) => void;
  external?: boolean;
}

export const ThemeProvider: React.FC<ProviderProps> = ({ children, value, onChange, external }) => {
  const isControlled = value !== undefined && typeof onChange === "function";

  const [internalConfig, setInternalConfig] = useState<ThemeConfig>(() => {
    if (isControlled) return wrapTheme(normalizeThemeConfig(THEME_DEFAULTS, value));
    if (external) return THEME_DEFAULTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return THEME_DEFAULTS;
      const parsed = JSON.parse(saved) as Partial<ThemeConfig>;
      const migrated = migrateSavedTheme(parsed);
      if (JSON.stringify(migrated) !== JSON.stringify(parsed)) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated)); } catch {}
      }
      return wrapTheme(migrated);
    } catch {
      return THEME_DEFAULTS;
    }
  });

  const config: ThemeConfig = isControlled
    ? wrapTheme(normalizeThemeConfig(THEME_DEFAULTS, value))
    : internalConfig;

  const commit = (next: ThemeConfig) => {
    const normalized = wrapTheme(normalizeThemeConfig(THEME_DEFAULTS, next));
    if (isControlled) {
      onChange!(normalized);
      return;
    }
    setInternalConfig(normalized);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch {}
  };

  useEffect(() => {
    applyThemePalette(document.documentElement, config);
  }, [
    config.primaryColor,
    config.secondaryColor,
    config.backgroundColor,
    config.foregroundColor,
    config.mutedColor,
  ]);

  useEffect(() => {
    const current = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    const link = current || (() => {
      const el = document.createElement("link");
      el.rel = "icon";
      document.head.appendChild(el);
      return el;
    })();
    link.href = config.faviconUrl || "/favicon.svg";
    link.type = config.faviconUrl?.startsWith("data:image/svg") ? "image/svg+xml" : "image/png";
  }, [config.faviconUrl]);

  useEffect(() => {
    if (isControlled || external) return;
    let mounted = true;
    fetch("/site-builder-export.json")
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!mounted || !data?.theme) return;
        const generatedAt = String(data?.generatedAt || "");
        const alreadyApplied = localStorage.getItem(EXPORT_MARKER_KEY);
        if (generatedAt && alreadyApplied === generatedAt) return;
        setInternalConfig(prev => wrapTheme(normalizeThemeConfig(THEME_DEFAULTS, { ...prev, ...data.theme })));
        if (generatedAt) {
          try { localStorage.setItem(EXPORT_MARKER_KEY, generatedAt); } catch {}
        }
      })
      .catch(() => undefined);
    return () => { mounted = false; };
  }, [isControlled, external]);

  const setPrimaryColor = (color: string) => commit({ ...config, primaryColor: color });
  const setSecondaryColor = (color: string) => commit({ ...config, secondaryColor: color });
  const updateThemeColors = (patch: Partial<ThemeColorFields>) => commit({ ...config, ...patch });
  const setLogoUrl = (url: string | null) => commit({ ...config, logoUrl: url });
  const setFaviconUrl = (url: string | null) => commit({ ...config, faviconUrl: url });
  const updateImageMap = (
    key: "serviceImages" | "serviceSectionImages" | "teamImages" | "projectImages",
    id: string,
    url: string | null,
  ) => {
    const next = { ...config[key] };
    if (url) next[id] = url;
    else delete next[id];
    commit({ ...config, [key]: next });
  };
  const setServiceImage = (id: string, url: string | null) => updateImageMap("serviceImages", id, url);
  const setServiceSectionImage = (id: string, url: string | null) => updateImageMap("serviceSectionImages", id, url);
  const setTeamImage = (id: string, url: string | null) => updateImageMap("teamImages", id, url);
  const setProjectImage = (id: string, url: string | null) => updateImageMap("projectImages", id, url);

  const resolveServiceImage = (id: string, fallback: string) => config.serviceImages[id] || fallback;
  const resolveServiceSectionImage = (id: string, fallback: string) => config.serviceSectionImages[id] || fallback;
  const resolveTeamImage = (id: string, fallback: string) => config.teamImages[id] || fallback;
  const resolveProjectImage = (id: string, fallback: string) => config.projectImages[id] || fallback;
  const resetTheme = () => commit(THEME_DEFAULTS);

  return (
    <ThemeContext.Provider
      value={{
        ...config,
        setPrimaryColor,
        setSecondaryColor,
        updateThemeColors,
        setLogoUrl,
        setFaviconUrl,
        setServiceImage,
        setServiceSectionImage,
        setTeamImage,
        setProjectImage,
        resolveServiceImage,
        resolveServiceSectionImage,
        resolveTeamImage,
        resolveProjectImage,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
