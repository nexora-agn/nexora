import {
  Home,
  Building,
  Building2,
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
  Trees,
  TreePine,
  Leaf,
  Shovel,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Building,
  Building2,
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
  Trees,
  TreePine,
  Leaf,
  Shovel,
};

export const DEFAULT_SERVICE_ICON: LucideIcon = Leaf;

export function getServiceIcon(name: string | undefined): LucideIcon {
  if (!name) return DEFAULT_SERVICE_ICON;
  return SERVICE_ICON_MAP[name] ?? DEFAULT_SERVICE_ICON;
}
