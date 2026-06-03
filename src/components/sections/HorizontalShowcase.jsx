import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';
import { projects } from '../../data';

const HorizontalShowcase = () => {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track     = trackRef.current;
    if (!container || !track) return;

    // Only on desktop
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const getWidth = () => track.scrollWidth - window.innerWidth;

      const anim = gsap.to(track, {
        x: () => -getWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getWidth()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => anim.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="overflow-hidden bg-[var(--color-fg)]">
      <div ref={trackRef} className="flex items-stretch gap-4 pl-8 md:pl-24 pr-8 md:pr-24 py-0 w-max">

        {/* Label card */}
        <div className="flex-shrink-0 w-[260px] md:w-[360px] flex flex-col justify-center py-24 pr-8">
          <p className="label-text text-[var(--color-bg)] opacity-30 mb-6">Semua Proyek</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[var(--color-bg)] leading-tight mb-6">
            Eksplorasi<br /><span className="italic opacity-40">seluruh</span><br />karya kami
          </h2>
          <p className="font-body text-sm text-[var(--color-bg)] opacity-30 leading-relaxed">
            {projects.length} proyek · seluruh Indonesia
          </p>
          <p className="label-text text-[var(--color-bg)] opacity-20 mt-8 hidden md:block">← scroll →</p>
        </div>

        {/* Project cards */}
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="flex-shrink-0 group cursor-pointer py-16"
            style={{ width: i % 3 === 0 ? '420px' : i % 3 === 1 ? '300px' : '360px' }}
          >
            <div className="relative h-full overflow-hidden min-h-[50vh]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-mono text-[10px] text-white/50 tracking-wider uppercase mb-2">
                  {project.location} · {project.year}
                </p>
                <h3 className="font-display text-2xl text-white font-light">{project.title}</h3>
                <p className="label-text text-[var(--color-accent)] mt-1 opacity-80">{project.tags[0]}</p>
              </div>
              <div className="absolute top-4 right-4">
                <span className="font-mono text-xs text-white/25">{String(i + 1).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-[160px] flex flex-col justify-center items-center gap-4 py-24">
          <div className="w-[1px] h-16 bg-[var(--color-bg)] opacity-10" />
          <p className="font-display text-sm text-[var(--color-bg)] opacity-20 italic text-center">
            dan lebih banyak lagi…
          </p>
        </div>

      </div>
    </section>
  );
};

export default HorizontalShowcase;
