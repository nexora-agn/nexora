import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";
import Reveal from "@template-barbershop/components/animations/Reveal";
import CTASection from "@template-barbershop/components/sections/CTASection";
import { BLOG_POSTS, COMPANY } from "@template-barbershop/data/siteData";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);
  const [subscribed, setSubscribed] = useState(false);

  if (!post) return <Navigate to="/blog" replace />;

  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | {COMPANY.name}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="pt-32 pb-20 bg-background">
        <div className="container-custom container-inset max-w-3xl">
          <Reveal direction="up">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-[hsl(var(--secondary))] mb-8">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
            </Link>
            <p className="luxury-eyebrow mb-4">{post.category}</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase leading-tight text-foreground mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground mb-8">
              <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {post.author}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime} read</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={80} className="image-zoom mb-10">
            <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover" loading="eager" />
          </Reveal>

          <Reveal direction="up" delay={120}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
            <p className="text-muted-foreground leading-relaxed">{post.content}</p>
          </Reveal>

          {!subscribed ? (
            <Reveal direction="up" delay={160} className="mt-14 border border-border bg-[hsl(var(--muted))] p-7 text-center">
              <p className="font-display text-lg uppercase mb-2">Enjoyed this article?</p>
              <p className="text-sm text-muted-foreground mb-5">Get grooming tips and offers straight to your inbox.</p>
              <button onClick={() => setSubscribed(true)} className="btn-luxury-primary">
                Subscribe to the Journal
              </button>
            </Reveal>
          ) : (
            <p className="mt-14 text-center text-sm text-[hsl(var(--secondary))] font-semibold">You're subscribed. Thanks for reading!</p>
          )}

          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <p className="font-display text-lg uppercase mb-6">More in {post.category}</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map(r => (
                  <Link key={r.id} to={`/blog/${r.id}`} className="group flex gap-4 items-center">
                    <img src={r.image} alt={r.title} className="h-20 w-20 object-cover shrink-0" />
                    <div>
                      <p className="font-display text-sm uppercase text-foreground group-hover:text-[hsl(var(--secondary))] transition-colors">{r.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{r.readTime} read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTASection />
    </Layout>
  );
};

export default BlogPost;
