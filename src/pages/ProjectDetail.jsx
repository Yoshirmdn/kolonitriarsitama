import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from '../animations/gsap';
import { projects } from '../data';
import ProjectCard from '../components/ui/ProjectCard';

const extraImages = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80',
];

const ProjectDetail = () => {
  const { slug } = useParams();
  const heroRef = useRef(null);

  const project = projects.find((p) => p.slug === slug);
  const related  = project
    ? projects.filter((p) => p.slug !== slug && p.category === project.category).slice(0, 3)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.pd-hero-img', { scale: 1.1 }, { scale: 1, duration: 1.8, ease: 'power3.out' });
      gsap.fromTo('.pd-title',    { y: '110%', opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.3 });
      gsap.fromTo('.pd-meta > *', { opacity: 0, y: 20 },     { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.5, ease: 'power3.out' });
    }, heroRef);
    return () => ctx.revert();
  }, [slug]);

  if (!project) {
    return (
      <div className="pt-40 section-padding min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="label-text text-[var(--color-accent)]">404</p>
        <h2 className="font-display text-4xl font-light text-[var(--color-fg)]">Proyek tidak ditemukan</h2>
        <Link to="/projects" className="btn-outline inline-flex items-center gap-3">← Kembali ke Proyek</Link>
      </div>
    );
  }

  const backPath = project.category === 'interior' ? '/projects/interior' : '/projects/architecture';

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img className="pd-hero-img w-full h-full object-cover" src={project.image} alt={project.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end section-padding pb-16">
          <div className="pd-meta flex items-center gap-4 mb-4 flex-wrap">
            <Link to={backPath} className="label-text text-white/50 hover:text-white transition-colors duration-200">
              ← Proyek
            </Link>
            <span className="text-white/20">·</span>
            {project.tags.map((tag) => (
              <span key={tag} className="label-text text-[var(--color-accent)] opacity-80">{tag}</span>
            ))}
          </div>

          <div className="overflow-hidden">
            <h1 className="pd-title font-display text-6xl md:text-8xl font-light text-white leading-none">
              {project.title}
            </h1>
          </div>

          <div className="pd-meta grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[
              { label: 'Lokasi',    value: project.location },
              { label: 'Tahun',     value: project.year },
              { label: 'Luas',      value: project.area },
              { label: 'Kategori',  value: project.tags[0] },
            ].map((item) => (
              <div key={item.label}>
                <p className="label-text text-white/30 mb-1">{item.label}</p>
                <p className="font-body text-sm text-white/80">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-24 section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Left: description + gallery */}
          <div className="lg:col-span-2 space-y-10">
            <p className="font-display text-2xl md:text-3xl font-light text-[var(--color-fg)] leading-relaxed italic opacity-80">
              "{project.description}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extraImages.map((img, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden bg-[var(--color-muted)]">
                  <img
                    src={img}
                    alt={`Detail ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: info card */}
          <div className="space-y-6">
            <div className="p-8 bg-[var(--color-surface)] border border-[var(--color-muted)] border-opacity-20">
              <h3 className="label-text text-[var(--color-accent)] mb-6">Detail Proyek</h3>
              <dl className="space-y-4">
                {[
                  { term: 'Klien',     def: 'Privat' },
                  { term: 'Lokasi',    def: project.location },
                  { term: 'Tahun',     def: project.year },
                  { term: 'Luas',      def: project.area },
                  { term: 'Tipe',      def: project.tags.join(', ') },
                ].map((item) => (
                  <div key={item.term} className="flex justify-between gap-4 pb-4 border-b border-[var(--color-muted)] border-opacity-20 last:border-0 last:pb-0">
                    <dt className="label-text text-[var(--color-fg)] opacity-40">{item.term}</dt>
                    <dd className="font-body text-sm text-[var(--color-fg)] opacity-70 text-right">{item.def}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Link to="/booking" className="btn-primary w-full justify-center">
              Mulai Proyek Serupa →
            </Link>

            <Link to={backPath} className="btn-outline w-full justify-center">
              ← Kembali ke Portofolio
            </Link>
          </div>

        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-16 section-padding border-t border-[var(--color-muted)] border-opacity-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl font-light text-[var(--color-fg)]">Proyek Terkait</h2>
            <Link to={backPath} className="label-text text-[var(--color-accent)] hover:gap-4 transition-all">
              Semua Proyek →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </section>
      )}
    </>
  );
};

export default ProjectDetail;
