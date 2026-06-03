import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=90',
    label: 'Villa Ciater · 2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=90',
    label: 'Nusantara HQ · 2023',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90',
    label: 'Rumah Dago · 2023',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const labelRef = useRef(null);
  const imgRefs = useRef([]);
  const slideInterval = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Stagger title lines
      tl.fromTo(
        '.hero-line',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.4, stagger: 0.12, ease: 'power4.out' }
      );

      tl.fromTo(
        '.hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      );

      tl.fromTo(
        '.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Auto-slide
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval.current);
  }, []);

  // Image transition
  useEffect(() => {
    imgRefs.current.forEach((img, i) => {
      if (!img) return;
      gsap.to(img, {
        opacity: i === current ? 1 : 0,
        scale: i === current ? 1 : 1.05,
        duration: 1.4,
        ease: 'power2.inOut',
      });
    });
  }, [current]);

  return (
    <section ref={heroRef} className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => (imgRefs.current[i] = el)}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.label}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end section-padding pb-16 md:pb-24">
        <div className="max-w-5xl">
          {/* Label */}
          <div className="hero-cta mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
            <span className="font-mono text-[10px] text-white/60 tracking-ultra uppercase">
              Studio Arsitektur Premium
            </span>
          </div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <h1 className="hero-line font-display text-6xl md:text-8xl lg:text-[10rem] font-light text-white leading-none tracking-tight">
              Ruang
            </h1>
          </div>
          <div className="overflow-hidden mb-2">
            <h1 className="hero-line font-display text-6xl md:text-8xl lg:text-[10rem] font-light text-white leading-none tracking-tight pl-12 md:pl-24 italic">
              yang
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="hero-line font-display text-6xl md:text-8xl lg:text-[10rem] font-light text-white leading-none tracking-tight">
              Bercerita
            </h1>
          </div>

          {/* Subtitle + CTAs */}
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <p className="hero-sub font-body text-sm text-white/60 max-w-xs leading-relaxed">
              Merancang ruang yang melampaui batas antara fungsi dan estetika sejak 2009.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/projects/architecture"
                className="hero-cta btn-primary bg-white text-black hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-300"
              >
                Lihat Proyek <span>→</span>
              </Link>
              <Link
                to="/booking"
                className="hero-cta inline-flex items-center gap-3 px-8 py-4 border border-white/40 text-white font-body font-light text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-400"
              >
                Konsultasi
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 right-8 md:right-16 flex flex-col items-end gap-3">
          <p className="font-mono text-[10px] text-white/40 tracking-wider">
            {slides[current].label}
          </p>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-400 ${
                  i === current
                    ? 'w-8 h-[2px] bg-[var(--color-accent)]'
                    : 'w-3 h-[1px] bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden md:flex">
          <p className="font-mono text-[9px] text-white/30 tracking-ultra uppercase">Scroll</p>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 w-full bg-white/60 h-1/2 animate-bounce" style={{ animationDuration: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
