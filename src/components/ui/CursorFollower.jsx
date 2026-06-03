import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../animations/gsap';

const CursorFollower = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power1.out' });
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(animate);
    };
    animate();

    const onEnterLink = () => setIsHovering(true);
    const onLeaveLink = () => setIsHovering(false);
    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const links = document.querySelectorAll('a, button, [data-cursor]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="rounded-full bg-[var(--color-accent)] transition-all duration-300"
          style={{
            width: isHovering ? '8px' : '5px',
            height: isHovering ? '8px' : '5px',
          }}
        />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="rounded-full border border-[var(--color-fg)] transition-all duration-400"
          style={{
            width: isHovering ? '50px' : '36px',
            height: isHovering ? '50px' : '36px',
            opacity: 0.5,
          }}
        />
      </div>
    </>
  );
};

export default CursorFollower;
