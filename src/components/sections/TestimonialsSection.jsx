import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../animations/gsap';
import SectionTitle from '../ui/SectionTitle';
import TestimonialCard from '../ui/TestimonialCard';
import { testimonials } from '../../data';

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const goTo = (index) => {
    gsap.to(cardRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActive(index);
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      },
    });
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-40 section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
        {/* Left */}
        <div className="lg:col-span-2">
          <SectionTitle
            label="Testimoni"
            title={'Apa Kata\nKlien\nKami'}
          />

          {/* Navigation thumbnails */}
          <div className="mt-12 flex flex-col gap-4">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                className={`flex items-center gap-4 text-left transition-all duration-300 group ${
                  i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <div className={`w-[2px] h-10 transition-all duration-300 ${i === active ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-muted)]'}`} />
                <div>
                  <p className="font-body text-sm text-[var(--color-fg)] font-light">{t.name}</p>
                  <p className="label-text text-[var(--color-accent)] opacity-60 text-[9px]">{t.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active card */}
        <div className="lg:col-span-3" ref={cardRef}>
          <TestimonialCard testimonial={testimonials[active]} active />

          {/* Nav arrows */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)}
              className="w-12 h-12 border border-[var(--color-muted)] border-opacity-30 flex items-center justify-center text-[var(--color-fg)] opacity-50 hover:opacity-100 hover:border-[var(--color-accent)] transition-all duration-300"
            >
              ←
            </button>
            <button
              onClick={() => goTo((active + 1) % testimonials.length)}
              className="w-12 h-12 border border-[var(--color-muted)] border-opacity-30 flex items-center justify-center text-[var(--color-fg)] opacity-50 hover:opacity-100 hover:border-[var(--color-accent)] transition-all duration-300"
            >
              →
            </button>
            <span className="font-mono text-[10px] text-[var(--color-fg)] opacity-30 ml-2">
              {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
