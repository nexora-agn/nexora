import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { customerProjects } from "@/data/customerProjects";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ProjectsShowcase = () => {
  return (
    <section id="projects" className="scroll-mt-28 border-t border-neutral-200/80 bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
            }}
            className="w-full"
          >
            <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="max-w-xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Client work</p>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">Websites we’ve put live for our clients</h2>
                <p className="mt-3 text-base font-medium text-neutral-600">
                  Live sites you can click through, not mockups.
                </p>
                <Link
                  to="/start"
                  className="mt-4 inline-block text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
                >
                  Start your project
                </Link>
              </div>
              <div className="flex shrink-0 items-center justify-end gap-2 md:pb-0.5">
                <CarouselPrevious
                  type="button"
                  variant="outline"
                  size="icon"
                  className="static h-9 w-9 translate-x-0 translate-y-0 rounded-full border-neutral-200 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50 disabled:opacity-40"
                  aria-label="Previous projects"
                />
                <CarouselNext
                  type="button"
                  variant="outline"
                  size="icon"
                  className="static h-9 w-9 translate-x-0 translate-y-0 rounded-full border-neutral-200 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50 disabled:opacity-40"
                  aria-label="Next projects"
                />
              </div>
            </div>
            <CarouselContent className="-ml-3 md:-ml-4">
              {customerProjects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="pl-3 basis-full sm:basis-1/2 sm:pl-4 lg:basis-1/2 xl:basis-1/3"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50/50 shadow-sm transition-shadow hover:shadow-md"
                    aria-label={`${project.name} (opens in a new tab)`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent opacity-80" />
                      <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wider text-white">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h3 className="text-base font-semibold leading-snug tracking-tight text-neutral-950 group-hover:underline md:text-lg">
                          {project.name}
                        </h3>
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-950" aria-hidden />
                      </div>
                      <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 sm:line-clamp-none">
                        {project.description}
                      </p>
                      <span className="mt-3 text-sm font-semibold text-brand sm:mt-4">View live site</span>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
