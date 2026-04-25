"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useWizardStore } from "../../store/useWizardStore";
import { 
  CheckCircle2, 
  Copy, 
  RefreshCcw, 
  Wallet, 
  Target, 
  AlertTriangle, 
  Lightbulb,
  MapPin,
  Flame,
  Loader2,
  ChevronDown,
  ChevronUp,
  TrendingDown,
  Rocket,
  Clock,
  Banknote,
  ThumbsUp,
  ThumbsDown,
  Info,
  Check,
  Hash,
  Tag
} from "lucide-react";

// DATA DUMMY DENGAN STRUKTUR BARU
const dummyData = [
  {
    judul: "Kopi Keliling Akhir Pekan (Weekend Coffee Cart)",
    penjelasanSingkat: "Menjual kopi susu kekinian menggunakan konsep slow bar portabel di taman kota atau spot olahraga setiap Sabtu dan Minggu pagi.",
    ringkasan: {
      modal: "Rp 3.500.000 – Rp 4.500.000",
      waktu: "Sabtu & Minggu (06.00 – 11.00)",
      potensi: "Rp 1.500.000 – Rp 2.500.000 / bln",
      kesulitan: "Sedang"
    },
    alasanCocok: [
      "Sesuai dengan Waktu: Kamu hanya punya waktu di akhir pekan saat pagi hari.",
      "Memaksimalkan Skill: Kamu sudah punya skill barista dasar dari workshop.",
      "Modal Terkontrol: Di bawah Rp 5 juta, terhindar dari risiko sewa tempat bulanan."
    ],
    langkahMemulai: [
      "Beli meja lipat kayu portabel, alat seduh manual, dan cool box.",
      "Kunci 2 menu andalan: Kopi Susu Aren & minuman Non-Kopi (Matcha/Cokelat).",
      "Survei taman kota/jalur sepeda dan tanya sistem izin atau retribusinya.",
      "Beli stiker logo untuk ditempel di cup dan siapkan papan tulis kapur (chalkboard)."
    ],
    caraDapatCustomer: [
      "Berikan 'Trial' gratis di jam pertama untuk 10 orang yang lewat.",
      "Promo diskon Rp 3.000 bagi pelanggan yang bawa botol (tumbler) sendiri.",
      "Gunakan 2-3 teman sebagai 'penglaris' awal agar lapak tidak terlihat sepi."
    ],
    estimasi: {
      harga: "Rp 15.000 – Rp 20.000 / cup",
      targetAwal: "Pesepeda, pelari pagi, & keluarga di taman",
      omzet: "Rp 4.320.000 / bulan",
      balikModal: "2 – 2.5 bulan"
    },
    risiko: "Cuaca buruk (hujan) di akhir pekan yang membuat taman atau area CFD sepi pembeli.",
    solusi: "Sediakan layanan pre-order (PO) botolan 1 liter di hari Jumat untuk teman-teman kantor, sehingga pemasukan tetap aman.",
    strategiSpesifik: "Buat akun Instagram yang tidak sekadar foto kopi, tapi bagikan info rute sepeda/lari. Posisikan cart kamu sebagai 'Check-point' istirahat. Buat program loyalty: kumpulkan 5 stempel gratis 1 kopi.",
    rekomendasiNama: [
      { nama: "Pit Stop Kopi", alasan: "Mengesankan tempat istirahat sementara untuk pelari/pesepeda." },
      { nama: "Kopi Akhir Pekan", alasan: "Menekankan eksklusivitas (hanya ada saat weekend)." },
      { nama: "Slow Brew Cart", alasan: "Menegaskan konsep seduh manual yang santai." }
    ],
    bonus: {
      tagline: "Bahan bakar akhir pekanmu.",
      instagram: "@pitstopkopi.id"
    },
    skor: 88,
    alasanKelebihan: "Sangat minim risiko finansial (bebas biaya sewa), margin kopi besar, fleksibel.",
    alasanKekurangan: "Bergantung pada cuaca dan cukup melelahkan fisik karena bongkar pasang."
  },
  {
    judul: "Jasa Desain Grafis Kelas UMKM",
    penjelasanSingkat: "Menyediakan layanan desain visual untuk feed Instagram, logo, dan materi promosi spesifik bagi UMKM kuliner yang baru merintis.",
    ringkasan: {
      modal: "Rp 500.000 – Rp 1.500.000",
      waktu: "Fleksibel (Malam hari / Weekend)",
      potensi: "Rp 2.000.000 – Rp 4.000.000 / bln",
      kesulitan: "Mudah"
    },
    alasanCocok: [
      "Modal Sangat Minim: Bisa menggunakan laptop yang sudah ada dan langganan software.",
      "Sesuai Minat & Skill: Kamu menyukai dunia digital dan memiliki sense visual.",
      "Bisa Dikerjakan Kapan Saja: Cocok untuk pekerjaan sampingan di luar jam kantor."
    ],
    langkahMemulai: [
      "Kumpulkan 3-5 portofolio fiktif (re-design brand UMKM lokal yang sudah ada).",
      "Buat paket harga bundling (misal: Paket 15 Feed IG + 5 Story Rp 500rb).",
      "Buat profil profesional di Instagram & Behance yang menampilkan layananmu.",
      "Siapkan template brief desain (Google Form) agar klien mudah mengisi kebutuhan."
    ],
    caraDapatCustomer: [
      "Tawarkan desain gratis ke 2 UMKM teman/kenalan dengan syarat testimonial.",
      "Cari akun IG UMKM lokal yang visualnya kurang rapi, lalu DM tawarkan paket promo.",
      "Masuk ke grup Facebook/WhatsApp pengusaha lokal dan bagikan tips desain singkat."
    ],
    estimasi: {
      harga: "Rp 50.000 - Rp 100.000 / desain",
      targetAwal: "Pemilik warung makan, olshop kecil, & kafe lokal",
      omzet: "Rp 3.000.000 / bulan",
      balikModal: "Bulan pertama langsung profit"
    },
    risiko: "Proyek tidak menentu di bulan awal dan risiko revisi berkali-kali dari klien rewel.",
    solusi: "Berlakukan sistem DP (Down Payment) 50% di awal dan batasi revisi maksimal 2 kali dalam kontrak kerja tertulis sederhana.",
    strategiSpesifik: "Jangan menjual 'desain', juallah 'kemudahan'. Pemilik UMKM sibuk jualan, jadi buat caption sekalian dalam paketmu. Mereka tinggal posting.",
    rekomendasiNama: [
      { nama: "Visual UMKM", alasan: "Sangat to-the-point dan jelas target marketnya." },
      { nama: "BantuDesain", alasan: "Terdengar sangat friendly dan asisten-like." },
      { nama: "Kreatif Lokal", alasan: "Menunjukkan dukungan untuk brand lokal." }
    ],
    bonus: {
      tagline: "Bikin jualanmu tampil mahal, tanpa bayar mahal.",
      instagram: "@visualumkm"
    },
    skor: 92,
    alasanKelebihan: "Modal hampir nol, margin profit 100%, sangat scalable ke depannya.",
    alasanKekurangan: "Persaingan cukup ketat dengan desainer freelance lain di internet."
  }
];

export default function TampilanHasil() {
  const isGenerating = useWizardStore((state) => state.isGenerating);
  const setIsGenerating = useWizardStore((state) => state.setIsGenerating);
  const resetWizard = useWizardStore((state) => state.resetWizard);

  const [dataHasil, setDataHasil] = useState<any[] | null>(null);
  const [loadingText, setLoadingText] = useState("Menganalisis profil kamu...");
  const [sudahDisalin, setSudahDisalin] = useState(false);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  useEffect(() => {
    if (!isGenerating || dataHasil !== null) return;

    let textIndex = 0;
    const loadingTexts = [
      "Menganalisis input form kamu...",
      "Mencocokkan modal & waktu luang...",
      "Menyusun langkah & strategi spesifik...",
      "Menghitung potensi kelayakan...",
      "Hampir selesai..."
    ];
    
    // Change text every 800ms
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[textIndex]);
    }, 800);

    // Simulate AI generation delay (1.5s - 2.5s)
    const delay = Math.floor(Math.random() * (2500 - 1500 + 1) + 1500);
    
    const timeoutId = setTimeout(() => {
      clearInterval(textInterval);
      setDataHasil(dummyData);
      setExpandedCards([0]); // Expand first card
      setIsGenerating(false);
    }, delay);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timeoutId);
    };
  }, [isGenerating, dataHasil, setIsGenerating]);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const tanganiSalin = () => {
    if (!dataHasil) return;
    let teks = "Ide Bisnis AI dari RuangIde:\n\n";
    dataHasil.forEach((ide, idx) => {
      teks += `=========================\n`;
      teks += `IDE ${idx + 1}: ${ide.judul}\n`;
      teks += `=========================\n`;
      teks += `Deskripsi: ${ide.penjelasanSingkat}\n`;
      teks += `Modal: ${ide.ringkasan.modal}\n`;
      teks += `Waktu: ${ide.ringkasan.waktu}\n`;
      teks += `Potensi: ${ide.ringkasan.potensi}\n`;
      teks += `Skor Kelayakan: ${ide.skor}/100\n\n`;
    });
    
    navigator.clipboard.writeText(teks);
    setSudahDisalin(true);
    setTimeout(() => setSudahDisalin(false), 2000);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-aksen-biru/20 rounded-full" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-transparent border-t-aksen-biru rounded-full"
          />
          <Sparkles className="w-10 h-10 text-aksen-ungu animate-pulse" />
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-aksen-biru to-aksen-ungu"
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  if (!dataHasil) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 w-full max-w-4xl mx-auto px-4"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full editorial-card text-foreground text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
        >
          <CheckCircle2 size={14} className="text-emerald-500" />
          Analisis Selesai
        </motion.div>
        <h2 className="font-jakarta text-4xl sm:text-5xl md:text-6xl font-black text-foreground drop-shadow-sm mb-4 tracking-tight">
          Peluang Terbaik Untukmu
        </h2>
        <p className="text-foreground/80 dark:text-muted max-w-xl mx-auto font-medium">
          Ini adalah hasil analisis mendalam yang sangat personal, disesuaikan persis dengan kondisimu.
        </p>
      </div>

      <div className="space-y-6">
        {dataHasil.map((ide, idx) => {
          const isExpanded = expandedCards.includes(idx);
          
          return (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="rounded-[2rem] bg-card border border-border-theme shadow-xl shadow-slate-200/40 overflow-hidden dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out"
          >
            {/* ================= HEADER CARD ================= */}
            <div 
              className="relative overflow-hidden p-6 sm:p-8 cursor-pointer bg-transparent transition-all duration-200 ease-in-out group after:absolute after:inset-0 after:bg-black/5 dark:after:bg-white/5 after:opacity-0 hover:after:opacity-100 active:after:bg-black/10 dark:active:after:bg-white/10 after:transition-opacity after:duration-200 after:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500/50"
              onClick={() => toggleCard(idx)}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-blue-500/20 mt-1">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-jakarta text-2xl sm:text-3xl font-black text-foreground tracking-tight group-hover:text-aksen-biru transition-colors">
                        {ide.judul}
                      </h3>
                    </div>
                  </div>
                  <p className="text-foreground/80 dark:text-muted font-medium md:ml-16 leading-relaxed text-lg">
                    {ide.penjelasanSingkat}
                  </p>
                </div>
                
                <div className="flex flex-row md:flex-col gap-3 shrink-0 md:ml-4 items-center md:items-end">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border shadow-sm bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-[rgba(34,197,94,0.15)] dark:text-[#22C55E] dark:border-transparent">
                    <Flame size={18} /> Skor: {ide.skor}/100
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border shadow-sm ${
                    ide.ringkasan.kesulitan === 'Sulit' 
                      ? 'bg-red-50 text-red-600 border-red-100 dark:bg-[rgba(239,68,68,0.15)] dark:text-red-400 dark:border-transparent' 
                      : ide.ringkasan.kesulitan === 'Mudah'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-[rgba(34,197,94,0.15)] dark:text-[#22C55E] dark:border-transparent'
                      : 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-[rgba(234,179,8,0.15)] dark:text-[#EAB308] dark:border-transparent'
                  }`}>
                    Kesulitan: {ide.ringkasan.kesulitan}
                  </div>
                  <div className="p-2 rounded-full bg-slate-100 text-slate-500 group-hover:text-slate-800 transition-colors ml-auto md:ml-0 mt-2 hidden md:block dark:bg-[rgba(255,255,255,0.06)] dark:text-muted dark:group-hover:text-white">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= EXPANDED CONTENT ================= */}
            <AnimatePresence>
              {isExpanded && (
                  <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border-theme card-expanded-area"
                >
                  <div className="p-6 sm:p-8 space-y-8">
                    
                    {/* SECTION 1: RINGKASAN & ESTIMASI (GRID 2 KOLOM) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Ringkasan Cepat */}
                      <div className="p-5 rounded-2xl card-elevated-bg border border-border-theme shadow-sm">
                        <h4 className="font-jakarta text-sm font-bold text-slate-500 dark:text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Clock size={16} /> Ringkasan Cepat
                        </h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex justify-between items-center border-b border-slate-100 dark:border-[rgba(255,255,255,0.06)] pb-2">
                            <span className="text-foreground/70 dark:text-muted">Modal Awal</span>
                            <span className="font-bold text-foreground">{ide.ringkasan.modal}</span>
                          </li>
                          <li className="flex justify-between items-center border-b border-slate-100 dark:border-[rgba(255,255,255,0.06)] pb-2">
                            <span className="text-foreground/70 dark:text-muted">Waktu / Operasional</span>
                            <span className="font-bold text-foreground text-right w-1/2">{ide.ringkasan.waktu}</span>
                          </li>
                          <li className="flex justify-between items-center border-b border-slate-100 dark:border-[rgba(255,255,255,0.06)] pb-2">
                            <span className="text-foreground/70 dark:text-muted">Potensi Laba</span>
                            <span className="font-bold text-emerald-600 dark:text-[#22C55E]">{ide.ringkasan.potensi}</span>
                          </li>
                        </ul>
                      </div>

                      {/* Estimasi Bisnis */}
                      <div className="p-5 rounded-2xl card-elevated-bg border border-border-theme shadow-sm">
                        <h4 className="font-jakarta text-sm font-bold text-slate-500 dark:text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Banknote size={16} /> Estimasi Bisnis
                        </h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex justify-between items-center border-b border-slate-100 dark:border-[rgba(255,255,255,0.06)] pb-2">
                            <span className="text-foreground/70 dark:text-muted">Harga Produk/Jasa</span>
                            <span className="font-bold text-foreground">{ide.estimasi.harga}</span>
                          </li>
                          <li className="flex justify-between items-center border-b border-slate-100 dark:border-[rgba(255,255,255,0.06)] pb-2">
                            <span className="text-foreground/70 dark:text-muted">Target Awal</span>
                            <span className="font-bold text-foreground text-right w-1/2">{ide.estimasi.targetAwal}</span>
                          </li>
                          <li className="flex justify-between items-center border-b border-slate-100 dark:border-[rgba(255,255,255,0.06)] pb-2">
                            <span className="text-foreground/70 dark:text-muted">Balik Modal (ROI)</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">{ide.estimasi.balikModal}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* SECTION 2: KENAPA COCOK */}
                    <div className="p-5 rounded-2xl border card-blue-box">
                      <h4 className="font-jakarta text-base font-bold text-aksen-biru dark:text-blue-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 size={18} /> Kenapa Ide Ini Sangat Cocok Untuk Kamu?
                      </h4>
                      <ul className="space-y-2">
                        {ide.alasanCocok.map((alasan, i) => (
                          <li key={i} className="flex items-start gap-2 text-foreground/80 dark:text-muted/90 text-sm font-medium">
                            <Check size={16} className="text-aksen-biru dark:text-blue-400 mt-0.5 shrink-0" />
                            <span>{alasan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* SECTION 3: LANGKAH MEMULAI */}
                      <div>
                        <h4 className="font-jakarta text-sm font-bold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Rocket size={18} className="text-orange-500" /> Langkah Memulai (Step-by-step)
                        </h4>
                        <div className="space-y-4">
                          {ide.langkahMemulai.map((langkah, i) => (
                            <div key={i} className="relative overflow-hidden flex gap-3 card-item-bg p-3 rounded-xl border border-border-default hover:border-border-hover transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] after:absolute after:inset-0 after:bg-black/5 dark:after:bg-white/5 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-200 after:pointer-events-none">
                              <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                {i+1}
                              </div>
                              <p className="text-sm text-foreground/80 dark:text-muted/90 font-medium leading-relaxed">{langkah}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SECTION 4: CARA DAPAT CUSTOMER */}
                      <div>
                        <h4 className="font-jakarta text-sm font-bold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Target size={18} className="text-purple-500" /> Cara Dapat 10 Customer Pertama
                        </h4>
                        <div className="space-y-3">
                          {ide.caraDapatCustomer.map((cara, i) => (
                            <div key={i} className="relative overflow-hidden flex gap-3 p-3 rounded-xl card-item-bg border border-border-default hover:border-border-hover transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] after:absolute after:inset-0 after:bg-black/5 dark:after:bg-white/5 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-200 after:pointer-events-none">
                              <div className="text-purple-500 shrink-0">🎯</div>
                              <p className="text-sm text-foreground/80 dark:text-muted/90 font-medium leading-relaxed">{cara}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 5: STRATEGI SPESIFIK & RISIKO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl border card-blue-box shadow-sm">
                        <h4 className="font-jakarta text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <MapPin size={16} /> Strategi Spesifik
                        </h4>
                        <p className="text-sm text-foreground/80 dark:text-muted/90 leading-relaxed font-medium">
                          {ide.strategiSpesifik}
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl border card-red-box shadow-sm">
                        <h4 className="font-jakarta text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <AlertTriangle size={16} /> Risiko & Solusi
                        </h4>
                        <p className="text-sm text-foreground/80 dark:text-muted/90 leading-relaxed font-medium mb-2">
                          <span className="font-bold text-red-600 dark:text-red-400">Risiko:</span> {ide.risiko}
                        </p>
                        <p className="text-sm text-foreground/80 dark:text-muted/90 leading-relaxed font-medium">
                          <span className="font-bold text-emerald-600 dark:text-[#22C55E]">Solusi:</span> {ide.solusi}
                        </p>
                      </div>
                    </div>

                    {/* SECTION 6: BRANDING & KELAYAKAN */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="p-5 rounded-2xl card-elevated-bg border border-border-theme shadow-sm">
                        <h4 className="font-jakarta text-sm font-bold text-slate-500 dark:text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Lightbulb size={16} className="text-yellow-500" /> Ide Branding
                        </h4>
                        <div className="mb-4">
                          <p className="text-xs font-bold text-slate-400 dark:text-muted mb-2">REKOMENDASI NAMA:</p>
                          <ul className="space-y-2">
                            {ide.rekomendasiNama.map((nama, i) => (
                              <li key={i} className="relative overflow-hidden text-sm flex flex-col card-item-bg p-3 rounded-lg border border-border-default hover:border-border-hover transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] after:absolute after:inset-0 after:bg-black/5 dark:after:bg-white/5 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-200 after:pointer-events-none">
                                <span className="font-bold text-foreground">"{nama.nama}"</span>
                                <span className="text-xs text-foreground/60 dark:text-muted/80">{nama.alasan}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-[rgba(255,255,255,0.06)]">
                          <div className="flex items-center gap-2 text-sm">
                            <Tag size={14} className="text-blue-500" /> 
                            <span className="font-medium text-foreground/80 dark:text-muted/90">Tagline:</span> <span className="italic text-foreground">"{ide.bonus.tagline}"</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Hash size={14} className="text-pink-500" /> 
                            <span className="font-medium text-foreground/80 dark:text-muted/90">Username:</span> <span className="text-foreground">{ide.bonus.instagram}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl card-elevated-bg border border-border-theme shadow-sm flex flex-col justify-center">
                        <h4 className="font-jakarta text-sm font-bold text-slate-500 dark:text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Info size={16} /> Skor Kelayakan
                        </h4>
                        <div className="flex items-center justify-center mb-6">
                          <div className="text-5xl font-black text-aksen-biru">{ide.skor}<span className="text-2xl text-slate-300 dark:text-border-theme">/100</span></div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2 text-sm">
                            <ThumbsUp size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                            <p className="text-foreground/80 dark:text-muted/90 leading-relaxed">{ide.alasanKelebihan}</p>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <ThumbsDown size={16} className="text-amber-500 mt-0.5 shrink-0" />
                            <p className="text-foreground/80 dark:text-muted/90 leading-relaxed">{ide.alasanKekurangan}</p>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )})}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
        <button
          onClick={tanganiSalin}
          className="w-full sm:w-auto px-8 h-14 rounded-full editorial-card hover:bg-foreground/5 text-foreground font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          {sudahDisalin ? (
            <><CheckCircle2 size={18} className="text-emerald-500" /> Berhasil Disalin</>
          ) : (
            <><Copy size={18} /> Salin Ringkasan</>
          )}
        </button>
        <button
          onClick={resetWizard}
          className="w-full sm:w-auto px-10 h-14 rounded-full text-white font-bold flex items-center justify-center gap-2 tombol-gradasi-aktif shadow-2xl shadow-aksen-biru/20"
        >
          <RefreshCcw size={18} /> Buat Ide Baru
        </button>
      </div>
    </motion.div>
  );
}

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);
