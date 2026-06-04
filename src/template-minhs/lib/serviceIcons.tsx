import {
  Droplets,
  CircleDot,
  Cog,
  Cpu,
  Calendar,
  Wrench,
  Zap,
  ClipboardCheck,
  Gauge,
  Hammer,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  Droplets,
  CircleDot,
  Cog,
  Cpu,
  Calendar,
  Wrench,
  Zap,
  ClipboardCheck,
  Gauge,
  Hammer,
};

export const DEFAULT_SERVICE_ICON: LucideIcon = Wrench;

export function getServiceIcon(name: string | undefined): LucideIcon {
  if (!name) return DEFAULT_SERVICE_ICON;
  return SERVICE_ICON_MAP[name] ?? DEFAULT_SERVICE_ICON;
}
