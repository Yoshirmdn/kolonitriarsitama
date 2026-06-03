import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';
import SectionTitle from '../ui/SectionTitle';

const reasons = [
  {
    number: '01',
    title: 'Pendekatan Holistik',
    text: 'Kami mempertimbangkan tapak, iklim, budaya, dan manusia—bukan sekadar fungsi dan estetika.',
  },
  {
    number: '02',
    title: 'Material Premium Lokal',
    text: 'Mengutamakan material berkualitas tinggi dari pengrajin lokal Indonesia yang berkelanjutan.',
  },
  {
    number: '03',
    title: 'Transparansi Penuh',
    text: 'Setiap keputusan desain dikomunikasikan dengan jelas—tanpa kejutan di tengah proses.',
  },
  {
    number: '04',
    title: 'Tim Lintas Disiplin',
    text: 'Arsitek, desainer interior, lansekap, dan konsultan MEP bekerja dalam satu ekosistem.',
  },
  {
    number: '05',
    title: 'Portofolio Terbukti',
    text: 'Lebih dari 120 proyek selesai, 45 penghargaan, dan klien yang kembali lagi.',
  },
  {
    number: '06',
    title: 'Garansi Kualitas',
    text: 'Kami mendampingi proyek hingga serah terima dan memberikan garansi purna jual.',
  },
];

const WhyUsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reason-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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
    <section ref={sectionRef} className="py-24 md:py-40 section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
        {/* Sticky heading */}
        <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
          <SectionTitle
            label="Mengapa Arkana"
            title={'Alasan\nMemilih\nKami'}
            subtitle="Bukan sekadar studio arsitektur—kami adalah mitra perjalanan Anda menuju ruang ideal."
          />

          <div className="mt-12 relative aspect-square overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80"
              alt="Why us"
              className="w-full h-full object-cover grayscale opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
          </div>
        </div>

        {/* Reasons grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-px border border-[var(--color-muted)] border-opacity-20">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="reason-item p-8 bg-[var(--color-surface)] border-b border-r border-[var(--color-muted)] border-opacity-20 last:border-b-0 group hover:bg-[var(--color-fg)] transition-colors duration-400"
            >
              <span className="font-mono text-[10px] text-[var(--color-accent)] tracking-ultra uppercase block mb-4 group-hover:text-[var(--color-accent)]">
                {reason.number}
              </span>
              <h3 className="font-display text-xl font-light text-[var(--color-fg)] mb-3 group-hover:text-[var(--color-bg)] transition-colors duration-400 leading-snug">
                {reason.title}
              </h3>
              <p className="font-body text-xs text-[var(--color-fg)] opacity-50 group-hover:text-[var(--color-bg)] group-hover:opacity-60 leading-relaxed transition-colors duration-400">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
