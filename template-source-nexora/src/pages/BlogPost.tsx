import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import Layout from "@template-nexora/components/layout/Layout";
import PageHeader from "@template-nexora/components/sections/PageHeader";
import { BLOG_POSTS } from "@template-nexora/data/siteData";
import { useSiteContent } from "@template-nexora/contexts/SiteContentContext";
import { Calendar, User, ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const { company: COMPANY } = useSiteContent();
  const post = BLOG_POSTS.find(p => p.id === id);
  if (!post) return <Layout><div className="section-padding container-custom text-center"><h1 className="text-2xl font-bold">Post not found</h1><Link to="/blog" className="text-primary hover:underline mt-4 block">Back to Blog</Link></div></Layout>;

  const related = BLOG_POSTS.filter(p => p.id !== id).slice(0, 2);

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | {COMPANY.name}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
      </Helmet>

      <PageHeader eyebrow="NEWS" title={post.title} subtitle={post.excerpt} align="left" />

      <section className="section-padding pt-8">
        <div className="container-custom max-w-4xl px-4 md:px-8">
          <Link to="/blog" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <span className="text-xs font-bold tracking-widest text-secondary">{post.category.toUpperCase()}</span>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 mt-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>
          <img src={post.image} alt={post.title} className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl mb-8" loading="lazy" />
          <div className="prose max-w-none">
            {post.content.split("\n\n").map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map(r => (
              <Link key={r.id} to={`/blog/${r.id}`} className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={r.image} alt={r.title} className="w-full h-40 object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{r.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{r.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
