import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../animations/gsap';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data';

const categories = [
  { id: 'all',          label: 'Semua' },
  { id: 'architecture', label: 'Arsitektur' },
  { id: 'interior',     label: 'Interior' },
];

const Projects = () => {
  const { pathname } = useLocation();

  // Derive active category from URL
  const initCat = pathname.includes('/interior') ? 'interior'
    : pathname.includes('/architecture') ? 'architecture'
    : 'all';

  const [activeCategory, setActiveCategory] = useState(initCat);
  const gridRef = useRef(null);

  // Sync when URL changes (e.g. nav link)
  useEffect(() => {
    const cat = pathname.includes('/interior') ? 'interior'
      : pathname.includes('/architecture') ? 'architecture'
      : 'all';
    setActiveCategory(cat);
  }, [pathname]);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const handleFilter = (cat) => {
    if (cat === activeCategory) return;
    gsap.to(gridRef.current, {
      opacity: 0, y: 20, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActiveCategory(cat);
        gsap.to(gridRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      },
    });
  };

  // Stagger on mount & category change
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.proj-item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 section-padding bg-[var(--color-surface)]">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
          <span className="label-text text-[var(--color-accent)]">Portofolio</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 className="font-display text-6xl md:text-8xl font-light text-[var(--color-fg)] leading-none">
            Proyek<br /><span className="italic opacity-50">Kami</span>
          </h1>
          <p className="font-body text-sm text-[var(--color-fg)] opacity-50 max-w-xs leading-relaxed">
            {filtered.length} proyek selesai di seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="section-padding py-6 border-b border-[var(--color-muted)] border-opacity-20 flex items-center gap-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.id)}
            className={`font-mono text-[10px] tracking-ultra uppercase pb-1 border-b transition-all duration-300 ${
              activeCategory === cat.id
                ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                : 'border-transparent text-[var(--color-fg)] opacity-40 hover:opacity-80'
            }`}
          >
            {cat.label}
          </button>
        ))}
        <span className="ml-auto label-text text-[var(--color-fg)] opacity-30">
          {filtered.length} proyek
        </span>
      </section>

      {/* Grid */}
      <section className="py-16 section-padding" ref={gridRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <div key={project.id} className="proj-item">
              <ProjectCard project={project} index={i} size="lg" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
