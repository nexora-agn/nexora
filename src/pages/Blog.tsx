import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import RequestDemoModal from "@/components/landing/RequestDemoModal";
import { useState } from "react";
import { marketingBlogPosts } from "@/data/marketingBlog";

const Blog = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRequestDemo={() => setDemoOpen(true)} />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-28 md:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Blog</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">Insights</h1>
        <p className="mt-3 text-base font-medium text-neutral-600">
          How we ship sites—and how you can too.
        </p>

        <ul className="mt-12 space-y-12 border-t border-neutral-200 pt-12">
          {marketingBlogPosts.map((post) => (
            <li key={post.slug}>
              <article className="group grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-8 md:items-start">
                <Link
                  to={`/blog/${post.slug}`}
                  className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-neutral-200 shadow-sm ring-1 ring-neutral-200/80 md:aspect-[4/3]"
                >
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">{post.category}</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950 md:text-2xl">
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <time className="mt-2 block text-sm text-neutral-500" dateTime={post.date}>
                    {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
                  >
                    Read article
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
      <RequestDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
};

export default Blog;
