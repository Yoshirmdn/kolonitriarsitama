import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';

const AnimatedText = ({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  trigger = true,
  once = true,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // Split text into words
    const text = el.textContent;
    const words = text.split(' ');
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="word-wrap" style="overflow:hidden;display:inline-block;"><span class="word" style="display:inline-block;">${word}&nbsp;</span></span>`
      )
      .join('');

    const wordEls = el.querySelectorAll('.word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          stagger: 0.04,
          delay,
          ease: 'power4.out',
          scrollTrigger: trigger
            ? {
                trigger: el,
                start: 'top 88%',
                toggleActions: once ? 'play none none none' : 'play none none reverse',
              }
            : undefined,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, trigger, once]);

  return <Tag ref={ref} className={className} />;
};

export default AnimatedText;
