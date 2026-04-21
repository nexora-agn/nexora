import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import RequestDemoModal from "@/components/landing/RequestDemoModal";
import { getMarketingPostBySlug, marketingBlogPosts } from "@/data/marketingBlog";
import NotFound from "@/pages/NotFound";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [demoOpen, setDemoOpen] = useState(false);
  const post = slug ? getMarketingPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const others = marketingBlogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRequestDemo={() => setDemoOpen(true)} />
      <article className="pb-20 pt-28 md:pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/blog"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
          >
            ← Back to blog
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-brand">{post.category}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 md:text-[2rem] md:leading-tight">
            {post.title}
          </h1>
          <time className="mt-4 block text-sm text-neutral-500" dateTime={post.date}>
            {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <div className="mx-auto mt-10 max-w-4xl px-6">
          <div className="overflow-hidden rounded-2xl bg-neutral-200 shadow-lg ring-1 ring-neutral-200/80">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt}
              className="aspect-[21/9] w-full object-cover object-center md:aspect-[2.2/1]"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl px-6">
          <div>
            {post.paragraphs.map((para, i) => (
              <p key={i} className="mb-6 text-base leading-relaxed text-neutral-700 last:mb-0">
                {para}
              </p>
            ))}
          </div>

          {others.length > 0 ? (
            <div className="mt-16 border-t border-neutral-200 pt-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">More articles</p>
              <ul className="mt-6 grid gap-8 sm:grid-cols-2">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/blog/${p.slug}`} className="group block">
                      <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-xl bg-neutral-200 ring-1 ring-neutral-200/80">
                        <img
                          src={p.coverImage}
                          alt={p.coverImageAlt}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wider text-brand">{p.category}</span>
                      <span className="mt-1 block text-lg font-semibold leading-snug text-neutral-950 group-hover:underline">
                        {p.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>
      <Footer />
      <RequestDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
};

export default BlogArticle;
