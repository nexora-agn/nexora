#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CANONICAL_ORIGIN, INDEXABLE_PATHS, INDEXABLE_BLOG_SLUGS } from "./seo-routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(__dirname, "..", "public", "sitemap.xml");

const lastmod = new Date().toISOString().slice(0, 10);

const urls = [
  ...INDEXABLE_PATHS.map(pathname => ({
    loc: `${CANONICAL_ORIGIN}${pathname === "/" ? "/" : pathname}`,
    priority: pathname === "/" ? "1.0" : pathname.split("/").length === 2 ? "0.8" : "0.7",
  })),
  ...INDEXABLE_BLOG_SLUGS.map(slug => ({
    loc: `${CANONICAL_ORIGIN}/blog/${slug}`,
    priority: "0.6",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    item => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(outFile, xml);
console.log(`[sitemap] Wrote ${urls.length} URLs to ${outFile}`);
