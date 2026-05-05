import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Quote,
  Linkedin,
  Twitter,
  Hash,
} from "lucide-react";
import Layout from "@template-summit/components/layout/Layout";
import Reveal from "@template-summit/components/animations/Reveal";
import { useSiteContent } from "@template-summit/contexts/SiteContentContext";
import { BLOG_POSTS } from "@template-summit/data/siteData";
import { cn } from "@/lib/utils";

/** Summit BlogPost. Distinct from Constructo's `PageHeader + meta + paragraphs + 2-up related`.
 *  Archetypes:
 *  1. Image-bleed banner with reading-time meter (no PageHeader)
 *  2. Three-column body: sticky takeaways · article with drop-cap & pull quote · TOC rail
 *  3. Rich author card with quick links
 *  4. Cross-link strip (related entries) — single horizontal row, not 2-up muted block */

function readingTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const BlogPost = () => {
  const { id } = useParams();
  const { company: COMPANY } = useSiteContent();
  const blogPosts = BLOG_POSTS;
  const post = blogPosts.find(p => p.id === id);

  const paragraphs = useMemo(
    () => (post ? post.content.split(/\n\n+/).filter(Boolean) : []),
    [post],
  );

  const takeaways = useMemo(() => {
    if (!post) return [];
    return paragraphs.slice(0, 4).map((p, i) => {
      const trimmed = p.trim();
      const idx = trimmed.search(/[.!?]/);
      const sentence = idx > 0 ? trimmed.slice(0, idx + 1) : trimmed.slice(0, 110);
      return { id: i, text: sentence.length > 130 ? sentence.slice(0, 127) + "…" : sentence };
    });
  }, [paragraphs, post]);

  const related = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter(p => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [blogPosts, post]);

  if (!post) return <Navigate to="/blog" replace />;

  const minutes = readingTime(post.content);
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;

  return (
    <Layout>
      <Helmet>
        <title>
          {post.title} | {COMPANY.name}
        </title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* 1 — Image-bleed banner with reading-time meter */}
      <section className="relative isolate bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt=""
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/85 to-primary" />
        </div>
        <div className="relative container-custom px-4 md:px-8 pt-14 md:pt-20 pb-16 md:pb-24">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/70 hover:text-secondary mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Field journal
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold tracking-widest uppercase mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground px-3 py-1">
              <Hash className="h-3 w-3" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/85">
              <Calendar className="h-3 w-3 text-secondary" /> {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/85">
              <User className="h-3 w-3 text-secondary" /> {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/85">
              <Clock className="h-3 w-3 text-secondary" /> {minutes} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[1.04] max-w-4xl">
            {post.title}
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/85 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* 2 — Three-column body */}
      <section className="bg-background section-padding">
        <div className="container-custom px-4 md:px-8 grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left rail — sticky takeaways */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="lg:sticky lg:top-32">
              <p className="text-[10px] font-black tracking-widest uppercase text-secondary mb-3">
                Key takeaways
              </p>
              <ol className="space-y-3 border-l-2 border-border pl-4">
                {takeaways.map((t, i) => (
                  <li
                    key={t.id}
                    className="relative -ml-[18px] pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-secondary"
                  >
                    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-foreground/85 leading-snug mt-1">
                      {t.text}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-7 rounded-xl bg-primary text-primary-foreground p-5">
                <p className="text-[10px] font-black tracking-widest uppercase text-secondary mb-1">
                  Word count
                </p>
                <p className="text-2xl font-black tabular-nums">
                  {wordCount.toLocaleString()}
                </p>
                <p className="mt-1 text-[11px] text-white/70 leading-snug">
                  Roughly {minutes} minutes at a coffee-shop pace.
                </p>
              </div>
            </div>
          </aside>

          {/* Article — drop-cap + pull quote */}
          <article className="lg:col-span-6 order-1 lg:order-2">
            <div className="prose-summit max-w-none">
              {paragraphs.map((p, i) => {
                if (i === 1 && paragraphs.length >= 3) {
                  return (
                    <figure
                      key={i}
                      className="my-10 rounded-2xl border-l-[5px] border-secondary bg-muted/40 p-6 md:p-8"
                    >
                      <Quote
                        className="h-8 w-8 text-secondary mb-3"
                        aria-hidden
                      />
                      <blockquote className="text-lg md:text-xl font-bold text-primary leading-snug tracking-tight">
                        {p}
                      </blockquote>
                      <figcaption className="mt-4 text-[10px] font-black tracking-widest uppercase text-muted-foreground">
                        — Pulled from this entry
                      </figcaption>
                    </figure>
                  );
                }
                if (i === 0) {
                  const first = p.trimStart();
                  const dropChar = first.charAt(0);
                  const rest = first.slice(1);
                  return (
                    <p
                      key={i}
                      className="text-base md:text-lg leading-relaxed text-foreground/90 mb-6"
                    >
                      <span className="float-left mr-3 mt-1 text-6xl md:text-7xl font-black uppercase leading-none text-secondary">
                        {dropChar}
                      </span>
                      {rest}
                    </p>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-base md:text-lg leading-relaxed text-foreground/90 mb-6"
                  >
                    {p}
                  </p>
                );
              })}
            </div>

            {/* Author block */}
            <div className="mt-12 rounded-2xl bg-card border border-border p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xl font-black uppercase">
                {post.author.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black tracking-widest uppercase text-secondary">
                  Written by
                </p>
                <p className="text-base md:text-lg font-black uppercase tracking-tight text-primary">
                  {post.author}
                </p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {post.author} is on the {COMPANY.name} delivery team and
                  writes the field journal between site walks and Friday
                  closeouts.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start md:self-auto">
                <a
                  href="#"
                  aria-label="Author on LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/70 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="Author on Twitter"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/70 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Right rail — TOC + share */}
          <aside className="lg:col-span-3 order-3">
            <div className="lg:sticky lg:top-32 space-y-5">
              <div className="rounded-2xl bg-card border border-border p-5">
                <p className="text-[10px] font-black tracking-widest uppercase text-secondary mb-3">
                  In this entry
                </p>
                <ol className="space-y-2 text-sm">
                  {paragraphs.slice(0, 5).map((p, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-2 text-foreground/85"
                    >
                      <span className="text-[10px] font-black tracking-widest tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="line-clamp-1">
                        {p.split(/[.!?]/)[0]}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl bg-secondary text-secondary-foreground p-5">
                <p className="text-[10px] font-black tracking-widest uppercase opacity-70 mb-2">
                  Got a question?
                </p>
                <p className="text-base font-black uppercase tracking-tight leading-tight">
                  Email the author directly.
                </p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase border-b-2 border-primary/40 hover:border-primary transition-colors"
                >
                  {COMPANY.email}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 3 — Cross-link strip */}
      {related.length > 0 && (
        <Reveal>
          <section className="bg-muted/40 section-padding border-y border-border">
            <div className="container-custom px-4 md:px-8">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-primary tracking-tight">
                  More from this lane
                </h2>
                <Link
                  to="/blog"
                  className="text-xs font-extrabold tracking-widest uppercase text-primary hover:text-secondary inline-flex items-center gap-1.5"
                >
                  All entries <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <ul className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:thin]">
                {related.map(r => (
                  <li
                    key={r.id}
                    className="shrink-0 w-[80%] sm:w-[55%] md:w-[34%]"
                  >
                    <Link
                      to={`/blog/${r.id}`}
                      className="group block rounded-2xl bg-card border border-border overflow-hidden hover:border-secondary/60 hover:shadow-md transition-all"
                    >
                      <div className="aspect-[5/3] overflow-hidden">
                        <img
                          src={r.image}
                          alt={r.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                          {r.category}
                        </p>
                        <h3 className="mt-1 text-sm md:text-base font-black uppercase tracking-tight text-primary leading-snug group-hover:text-secondary transition-colors">
                          {r.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>
      )}
    </Layout>
  );
};

export default BlogPost;
