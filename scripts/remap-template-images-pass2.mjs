#!/usr/bin/env node
/**
 * Second-pass remap to eliminate the final 7 image overlaps across
 * templates after the initial remap. Each remaining shared id is moved
 * to a template-exclusive replacement so all 4 templates ship with a
 * non-overlapping image pool.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");

/** Nexora gives up its single overlap with constructo. */
const NEXORA = {
  "photo-1497366216548-37526070297c": "photo-1568438350562-2cae6d394ad0",
};

/** Roofix gives up 6 overlaps (with constructo / nexora / summit). */
const ROOFIX = {
  "photo-1518005068251-37900150dfca": "photo-1542621334-a254cf47733d",
  "photo-1542596594-649edbc13630": "photo-1633332755192-727a05c4013d",
  "photo-1545324418-cc1a3fa10c00": "photo-1570129477492-45c003edd2be",
  "photo-1582750433449-648ed127bb54": "photo-1538108149393-fbbd81895907",
  "photo-1600585154526-990dced4db0d": "photo-1626885930974-4b69aa21bbf9",
  "photo-1632759145355-e9d2c00ec600": "photo-1572120360610-d971b9d7767c",
};

const TEMPLATES = [
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
    if (src !== before) changed += before.split(oldId).length - 1;
  }
  fs.writeFileSync(file, src, "utf8");
  console.log(`[${name}] replaced ${changed} refs`);
  totalChanged += changed;
}
console.log(`Pass-2: ${totalChanged} refs swapped.`);
