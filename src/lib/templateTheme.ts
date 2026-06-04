/**
 * Shared theme palette for all Nexora templates.
 * Maps separated brand/page colors to CSS variables so custom picks stay readable.
 */

export interface ThemeColorFields {
  /** Nav, footer, dark bands */
  primaryColor: string;
  /** CTAs, highlights, links */
  secondaryColor: string;
  /** Main page background */
  backgroundColor: string;
  /** Body text on light sections */
  foregroundColor: string;
  /** Cards, subtle bands, form fields */
  mutedColor: string;
}

export interface ThemeConfig extends ThemeColorFields {
  logoUrl: string | null;
  faviconUrl: string | null;
  serviceImages: Record<string, string>;
  serviceSectionImages: Record<string, string>;
  teamImages: Record<string, string>;
  projectImages: Record<string, string>;
}

/** Default light page colors used when older drafts only stored primary + secondary. */
export const DEFAULT_PAGE_COLORS: ThemeColorFields = {
  primaryColor: "#0f172a",
  secondaryColor: "#2563eb",
  backgroundColor: "#f8fafc",
  foregroundColor: "#1e293b",
  mutedColor: "#f1f5f9",
};

export type BrandCssPrefix = "minhs" | "volt";

export const THEME_COLOR_LABELS: { key: keyof ThemeColorFields; label: string; hint: string }[] = [
  { key: "primaryColor", label: "Brand / header", hint: "Navigation, footer, dark sections" },
  { key: "secondaryColor", label: "Accent / buttons", hint: "CTAs, highlights, icons" },
  { key: "backgroundColor", label: "Page background", hint: "Main page and light sections" },
  { key: "foregroundColor", label: "Body text", hint: "Paragraphs and headings on light areas" },
  { key: "mutedColor", label: "Muted surfaces", hint: "Cards, form fields, subtle bands" },
];

export function normalizeThemeConfig(
  defaults: ThemeConfig,
  partial?: Partial<ThemeConfig> | null,
): ThemeConfig {
  const merged = { ...defaults, ...(partial ?? {}) };
  return {
    ...merged,
    primaryColor: merged.primaryColor || defaults.primaryColor,
    secondaryColor: merged.secondaryColor || defaults.secondaryColor,
    backgroundColor: merged.backgroundColor || defaults.backgroundColor,
    foregroundColor: merged.foregroundColor || defaults.foregroundColor,
    mutedColor: merged.mutedColor || defaults.mutedColor,
  };
}

export function hexToHSL(hex: string): string {
  const normalized = hex.trim().replace(/^#/, "");
  if (normalized.length !== 6) return "0 0% 50%";
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function relativeLuminanceFromHex(hex: string): number {
  const normalized = hex.trim().replace(/^#/, "");
  if (normalized.length !== 6) return 0.5;
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Pick white or dark text that contrasts with a background. */
export function contrastForegroundHex(bgHex: string, darkFallback: string, lightFallback = "#ffffff"): string {
  return relativeLuminanceFromHex(bgHex) > 0.45 ? darkFallback : lightFallback;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.trim().replace(/^#/, "");
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return `#${[clamp(r), clamp(g), clamp(b)].map(c => c.toString(16).padStart(2, "0")).join("")}`;
}

function adjustHexLightness(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const mix = amount >= 0 ? 255 : 0;
  const t = Math.abs(amount);
  return rgbToHex(r + (mix - r) * t, g + (mix - g) * t, b + (mix - b) * t);
}

function mutedForegroundHex(foregroundHex: string): string {
  const L = relativeLuminanceFromHex(foregroundHex);
  return adjustHexLightness(foregroundHex, L > 0.45 ? -0.28 : 0.28);
}

function borderHex(mutedHex: string): string {
  return adjustHexLightness(mutedHex, -0.06);
}

function cardBackgroundHex(backgroundHex: string): string {
  return relativeLuminanceFromHex(backgroundHex) > 0.92 ? "#ffffff" : adjustHexLightness(backgroundHex, 0.04);
}

export function applyThemePalette(
  root: HTMLElement,
  palette: ThemeColorFields,
  brandPrefix?: BrandCssPrefix,
): void {
  const onPrimary = contrastForegroundHex(palette.primaryColor, palette.foregroundColor);
  const onSecondary = contrastForegroundHex(palette.secondaryColor, palette.primaryColor);
  const onBackground = palette.foregroundColor;
  const onMuted = mutedForegroundHex(palette.foregroundColor);
  const cardBg = cardBackgroundHex(palette.backgroundColor);
  const border = borderHex(palette.mutedColor);

  root.style.setProperty("--primary", hexToHSL(palette.primaryColor));
  root.style.setProperty("--primary-foreground", hexToHSL(onPrimary));
  root.style.setProperty("--secondary", hexToHSL(palette.secondaryColor));
  root.style.setProperty("--secondary-foreground", hexToHSL(onSecondary));
  root.style.setProperty("--accent", hexToHSL(palette.secondaryColor));
  root.style.setProperty("--accent-foreground", hexToHSL(onSecondary));
  root.style.setProperty("--background", hexToHSL(palette.backgroundColor));
  root.style.setProperty("--foreground", hexToHSL(onBackground));
  root.style.setProperty("--card", hexToHSL(cardBg));
  root.style.setProperty("--card-foreground", hexToHSL(onBackground));
  root.style.setProperty("--popover", hexToHSL(cardBg));
  root.style.setProperty("--popover-foreground", hexToHSL(onBackground));
  root.style.setProperty("--muted", hexToHSL(palette.mutedColor));
  root.style.setProperty("--muted-foreground", hexToHSL(onMuted));
  root.style.setProperty("--border", hexToHSL(border));
  root.style.setProperty("--input", hexToHSL(border));
  root.style.setProperty("--ring", hexToHSL(palette.secondaryColor));

  if (brandPrefix) {
    root.style.setProperty(`--${brandPrefix}-charcoal`, hexToHSL(palette.primaryColor));
    root.style.setProperty(`--${brandPrefix}-blue`, hexToHSL(palette.secondaryColor));
    root.style.setProperty(`--${brandPrefix}-surface`, hexToHSL(palette.mutedColor));
    root.style.setProperty(`--${brandPrefix}-dark-panel`, hexToHSL(adjustHexLightness(palette.primaryColor, -0.08)));
  }
}

export function buildThemeDefaults(
  brand: Pick<ThemeColorFields, "primaryColor" | "secondaryColor">,
  page?: Partial<Pick<ThemeColorFields, "backgroundColor" | "foregroundColor" | "mutedColor">>,
): ThemeColorFields {
  return {
    ...DEFAULT_PAGE_COLORS,
    ...brand,
    ...page,
  };
}
