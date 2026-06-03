import { useRef } from 'react';
import { gsap } from '../../animations/gsap';

const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  arrow = true,
  ...props
}) => {
  const btnRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
  };

  const classes = `${variant === 'primary' ? 'btn-primary' : 'btn-outline'} ${className}`;

  const inner = (
    <>
      {children}
      {arrow && (
        <span className="transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        className={`group ${classes}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`group ${classes}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {inner}
    </button>
  );
};

export default Button;
