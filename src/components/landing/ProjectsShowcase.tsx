import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { marketingBlogPosts } from "@/data/marketingBlog";

const spotlight = marketingBlogPosts;

const ProjectsShowcase = () => {
  return (
    <section id="projects" className="scroll-mt-28 border-t border-neutral-200/80 bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end"
        >
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">From the blog</p>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">Short reads. Real tactics.</h2>
            <p className="mt-3 text-base font-medium text-neutral-600">
              Leads, ops, and how we think. No filler.
            </p>
            <Link
              to="/blog"
              className="mt-4 inline-block text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
            >
              View all posts
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {spotlight.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50/50 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent opacity-80" />
                  <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wider text-white">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold leading-snug tracking-tight text-neutral-950 group-hover:underline md:text-lg">
                      {post.title}
                    </h3>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-950" aria-hidden />
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-600">{post.excerpt}</p>
                  <span className="mt-4 text-sm font-semibold text-brand">Read article</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
