import HeroSection from '../components/sections/HeroSection';
import AboutIntro from '../components/sections/AboutIntro';
import ServicesSection from '../components/sections/ServicesSection';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import HorizontalShowcase from '../components/sections/HorizontalShowcase';
import WhyUsSection from '../components/sections/WhyUsSection';
import ProcessSection from '../components/sections/ProcessSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import MarqueeText from '../components/ui/MarqueeText';
import PriceList from '../components/sections/Pricelistsection';
import MitraSection from '../components/sections/Mitrasection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutIntro />
      <div className="py-12 bg-[var(--color-surface)] overflow-hidden">
        <MarqueeText text="Arsitektur · Interior · Komersial · Residensial · Lansekap · " />
      </div>
      <ServicesSection />
      <PriceList />
      <FeaturedProjects />
      <MitraSection />
      <HorizontalShowcase />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default Home;
