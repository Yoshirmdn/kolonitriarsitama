import { Link } from 'react-router-dom';
import { articles } from '../data';

const Articles = () => {
  return (
    <>
      <section className="pt-40 pb-16 section-padding bg-[var(--color-surface)]">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
          <span className="label-text text-[var(--color-accent)]">Artikel</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="font-display text-6xl md:text-8xl font-light text-[var(--color-fg)] leading-none">
            Wawasan<br /><span className="italic opacity-50">& Inspirasi</span>
          </h1>
          <p className="font-body text-sm text-[var(--color-fg)] opacity-50 max-w-xs leading-relaxed">
            Pemikiran kami tentang arsitektur, desain, dan kehidupan.
          </p>
        </div>
      </section>

      <section className="py-16 section-padding">
        {/* Featured article */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-16 border border-[var(--color-muted)] border-opacity-20">
          <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="p-10 md:p-14 flex flex-col justify-center bg-[var(--color-surface)]">
            <div className="flex items-center gap-4 mb-6">
              <span className="label-text text-[var(--color-accent)]">{articles[0].category}</span>
              <span className="text-[var(--color-muted)] opacity-40">·</span>
              <span className="label-text text-[var(--color-fg)] opacity-40">{articles[0].date}</span>
              <span className="text-[var(--color-muted)] opacity-40">·</span>
              <span className="label-text text-[var(--color-fg)] opacity-40">{articles[0].readTime}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[var(--color-fg)] leading-tight mb-6">
              {articles[0].title}
            </h2>
            <p className="font-body text-sm text-[var(--color-fg)] opacity-60 leading-relaxed mb-8">
              {articles[0].excerpt}
            </p>
            <Link
              to={`/articles/${articles[0].slug}`}
              className="inline-flex items-center gap-3 font-mono text-[10px] tracking-ultra uppercase text-[var(--color-accent)] hover:gap-6 transition-all duration-300"
            >
              Baca Selengkapnya →
            </Link>
          </div>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="group">
              <div className="aspect-[16/9] overflow-hidden mb-5 bg-[var(--color-muted)]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="label-text text-[var(--color-accent)]">{article.category}</span>
                <span className="text-[var(--color-muted)] opacity-30 text-xs">·</span>
                <span className="label-text text-[var(--color-fg)] opacity-30">{article.date}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-[var(--color-fg)] leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {article.title}
              </h3>
              <p className="font-body text-xs text-[var(--color-fg)] opacity-50 leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <Link
                to={`/articles/${article.slug}`}
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-wider uppercase text-[var(--color-accent)] opacity-70 hover:opacity-100 hover:gap-4 transition-all duration-300"
              >
                Baca {article.readTime} →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Articles;
