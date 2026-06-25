import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { Grid3X3, List, Map, GitCompare } from "lucide-react";
import Layout from "@template-restaurant/components/layout/Layout";
import PaginationControls from "@template-restaurant/components/layout/PaginationControls";
import { PropertyCard } from "@template-restaurant/components/home/FeaturedListings";
import LuxuryCTA from "@template-restaurant/components/home/LuxuryCTA";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import { LISTINGS_PAGE_SIZE } from "@template-restaurant/data/siteData";
import { clampPage, parsePageParam, slicePage, totalPages as totalPagesCount } from "@template-restaurant/lib/pagination";
import { getCompareList } from "@template-restaurant/lib/propertyCompare";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list" | "map";

const Listings = () => {
  const { projects, projectsPageStats, company: COMPANY } = useSiteContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<ViewMode>("grid");
  const [sort, setSort] = useState("newest");
  const [compareCount, setCompareCount] = useState(getCompareList().length);

  const listingType = searchParams.get("type") || "all";
  const propertyType = searchParams.get("propertyType") || "all";

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    let list = [...projects];
    if (filter !== "All") list = list.filter(p => p.category === filter);
    if (listingType === "buy") list = list.filter(p => (p as { listingType?: string }).listingType === "buy");
    if (listingType === "rent") list = list.filter(p => (p as { listingType?: string }).listingType === "rent");
    if (propertyType !== "all") list = list.filter(p => (p as { propertyType?: string }).propertyType === propertyType);
    if (sort === "price-asc") list.sort((a, b) => ((a as { price?: number }).price || 0) - ((b as { price?: number }).price || 0));
    if (sort === "price-desc") list.sort((a, b) => ((b as { price?: number }).price || 0) - ((a as { price?: number }).price || 0));
    return list;
  }, [projects, filter, listingType, propertyType, sort]);

  const pageCount = totalPagesCount(filtered.length, LISTINGS_PAGE_SIZE);
  const rawPage = parsePageParam(searchParams.get("page"));
  const page = clampPage(rawPage, pageCount);
  const pageListings = slicePage(filtered, page, LISTINGS_PAGE_SIZE);

  useEffect(() => {
    if (rawPage === page) return;
    setSearchParams(prev => {
      const n = new URLSearchParams(prev);
      if (page <= 1) n.delete("page");
      else n.set("page", String(page));
      return n;
    }, { replace: true });
  }, [rawPage, page, setSearchParams]);

  useEffect(() => {
    const interval = setInterval(() => setCompareCount(getCompareList().length), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Listings | {COMPANY.name}</title>
        <meta name="description" content={`Browse luxury properties — ${COMPANY.name}`} />
      </Helmet>

      <section className="bg-[hsl(var(--primary))] text-white pt-32 pb-16">
        <div className="container-custom container-inset">
          <p className="luxury-eyebrow text-[hsl(var(--secondary))] mb-3">Portfolio</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium mb-6">Property Listings</h1>
          <div className="flex flex-wrap gap-8">
            {projectsPageStats.map(s => (
              <div key={s.label}>
                <p className="font-display text-2xl text-[hsl(var(--secondary))]">{s.value}</p>
                <p className="text-xs uppercase tracking-wider text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom container-inset py-10">
        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "px-4 py-2 text-xs uppercase tracking-wider border transition-colors",
                  filter === c ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-border hover:border-[hsl(var(--secondary))]",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="h-10 px-3 border border-border text-sm bg-white"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <div className="flex border border-border">
              {([["grid", Grid3X3], ["list", List], ["map", Map]] as const).map(([mode, Icon]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setView(mode)}
                  className={cn("p-2.5", view === mode ? "bg-[hsl(var(--primary))] text-white" : "hover:bg-[hsl(var(--muted))]")}
                  aria-label={mode}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            {compareCount > 0 && (
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[hsl(var(--secondary))]">
                <GitCompare className="h-4 w-4" /> {compareCount} to compare
              </span>
            )}
          </div>
        </div>

        {view === "map" ? (
          <div className="aspect-[16/9] bg-[hsl(var(--muted))] flex items-center justify-center border border-border">
            <p className="text-muted-foreground">Interactive map — {filtered.length} properties</p>
          </div>
        ) : (
          <div className={cn("grid gap-8", view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1")}>
            {pageListings.map(listing => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {pageCount > 1 && (
          <PaginationControls page={page} pageCount={pageCount} basePath="/listings" />
        )}

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No properties match your criteria.</p>
        )}
      </section>

      <LuxuryCTA />
    </Layout>
  );
};

export default Listings;
