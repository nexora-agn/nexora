import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@template-barbershop/components/layout/Layout";
import PageHeader from "@template-barbershop/components/sections/PageHeader";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { BLOG_POSTS, BLOG_TAGS, BARBERSHOP_IMAGES, COMPANY } from "@template-barbershop/data/siteData";
import { cn } from "@/lib/utils";

const Blog = () => {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => (category === "All" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === category)),
    [category],
  );

  return (
    <Layout>
      <Helmet>
        <title>Blog | {COMPANY.name}</title>
        <meta name="description" content="Grooming advice, hair care tips, and style trends from the Forge Barber Co. team." />
      </Helmet>

      <PageHeader eyebrow="The Journal" title="Grooming Advice & Style Notes" subtitle="Hair care, beard care, and everything in between — from our chairs to you." image={BARBERSHOP_IMAGES.blogHero} />

      <section className="luxury-section bg-background">
        <div className="container-custom container-inset">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              type="button"
              onClick={() => setCategory("All")}
              className={cn(
                "px-4 py-2 text-xs font-sans-brand font-semibold uppercase tracking-wide border transition-colors",
                category === "All" ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-border text-muted-foreground hover:border-[hsl(var(--primary))]/40",
              )}
            >
              All
            </button>
            {BLOG_TAGS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setCategory(tag)}
                className={cn(
                  "px-4 py-2 text-xs font-sans-brand font-semibold uppercase tracking-wide border transition-colors",
                  category === tag ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-border text-muted-foreground hover:border-[hsl(var(--primary))]/40",
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <Reveal key={post.id} direction="up" delay={(i % 3) * 90}>
                <Link to={`/blog/${post.id}`} className="group block card-luxury h-full">
                  <div className="image-zoom h-56">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-sans-brand font-semibold uppercase tracking-[0.16em] text-[hsl(var(--secondary))]">
                      {post.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl uppercase leading-snug text-foreground group-hover:text-[hsl(var(--secondary))] transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <p className="mt-4 text-xs text-muted-foreground/70">{post.author} · {post.date} · {post.readTime}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
