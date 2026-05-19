import {
  Flame,
  Droplets,
  Thermometer,
  Search,
  Waves,
  Wrench,
  Bath,
  Sparkles,
  ShowerHead,
  Home,
  Hammer,
  type LucideIcon,
} from "lucide-react";

/** Lucide icons for plumbing services — no electrical icons. */
export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Flame,
  Droplets,
  Thermometer,
  Search,
  Waves,
  Wrench,
  Bath,
  Sparkles,
  ShowerHead,
  Home,
  Hammer,
};

export const DEFAULT_SERVICE_ICON: LucideIcon = Wrench;

export function getServiceIcon(name: string | undefined): LucideIcon {
  if (!name) return DEFAULT_SERVICE_ICON;
  return SERVICE_ICON_MAP[name] ?? DEFAULT_SERVICE_ICON;
}
