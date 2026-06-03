import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({
  label,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const labelEl    = el.querySelector('.st-label');
      const titleLines = el.querySelectorAll('.st-line');
      const subEl      = el.querySelector('.st-sub');

      const trig = { trigger: el, start: 'top 85%', toggleActions: 'play none none none' };

      if (labelEl) {
        gsap.fromTo(labelEl, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: trig });
      }
      if (titleLines.length) {
        gsap.fromTo(titleLines, { y: '105%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.1, stagger: 0.1, ease: 'power4.out', scrollTrigger: trig });
      }
      if (subEl) {
        gsap.fromTo(subEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.25, scrollTrigger: trig });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const alignClass = align === 'center' ? 'text-center items-center'
    : align === 'right' ? 'text-right items-end'
    : 'text-left';

  return (
    <div ref={containerRef} className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {label && (
        <div className={`st-label flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
          <span className={`font-mono text-[10px] tracking-[0.3em] uppercase ${light ? 'text-[var(--color-muted)]' : 'text-[var(--color-accent)]'}`}>
            {label}
          </span>
        </div>
      )}

      {title && (
        <div>
          {title.split('\n').map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span className={`st-line block font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight ${light ? 'text-[var(--color-bg)]' : 'text-[var(--color-fg)]'}`}>
                {line}
              </span>
            </div>
          ))}
        </div>
      )}

      {subtitle && (
        <p className={`st-sub font-body text-sm leading-relaxed max-w-md ${light ? 'text-[var(--color-muted)]' : 'text-[var(--color-fg)] opacity-55'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
