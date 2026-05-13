import { useMemo, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@template-nexora/components/layout/Layout";
import PageHeader from "@template-nexora/components/sections/PageHeader";
import PaginationControls from "@template-nexora/components/layout/PaginationControls";
import Reveal from "@template-nexora/components/animations/Reveal";
import { BLOG_POSTS, BLOG_LIST_PAGE_SIZE, getBlogCategoryCounts } from "@template-nexora/data/siteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { clampPage, parsePageParam, slicePage, totalPages as totalPagesCount } from "@template-nexora/lib/pagination";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";

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

  const showFeatured = listPage === 1 && featured !== null;

  const titleBase = `News | ${COMPANY.name}`;
  const docTitle = listPage > 1 ? `${titleBase} | Page ${listPage}` : titleBase;

  return (
    <Layout>
      <Helmet>
        <title>{docTitle}</title>
        <meta name="description" content={`Insights on architecture, building, and industry news from ${COMPANY.name}.`} />
      </Helmet>

      <Reveal direction="zoom" duration={650}>
        <PageHeader
          eyebrow="NEWS"
          title="Blog"
          subtitle="Insights on modern architecture, sustainable building practices, and industry news from the CONSTRUCTO team."
        />
      </Reveal>

      {sectionVisibility["blog.main"] && <Reveal delay={70}>
        <section className="section-padding bg-background border-t border-border">
        <div className="container-custom px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-14">
            <div className="lg:col-span-2 space-y-12">
              {showFeatured && (
                <article className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <span className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground text-[10px] font-black tracking-widest px-3 py-1.5">
                      FEATURED
                    </span>
                    <img
                      src={featured!.image}
                      alt=""
                      className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {featured!.date} <span className="mx-2">•</span> {featured!.category.toUpperCase()}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{featured!.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{featured!.excerpt}</p>
                  <Link
                    to={`/blog/${featured!.id}`}
                    className="inline-flex items-center gap-2 font-bold text-secondary hover:underline text-sm tracking-wide"
                  >
                    READ FULL STORY <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              )}

              {!showFeatured && listPosts.length === 0 && (
                <p className="text-muted-foreground py-8">No articles match your filters.</p>
              )}

              <div className="space-y-10">
                {listPosts.map(post => (
                  <article key={post.id} className="group flex flex-col sm:flex-row gap-6 border-b border-border pb-10 last:border-0">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full sm:w-44 h-44 sm:h-32 object-cover rounded-xl shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {post.category.toUpperCase()} · {post.date}
                      </p>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-foreground hover:text-secondary"
                      >
                        READ MORE <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <PaginationControls page={listPage} totalPages={listPageCount} searchParams={searchParams} />
            </div>

            <aside className="space-y-8 lg:pt-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles…"
                  className="pl-10 bg-muted/50 border-border"
                  value={q}
                  onChange={e => setQ(e.target.value)}
                />
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-4 text-sm tracking-wide">Categories</h3>
                <ul className="space-y-2">
                  {categoryRows.map(c => (
                    <li key={c.label}>
                      <button
                        type="button"
                        onClick={() => setActiveCat(activeCat === c.label ? null : c.label)}
                        className={`w-full flex justify-between text-sm py-1.5 border-b border-border/60 transition-colors ${
                          activeCat === c.label ? "text-secondary font-semibold" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>{c.label}</span>
                        <span className="opacity-60">({c.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-secondary p-6 text-secondary-foreground">
                <h3 className="font-bold text-lg mb-2">Need help with a project?</h3>
                <p className="text-sm opacity-95 mb-5 leading-relaxed">Tell us your timeline, and we&apos;ll propose next steps within one business day.</p>
                <Button asChild className="w-full rounded-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/contact">REQUEST ESTIMATE</Link>
                </Button>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-4 text-sm tracking-wide">Recent Posts</h3>
                <ul className="space-y-4">
                  {BLOG_POSTS.slice(0, 3).map(p => (
                    <li key={p.id}>
                      <Link to={`/blog/${p.id}`} className="flex gap-3 group">
                        <img src={p.image} alt="" className="w-14 h-14 rounded object-cover shrink-0" loading="lazy" />
                        <span className="text-sm font-semibold text-foreground group-hover:text-secondary leading-snug line-clamp-2">
                          {p.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-3 text-sm tracking-wide">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {BLOG_TAGS.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
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
      </Reveal>}

      {sectionVisibility["blog.subscribe"] && <Reveal delay={120}>
        <section className="py-14 bg-muted/60 border-t border-border">
        <div className="container-custom px-4 md:px-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="font-bold text-foreground text-lg mb-1">Subscribe to our newsletter</h2>
            <p className="text-sm text-muted-foreground">Occasional updates, no spam.</p>
          </div>
          <form
            className="flex flex-col sm:flex-row gap-2 flex-1"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <Input type="email" required placeholder="Email address" className="bg-background" />
            <Button type="submit" className="rounded-sm font-bold bg-secondary text-secondary-foreground shrink-0">
              SUBSCRIBE
            </Button>
          </form>
        </div>
        </section>
      </Reveal>}
    </Layout>
  );
};

export default Blog;
