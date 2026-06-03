import { useRef, useEffect } from 'react';
import { gsap } from '../../animations/gsap';

const MarqueeText = ({ text, speed = 30, light = false, className = '' }) => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    const duration = totalWidth / speed;
    const anim = gsap.to(track, {
      x: -totalWidth,
      duration,
      ease: 'none',
      repeat: -1,
    });
    return () => anim.kill();
  }, [speed]);

  const items = Array(8).fill(text);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="inline-flex gap-0">
        {items.concat(items).map((t, i) => (
          <span
            key={i}
            className={`font-display text-4xl md:text-6xl lg:text-8xl font-light tracking-tight px-8 ${
              light ? 'text-[var(--color-bg)]' : 'text-[var(--color-fg)]'
            } ${i % 2 === 1 ? 'italic opacity-30' : 'opacity-90'}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeText;
