import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap';

const pricingData = [
  {
    id: 'vr-exe',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'VR App .EXE',
    price: 'Rp 10.000/m²',
    min: 'Min. Rp 1.000.000',
    popular: true,
    description: 'Aplikasi VR untuk PC/Laptop. Jalankan via Oculus Link — full immersive walkthrough tanpa batas.',
    includes: [
      'Scene VR full immersive',
      'Navigasi teleport & joystick',
      'Lighting & shadow realistis',
      'File .exe final + installer',
      '1× revisi minor',
    ],
  },
  {
    id: 'vr-apk',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: 'VR App .APK',
    price: 'Rp 25.000/m²',
    min: 'Min. Rp 2.500.000',
    popular: false,
    description: 'Aplikasi VR untuk Oculus Quest 2 & Quest 3. Wireless, standalone, instalasi mudah.',
    includes: [
      'Scene VR wireless standalone',
      'Instalasi via SideQuest',
      'Kompatibel Quest 2 & Quest 3',
      'File .apk final',
      '1× revisi minor',
    ],
  },
  {
    id: 'sewa-oculus',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12a9 9 0 11-6.219-8.56" />
        <path d="M21 3v4h-4" />
      </svg>
    ),
    title: 'Sewa Oculus',
    price: 'Rp 150.000–200.000',
    min: 'per hari',
    popular: false,
    description: 'Sewa Quest 2 atau Quest 3 untuk presentasi klien, pameran properti, atau event.',
    includes: [
      'Unit Oculus resmi bergaransi',
      'Sudah terinstal aplikasi VR',
      'Panduan pemakaian & setup',
      'Pengiriman gratis Jabodetabek',
      'Support teknis selama sewa',
    ],
  },
  {
    id: 'beli-oculus',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <circle cx="18" cy="18" r="4" />
        <path d="M18 16v2l1 1" />
      </svg>
    ),
    title: 'Beli Oculus',
    price: '+Rp 7jt – 9jt',
    min: 'beli putus',
    popular: false,
    description: 'Unit Quest 2 atau Quest 3 baru resmi. Garansi distributor. Gratis ongkir seluruh Indonesia.',
    includes: [
      'Unit baru resmi bergaransi',
      'Quest 2 atau Quest 3',
      'Gratis ongkir seluruh Indonesia',
      'Setup & instalasi aplikasi VR',
      'Panduan penggunaan lengkap',
    ],
  },
];

const PriceListSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.price-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 section-padding bg-[var(--color-surface)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-accent)]">
              Layanan Utama
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light text-[var(--color-fg)] leading-none">
            VR & Immersive<br /><span className="italic opacity-50">Technology</span>
          </h2>
          <p className="font-body text-sm text-[var(--color-fg)] opacity-55 mt-4 max-w-md leading-relaxed">
            Dari desain arsitektur 3D hingga pengalaman VR yang bisa langsung dirasakan klien.
          </p>
        </div>
        <Link
          to="/services"
          className="hidden md:inline-flex items-center gap-3 font-mono text-[10px] tracking-wider uppercase text-[var(--color-accent)] hover:gap-6 transition-all duration-300"
        >
          Kalkulator Harga →
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {pricingData.map((item) => (
          <div
            key={item.id}
            className={`price-card relative rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              item.popular
                ? 'bg-white dark:bg-[var(--color-fg)] shadow-md ring-1 ring-[var(--color-accent)] ring-opacity-40'
                : 'bg-white dark:bg-[#1a1310]'
            }`}
          >
            {/* Popular badge */}
            {item.popular && (
              <div className="absolute -top-3 right-5">
                <span className="font-mono text-[9px] tracking-widest uppercase bg-[var(--color-accent)] text-white px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>
            )}

            {/* Icon */}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              item.popular ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-accent)]'
            }`}>
              {item.icon}
            </div>

            {/* Title & price */}
            <div>
              <h3 className="font-body font-medium text-base text-[var(--color-fg)] mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="font-body font-semibold text-lg leading-none text-[var(--color-accent)]">
                {item.price}
              </p>
              <p className="font-mono text-[10px] text-[var(--color-fg)] opacity-40 mt-1">{item.min}</p>
            </div>

            {/* Description */}
            <p className="font-body text-xs text-[var(--color-fg)] opacity-55 leading-relaxed">
              {item.description}
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-[var(--color-muted)] opacity-30" />

            {/* Includes */}
            <ul className="flex flex-col gap-2 flex-1">
              {item.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-body text-xs text-[var(--color-fg)] opacity-60">{inc}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              to="/booking"
              className={`mt-2 w-full text-center font-mono text-[10px] tracking-widest uppercase py-3 transition-all duration-300 ${
                item.popular
                  ? 'bg-[var(--color-accent)] text-white hover:opacity-90'
                  : 'border border-[var(--color-muted)] border-opacity-40 text-[var(--color-fg)] opacity-70 hover:opacity-100 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }`}
            >
              Konsultasi Gratis →
            </Link>
          </div>
        ))}
      </div>

      {/* Bundling note */}
      <div className="mt-8 p-5 rounded-xl bg-[var(--color-accent)] bg-opacity-10 border border-[var(--color-accent)] border-opacity-20 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">💡</span>
        <p className="font-body text-sm text-[var(--color-fg)] opacity-70 leading-relaxed">
          <strong className="text-[var(--color-fg)] opacity-100">Bundling hemat:</strong> Pesan VR App + Sewa/Beli Oculus sekaligus dan dapatkan{' '}
          <span className="text-[var(--color-accent)] font-medium">diskon 10%</span> untuk total paket.{' '}
          <Link to="/booking" className="text-[var(--color-accent)] underline underline-offset-2 hover:opacity-80 transition-opacity">
            Hubungi kami untuk penawaran custom.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default PriceListSection;