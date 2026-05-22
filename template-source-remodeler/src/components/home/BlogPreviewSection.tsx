import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/siteData";

const BlogPreviewSection = () => {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="rm-section-pad bg-white border-t border-border">
      <div className="container-custom container-inset">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-sans-brand text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--secondary))] mb-2">
              Resources & Blog
            </p>
            <h2 className="font-display text-3xl text-[hsl(var(--primary))]">Remodeling Tips for NJ Homeowners</h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-sans-brand text-sm font-semibold text-[hsl(var(--secondary))] hover:underline"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="group border border-border bg-card rm-card-hover overflow-hidden">
              <Link to={`/blog/${post.id}`} className="block aspect-[16/10] overflow-hidden relative">
                <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </Link>
              <div className="p-6">
                <p className="text-xs font-sans-brand uppercase tracking-wider text-[hsl(var(--secondary))] mb-2">{post.category}</p>
                <h3 className="font-display text-xl text-[hsl(var(--primary))] mb-2 leading-snug">
                  <Link to={`/blog/${post.id}`} className="hover:text-[hsl(var(--secondary))]">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground font-sans-brand line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
