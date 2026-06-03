import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';
import SectionTitle from '../ui/SectionTitle';
import ServiceCard from '../ui/ServiceCard';
import { services } from '../../data';

const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
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
    <section ref={sectionRef} className="py-24 md:py-40 section-padding bg-[var(--color-surface)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
        <SectionTitle
          label="Layanan Kami"
          title={'Keahlian\nyang Kami\nTawarkan'}
        />
        <p className="font-body text-sm text-[var(--color-fg)] opacity-50 max-w-xs leading-relaxed md:text-right">
          Dari konsep awal hingga pengawasan konstruksi—kami hadir di setiap tahap perjalanan proyek Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
