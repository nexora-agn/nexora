import type { ComponentType } from "react";
import { getTemplateByChirpsSlug } from "@/lib/templates";

export type TemplateShowcaseModule = ComponentType<{ chirpsSlug: string }>;

const LOADERS: Record<string, () => Promise<{ default: TemplateShowcaseModule }>> = {
  constructo: () => import("@template/showcase"),
  summit: () => import("@template-summit/showcase"),
  nexora: () => import("@template-nexora/showcase"),
  roofix: () => import("@template-roofix/showcase"),
  electrical: () => import("@template-electrical/showcase"),
  plumbing: () => import("@template-plumbing/showcase"),
  familyfirst: () => import("@template-familyfirst/showcase"),
  painting: () => import("@template-painting/showcase"),
  landscaping: () => import("@template-landscaping/showcase"),
  homebuilder: () => import("@template-homebuilder/showcase"),
  remodeler: () => import("@template-remodeler/showcase"),
  mrbuildernyc: () => import("@template-mrbuildernyc/showcase"),
  minhs: () => import("@template-minhs/showcase"),
};

export async function loadTemplateShowcase(slug: string): Promise<TemplateShowcaseModule | null> {
  const template = getTemplateByChirpsSlug(slug);
  if (!template) return null;
  const loader = LOADERS[template.id];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
