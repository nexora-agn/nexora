import {
  Home,
  Building,
  Building2,
  Paintbrush,
  Palette,
  Hammer,
  Layers,
  Fence,
  Droplets,
  Ruler,
  Sparkles,
  Grid3x3,
  Box,
  ShieldCheck,
  Star,
  Eye,
  Tag,
  Award,
  Heart,
  Clock,
  Sun,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/** Lucide icons for painting services. */
export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Building,
  Building2,
  Paintbrush,
  Palette,
  Hammer,
  Layers,
  Fence,
  Droplets,
  Ruler,
  Sparkles,
  Grid3x3,
  Box,
  ShieldCheck,
  Star,
  Eye,
  Tag,
  Award,
  Heart,
  Clock,
  Sun,
  TrendingUp,
};

export const DEFAULT_SERVICE_ICON: LucideIcon = Paintbrush;

export function getServiceIcon(name: string | undefined): LucideIcon {
  if (!name) return DEFAULT_SERVICE_ICON;
  return SERVICE_ICON_MAP[name] ?? DEFAULT_SERVICE_ICON;
}
