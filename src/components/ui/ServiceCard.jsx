import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap';

const ServiceCard = ({ service }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const lineRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -6, duration: 0.4, ease: 'power2.out' });
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.5, ease: 'power2.out' });
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.08, duration: 0.8, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(lineRef.current, { scaleX: 0, duration: 0.4, ease: 'power2.in' });
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 0.8, ease: 'power2.out' });
  };

  return (
    <div
      ref={cardRef}
      className="group relative border border-[var(--color-muted)] border-opacity-30 overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      {service.image && (
        <div className="h-52 overflow-hidden">
          <img
            ref={imgRef}
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-70 dark:opacity-50"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-7 bg-[var(--color-surface)]">
        <div className="flex items-start justify-between mb-5">
          <span className="font-mono text-[10px] text-[var(--color-accent)] tracking-ultra uppercase">
            {service.number}
          </span>
          <span className="text-[var(--color-muted)] text-2xl opacity-50">
            {service.icon}
          </span>
        </div>

        <h3 className="font-display text-2xl font-light text-[var(--color-fg)] mb-1 leading-snug">
          {service.title}
        </h3>
        <p className="label-text text-[var(--color-muted)] mb-4 opacity-60">
          {service.subtitle}
        </p>
        <p className="body-text text-[var(--color-fg)] opacity-60 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Animated underline */}
        <div className="mt-6 h-[1px] bg-[var(--color-accent)] origin-left" style={{ transform: 'scaleX(0)' }} ref={lineRef} />

        <Link
          to="/services"
          className="inline-flex items-center gap-2 mt-4 font-mono text-[10px] text-[var(--color-accent)] tracking-wider uppercase group-hover:gap-4 transition-all duration-300"
        >
          Pelajari lebih →
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
