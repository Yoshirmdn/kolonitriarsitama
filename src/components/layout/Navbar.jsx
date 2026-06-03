import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import { navLinks, siteConfig } from '../../data';
import { useDarkMode } from '../../hooks';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();
  const location = useLocation();
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.to(menuRef.current, { x: '0%', duration: 0.7, ease: 'power4.inOut' });
      gsap.fromTo(
        menuItemsRef.current.filter(Boolean),
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
      );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(menuRef.current, { x: '100%', duration: 0.6, ease: 'power4.inOut' });
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
          scrolled ? 'glass-nav border-b border-[var(--color-muted)] border-opacity-20 py-4' : 'py-6'
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-display text-2xl font-light tracking-tight text-[var(--color-fg)]">
              {siteConfig.name}
            </span>
            <span className="label-text text-[var(--color-accent)] opacity-70 text-[9px]">
              {siteConfig.tagline}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 6).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-xs tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-fg)] opacity-60 hover:opacity-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 flex items-center justify-center text-[var(--color-fg)] opacity-60 hover:opacity-100 transition-opacity duration-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* CTA */}
            <Link
              to="/booking"
              className="hidden md:inline-flex font-mono text-[10px] tracking-ultra uppercase px-5 py-3 border border-[var(--color-fg)] border-opacity-30 text-[var(--color-fg)] hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] transition-all duration-300"
            >
              Konsultasi
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[5px] w-9 h-9 items-center justify-center lg:hidden"
              aria-label="Menu"
            >
              <span className={`block w-5 h-[1px] bg-[var(--color-fg)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block w-5 h-[1px] bg-[var(--color-fg)] transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : ''}`} />
              <span className={`block w-5 h-[1px] bg-[var(--color-fg)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>

            {/* Desktop hamburger for full menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hidden lg:flex flex-col gap-[5px] w-9 h-9 items-center justify-center"
              aria-label="Full menu"
            >
              <span className={`block w-5 h-[1px] bg-[var(--color-fg)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block w-5 h-[1px] bg-[var(--color-fg)] transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : ''}`} />
              <span className={`block w-5 h-[1px] bg-[var(--color-fg)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[800] bg-[var(--color-fg)] flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="section-padding py-6 flex items-center justify-between border-b border-white/10">
          <Link to="/" className="font-display text-2xl text-[var(--color-bg)] font-light">
            {siteConfig.name}
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="font-mono text-[10px] tracking-ultra uppercase text-[var(--color-bg)] opacity-60 hover:opacity-100"
          >
            Tutup ✕
          </button>
        </div>

        <div className="flex-1 section-padding flex flex-col justify-center gap-2">
          {navLinks.map((link, i) => (
            <div
              key={link.path}
              ref={(el) => (menuItemsRef.current[i] = el)}
              className="overflow-hidden border-b border-white/10 last:border-0"
            >
              <Link
                to={link.path}
                className="flex items-center justify-between py-5 group"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] text-white/30 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-4xl md:text-6xl font-light text-[var(--color-bg)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {link.label}
                  </span>
                </div>
                <span className="text-white/30 group-hover:text-[var(--color-accent)] group-hover:translate-x-2 transition-all duration-300">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>

        <div className="section-padding py-8 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-white/10">
          <div>
            <p className="label-text text-white/30 mb-2">Email</p>
            <p className="font-body text-sm text-[var(--color-bg)] opacity-70">{siteConfig.email}</p>
          </div>
          <div>
            <p className="label-text text-white/30 mb-2">Phone</p>
            <p className="font-body text-sm text-[var(--color-bg)] opacity-70">{siteConfig.phone}</p>
          </div>
          <div>
            <p className="label-text text-white/30 mb-2">Instagram</p>
            <p className="font-body text-sm text-[var(--color-bg)] opacity-70">{siteConfig.instagram}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
