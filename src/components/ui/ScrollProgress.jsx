import { useScrollProgress } from '../../hooks';

const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div
      id="scroll-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        background: 'var(--color-accent)',
        zIndex: 9998,
        width: `${progress * 100}%`,
        transition: 'width 0.1s linear',
      }}
    />
  );
};

export default ScrollProgress;
