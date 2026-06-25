import { useSiteContent } from "@template-truck-repair/contexts/SiteContentContext";
import Reveal from "@template-truck-repair/components/animations/Reveal";

const ProcessSection = () => {
  const { processSteps } = useSiteContent();

  return (
    <section className="industrial-section bg-[hsl(var(--primary))] text-white">
      <div className="container-custom container-inset">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="industrial-eyebrow text-[hsl(var(--secondary))] mb-3">Service Workflow</p>
            <h2 className="font-display text-3xl md:text-4xl text-white">From Request to Road</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, i) => (
            <Reveal key={step.id} delay={i * 50}>
              <div className="border border-white/15 p-6 h-full bg-white/5">
                <span className="inline-flex h-10 w-10 items-center justify-center bg-[hsl(var(--secondary))] text-white font-display text-lg font-bold mb-4">
                  {i + 1}
                </span>
                <h3 className="font-display text-lg text-white mb-2">{step.label}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
