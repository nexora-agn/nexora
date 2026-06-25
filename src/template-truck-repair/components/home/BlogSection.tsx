import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@template-truck-repair/data/siteData";
import { Clock } from "lucide-react";

const BlogSection = () => (
  <section className="luxury-section bg-white">
    <div className="container-custom container-inset">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="luxury-eyebrow mb-3">Insights & Lifestyle</p>
          <h2 className="luxury-heading">From Our Blog</h2>
        </div>
        <Link to="/blog" className="text-sm font-medium uppercase tracking-wider text-[hsl(var(--secondary))] hover:underline">
          All Articles →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.slice(0, 3).map(post => (
          <article key={post.id} className="card-luxury group overflow-hidden">
            <Link to={`/blog/${post.id}`} className="block image-zoom aspect-[16/10]">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
            </Link>
            <div className="p-6">
              <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--secondary))]">{post.category}</span>
              <Link to={`/blog/${post.id}`}>
                <h3 className="font-display text-xl text-[hsl(var(--primary))] mt-2 mb-3 group-hover:text-[hsl(var(--secondary))] transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{post.author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {(post as { readTime?: string }).readTime || "5 min"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
