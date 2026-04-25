import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/* ============================================================
   Konfigurasi Font — Inter & Plus Jakarta Sans
   ============================================================ */
const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakartaFont = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/* ============================================================
   Metadata SEO — RuangIde
   ============================================================ */
export const metadata = {
  title: "RuangIde — Generator Ide Bisnis AI",
  description:
    "Temukan ide bisnis liar-mu dalam hitungan detik. Pilih kategori atau ketik sendiri, biarkan AI kami yang bekerja.",
  keywords: ["ide bisnis", "generator ide", "AI bisnis", "startup", "RuangIde"],
  openGraph: {
    title: "RuangIde — Generator Ide Bisnis AI",
    description: "Temukan ide bisnis liar-mu dalam hitungan detik.",
    type: "website",
  },
};

/* ============================================================
   Root Layout — Membungkus seluruh halaman
   ============================================================ */
export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${interFont.variable} ${jakartaFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
