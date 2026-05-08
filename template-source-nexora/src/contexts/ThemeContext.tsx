import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  serviceImages: Record<string, string>;
  serviceSectionImages: Record<string, string>;
  teamImages: Record<string, string>;
  projectImages: Record<string, string>;
}

interface ThemeContextType extends ThemeConfig {
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
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

/** Primary = brand dark navy. Secondary = orange CTA accent. */
export const THEME_DEFAULTS: ThemeConfig = {
  primaryColor: "#0a1628",
  secondaryColor: "#f97316",
  logoUrl: null,
  faviconUrl: null,
  serviceImages: {},
  serviceSectionImages: {},
  teamImages: {},
  projectImages: {},
};

const STORAGE_KEY = "nexora-theme";
const EXPORT_MARKER_KEY = "nexora-export-applied-at";

function hexToHSL(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function relativeLuminanceFromHex(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function secondaryForegroundHex(secondaryHex: string, primaryHex: string): string {
  const L = relativeLuminanceFromHex(secondaryHex);
  if (L > 0.45) return primaryHex;
  return "#ffffff";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
  value?: ThemeConfig;
  onChange?: (next: ThemeConfig) => void;
  /** When true, skips localStorage read + `/site-builder-export.json` fetch. */
  external?: boolean;
}

export const ThemeProvider: React.FC<ProviderProps> = ({ children, value, onChange, external }) => {
  const isControlled = value !== undefined && typeof onChange === "function";

  const [internalConfig, setInternalConfig] = useState<ThemeConfig>(() => {
    if (isControlled) return value as ThemeConfig;
    if (external) return THEME_DEFAULTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...THEME_DEFAULTS, ...JSON.parse(saved) } : THEME_DEFAULTS;
    } catch {
      return THEME_DEFAULTS;
    }
  });

  const config: ThemeConfig = isControlled ? (value as ThemeConfig) : internalConfig;

  const commit = (next: ThemeConfig) => {
    if (isControlled) {
      onChange!(next);
      return;
    }
    setInternalConfig(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  };

  const applyColors = useCallback((primary: string, secondary: string) => {
    const root = document.documentElement;
    const onSecondary = secondaryForegroundHex(secondary, primary);
    root.style.setProperty("--primary", hexToHSL(primary));
    root.style.setProperty("--secondary", hexToHSL(secondary));
    root.style.setProperty("--ring", hexToHSL(primary));
    root.style.setProperty("--accent", hexToHSL(secondary));
    root.style.setProperty("--secondary-foreground", hexToHSL(onSecondary));
    root.style.setProperty("--accent-foreground", hexToHSL(onSecondary));
  }, []);

  useEffect(() => {
    applyColors(config.primaryColor, config.secondaryColor);
  }, [config.primaryColor, config.secondaryColor, applyColors]);

  useEffect(() => {
    const current = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    const link =
      current ||
      (() => {
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
        setInternalConfig(prev => ({ ...prev, ...data.theme }));
        if (generatedAt) {
          try {
            localStorage.setItem(EXPORT_MARKER_KEY, generatedAt);
          } catch {
            // ignore
          }
        }
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, [isControlled, external]);

  const setPrimaryColor = (color: string) => commit({ ...config, primaryColor: color });
  const setSecondaryColor = (color: string) => commit({ ...config, secondaryColor: color });
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
