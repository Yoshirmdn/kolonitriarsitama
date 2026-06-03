import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';
import Navbar from './Navbar';
import Footer from './Footer';

const PageLayout = ({ children }) => {
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  return (
    <>
      <Navbar />
      <main ref={mainRef}>{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
