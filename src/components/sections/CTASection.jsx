import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap';

const CTASection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-img',
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        '.cta-content > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          className="cta-img w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85"
          alt="Consultation"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding py-24 w-full">
        <div className="cta-content max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
            <span className="label-text text-[var(--color-accent)] opacity-80">Mulai Bersama Kami</span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none mb-8">
            Wujudkan<br />
            <span className="italic opacity-70">Impian</span><br />
            Arsitektur Anda
          </h2>

          <p className="font-body text-sm text-white/60 leading-relaxed mb-12 max-w-md">
            Satu percakapan bisa mengubah segalanya. Jadwalkan konsultasi gratis dan biarkan kami memahami visi Anda.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-white font-body font-light text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-400 group"
            >
              Jadwalkan Konsultasi
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-body font-light text-sm tracking-widest uppercase hover:border-white hover:bg-white/10 transition-all duration-400"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
