import { useState } from 'react';
import { siteConfig } from '../data';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <>
      <section className="pt-40 pb-16 section-padding bg-[var(--color-surface)]">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
          <span className="label-text text-[var(--color-accent)]">Kontak</span>
        </div>
        <h1 className="font-display text-6xl md:text-8xl font-light text-[var(--color-fg)] leading-none mb-6">
          Mari<br /><span className="italic opacity-50">Berbicara</span>
        </h1>
      </section>

      <section className="py-16 section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-3xl font-light text-[var(--color-fg)] mb-6">
                Satu percakapan bisa mengubah sebuah proyek.
              </h2>
              <p className="font-body text-sm text-[var(--color-fg)] opacity-60 leading-relaxed">
                Kami senang mendengar dari Anda—baik itu tentang proyek baru, kolaborasi, atau sekadar ingin mengenal studio kami lebih jauh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: 'Alamat Studio', lines: [siteConfig.address] },
                { label: 'Email', lines: [siteConfig.email] },
                { label: 'Telepon', lines: [siteConfig.phone] },
                { label: 'Sosial Media', lines: [siteConfig.instagram, 'Arkana Studio'] },
              ].map((item) => (
                <div key={item.label}>
                  <p className="label-text text-[var(--color-accent)] opacity-70 mb-2">{item.label}</p>
                  {item.lines.map((line, i) => (
                    <p key={i} className="font-body text-sm text-[var(--color-fg)] opacity-70 leading-relaxed">{line}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className="aspect-[16/9] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80"
                alt="Office location"
                className="w-full h-full object-cover grayscale opacity-50"
              />
            </div>
          </div>

          {/* Right: form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-14 h-14 border border-[var(--color-accent)] flex items-center justify-center mb-6">
                  <span className="text-[var(--color-accent)] text-xl">✓</span>
                </div>
                <h3 className="font-display text-3xl font-light text-[var(--color-fg)] mb-4">Pesan Terkirim</h3>
                <p className="font-body text-sm text-[var(--color-fg)] opacity-60 mb-6">Kami akan merespons dalam 1-2 hari kerja.</p>
                <button onClick={() => setSent(false)} className="btn-outline inline-flex items-center gap-3">
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {[
                  { label: 'Nama', name: 'name', type: 'text', placeholder: 'Nama Anda', required: true },
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'email@anda.com', required: true },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="label-text text-[var(--color-fg)] opacity-50 block mb-3">{field.label} {field.required && '*'}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full border-b border-[var(--color-muted)] border-opacity-40 bg-transparent py-3 font-body text-sm text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder-[var(--color-fg)] placeholder-opacity-20"
                    />
                  </div>
                ))}

                <div>
                  <label className="label-text text-[var(--color-fg)] opacity-50 block mb-3">Pesan</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Ceritakan apa yang Anda butuhkan..."
                    className="w-full border-b border-[var(--color-muted)] border-opacity-40 bg-transparent py-3 font-body text-sm text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none placeholder-[var(--color-fg)] placeholder-opacity-20"
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Kirim Pesan →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
