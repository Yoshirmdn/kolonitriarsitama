import { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsap';
import SectionTitle from '../components/ui/SectionTitle';
import MarqueeText from '../components/ui/MarqueeText';
import CTASection from '../components/sections/CTASection';
import { stats, siteConfig } from '../data';

const team = [
  {
    name: 'Adi Kurniawan',
    role: 'Founder & Principal Architect',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Lulus dari ITB dan ETH Zürich, Adi memimpin proyek-proyek flagship studio sejak 2009.',
  },
  {
    name: 'Sari Dewanti',
    role: 'Design Director',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b5e1b3e1?w=400&q=80',
    bio: 'Spesialisasi interior dan spatial design dengan pengalaman lebih dari 12 tahun.',
  },
  {
    name: 'Reza Firmansyah',
    role: 'Technical Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'Memimpin tim konstruksi dan pengawasan lapangan di seluruh proyek aktif studio.',
  },
  {
    name: 'Nadia Putri',
    role: 'Landscape Architect',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    bio: 'Berfokus pada integrasi alam dan bangunan dalam setiap desain Arkana.',
  },
];

const values = [
  { title: 'Kontekstual', text: 'Setiap rancangan lahir dari pemahaman mendalam tentang tempat, budaya, dan manusia.' },
  { title: 'Berkelanjutan', text: 'Material lokal, efisiensi energi, dan desain yang relevan untuk generasi mendatang.' },
  { title: 'Kolaboratif', text: 'Klien bukan sekadar pemberi tugas—mereka adalah rekan kreatif sepanjang proses.' },
  { title: 'Presisi', text: 'Detail adalah manifestasi dari rasa hormat terhadap kerajinan dan kualitas.' },
];

const About = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-hero-line',
        { y: '110%', opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.about-hero-img',
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out', delay: 0.1 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-20 section-padding overflow-hidden">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
          <span className="label-text text-[var(--color-accent)]">Tentang Studio</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {['Kami adalah', 'Studio dengan', 'Jiwa'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <h1 className={`about-hero-line font-display text-6xl md:text-8xl font-light text-[var(--color-fg)] leading-none ${i === 2 ? 'italic text-[var(--color-accent)]' : ''}`}>
                  {line}
                </h1>
              </div>
            ))}
          </div>

          <div className="aspect-[4/3] overflow-hidden">
            <img
              className="about-hero-img w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85"
              alt="Arkana Studio"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 section-padding border-t border-[var(--color-muted)] border-opacity-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionTitle label="Cerita Kami" title={'Dari\nBandung\nuntuk Dunia'} />
          </div>
          <div className="flex flex-col gap-5 justify-center">
            <p className="font-body text-sm text-[var(--color-fg)] opacity-60 leading-relaxed">
              Arkana lahir dari keyakinan sederhana: bahwa arsitektur yang baik bisa mengubah kehidupan. Didirikan oleh Adi Kurniawan pada 2009 di Bandung, studio ini tumbuh dari proyek residensial kecil menjadi salah satu studio arsitektur paling dihormati di Indonesia.
            </p>
            <p className="font-body text-sm text-[var(--color-fg)] opacity-60 leading-relaxed">
              Nama "Arkana" berasal dari kata Latin yang berarti "rahasia" atau "misteri"—menggambarkan upaya kami untuk menemukan esensi tersembunyi dari setiap ruang dan memanifestasikannya menjadi arsitektur yang bermakna.
            </p>
            <p className="font-body text-sm text-[var(--color-fg)] opacity-60 leading-relaxed">
              Hari ini, tim kami terdiri dari 24 profesional lintas disiplin yang telah menyelesaikan proyek di Bandung, Jakarta, Bali, Lombok, dan kota-kota lain di Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 section-padding bg-[var(--color-fg)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
          {stats.map((stat, i) => (
            <div key={i} className="p-10 text-center">
              <p className="font-display text-5xl text-[var(--color-bg)] font-light mb-2">
                {stat.number}<span className="text-[var(--color-accent)]">{stat.suffix}</span>
              </p>
              <p className="label-text text-[var(--color-bg)] opacity-30">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 section-padding bg-[var(--color-surface)]">
        <SectionTitle label="Nilai Kami" title={'Prinsip\nyang Kami\nPergang'} className="mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px border border-[var(--color-muted)] border-opacity-20">
          {values.map((v, i) => (
            <div key={i} className="p-8 bg-[var(--color-surface)]">
              <span className="font-mono text-[10px] text-[var(--color-accent)] tracking-ultra uppercase block mb-4">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl font-light text-[var(--color-fg)] mb-3">{v.title}</h3>
              <p className="font-body text-sm text-[var(--color-fg)] opacity-50 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div className="py-10 bg-[var(--color-fg)] overflow-hidden">
        <MarqueeText text="Arkana · Studio Arsitektur · Bandung · " light speed={35} />
      </div>

      {/* Team */}
      <section className="py-24 md:py-32 section-padding">
        <SectionTitle label="Tim Kami" title={'Orang-Orang\ndi Balik\nKarya'} className="mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={i} className="group">
              <div className="aspect-[3/4] overflow-hidden mb-5 bg-[var(--color-muted)]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-xl font-light text-[var(--color-fg)]">{member.name}</h3>
              <p className="label-text text-[var(--color-accent)] opacity-70 mt-1 mb-3">{member.role}</p>
              <p className="font-body text-xs text-[var(--color-fg)] opacity-50 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default About;
