import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface ThemeConfig {
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

/** Primary = brand dark (nav, footer, dark UI). Secondary = accent (gold highlights, CTAs). Applied as HSL CSS variables site-wide. */
const DEFAULT_THEME: ThemeConfig = {
  primaryColor: "#0a1628",
  secondaryColor: "#e4b012",
  logoUrl: null,
  faviconUrl: null,
  serviceImages: {},
  serviceSectionImages: {},
  teamImages: {},
  projectImages: {},
};

const STORAGE_KEY = "constructco-theme";
const EXPORT_MARKER_KEY = "constructco-export-applied-at";

function hexToHSL(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
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

/** WCAG relative luminance (sRGB), 0–1. */
function relativeLuminanceFromHex(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Text/icon color that contrasts with the accent (secondary) background, not always white. */
function secondaryForegroundHex(secondaryHex: string, primaryHex: string): string {
  const L = relativeLuminanceFromHex(secondaryHex);
  if (L > 0.45) return primaryHex;
  return "#ffffff";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_THEME, ...JSON.parse(saved) } : DEFAULT_THEME;
    } catch { return DEFAULT_THEME; }
  });

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config, applyColors]);

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
    let mounted = true;
    fetch("/site-builder-export.json")
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!mounted || !data?.theme) return;
        const generatedAt = String(data?.generatedAt || "");
        const alreadyApplied = localStorage.getItem(EXPORT_MARKER_KEY);
        if (generatedAt && alreadyApplied === generatedAt) return;
        setConfig(prev => ({ ...prev, ...data.theme }));
        if (generatedAt) localStorage.setItem(EXPORT_MARKER_KEY, generatedAt);
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, []);

  const setPrimaryColor = (color: string) => setConfig(prev => ({ ...prev, primaryColor: color }));
  const setSecondaryColor = (color: string) => setConfig(prev => ({ ...prev, secondaryColor: color }));
  const setLogoUrl = (url: string | null) => setConfig(prev => ({ ...prev, logoUrl: url }));
  const setFaviconUrl = (url: string | null) => setConfig(prev => ({ ...prev, faviconUrl: url }));
  const setServiceImage = (id: string, url: string | null) =>
    setConfig(prev => {
      const next = { ...prev.serviceImages };
      if (url) next[id] = url;
      else delete next[id];
      return { ...prev, serviceImages: next };
    });
  const setServiceSectionImage = (id: string, url: string | null) =>
    setConfig(prev => {
      const next = { ...prev.serviceSectionImages };
      if (url) next[id] = url;
      else delete next[id];
      return { ...prev, serviceSectionImages: next };
    });
  const setTeamImage = (id: string, url: string | null) =>
    setConfig(prev => {
      const next = { ...prev.teamImages };
      if (url) next[id] = url;
      else delete next[id];
      return { ...prev, teamImages: next };
    });
  const setProjectImage = (id: string, url: string | null) =>
    setConfig(prev => {
      const next = { ...prev.projectImages };
      if (url) next[id] = url;
      else delete next[id];
      return { ...prev, projectImages: next };
    });
  const resolveServiceImage = (id: string, fallback: string) => config.serviceImages[id] || fallback;
  const resolveServiceSectionImage = (id: string, fallback: string) => config.serviceSectionImages[id] || fallback;
  const resolveTeamImage = (id: string, fallback: string) => config.teamImages[id] || fallback;
  const resolveProjectImage = (id: string, fallback: string) => config.projectImages[id] || fallback;
  const resetTheme = () => setConfig(DEFAULT_THEME);

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
