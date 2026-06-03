import { useState, useEffect, useRef } from 'react';
import { gsap } from '../animations/gsap';
import { galleryImages } from '../data';

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.05, ease: 'power3.out', delay: 0.2 }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setLightbox(null);
    if (e.key === 'ArrowRight') setLightbox((prev) => (prev + 1) % galleryImages.length);
    if (e.key === 'ArrowLeft') setLightbox((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    if (lightbox !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-16 section-padding bg-[var(--color-surface)]">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
          <span className="label-text text-[var(--color-accent)]">Galeri</span>
        </div>
        <h1 className="font-display text-6xl md:text-8xl font-light text-[var(--color-fg)] leading-none">
          Momen<br /><span className="italic opacity-50">Terbaik</span>
        </h1>
      </section>

      {/* Grid */}
      <section className="py-12 section-padding" ref={gridRef}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="gallery-item break-inside-avoid cursor-zoom-in overflow-hidden"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9990] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 font-mono text-xs text-white/50 hover:text-white tracking-wider uppercase"
            onClick={() => setLightbox(null)}
          >
            Tutup ✕
          </button>
          <button
            className="absolute left-4 md:left-8 text-white/50 hover:text-white text-3xl"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length); }}
          >
            ←
          </button>
          <img
            src={galleryImages[lightbox]}
            alt={`Gallery ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 md:right-8 text-white/50 hover:text-white text-3xl"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length); }}
          >
            →
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <span className="font-mono text-xs text-white/30">
              {String(lightbox + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
