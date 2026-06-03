import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data';

const FeaturedProjects = () => {
  const sectionRef = useRef(null);
  const featured = projects.filter((p) => p.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.proj-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 section-padding">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
        <SectionTitle
          label="Proyek Pilihan"
          title={'Karya\nTerbaik\nKami'}
        />
        <Link
          to="/projects/architecture"
          className="hidden md:inline-flex items-center gap-3 font-mono text-xs tracking-wider uppercase text-[var(--color-accent)] hover:gap-6 transition-all duration-300"
        >
          Semua Proyek →
        </Link>
      </div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Large card — left */}
        <div className="proj-card md:col-span-7">
          <ProjectCard project={featured[0]} index={0} size="xl" />
        </div>

        {/* Right column: 2 stacked */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="proj-card">
            <ProjectCard project={featured[1]} index={1} size="lg" />
          </div>
          <div className="proj-card">
            <ProjectCard project={featured[2]} index={2} size="md" />
          </div>
        </div>

        {/* Full-width bottom card */}
        <div className="proj-card md:col-span-5">
          <ProjectCard project={featured[3]} index={3} size="lg" />
        </div>

        {/* Two more bottom right */}
        <div className="proj-card md:col-span-3">
          <ProjectCard project={projects[4]} index={4} size="md" />
        </div>
        <div className="proj-card md:col-span-4">
          <ProjectCard project={projects[5]} index={5} size="md" />
        </div>
      </div>

      <div className="mt-12 text-center md:hidden">
        <Link
          to="/projects/architecture"
          className="btn-outline inline-flex items-center gap-3"
        >
          Semua Proyek →
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProjects;
