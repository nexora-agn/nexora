import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ConversationCard } from "@/components/ai/AiMockCards";
import { aiHeroConversation, aiTeaserWins } from "@/data/nexoraAi";

const AiLandingSection = () => {
  return (
    <section id="ai" className="scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">AI assistant</p>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl md:leading-[1.12]">
              Most websites lose visitors. <span className="text-brand">Yours won’t.</span>
            </h2>
            <p className="mt-3 max-w-xl text-base font-medium text-neutral-600 md:text-lg">
              We put a smart assistant on your site. It talks to every visitor and turns them into booked jobs.
            </p>

            <ul className="mt-8 space-y-4">
              {aiTeaserWins.map((w) => (
                <li key={w.title} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <w.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-neutral-950">{w.title}</p>
                    <p className="mt-0.5 text-sm text-neutral-600">{w.line}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/ai"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-950 underline-offset-4 transition-colors hover:text-brand"
            >
              See everything our AI does
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <ConversationCard {...aiHeroConversation} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AiLandingSection;
