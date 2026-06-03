import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from './hooks';
import PageLayout from './components/layout/PageLayout';
import LoaderScreen from './components/ui/LoaderScreen';
import CursorFollower from './components/ui/CursorFollower';
import ScrollProgress from './components/ui/ScrollProgress';
import './styles/globals.css';

const Home          = lazy(() => import('./pages/Home'));
const About         = lazy(() => import('./pages/About'));
const Services      = lazy(() => import('./pages/Services'));
const Projects      = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Gallery       = lazy(() => import('./pages/Gallery'));
const Articles      = lazy(() => import('./pages/Articles'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Booking       = lazy(() => import('./pages/Booking'));
const Contact       = lazy(() => import('./pages/Contact'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center section-padding gap-6 text-center">
    <p className="label-text text-[var(--color-accent)]">404</p>
    <h1 className="font-display text-6xl font-light text-[var(--color-fg)]">Halaman tidak ditemukan</h1>
    <p className="font-body text-sm text-[var(--color-fg)] opacity-50 max-w-xs">
      Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.
    </p>
    <a href="/" className="btn-outline inline-flex items-center gap-3">← Kembali ke Beranda</a>
  </div>
);

const AppInner = () => {
  useLenis();
  return (
    <>
      <CursorFollower />
      <ScrollProgress />
      <ScrollToTop />
      <PageLayout>
        <Suspense fallback={<div className="min-h-screen bg-[var(--color-bg)]" />}>
          <Routes>
            <Route path="/"                      element={<Home />} />
            <Route path="/about"                 element={<About />} />
            <Route path="/services"              element={<Services />} />
            <Route path="/projects"              element={<Projects />} />
            <Route path="/projects/architecture" element={<Projects />} />
            <Route path="/projects/interior"     element={<Projects />} />
            <Route path="/projects/:slug"        element={<ProjectDetail />} />
            <Route path="/gallery"               element={<Gallery />} />
            <Route path="/articles"              element={<Articles />} />
            <Route path="/articles/:slug"        element={<ArticleDetail />} />
            <Route path="/booking"               element={<Booking />} />
            <Route path="/contact"               element={<Contact />} />
            <Route path="*"                      element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageLayout>
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <BrowserRouter>
      {loading  && <LoaderScreen onComplete={() => setLoading(false)} />}
      {!loading && <AppInner />}
    </BrowserRouter>
  );
};

export default App;
