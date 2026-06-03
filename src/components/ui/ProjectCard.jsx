import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap';

const ProjectCard = ({ project, index = 0, size = 'md' }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const infoRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.8, ease: 'power2.out' });
    gsap.to(infoRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.8, ease: 'power2.out' });
    gsap.to(infoRef.current, { y: 10, opacity: 0, duration: 0.3, ease: 'power2.in' });
  };

  const heights = {
    sm: 'h-64 md:h-80',
    md: 'h-80 md:h-96',
    lg: 'h-96 md:h-[28rem]',
    xl: 'h-[28rem] md:h-[36rem]',
  };

  return (
    <Link
      to={`/projects/${project.slug}`}
      ref={cardRef}

      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-[var(--color-muted)] ${heights[size]}`}>
        <img
          ref={imgRef}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover info */}
        <div
          ref={infoRef}
          className="absolute bottom-0 left-0 right-0 p-6 opacity-0"
          style={{ transform: 'translateY(10px)' }}
        >
          <p className="font-mono text-[10px] text-white/70 tracking-ultra uppercase mb-2">
            {project.location} · {project.year}
          </p>
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] text-white/60 border border-white/30 px-2 py-1 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Index number */}
        <div className="absolute top-4 right-4">
          <span className="font-mono text-xs text-white/40">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div className="pt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl md:text-2xl font-light text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <p className="label-text text-[var(--color-accent)] mt-1 opacity-70">
            {project.subtitle || project.tags[0]}
          </p>
        </div>
        <span className="text-[var(--color-fg)] opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 mt-1 text-lg">
          →
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
