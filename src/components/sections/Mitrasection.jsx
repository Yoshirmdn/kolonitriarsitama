import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';

const mitraData = [
  {
    id: 'mrec-telkom',
    name: 'MREC Telkom University',
    fullName: 'Mixed Reality & Extended Computing',
    logo: '/assets/logos/mrec-telkom.png', // ganti dengan path logo yang sesuai
    badge: 'Official Partner',
    description:
      'Pusat riset Mixed Reality & Extended Computing Telkom University. Kolaborasi strategis dalam pengembangan teknologi VR/AR untuk solusi arsitektur dan properti immersive.',
    tags: ['VR/AR Research', 'Telkom University', 'Mixed Reality'],
    since: '2024',
  },
];

const MitraSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mitra-header > *',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.mitra-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 section-padding bg-[var(--color-bg)]">
      {/* Header */}
      <div className="mitra-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-accent)]">
              Official Partnership
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light text-[var(--color-fg)] leading-none">
            Mitra Resmi<br />
            <span className="italic opacity-50">Kami</span>
          </h2>
          <p className="font-body text-sm text-[var(--color-fg)] opacity-55 mt-4 max-w-md leading-relaxed">
            Berkolaborasi dengan institusi terpercaya untuk menghadirkan teknologi VR terbaik bagi klien kami.
          </p>
        </div>
      </div>

      {/* Mitra Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mitraData.map((mitra) => (
          <div
            key={mitra.id}
            className="mitra-card relative rounded-2xl overflow-hidden bg-white dark:bg-[#1a1310] shadow-sm ring-1 ring-[var(--color-accent)] ring-opacity-30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-[var(--color-accent)]" />

            <div className="p-7 flex flex-col gap-6">
              {/* Badge resmi */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-[var(--color-accent)] bg-opacity-10 border border-[var(--color-accent)] border-opacity-30 text-[var(--color-accent)] font-mono text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-full">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                  {mitra.badge}
                </span>
                <span className="font-mono text-[9px] text-[var(--color-fg)] opacity-30 tracking-wider">
                  Since {mitra.since}
                </span>
              </div>

              {/* Logo area */}
              <div className="w-full h-24 bg-[var(--color-surface)] rounded-xl flex items-center justify-center overflow-hidden">
                {mitra.logo ? (
                  <img
                    src={mitra.logo}
                    alt={`Logo ${mitra.name}`}
                    className="h-14 w-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Fallback jika logo tidak ada */}
                <div
                  className="w-full h-full items-center justify-center"
                  style={{ display: mitra.logo ? 'none' : 'flex' }}
                >
                  <span className="font-display text-2xl font-bold text-[var(--color-accent)] opacity-40 tracking-widest">
                    MREC
                  </span>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-body font-semibold text-base text-[var(--color-fg)] leading-snug mb-1">
                  {mitra.name}
                </h3>
                <p className="font-mono text-[10px] text-[var(--color-accent)] opacity-70 tracking-wider mb-3">
                  {mitra.fullName}
                </p>
                <p className="font-body text-xs text-[var(--color-fg)] opacity-55 leading-relaxed">
                  {mitra.description}
                </p>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[var(--color-muted)] opacity-20" />

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {mitra.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-md bg-[var(--color-surface)] text-[var(--color-fg)] opacity-60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder — slot mitra berikutnya */}
        <div className="mitra-card rounded-2xl border border-dashed border-[var(--color-muted)] border-opacity-40 p-7 flex flex-col items-center justify-center gap-4 text-center min-h-[320px] hover:border-[var(--color-accent)] hover:border-opacity-40 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-fg)] opacity-30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div>
            <p className="font-body text-sm font-medium text-[var(--color-fg)] opacity-30 mb-1">
              Mitra Berikutnya
            </p>
            <p className="font-mono text-[10px] text-[var(--color-fg)] opacity-25 leading-relaxed">
              Terbuka untuk kolaborasi strategis di bidang teknologi, properti, & immersive experience.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-10 p-5 rounded-xl bg-[var(--color-accent)] bg-opacity-10 border border-[var(--color-accent)] border-opacity-20 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">🤝</span>
        <p className="font-body text-sm text-[var(--color-fg)] opacity-70 leading-relaxed">
          <strong className="text-[var(--color-fg)] opacity-100">Tertarik bermitra?</strong>{' '}
          Kami membuka peluang kolaborasi dengan institusi pendidikan, teknologi, dan properti.{' '}
          <a
            href="mailto:hello@yourdomain.com"
            className="text-[var(--color-accent)] underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Hubungi kami untuk diskusi lebih lanjut.
          </a>
        </p>
      </div>
    </section>
  );
};

export default MitraSection;