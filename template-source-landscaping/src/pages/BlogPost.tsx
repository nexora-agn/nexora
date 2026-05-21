import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import VerdePageHero from "@/components/sections/VerdePageHero";
import { BLOG_POSTS } from "@/data/siteData";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Calendar, User, ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const { company: COMPANY } = useSiteContent();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <Layout>
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-2xl font-bold text-[hsl(var(--primary))]">Article not found</h1>
          <Link to="/blog" className="text-[hsl(var(--secondary))] hover:underline mt-4 inline-block">
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  const related = BLOG_POSTS.filter(p => p.id !== id && p.category === post.category).slice(0, 2);
  const fallbackRelated = related.length > 0 ? related : BLOG_POSTS.filter(p => p.id !== id).slice(0, 2);

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | {COMPANY.name}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
      </Helmet>

      <VerdePageHero
        eyebrow={post.category}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]}
        title={post.title}
        body={post.excerpt}
        image={post.image}
        imageAlt={post.title}
      />

      <section className="bg-[hsl(var(--flow-surface))] py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[hsl(var(--secondary))] mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[280px] md:h-[400px] object-cover rounded-lg mb-8 ring-1 ring-slate-200"
            loading="lazy"
          />

          <div className="prose max-w-none">
            {post.content.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-4 text-base">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {fallbackRelated.length > 0 ? (
        <section className="bg-white py-14 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-[hsl(var(--primary))] mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fallbackRelated.map(r => (
                <Link
                  key={r.id}
                  to={`/blog/${r.id}`}
                  className="group bg-[hsl(var(--flow-surface))] rounded-lg overflow-hidden border border-slate-100 hover:border-[hsl(var(--secondary))]/40 transition-all"
                >
                  <img src={r.image} alt={r.title} className="w-full h-40 object-cover" loading="lazy" />
                  <div className="p-4">
                    <p className="text-[10px] font-display font-bold uppercase tracking-wider text-[hsl(var(--secondary))] mb-1">
                      {r.category}
                    </p>
                    <h3 className="font-display font-bold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--secondary))] transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </Layout>
  );
};

export default BlogPost;
