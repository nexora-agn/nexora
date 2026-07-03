import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@template-barbershop/components/animations/Reveal";
import { BLOG_POSTS } from "@template-barbershop/data/siteData";

const BlogPreviews = () => {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="luxury-section bg-[hsl(var(--muted))]">
      <div className="container-custom container-inset">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <Reveal direction="up">
            <p className="luxury-eyebrow mb-4">From The Journal</p>
            <h2 className="luxury-heading">Grooming Advice & Style Notes</h2>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-[hsl(var(--secondary))] hover:gap-2.5 transition-all">
              Read the Blog <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.id} direction="up" delay={i * 100}>
              <Link to={`/blog/${post.id}`} className="group block card-luxury h-full">
                <div className="image-zoom h-52">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-sans-brand font-semibold uppercase tracking-[0.16em] text-[hsl(var(--secondary))]">
                    {post.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg uppercase leading-snug text-foreground group-hover:text-[hsl(var(--secondary))] transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-muted-foreground/70">{post.date} · {post.readTime} read</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviews;
