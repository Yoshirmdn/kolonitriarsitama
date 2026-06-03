import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';
import SectionTitle from '../ui/SectionTitle';
import { process as processSteps } from '../../data';

const ProcessSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-line-fill',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
      gsap.fromTo(
        '.process-step',
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 section-padding bg-[var(--color-surface)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Left */}
        <div>
          <SectionTitle
            label="Proses Kerja"
            title={'Bagaimana\nKami\nBekerja'}
            subtitle="Proses kolaboratif yang transparan—dari ide pertama hingga serah terima kunci."
          />
          <div className="mt-12 relative aspect-[4/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&q=80"
              alt="Process"
              className="w-full h-full object-cover grayscale opacity-50"
            />
          </div>
        </div>

        {/* Right: Steps */}
        <div className="relative pl-0">
          {/* Vertical line track */}
          <div className="absolute left-[18px] top-2 bottom-2 w-[1px] bg-[var(--color-muted)] opacity-15 overflow-hidden">
            <div className="process-line-fill absolute inset-0 bg-[var(--color-accent)]" />
          </div>

          <div className="flex flex-col">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="process-step relative pl-14 pb-10 last:pb-0 group"
              >
                {/* Dot */}
                <div className="absolute left-0 top-0 w-9 h-9 border border-[var(--color-muted)] border-opacity-30 bg-[var(--color-surface)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all duration-300">
                  <span className="font-mono text-[9px] text-[var(--color-fg)] opacity-40 group-hover:text-white group-hover:opacity-100 transition-all duration-300">
                    {step.step}
                  </span>
                </div>

                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-display text-xl md:text-2xl font-light text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-snug">
                      {step.title}
                    </h3>
                    <span className="label-text text-[var(--color-muted)] opacity-40 whitespace-nowrap flex-shrink-0">
                      {step.duration}
                    </span>
                  </div>
                  <p className="font-body text-sm text-[var(--color-fg)] opacity-50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
