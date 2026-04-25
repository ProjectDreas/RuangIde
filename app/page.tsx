import Navbar from "./components/layout/Navbar";
import WizardController from "./components/WizardController";

export default function HalamanUtama() {

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-aksen-biru/30">
      <Navbar />

      {/* Huge Background Typography (Editorial Poster Style) */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 select-none">
        <h1 className="text-[120px] sm:text-[180px] md:text-[250px] font-jakarta font-black text-foreground opacity-5 whitespace-nowrap tracking-tighter mix-blend-overlay">
          RUANGIDE
        </h1>
      </div>

      {/* Dekorasi Latar Belakang (Pure CSS) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-aksen-biru/20 to-aksen-ungu/20 rounded-full blur-[100px] animate-blob-slow" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-aksen-sian/20 to-aksen-biru/10 rounded-full blur-[120px] animate-blob-slower" />
      </div>

      <WizardController />
    </main>
  );
}
