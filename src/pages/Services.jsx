import { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsap';
import ServiceCard from '../components/ui/ServiceCard';
import SectionTitle from '../components/ui/SectionTitle';
import CTASection from '../components/sections/CTASection';
import ProcessSection from '../components/sections/ProcessSection';
import Pricecalcuator from '../components/sections/Pricecalculator';
import { services } from '../data';

const Services = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-hero > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-40 pb-20 section-padding bg-[var(--color-surface)]">
        <div className="svc-hero max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
            <span className="label-text text-[var(--color-accent)]">Layanan</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-light text-[var(--color-fg)] leading-none mb-8">
            Apa yang<br /><span className="italic">Kami</span><br />Kerjakan
          </h1>
          <p className="font-body text-sm text-[var(--color-fg)] opacity-60 max-w-lg leading-relaxed">
            Dari mimpi hingga kenyataan—kami menawarkan layanan komprehensif yang mencakup seluruh spektrum perancangan dan pengawasan arsitektur.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
      
      <ProcessSection />
      <Pricecalcuator />
      <CTASection />
    </>
  );
};

export default Services;
