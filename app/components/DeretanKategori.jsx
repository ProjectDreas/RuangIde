"use client";

import { motion } from "framer-motion";
import KartuKategori from "./KartuKategori";

/* ============================================================
   Data Kategori — Definisi semua pilihan bisnis yang tersedia
   Setiap kategori punya id, emoji, label, deskripsi, dan warna aksen
   ============================================================ */
export const daftarKategori = [
  {
    id: "kuliner",
    emoji: "🍔",
    label: "Kuliner",
    deskripsi: "Makanan, minuman, katering, cloud kitchen, snack lokal.",
    warnaAksen: "#f97316", // oranye
  },
  {
    id: "jasa",
    emoji: "🛠️",
    label: "Jasa & Layanan",
    deskripsi: "Freelance, reparasi, kebersihan, konsultasi, logistik.",
    warnaAksen: "#3b82f6", // biru
  },
  {
    id: "teknologi",
    emoji: "💻",
    label: "Teknologi & Digital",
    deskripsi: "SaaS, aplikasi, e-commerce, automation, API.",
    warnaAksen: "#22d3ee", // sian
  },
  {
    id: "kreatif",
    emoji: "🎨",
    label: "Industri Kreatif",
    deskripsi: "Desain, konten, musik, fotografi, kerajinan tangan.",
    warnaAksen: "#ec4899", // merah muda
  },
  {
    id: "lainnya",
    emoji: "✨",
    label: "Lainnya",
    deskripsi: "Punya sesuatu yang unik? Ceritakan sendiri di bawah.",
    warnaAksen: "#a855f7", // ungu
  },
];

/* ============================================================
   DeretanKategori — Grid responsif daftar kartu kategori
   Props:
     - kategoriTerpilih : string | null — id kategori aktif
     - tanganiPilihKategori : (id: string) => void
   ============================================================ */
export default function DeretanKategori({
  kategoriTerpilih,
  tanganiPilihKategori,
}) {
  /* Varian animasi wadah untuk stagger anak-anak */
  const varianWadah = {
    tersembunyi: {},
    tampil: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section aria-labelledby="judul-kategori" className="w-full">
      {/* --- Label bagian --- */}
      <motion.h2
        id="judul-kategori"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4"
      >
        1. Pilih Kategori Bisnis
      </motion.h2>

      {/* --- Grid kartu — 2 kolom di HP, 3 di tablet, auto di laptop --- */}
      <motion.div
        variants={varianWadah}
        initial="tersembunyi"
        animate="tampil"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
      >
        {daftarKategori.map((kategori, indeks) => (
          <motion.div
            key={kategori.id}
            variants={{
              tersembunyi: { opacity: 0, y: 20 },
              tampil: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
          >
            <KartuKategori
              kategori={kategori}
              terpilih={kategoriTerpilih === kategori.id}
              tanganiPilih={() => tanganiPilihKategori(kategori.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
