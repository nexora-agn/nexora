import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import Layout from "@template-roofix/components/layout/Layout";
import Reveal from "@template-roofix/components/animations/Reveal";
import { useSiteContent } from "@template-roofix/contexts/SiteContentContext";
import { BLOG_POSTS } from "@template-roofix/data/siteData";
import { cn } from "@/lib/utils";

/** Summit Blog. Distinct from Constructo's featured + sidebar + newsletter pattern.
 *  Archetypes:
 *  1. Stat-led split hero
 *  2. Editor's picks grid (3 covers)
 *  3. Topic mega-chips strip
 *  4. Asymmetric story column with reading-time bars
 *  5. Page-unique footer line (no newsletter form) */

function readingTime(content: string): { minutes: number; pct: number } {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  const pct = Math.min(100, Math.round((minutes / 8) * 100));
  return { minutes, pct };
}

const Blog = () => {
  const { company: COMPANY } = useSiteContent();
  const blogPosts = BLOG_POSTS;
  const categories = useMemo(() => {
    const map = new Map<string, number>();
    blogPosts.forEach(p => map.set(p.category, (map.get(p.category) || 0) + 1));
    return [
      { label: "All topics", count: blogPosts.length, key: "__all" },
      ...Array.from(map.entries()).map(([label, count]) => ({
        label,
        count,
        key: label,
      })),
    ];
  }, [blogPosts]);

  const [topic, setTopic] = useState<string>("__all");
  const filtered = useMemo(
    () =>
      topic === "__all"
        ? blogPosts
        : blogPosts.filter(p => p.category === topic),
    [blogPosts, topic],
  );

  const editorsPicks = blogPosts.slice(0, 3);

  return (
    <Layout>
      <Helmet>
        <title>Field journal | {COMPANY.name}</title>
        <meta
          name="description"
          content={`The ${COMPANY.name} field journal — notes from the site, the office, and the trade.`}
        />
      </Helmet>

      {/* 1 — Stat-led split hero */}
      <section className="bg-background border-b border-border">
        <div className="container-custom px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.28em] text-secondary mb-4">
              FIELD JOURNAL · {blogPosts.length} ENTRIES
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight leading-[1.02] text-primary">
              Notes from
              <br />
              <span className="text-secondary">the site.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed">
              Honest writing from people who pour concrete for a living.
              Lessons we learned the hard way, posted so the next owner doesn't
              have to.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            {[
              { v: "8 min", l: "Avg. read" },
              { v: "Twice / mo", l: "Cadence" },
              { v: "0 ads", l: "Always" },
            ].map(s => (
              <div
                key={s.l}
                className="rounded-xl bg-primary text-primary-foreground p-4"
              >
                <div className="text-xl md:text-2xl font-black text-secondary leading-none">
                  {s.v}
                </div>
                <div className="mt-2 text-[10px] font-bold tracking-widest uppercase text-white/75 leading-tight">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Editor's picks */}
      {editorsPicks.length > 0 && (
        <Reveal>
          <section className="bg-muted/40 py-14 md:py-20 border-b border-border">
            <div className="container-custom px-4 md:px-8">
              <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-6">
                EDITOR'S PICKS
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {editorsPicks.map((post, i) => {
                const { minutes, pct } = readingTime(post.content);
                return (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group relative flex flex-col rounded-2xl overflow-hidden ring-1 ring-black/5 bg-card h-full"
                  >
                    <div className="relative aspect-[5/3] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/55 to-transparent" />
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground px-2.5 py-1 text-[10px] font-black tracking-widest uppercase">
                        Pick {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="p-5 md:p-6">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                        {post.category}
                      </p>
                      <h3 className="mt-2 text-lg md:text-xl font-black uppercase tracking-tight text-primary leading-snug group-hover:text-secondary transition-colors break-words">
                        {post.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {minutes} min
                        </span>
                        <div className="flex-1 h-[3px] bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-secondary"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* 3 — Topic mega-chips */}
      <section className="bg-background pt-12 md:pt-16">
        <div className="container-custom px-4 md:px-8">
          <p className="text-xs font-bold tracking-[0.22em] text-secondary mb-4">
            FILTER BY TOPIC
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c.key}
                type="button"
                onClick={() => setTopic(c.key)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold tracking-widest uppercase border-2 transition-colors",
                  topic === c.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/80 hover:border-secondary/60 hover:text-secondary",
                )}
              >
                {c.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                    topic === c.key
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {c.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Asymmetric story column with reading-time bars */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-16 text-center">
              <p className="text-sm text-muted-foreground">
                No entries in that topic yet.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {filtered.map((post, i) => {
                const { minutes, pct } = readingTime(post.content);
                const flip = i % 2 === 1;
                return (
                  <li key={post.id}>
                    <Link
                      to={`/blog/${post.id}`}
                      className={cn(
                        "group grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7 rounded-2xl bg-card border border-border p-4 md:p-5 hover:border-secondary/60 hover:shadow-md transition-all",
                      )}
                    >
                      <div
                        className={cn(
                          "md:col-span-4 relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-black/5",
                          flip && "md:order-2",
                        )}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                      </div>
                      <div
                        className={cn(
                          "md:col-span-8 flex flex-col justify-between gap-3",
                          flip && "md:order-1",
                        )}
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 text-secondary px-2 py-0.5">
                              {post.category}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {post.date}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <User className="h-3 w-3" /> {post.author}
                            </span>
                          </div>
                          <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight text-primary leading-tight group-hover:text-secondary transition-colors">
                            {post.title}
                          </h2>
                          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 max-w-xs">
                            <div className="h-1 bg-border rounded-full overflow-hidden">
                              <div
                                className="h-full bg-secondary rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                              <Clock className="h-3 w-3" /> {minutes} min read
                            </span>
                          </div>
                          <span className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* 5 — Page-unique closing line (NOT a newsletter form) */}
      <section className="bg-primary text-primary-foreground border-t border-secondary/30">
        <div className="container-custom px-4 md:px-8 py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-secondary mb-2">
              No newsletter. No tracking.
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
              When we publish, we tell our crew first.
            </h2>
            <p className="mt-2 text-sm text-white/75 max-w-xl leading-relaxed">
              If you're an owner, architect, or sub who'd like a heads-up on the
              next entry, drop us a line and we'll add you to a short, plain
              email list — no campaign software, no unsubscribe lawyers.
            </p>
          </div>
          <Link
            to="/contact"
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-md bg-secondary text-secondary-foreground px-6 py-3 text-sm font-extrabold tracking-widest uppercase hover:bg-secondary/90 transition-colors"
          >
            ASK FOR THE LIST
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
