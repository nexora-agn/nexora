import { useMemo, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@template-tire-shop/components/layout/Layout";
import HarborPageHero from "@template-tire-shop/components/sections/HarborPageHero";
import PaginationControls from "@template-tire-shop/components/layout/PaginationControls";
import {
  BLOG_POSTS,
  BLOG_LIST_PAGE_SIZE,
  HOME_BUILDER_IMAGES,
  getBlogCategoryCounts,
} from "@template-tire-shop/data/siteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { clampPage, parsePageParam, slicePage, totalPages as totalPagesCount } from "@template-tire-shop/lib/pagination";
import { useSiteContent } from "@template-tire-shop/contexts/SiteContentContext";

const Blog = () => {
  const { sectionVisibility, company: COMPANY, blogTags: BLOG_TAGS } = useSiteContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const skipFilterEffect = useRef(true);

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter(p => {
      const matchesQ =
        !q.trim() ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(q.toLowerCase());
      const matchesCat = !activeCat || p.category === activeCat;
      return matchesQ && matchesCat;
    });
  }, [q, activeCat]);

  const featured = filtered.length > 0 ? filtered[0] : null;
  const remainder = filtered.length > 1 ? filtered.slice(1) : [];

  const listPageCount = totalPagesCount(remainder.length, BLOG_LIST_PAGE_SIZE);
  const rawPage = parsePageParam(searchParams.get("page"));
  const listPage = clampPage(rawPage, listPageCount);
  const listPosts = slicePage(remainder, listPage, BLOG_LIST_PAGE_SIZE);
  const categoryRows = useMemo(() => getBlogCategoryCounts(), []);
  const showFeatured = listPage === 1 && featured !== null;

  useEffect(() => {
    if (skipFilterEffect.current) {
      skipFilterEffect.current = false;
      return;
    }
    setSearchParams(prev => {
      const n = new URLSearchParams(prev);
      n.delete("page");
      return n;
    }, { replace: true });
  }, [q, activeCat, setSearchParams]);

  useEffect(() => {
    if (rawPage === listPage) return;
    setSearchParams(prev => {
      const n = new URLSearchParams(prev);
      if (listPage <= 1) n.delete("page");
      else n.set("page", String(listPage));
      return n;
    }, { replace: true });
  }, [rawPage, listPage, setSearchParams]);

  const titleBase = `Design-Build Blog | ${COMPANY.name}`;
  const docTitle = listPage > 1 ? `${titleBase} | Page ${listPage}` : titleBase;

  return (
    <Layout>
      <Helmet>
        <title>{docTitle}</title>
        <meta
          name="description"
          content={`home building, safety guides, and Central NJ homeowner advice from the ${COMPANY.name} design-build team.`}
        />
      </Helmet>

      <HarborPageHero
        eyebrow="Design-Build Blog"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        title="Power Tips & Field Notes"
        body="Honest painting advice from licensed design-build team — drains, water heaters, surge protection, and safety tips for Central New Jersey homeowners."
        image={HOME_BUILDER_IMAGES.blogHero}
        imageAlt="painting blog"
      />

      {sectionVisibility["blog.main"] ? (
        <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-14">
              <div className="lg:col-span-2 space-y-12">
                {showFeatured && featured ? (
                  <article className="group">
                    <div className="relative overflow-hidden rounded-lg mb-6">
                      <span className="absolute top-4 left-4 z-10 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] text-[10px] font-display font-bold tracking-widest px-3 py-1.5 uppercase">
                        Featured
                      </span>
                      <img
                        src={featured.image}
                        alt=""
                        className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mb-2">
                      {featured.date} <span className="mx-2">·</span> {featured.category.toUpperCase()}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-4">{featured.excerpt}</p>
                    <Link
                      to={`/blog/${featured.id}`}
                      className="inline-flex items-center gap-2 font-display font-bold text-[hsl(var(--secondary))] hover:underline text-sm tracking-wide uppercase"
                    >
                      Read Full Article <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                ) : null}

                {!showFeatured && listPosts.length === 0 ? (
                  <p className="text-slate-500 py-8">No articles match your filters.</p>
                ) : null}

                <div className="space-y-10">
                  {listPosts.map(post => (
                    <article
                      key={post.id}
                      className="group flex flex-col sm:flex-row gap-6 border-b border-slate-200 pb-10 last:border-0"
                    >
                      <img
                        src={post.image}
                        alt=""
                        className="w-full sm:w-44 h-44 sm:h-32 object-cover rounded-lg shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-xs text-slate-500 mb-1">
                          {post.category.toUpperCase()} · {post.date}
                        </p>
                        <h3 className="font-display text-lg font-bold text-[hsl(var(--primary))] mb-2 group-hover:text-[hsl(var(--secondary))] transition-colors">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-3">{post.excerpt}</p>
                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center gap-1 text-sm font-display font-bold text-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))] uppercase tracking-wide"
                        >
                          Read More <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                <PaginationControls page={listPage} totalPages={listPageCount} searchParams={searchParams} />
              </div>

              <aside className="space-y-8 lg:pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search articles…"
                    className="pl-10 bg-white border-slate-200"
                    value={q}
                    onChange={e => setQ(e.target.value)}
                  />
                </div>

                <div>
                  <h3 className="font-display font-bold text-[hsl(var(--primary))] mb-4 text-sm tracking-wide uppercase">
                    Categories
                  </h3>
                  <ul className="space-y-2">
                    {categoryRows.map(c => (
                      <li key={c.label}>
                        <button
                          type="button"
                          onClick={() => setActiveCat(activeCat === c.label ? null : c.label)}
                          className={`w-full flex justify-between text-sm py-1.5 border-b border-slate-200 transition-colors ${
                            activeCat === c.label
                              ? "text-[hsl(var(--secondary))] font-semibold"
                              : "text-slate-500 hover:text-[hsl(var(--primary))]"
                          }`}
                        >
                          <span>{c.label}</span>
                          <span className="opacity-60">({c.count})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-[hsl(var(--primary))] p-6 text-white">
                  <h3 className="font-display font-bold text-lg mb-2">Need an painter?</h3>
                  <p className="text-sm text-white/85 mb-5 leading-relaxed">
                    Free estimates from licensed design-build team. Same-day service across Central NJ.
                  </p>
                  <Button asChild className="w-full rounded-sm font-display font-bold uppercase bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/90">
                    <Link to="/contact">Request Estimate</Link>
                  </Button>
                </div>

                <div>
                  <h3 className="font-display font-bold text-[hsl(var(--primary))] mb-4 text-sm tracking-wide uppercase">
                    Recent Posts
                  </h3>
                  <ul className="space-y-4">
                    {BLOG_POSTS.slice(0, 3).map(p => (
                      <li key={p.id}>
                        <Link to={`/blog/${p.id}`} className="flex gap-3 group">
                          <img src={p.image} alt="" className="w-14 h-14 rounded object-cover shrink-0" loading="lazy" />
                          <span className="text-sm font-semibold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] leading-snug line-clamp-2">
                            {p.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display font-bold text-[hsl(var(--primary))] mb-3 text-sm tracking-wide uppercase">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {BLOG_TAGS.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-display font-bold tracking-wider px-2.5 py-1 rounded-full bg-white text-slate-600 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ) : null}
    </Layout>
  );
};

export default Blog;
