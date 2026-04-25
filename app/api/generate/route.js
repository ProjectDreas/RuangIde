import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Check if API key is present
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // or gemini-2.0-flash / gemini-1.5-flash based on availability. "gemini-1.5-flash" is safest right now. Actually let's use gemini-1.5-flash.

    const prompt = `Kamu adalah AI Business Consultant yang fokus membantu orang di Indonesia menemukan ide bisnis yang realistis, bisa dijalankan, dan sesuai dengan kondisi mereka.

User ingin memulai bisnis dengan kondisi berikut:
- Tujuan: ${data.tujuan}
- Modal: ${data.modal}
- Minat: ${data.minat.join(", ")}
- Lokasi: ${data.lokasi}
- Waktu: ${data.waktu}
- Preferensi: ${data.preferensi}
- Tambahan: ${data.tambahan}

TUGAS KAMU:
Berikan 3 ide bisnis PALING RELEVAN dan REALISTIS di Indonesia berdasarkan data user.
JANGAN GENERIK. Semua ide HARUS terasa PERSONAL dan sesuai kondisi user. Jangan berikan ide yang terlalu sulit dijalankan, prioritaskan yang bisa dimulai dari kecil, jangan terlalu teoritis, harus bisa langsung dieksekusi pemula.

Gaya Penulisan:
- Gunakan bahasa Indonesia santai tapi profesional.
- Terasa seperti mentor, bukan artikel kaku.

OUTPUT HARUS DALAM FORMAT JSON MURNI (Array of Objects) tanpa markdown block (\`\`\`json).
Gunakan struktur objek berikut persis untuk setiap ide bisnis:
{
  "opsiNamaBisnis": ["Opsi Nama 1", "Opsi Nama 2", "Opsi Nama 3"],
  "deskripsi": "Deskripsi singkat, menarik, tidak kaku",
  "alasanCocok": "Kenapa ini cocok dengan user (hubungkan spesifik dengan minat, modal, lokasi, waktu)",
  "produkJasa": "Apa yang dijual",
  "targetPasar": "Siapa yang akan membeli",
  "estimasiModal": "Range realistis di Indonesia",
  "potensiKeuntungan": "Per bulan (range realistis)",
  "risiko": "Jelaskan jujur, jangan terlalu positif",
  "analisisLokal": "Jelaskan kenapa lokasi user mendukung/tidak",
  "strategiPemasaran": "Fokus platform relevan (IG, TikTok, marketplace, dll)",
  "caraDapat10Pembeli": "Langkah konkret dan praktis dapatkan 10 pembeli pertama",
  "langkahMemulai": ["Langkah 1", "Langkah 2", "Langkah 3", "Langkah 4"],
  "potensiCepatJalan": "Berapa cepat bisa mulai + alasannya",
  "skorPeluang": number, // 0-100
  "alasanSkor": "Penjelasan singkat kenapa skornya segitu",
  "tingkatKompetisi": "Rendah" | "Sedang" | "Tinggi",
  "alasanKompetisi": "Alasan singkat"
}
`;

    // Initialize gemini-1.5-flash
    const genAIModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await genAIModel.generateContent(prompt);
    let text = result.response.text();
    
    // Clean up markdown if AI returned it
    if (text.startsWith("```json")) {
      text = text.replace(/```json\n?/, "").replace(/```$/, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/```\n?/, "").replace(/```$/, "");
    }
    
    const jsonResponse = JSON.parse(text);

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat menghubungi AI." }, { status: 500 });
  }
}
