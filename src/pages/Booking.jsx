import { useState } from 'react';
import { siteConfig } from '../data';

const services = ['Arsitektur Residensial', 'Desain Interior', 'Arsitektur Komersial', 'Lansekap', 'Konsultasi'];
const budgets = ['< Rp 500 Juta', 'Rp 500 Juta – 2 Miliar', 'Rp 2 – 5 Miliar', '> Rp 5 Miliar', 'Belum ditentukan'];

const Booking = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', budget: '', date: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-24 section-padding min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 border border-[var(--color-accent)] flex items-center justify-center mx-auto mb-8">
            <span className="text-[var(--color-accent)] text-2xl">✓</span>
          </div>
          <h2 className="font-display text-4xl font-light text-[var(--color-fg)] mb-4">Terima Kasih!</h2>
          <p className="font-body text-sm text-[var(--color-fg)] opacity-60 leading-relaxed mb-8">
            Kami telah menerima permintaan konsultasi Anda. Tim kami akan menghubungi Anda dalam 1–2 hari kerja untuk mengkonfirmasi jadwal.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-outline inline-flex items-center gap-3">
            Kirim Permintaan Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="pt-40 pb-16 section-padding bg-[var(--color-surface)]">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
          <span className="label-text text-[var(--color-accent)]">Konsultasi</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="font-display text-6xl md:text-8xl font-light text-[var(--color-fg)] leading-none">
            Jadwalkan<br /><span className="italic opacity-50">Konsultasi</span>
          </h1>
          <p className="font-body text-sm text-[var(--color-fg)] opacity-50 max-w-xs leading-relaxed">
            Konsultasi pertama gratis. Ceritakan proyek impian Anda kepada kami.
          </p>
        </div>
      </section>

      <section className="py-16 section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="label-text text-[var(--color-fg)] opacity-50 block mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border-b border-[var(--color-muted)] border-opacity-40 bg-transparent py-3 font-body text-sm text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder-[var(--color-fg)] placeholder-opacity-20"
                    placeholder="Nama Anda"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="label-text text-[var(--color-fg)] opacity-50 block mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border-b border-[var(--color-muted)] border-opacity-40 bg-transparent py-3 font-body text-sm text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder-[var(--color-fg)] placeholder-opacity-20"
                    placeholder="email@anda.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="label-text text-[var(--color-fg)] opacity-50 block mb-2">No. Telepon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border-b border-[var(--color-muted)] border-opacity-40 bg-transparent py-3 font-body text-sm text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder-[var(--color-fg)] placeholder-opacity-20"
                    placeholder="+62 8xx"
                  />
                </div>
                {/* Preferred date */}
                <div>
                  <label className="label-text text-[var(--color-fg)] opacity-50 block mb-2">Tanggal Konsultasi</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border-b border-[var(--color-muted)] border-opacity-40 bg-transparent py-3 font-body text-sm text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="label-text text-[var(--color-fg)] opacity-50 block mb-3">Jenis Layanan</label>
                <div className="flex flex-wrap gap-3">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, service: s })}
                      className={`font-mono text-[10px] tracking-wider uppercase px-4 py-2 border transition-all duration-300 ${
                        form.service === s
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                          : 'border-[var(--color-muted)] border-opacity-30 text-[var(--color-fg)] opacity-60 hover:opacity-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="label-text text-[var(--color-fg)] opacity-50 block mb-3">Estimasi Anggaran</label>
                <div className="flex flex-wrap gap-3">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setForm({ ...form, budget: b })}
                      className={`font-mono text-[10px] tracking-wider uppercase px-4 py-2 border transition-all duration-300 ${
                        form.budget === b
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                          : 'border-[var(--color-muted)] border-opacity-30 text-[var(--color-fg)] opacity-60 hover:opacity-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="label-text text-[var(--color-fg)] opacity-50 block mb-2">Ceritakan Proyek Anda</label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border-b border-[var(--color-muted)] border-opacity-40 bg-transparent py-3 font-body text-sm text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none placeholder-[var(--color-fg)] placeholder-opacity-20"
                  placeholder="Deskripsikan proyek, lokasi, luas, dan aspirasi Anda..."
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center">
                Kirim Permintaan Konsultasi →
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-10">
            <div className="p-8 bg-[var(--color-surface)] border border-[var(--color-muted)] border-opacity-20">
              <h3 className="font-display text-xl font-light text-[var(--color-fg)] mb-6">Atau Hubungi Langsung</h3>
              <div className="space-y-5">
                {[
                  { label: 'WhatsApp', value: siteConfig.phone, href: `https://wa.me/628112345678` },
                  { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                  { label: 'Instagram', value: siteConfig.instagram, href: 'https://instagram.com' },
                ].map((c) => (
                  <div key={c.label}>
                    <p className="label-text text-[var(--color-accent)] opacity-60 mb-1">{c.label}</p>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-[var(--color-fg)] opacity-70 hover:opacity-100 hover:text-[var(--color-accent)] transition-all duration-300">
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="label-text text-[var(--color-fg)] opacity-40 mb-4">Jam Operasional</h3>
              <div className="space-y-2">
                {[
                  { day: 'Senin – Jumat', time: '09:00 – 18:00 WIB' },
                  { day: 'Sabtu', time: '10:00 – 15:00 WIB' },
                  { day: 'Minggu', time: 'Tutup' },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <span className="font-body text-xs text-[var(--color-fg)] opacity-50">{h.day}</span>
                    <span className="font-body text-xs text-[var(--color-fg)] opacity-70">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
                alt="Office"
                className="w-full h-full object-cover grayscale opacity-60"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
