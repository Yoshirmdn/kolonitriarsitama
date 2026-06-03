import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';
import { siteConfig } from '../../data';

const LoaderScreen = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Animate counter
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.val).toString().padStart(3, '0');
        }
      },
    });

    // Line grow
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2, ease: 'power2.inOut' },
      0
    );

    // Text reveal
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      0.3
    );

    // Exit
    tl.to(
      loaderRef.current,
      {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.3,
      }
    );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[var(--color-fg)] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Studio name */}
      <div ref={textRef} className="text-center mb-16">
        <p className="font-mono text-xs text-[var(--color-muted)] tracking-ultra uppercase mb-4">
          Studio Arsitektur
        </p>
        <h1 className="font-display text-6xl md:text-8xl text-[var(--color-bg)] font-light tracking-tight">
          {siteConfig.name}
        </h1>
      </div>

      {/* Progress line */}
      <div className="w-48 md:w-64 h-[1px] bg-[var(--color-muted)] opacity-30 relative mb-4">
        <div
          ref={lineRef}
          className="absolute inset-0 bg-[var(--color-accent)] origin-left"
        />
      </div>

      {/* Counter */}
      <span
        ref={counterRef}
        className="font-mono text-xs text-[var(--color-muted)] opacity-60 tracking-widest"
      >
        000
      </span>

      {/* Corner labels */}
      <div className="absolute bottom-8 left-8">
        <p className="font-mono text-[10px] text-[var(--color-muted)] opacity-40 tracking-ultra uppercase">
          Bandung, Indonesia
        </p>
      </div>
      <div className="absolute bottom-8 right-8">
        <p className="font-mono text-[10px] text-[var(--color-muted)] opacity-40 tracking-ultra uppercase">
          Est. {siteConfig.year}
        </p>
      </div>
    </div>
  );
};

export default LoaderScreen;
