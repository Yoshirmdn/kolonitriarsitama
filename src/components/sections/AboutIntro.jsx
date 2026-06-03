import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../animations/gsap';
import { stats } from '../../data';

const AboutIntro = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(
        '.about-img',
        { y: -40, scale: 1.1 },
        {
          y: 40,
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

      // Text elements
      gsap.fromTo(
        '.about-label',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.about-heading .line',
        { y: '110%' },
        {
          y: '0%',
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.about-body',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      // Stats counter animation
      document.querySelectorAll('.stat-number').forEach((el) => {
        const end = parseInt(el.dataset.value);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val);
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 section-padding overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Image */}
        <div className="relative">
          <div className="relative overflow-hidden aspect-[3/4]">
            <img
              className="about-img w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=85"
              alt="Arkana Studio"
            />
            {/* Decorative frame */}
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border border-[var(--color-accent)] opacity-20 pointer-events-none" />
          </div>

          {/* Floating badge */}
          <div className="absolute top-8 -right-4 md:-right-10 bg-[var(--color-fg)] text-[var(--color-bg)] p-6 w-32">
            <p className="font-display text-4xl font-light leading-none mb-1">15</p>
            <p className="label-text text-[var(--color-bg)] opacity-50 text-[9px] leading-snug">
              Tahun<br />Pengalaman
            </p>
          </div>
        </div>

        {/* Right: Text */}
        <div>
          <div className="about-label flex items-center gap-3 mb-8">
            <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
            <span className="label-text text-[var(--color-accent)]">Tentang Studio</span>
          </div>

          <div className="about-heading mb-8">
            {['Kami Merancang', 'Lebih dari', 'Sekadar Bangunan'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <span className={`line block font-display text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-fg)] leading-tight ${i === 1 ? 'italic pl-8' : ''}`}>
                  {line}
                </span>
              </div>
            ))}
          </div>

          <p className="about-body font-body text-sm text-[var(--color-fg)] opacity-60 leading-relaxed mb-6 max-w-md">
            Arkana adalah studio arsitektur premium berbasis di Bandung. Selama 15 tahun, kami telah menyelesaikan lebih dari 120 proyek—dari hunian privat hingga gedung komersial—dengan filosofi yang konsisten: arsitektur sebagai seni hidup.
          </p>
          <p className="about-body font-body text-sm text-[var(--color-fg)] opacity-60 leading-relaxed mb-10 max-w-md">
            Setiap proyek dimulai dari percakapan mendalam—tentang impian, konteks, dan warisan yang ingin ditinggalkan. Dari situlah kami menemukan arsitektur yang sungguh bermakna.
          </p>

          <Link
            to="/about"
            className="about-body btn-outline inline-flex items-center gap-3 group"
          >
            Kenali Kami
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-24 border border-[var(--color-muted)] border-opacity-20">
        {stats.map((stat, i) => (
          <div key={i} className="p-8 md:p-10 bg-[var(--color-surface)] text-center">
            <div className="font-display text-5xl md:text-6xl font-light text-[var(--color-fg)] leading-none mb-2">
              <span className="stat-number" data-value={stat.number}>0</span>
              <span className="text-[var(--color-accent)]">{stat.suffix}</span>
            </div>
            <p className="label-text text-[var(--color-fg)] opacity-40">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutIntro;
