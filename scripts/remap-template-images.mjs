#!/usr/bin/env node
/**
 * Remap every `images.unsplash.com/photo-<id>` reference in each template's
 * siteData.ts to a template-specific image pool. The goal: each of the 4
 * templates ships with a *distinct* image set so they look like different
 * sites at a glance (not the same template reskinned).
 *
 * Strategy: per template, define a single mapping table { oldId → newId }.
 * Anything not listed is left untouched (e.g. constructo keeps its own set).
 *
 * Image identity per template:
 *   constructo  → corporate construction (skyscrapers, sites, cranes)
 *   summit      → editorial luxury (modernist homes, designer interiors)
 *   nexora      → local roofing contractor (suburban roofs, working roofers)
 *   roofix      → premium roofing (aerial drone, metal roofs, modern)
 *
 * Run: `node scripts/remap-template-images.mjs`
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");

/** Constructo keeps its existing photos — it IS the construction baseline. */
const CONSTRUCTO = {};

/**
 * Summit → editorial luxury modernist architecture & designer interiors.
 * Every Constructo/Nexora/Roofix overlap gets swapped to a modernist home /
 * gallery interior / refined craftsmanship photo.
 */
const SUMMIT = {
  // hero & services (architecture/construction → modern home / interior)
  "photo-1503387762-592deb58ef4e": "photo-1600585154340-be6161a56a0c",
  "photo-1486325212027-8081e485255e": "photo-1600607687939-ce8a6c25118c",
  "photo-1454165804606-c3d57bc86b40": "photo-1600585154526-990dced4db0d",
  "photo-1581094794329-c8112a89af12": "photo-1505691938895-1758d7feb511",
  "photo-1518005068251-37900150dfca": "photo-1505873242700-f289a29e1e0f",
  "photo-1497366216548-37526070297c": "photo-1600210492493-0946911123ea",
  "photo-1497366811353-6870744d04b2": "photo-1556909114-f6e7ad7d3136",
  "photo-1565793298595-6a879b1d9492": "photo-1502672260266-1c1ef2d93688",
  "photo-1566073771259-6a8506099945": "photo-1554995207-c18c203602cb",
  "photo-1545324418-cc1a3fa10c00": "photo-1593696140826-c58b021acf8b",
  "photo-1581092160562-40aa08e2c586": "photo-1502005229762-cf1b2da7c5d6",
  "photo-1519167758481-83f550bb49b3": "photo-1494526585095-c41746248156",
  "photo-1517248135467-4c7edcad34c4": "photo-1416331108676-a22ccb276e35",
  "photo-1504307651254-35680f356dfd": "photo-1556910103-1c02745aae4d",
  "photo-1613490493576-7fde63acd811": "photo-1600566753190-17f0baa2a6c3",
  // portraits → editorial portraits
  "photo-1472099645785-5658abf4ff4e": "photo-1521119989659-a83eee488004",
  "photo-1494790108377-be9c29b29330": "photo-1535713875002-d1d0cf377fde",
  "photo-1507003211169-0a1dd7228f2d": "photo-1517841905240-472988babdf9",
  "photo-1438761681033-6461ffad8d80": "photo-1487412720507-e7ab37603c6f",
  "photo-1500648767791-00dcc994a43e": "photo-1463453091185-61582044d556",
  "photo-1573496359142-b8d87734a5a2": "photo-1544005313-94ddf0286df2",
  "photo-1560250097-0b93528c311a": "photo-1525134479668-1bee5c7c6845",
  "photo-1580489944761-15a19d654956": "photo-1495216875107-c6c043eb703f",
  "photo-1519085360753-af0119f7cbe7": "photo-1531123897727-8f129e1688ce",
};

/**
 * Nexora → bold local roofing contractor. Photos lean to suburban houses,
 * working roofers, storm damage, gutters. Replaces any Constructo-style
 * skyscraper/office photo it still has, and replaces portraits with a
 * different (friendlier / blue-collar) set.
 */
const NEXORA = {
  // any non-roofing leftovers → suburban roofing
  "photo-1450101499163-c8848c66ca85": "photo-1605276374104-dee2a0ed3cd6",
  "photo-1494522855154-9297ac14b55f": "photo-1632759145351-d3866b2151a1",
  "photo-1568605117036-5fe5e7bab0b7": "photo-1591588582259-e675bd2e6088",
  "photo-1597222909672-83c9c47e2cdf": "photo-1613977257592-4871e5fcd7c4",
  "photo-1605007493699-af65834f8a00": "photo-1558618666-fcd25c85cd64",
  "photo-1564013799919-ab600027ffc6": "photo-1632759145355-e9d2c00ec600",
  "photo-1518780664697-55e3ad937233": "photo-1545158539-1709d5b8f7d2",
  // portraits → friendlier "local crew" portraits
  "photo-1494790108377-be9c29b29330": "photo-1559548331-f9cb98001426",
  "photo-1507003211169-0a1dd7228f2d": "photo-1568602471122-7832951cc4c5",
  "photo-1438761681033-6461ffad8d80": "photo-1573497019418-b400bb3ab074",
  "photo-1500648767791-00dcc994a43e": "photo-1542596594-649edbc13630",
  "photo-1573496359142-b8d87734a5a2": "photo-1582750433449-648ed127bb54",
  "photo-1519085360753-af0119f7cbe7": "photo-1610414861048-d2b8a8f57921",
};

/**
 * Roofix → sleek premium roofing. Aerial drone shots, metal roofs, modern
 * homes. Replaces any overlap with Nexora's suburban roofing imagery with
 * a more cinematic / metal-roof / drone aesthetic.
 */
const ROOFIX = {
  // roofing photos that overlap Nexora → premium/aerial variants
  "photo-1605276374104-dee2a0ed3cd6": "photo-1597047084897-51e81819a499",
  "photo-1568438350562-2cae6d394ad0": "photo-1518780664697-55e3ad937233",
  "photo-1591588582259-e675bd2e6088": "photo-1564013799919-ab600027ffc6",
  "photo-1558618666-fcd25c85cd64": "photo-1518005068251-37900150dfca",
  "photo-1613977257592-4871e5fcd7c4": "photo-1600585154526-990dced4db0d",
  "photo-1545158539-1709d5b8f7d2": "photo-1605007493699-af65834f8a00",
  "photo-1632759145351-d3866b2151a1": "photo-1597222909672-83c9c47e2cdf",
  // portraits → studio-style premium portraits (different from constructo/summit/nexora)
  "photo-1472099645785-5658abf4ff4e": "photo-1539571696357-5a69c17a67c6",
  "photo-1494790108377-be9c29b29330": "photo-1551836022-d5d88e9218df",
  "photo-1507003211169-0a1dd7228f2d": "photo-1521146764736-56c929d59c83",
  "photo-1438761681033-6461ffad8d80": "photo-1502823403499-6ccfcf4fb453",
  "photo-1500648767791-00dcc994a43e": "photo-1492562080023-ab3db95bfbce",
  "photo-1486325212027-8081e485255e": "photo-1583608205776-bfd35f0d9f83",
  "photo-1519085360753-af0119f7cbe7": "photo-1542596594-649edbc13630",
  "photo-1560250097-0b93528c311a": "photo-1559717201-fbb671ff56b7",
  "photo-1580489944761-15a19d654956": "photo-1496440737103-cd596325d314",
  "photo-1573496359142-b8d87734a5a2": "photo-1582750433449-648ed127bb54",
};

const TEMPLATES = [
  { dir: "src/template/data/siteData.ts", map: CONSTRUCTO, name: "constructo" },
  { dir: "src/template-summit/data/siteData.ts", map: SUMMIT, name: "summit" },
  { dir: "src/template-nexora/data/siteData.ts", map: NEXORA, name: "nexora" },
  { dir: "src/template-roofix/data/siteData.ts", map: ROOFIX, name: "roofix" },
];

let totalChanged = 0;
for (const { dir, map, name } of TEMPLATES) {
  const file = path.join(ROOT, dir);
  let src = fs.readFileSync(file, "utf8");
  let changed = 0;
  for (const [oldId, newId] of Object.entries(map)) {
    const re = new RegExp(oldId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    const before = src;
    src = src.replace(re, newId);
    if (src !== before) {
      const hits = before.split(oldId).length - 1;
      changed += hits;
    }
  }
  fs.writeFileSync(file, src, "utf8");
  console.log(`[${name}] replaced ${changed} image refs in ${dir}`);
  totalChanged += changed;
}
console.log(`Total: ${totalChanged} image refs remapped across 4 templates.`);
