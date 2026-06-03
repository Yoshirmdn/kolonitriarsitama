import { Link } from 'react-router-dom';
import { siteConfig, navLinks } from '../../data';
import MarqueeText from '../ui/MarqueeText';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-fg)] text-[var(--color-bg)] overflow-hidden">
      {/* Marquee */}
      <div className="py-10 border-b border-white/10">
        <MarqueeText text="Arsitektur · Desain · Ruang · " light speed={40} />
      </div>

      {/* Main footer content */}
      <div className="section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="block mb-6">
              <h2 className="font-display text-5xl md:text-6xl font-light text-[var(--color-bg)] leading-none">
                {siteConfig.name}
              </h2>
              <p className="label-text text-[var(--color-accent)] opacity-70 mt-2">
                {siteConfig.tagline}
              </p>
            </Link>
            <p className="font-body text-sm text-[var(--color-bg)] opacity-50 max-w-sm leading-relaxed mb-8">
              {siteConfig.description} Setiap proyek adalah kolaborasi antara visi klien dan keahlian kami.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase px-7 py-4 border border-[var(--color-bg)] border-opacity-30 text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-fg)] transition-all duration-400 group"
            >
              Mulai Proyek
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <p className="label-text text-[var(--color-bg)] opacity-30 mb-6">Navigasi</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-[var(--color-bg)] opacity-60 hover:opacity-100 hover:text-[var(--color-accent)] transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label-text text-[var(--color-bg)] opacity-30 mb-6">Kontak</p>
            <ul className="flex flex-col gap-4">
              <li>
                <p className="label-text text-[var(--color-bg)] opacity-30 mb-1">Alamat</p>
                <p className="font-body text-sm text-[var(--color-bg)] opacity-60 leading-relaxed">
                  {siteConfig.address}
                </p>
              </li>
              <li>
                <p className="label-text text-[var(--color-bg)] opacity-30 mb-1">Email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-body text-sm text-[var(--color-bg)] opacity-60 hover:text-[var(--color-accent)] hover:opacity-100 transition-all duration-300"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <p className="label-text text-[var(--color-bg)] opacity-30 mb-1">Telepon</p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="font-body text-sm text-[var(--color-bg)] opacity-60 hover:text-[var(--color-accent)] hover:opacity-100 transition-all duration-300"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <p className="label-text text-[var(--color-bg)] opacity-30 mb-1">Instagram</p>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-[var(--color-bg)] opacity-60 hover:text-[var(--color-accent)] hover:opacity-100 transition-all duration-300"
                >
                  {siteConfig.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-[var(--color-bg)] opacity-30 tracking-wider uppercase">
            © {year} {siteConfig.name}. Hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-mono text-[10px] text-[var(--color-bg)] opacity-30 hover:opacity-70 tracking-wider uppercase transition-opacity duration-300"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="font-mono text-[10px] text-[var(--color-bg)] opacity-20 tracking-wider">
            Est. {siteConfig.year} · Bandung, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
