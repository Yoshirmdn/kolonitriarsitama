import { useParams, Link } from 'react-router-dom';
import { articles } from '../data';

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="pt-40 section-padding min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="label-text text-[var(--color-accent)]">404</p>
        <h2 className="font-display text-4xl font-light text-[var(--color-fg)]">Artikel tidak ditemukan</h2>
        <Link to="/articles" className="btn-outline inline-flex items-center gap-3">← Kembali</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-0 overflow-hidden">
        <div className="section-padding mb-10">
          <Link to="/articles" className="label-text text-[var(--color-accent)] hover:opacity-80 transition-opacity mb-8 inline-block">
            ← Semua Artikel
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="label-text text-[var(--color-accent)]">{article.category}</span>
            <span className="text-[var(--color-muted)] opacity-40">·</span>
            <span className="label-text text-[var(--color-fg)] opacity-40">{article.date}</span>
            <span className="text-[var(--color-muted)] opacity-40">·</span>
            <span className="label-text text-[var(--color-fg)] opacity-40">{article.readTime}</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-light text-[var(--color-fg)] leading-tight max-w-4xl">
            {article.title}
          </h1>
        </div>
        <div className="aspect-[16/6] overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Content */}
      <section className="py-20 section-padding">
        <div className="max-w-3xl mx-auto">
          <p className="font-display text-2xl font-light text-[var(--color-fg)] leading-relaxed italic opacity-70 mb-10 border-l-2 border-[var(--color-accent)] pl-8">
            {article.excerpt}
          </p>

          {/* Dummy body text */}
          {[
            'Arsitektur tropis Indonesia menyimpan kekayaan yang belum sepenuhnya dieksplorasi. Dari rumah Jawa yang mengutamakan ventilasi silang, hingga rumah panggung Kalimantan yang merespons kelembapan tanah—leluhur kita telah mengembangkan solusi arsitektur yang sangat canggih jauh sebelum AC ditemukan.',
            'Di Arkana, kami percaya bahwa memahami tradisi ini bukan berarti meniru bentuknya secara literal. Justru, tugas arsitek kontemporer adalah menemukan prinsip-prinsip esensial di balik bentuk tersebut—dan menerjemahkannya ke dalam bahasa arsitektur masa kini.',
            'Prinsip pertama: orientasi bangunan terhadap matahari dan angin. Sebuah rumah yang diputar 15 derajat dari sumbu utara-selatan bisa mengurangi beban pendinginan hingga 30%. Prinsip kedua: penggunaan massa termal—dinding tebal batu alam yang menyerap panas siang dan melepaskannya malam hari. Prinsip ketiga: elemen air sebagai pendingin alami.',
            'Ketika kami merancang Villa Ciater, ketiga prinsip ini menjadi fondasi desain sebelum kami membicarakan estetika. Hasilnya adalah bangunan yang sejuk secara alami, hemat energi, dan secara visual berbicara dalam bahasa lanskap perbukitannya.',
            'Inilah yang kami maksud dengan "mendefinisikan ulang" arsitektur tropis modern—bukan sekadar menambahkan atap alang-alang pada bangunan beton minimalis, melainkan merancang dari dalam ke luar, dari prinsip ke bentuk.',
          ].map((para, i) => (
            <p key={i} className="font-body text-sm md:text-base text-[var(--color-fg)] opacity-60 leading-relaxed mb-6">
              {para}
            </p>
          ))}

          <div className="mt-14 pt-10 border-t border-[var(--color-muted)] border-opacity-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="label-text text-[var(--color-fg)] opacity-30 mb-1">Ditulis oleh</p>
              <p className="font-body text-sm text-[var(--color-fg)] opacity-70">Tim Editorial Arkana</p>
            </div>
            <Link to="/articles" className="label-text text-[var(--color-accent)] hover:gap-4 transition-all inline-flex items-center gap-2">
              ← Artikel lainnya
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticleDetail;
