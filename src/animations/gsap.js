import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export { gsap, ScrollTrigger };

// Defaults
gsap.defaults({ ease: 'power3.out', duration: 1 });

// Text reveal animation
export const textReveal = (elements, trigger, delay = 0) => {
  return gsap.fromTo(
    elements,
    { y: '105%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 1.2,
      delay,
      ease: 'power4.out',
      scrollTrigger: trigger ? {
        trigger,
        start: 'top 85%',
        toggleActions: 'play none none none',
      } : undefined,
    }
  );
};

// Fade up animation
export const fadeUp = (elements, trigger, stagger = 0.1, delay = 0) => {
  return gsap.fromTo(
    elements,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: trigger ? {
        trigger,
        start: 'top 80%',
        toggleActions: 'play none none none',
      } : undefined,
    }
  );
};

// Clip reveal (wipe from left)
export const clipReveal = (elements, trigger) => {
  return gsap.fromTo(
    elements,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.4,
      ease: 'power4.inOut',
      scrollTrigger: trigger ? {
        trigger,
        start: 'top 80%',
        toggleActions: 'play none none none',
      } : undefined,
    }
  );
};

// Image parallax
export const imageParallax = (element, trigger, yAmount = 80) => {
  return gsap.fromTo(
    element,
    { y: -yAmount / 2 },
    {
      y: yAmount / 2,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    }
  );
};

// Scale reveal
export const scaleReveal = (elements, trigger) => {
  return gsap.fromTo(
    elements,
    { scale: 1.15, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: trigger ? {
        trigger,
        start: 'top 80%',
      } : undefined,
    }
  );
};

// Stagger cards
export const staggerCards = (elements, trigger) => {
  return gsap.fromTo(
    elements,
    { y: 80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: trigger ? {
        trigger,
        start: 'top 75%',
      } : undefined,
    }
  );
};

// Horizontal scroll
export const createHorizontalScroll = (container, track) => {
  const totalWidth = track.scrollWidth - window.innerWidth;
  return gsap.to(track, {
    x: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });
};

// Number counter
export const counterAnimation = (element, end, trigger) => {
  return gsap.fromTo(
    { val: 0 },
    {
      val: end,
      duration: 2,
      ease: 'power2.out',
      onUpdate: function () {
        element.textContent = Math.round(this.targets()[0].val);
      },
      scrollTrigger: trigger ? {
        trigger,
        start: 'top 80%',
        once: true,
      } : undefined,
    }
  );
};
