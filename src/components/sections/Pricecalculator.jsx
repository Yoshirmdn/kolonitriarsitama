import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap';

// ─── Config harga ───────────────────────────────────────────────────────────
const VR_APP_TYPES = [
  {
    id: 'exe',
    label: 'VR .EXE',
    sub: 'EXE Desktop atau APK Android',
    pricePerM2: 10000,
    minPrice: 1000000,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    deliverable: 'Aplikasi VR standalone .exe untuk PC/Laptop + Oculus Link',
  },
  {
    id: 'apk',
    label: 'VR .APK',
    sub: 'Oculus Quest 2 & Quest 3',
    pricePerM2: 25000,
    minPrice: 2500000,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    deliverable: 'Aplikasi APK untuk Oculus Quest 2 & Quest 3 standalone wireless',
  },
];

const HEADSET_TYPES = [
  {
    id: 'quest2',
    label: 'Meta Quest 2',
    sewaPerHari: 150000,
    beliPrice: 7000000,
    sub: 'Sewa: Rp 150.000/hari · Beli: +Rp 7.000.000',
  },
  {
    id: 'quest3',
    label: 'Meta Quest 3',
    sewaPerHari: 200000,
    beliPrice: 9000000,
    sub: 'Sewa: Rp 200.000/hari · Beli: +Rp 9.000.000',
  },
];

// ─── Helper ──────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

// ─── Slider component ────────────────────────────────────────────────────────
const Slider = ({ min, max, value, onChange, formatLabel }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative mt-2 mb-1">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 appearance-none rounded-full outline-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--color-accent) ${pct}%, var(--color-muted) ${pct}%)`,
          opacity: 0.8,
        }}
      />
      <div className="flex justify-between mt-2">
        <span className="font-mono text-[9px] text-[var(--color-fg)] opacity-30">{formatLabel(min)}</span>
        <span className="font-mono text-[9px] text-[var(--color-fg)] opacity-30">{formatLabel(max)}</span>
      </div>
    </div>
  );
};

// ─── PANEL: VR Application ───────────────────────────────────────────────────
const VRAppPanel = () => {
  const [type, setType] = useState(VR_APP_TYPES[0]);
  const [luas, setLuas] = useState(100);

  const rawPrice   = luas * type.pricePerM2;
  const finalPrice = Math.max(rawPrice, type.minPrice);
  const isMin      = rawPrice < type.minPrice;

  const checklistByType = {
    exe: ['Scene VR full immersive', 'Navigasi teleport & joystick', 'Lighting & shadow realistis', 'File .exe final + installer', '1× revisi minor'],
    apk: ['Scene VR full immersive', 'Instalasi mudah via SideQuest', 'Wireless standalone—tanpa kabel', 'File .apk final', '1× revisi minor'],
  };

  return (
    <div className="bg-white dark:bg-[#1a1310] rounded-2xl p-7 flex flex-col gap-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-accent)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </div>
        <div>
          <h3 className="font-body font-semibold text-[var(--color-fg)] text-sm">VR Application</h3>
          <p className="font-mono text-[10px] text-[var(--color-fg)] opacity-40">EXE Desktop atau APK Android</p>
        </div>
      </div>

      {/* Type toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--color-surface)] rounded-xl">
        {VR_APP_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setType(t)}
            className={`py-2.5 px-3 rounded-lg text-left transition-all duration-200 ${
              type.id === t.id
                ? 'bg-[var(--color-accent)] shadow-sm'
                : 'hover:bg-white hover:bg-opacity-60'
            }`}
          >
            <p className={`font-body text-xs font-medium ${type.id === t.id ? 'text-white' : 'text-[var(--color-fg)]'}`}>
              {t.label}
            </p>
            <p className={`font-mono text-[9px] mt-0.5 ${type.id === t.id ? 'text-white opacity-75' : 'text-[var(--color-fg)] opacity-40'}`}>
              {fmt(t.pricePerM2)}/m²
            </p>
          </button>
        ))}
      </div>

      {/* Luas input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg)] opacity-50">
            Luas Bangunan
          </label>
          <div className="flex items-center gap-1.5 border border-[var(--color-muted)] border-opacity-40 px-3 py-1.5">
            <input
              type="number"
              value={luas}
              onChange={(e) => setLuas(Math.max(1, Math.min(5000, Number(e.target.value))))}
              className="w-14 bg-transparent font-body text-sm text-[var(--color-fg)] text-right outline-none"
            />
            <span className="font-mono text-[10px] text-[var(--color-fg)] opacity-40">m²</span>
          </div>
        </div>
        <Slider min={1} max={2000} value={luas} onChange={setLuas} formatLabel={(v) => `${v} m²`} />
      </div>

      {/* Result box */}
      <div className={`p-4 rounded-xl ${isMin ? 'bg-amber-50 dark:bg-amber-950/30' : 'bg-[var(--color-surface)]'}`}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-mono text-[10px] text-[var(--color-fg)] opacity-50">
            {luas} m² × {fmt(type.pricePerM2)}
          </p>
          <p className="font-body font-bold text-xl text-[var(--color-accent)] leading-none whitespace-nowrap">
            {fmt(finalPrice)}
          </p>
        </div>
        {isMin && (
          <p className="font-mono text-[9px] text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-1">
            ⚡ Harga minimal berlaku (min {fmt(type.minPrice)})
          </p>
        )}
        <p className="font-body text-[11px] text-[var(--color-fg)] opacity-40 mt-2">
          Deliverable: {type.deliverable}
        </p>
      </div>

      {/* Includes */}
      <ul className="flex flex-col gap-1.5">
        {checklistByType[type.id].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <svg className="w-3 h-3 text-[var(--color-accent)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="font-body text-xs text-[var(--color-fg)] opacity-55">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ─── PANEL: Oculus / Meta Quest ──────────────────────────────────────────────
const OculusPanel = () => {
  const [headset, setHeadset] = useState(HEADSET_TYPES[0]);
  const [mode, setMode]       = useState('sewa'); // 'sewa' | 'beli'
  const [durasi, setDurasi]   = useState(1);

  const total = mode === 'sewa' ? headset.sewaPerHari * durasi : headset.beliPrice;

  return (
    <div className="bg-white dark:bg-[#1a1310] rounded-2xl p-7 flex flex-col gap-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-accent)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path d="M9 10a3 3 0 106 0" />
          </svg>
        </div>
        <div>
          <h3 className="font-body font-semibold text-[var(--color-fg)] text-sm">Oculus / Meta Quest</h3>
          <p className="font-mono text-[10px] text-[var(--color-fg)] opacity-40">Sewa harian atau beli putus</p>
        </div>
      </div>

      {/* Headset selector */}
      <div>
        <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg)] opacity-50 block mb-3">
          Pilih Headset
        </label>
        <div className="grid grid-cols-2 gap-2">
          {HEADSET_TYPES.map((h) => (
            <button
              key={h.id}
              onClick={() => setHeadset(h)}
              className={`p-3 rounded-xl text-left border transition-all duration-200 ${
                headset.id === h.id
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)] bg-opacity-8'
                  : 'border-[var(--color-muted)] border-opacity-25 hover:border-[var(--color-accent)] hover:border-opacity-40'
              }`}
            >
              <p className={`font-body text-xs font-semibold mb-1 ${headset.id === h.id ? 'text-[var(--color-accent)]' : 'text-[var(--color-fg)]'}`}>
                {h.label}
              </p>
              <p className="font-mono text-[9px] text-[var(--color-fg)] opacity-40">
                Sewa: {fmt(h.sewaPerHari)}/hari
              </p>
              <p className="font-mono text-[9px] text-[var(--color-fg)] opacity-40">
                Beli: +{fmt(h.beliPrice)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Mode toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--color-surface)] rounded-xl">
        {[
          { id: 'sewa', label: '↺ Sewa Harian' },
          { id: 'beli', label: '⊞ Beli Putus' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`py-2.5 px-3 rounded-lg font-body text-xs font-medium transition-all duration-200 ${
              mode === m.id
                ? 'bg-[var(--color-accent)] text-white shadow-sm'
                : 'text-[var(--color-fg)] opacity-60 hover:opacity-80'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Durasi (only for sewa) */}
      {mode === 'sewa' && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg)] opacity-50">
              Durasi Sewa
            </label>
            <div className="flex items-center gap-1.5 border border-[var(--color-muted)] border-opacity-40 px-3 py-1.5">
              <input
                type="number"
                value={durasi}
                onChange={(e) => setDurasi(Math.max(1, Math.min(90, Number(e.target.value))))}
                className="w-14 bg-transparent font-body text-sm text-[var(--color-fg)] text-right outline-none"
              />
              <span className="font-mono text-[10px] text-[var(--color-fg)] opacity-40">hari</span>
            </div>
          </div>
          <Slider min={1} max={90} value={durasi} onChange={setDurasi} formatLabel={(v) => `${v} hari`} />
        </div>
      )}

      {/* Result */}
      <div className="p-4 rounded-xl bg-[var(--color-surface)]">
        <div className="flex justify-between items-center mb-1">
          <p className="font-mono text-[10px] text-[var(--color-fg)] opacity-50">
            {mode === 'sewa'
              ? `${headset.label} × ${durasi} hari`
              : `${headset.label} beli putus`}
          </p>
          <p className="font-mono text-[10px] text-[var(--color-fg)] opacity-50">
            {mode === 'sewa' ? fmt(headset.sewaPerHari * durasi) : fmt(headset.beliPrice)}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-[var(--color-muted)] border-opacity-20">
          <p className="font-body text-sm font-semibold text-[var(--color-fg)]">Total</p>
          <p className="font-body font-bold text-xl text-[var(--color-accent)] leading-none">
            {fmt(total)}
          </p>
        </div>
        <p className="font-mono text-[9px] text-[var(--color-fg)] opacity-35 mt-2">
          {mode === 'sewa'
            ? 'Deposit headset berlaku. Pengiriman area Jabodetabek gratis ongkir.'
            : 'Unit baru resmi. Garansi distributor. Gratis ongkir seluruh Indonesia.'}
        </p>
      </div>

      {/* CTA */}
      <Link
        to="/booking"
        className="btn-primary w-full text-center inline-flex items-center justify-center gap-3 group"
      >
        Pesan Sekarang
        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
      </Link>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const tabs = [
  { id: 'vr-app',  label: 'VR Application' },
  { id: 'oculus',  label: 'Oculus / Meta Quest' },
];

const PriceCalculator = () => {
  const [activeTab, setActiveTab] = useState('vr-app');
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.calc-header > *',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.calc-panels',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 section-padding bg-[var(--color-bg)]">
      {/* Header */}
      <div className="calc-header text-center max-w-2xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-accent)]">
            Transparent Pricing
          </span>
          <span className="w-8 h-[1px] bg-[var(--color-accent)]" />
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-light text-[var(--color-fg)] leading-none mb-4">
          Price Calculator
        </h2>
        <p className="font-body text-sm text-[var(--color-fg)] opacity-55 leading-relaxed">
          Hitung estimasi harga project VR kamu secara real-time. Angka ini bersifat estimasi—konsultasi gratis untuk penawaran resmi.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="calc-header flex justify-center mb-8">
        <div className="inline-flex p-1 bg-[var(--color-surface)] rounded-xl gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[var(--color-fg)] text-[var(--color-bg)] shadow-sm'
                  : 'text-[var(--color-fg)] opacity-50 hover:opacity-80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panels */}
      <div className="calc-panels max-w-5xl mx-auto">
        {activeTab === 'vr-app' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <VRAppPanel />
            {/* Info side */}
            <div className="flex flex-col gap-5">
              <div className="bg-[var(--color-fg)] rounded-2xl p-7 text-[var(--color-bg)]">
                <p className="font-mono text-[10px] tracking-wider uppercase text-[var(--color-bg)] opacity-40 mb-4">Cara Kerja</p>
                <ul className="flex flex-col gap-4">
                  {[
                    { n: '01', t: 'Konsultasi Gratis', d: 'Diskusi kebutuhan proyek VR dan cakupan konten tanpa biaya.' },
                    { n: '02', t: 'Proposal & MOU', d: 'Kami kirimkan proposal resmi dengan rincian biaya dan timeline.' },
                    { n: '03', t: 'Proses Produksi', d: 'Mulai produksi VR setelah DP 30% diterima.' },
                    { n: '04', t: 'Serah Terima', d: 'File final diberikan setelah pelunasan.' },
                  ].map((s) => (
                    <li key={s.n} className="flex gap-4">
                      <span className="font-mono text-[10px] text-[var(--color-bg)] opacity-30 w-5 flex-shrink-0 pt-0.5">{s.n}</span>
                      <div>
                        <p className="font-body text-sm font-medium text-[var(--color-bg)] opacity-90 mb-0.5">{s.t}</p>
                        <p className="font-body text-xs text-[var(--color-bg)] opacity-45 leading-relaxed">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[var(--color-accent)] bg-opacity-10 border border-[var(--color-accent)] border-opacity-20 rounded-2xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] mb-2">💡 Tip</p>
                <p className="font-body text-xs text-[var(--color-fg)] opacity-60 leading-relaxed">
                  Bundling VR App + Sewa/Beli Oculus dalam satu kontrak mendapat <strong className="text-[var(--color-accent)]">diskon 10%</strong> dari total paket.
                </p>
                <Link to="/booking" className="inline-flex items-center gap-2 mt-3 font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] hover:gap-4 transition-all duration-300">
                  Minta penawaran →
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'oculus' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <OculusPanel />
            <div className="flex flex-col gap-5">
              <div className="bg-white dark:bg-[#1a1310] rounded-2xl p-7 shadow-sm">
                <p className="font-mono text-[10px] tracking-wider uppercase text-[var(--color-fg)] opacity-40 mb-4">Yang Sudah Termasuk</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Unit Oculus resmi bergaransi distributor',
                    'Sudah terinstal aplikasi VR siap pakai',
                    'Panduan pemakaian & setup lengkap',
                    'Pengiriman gratis area Jabodetabek (sewa)',
                    'Gratis ongkir seluruh Indonesia (beli)',
                    'Support teknis selama periode sewa',
                    'Cocok untuk presentasi klien & pameran properti',
                    'Dapat dikombinasi dengan paket VR App',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <svg className="w-3.5 h-3.5 mt-0.5 text-[var(--color-accent)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-body text-xs text-[var(--color-fg)] opacity-60 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[var(--color-accent)] bg-opacity-10 border border-[var(--color-accent)] border-opacity-20 rounded-2xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] mb-2">📦 Add-on tersedia</p>
                <p className="font-body text-xs text-[var(--color-fg)] opacity-60 leading-relaxed">
                  Jasa instalasi onsite, operator VR untuk event, dan paket multi-unit tersedia sebagai layanan tambahan.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="font-body text-sm text-[var(--color-fg)] opacity-40 mb-4">
          * Estimasi di atas belum termasuk pajak dan biaya perjalanan di luar Jabodetabek
        </p>
        <Link to="/booking" className="btn-primary inline-flex items-center gap-3 group">
          Dapatkan Penawaran Resmi
          <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
        </Link>
      </div>
    </section>
  );
};

export default PriceCalculator;