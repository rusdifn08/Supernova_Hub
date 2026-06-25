import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const inlineQuizzes: Record<string, string> = {
  "Sub-bab 1: Jarak Tempuh vs Perpindahan Posisi": `\n\n\`\`\`inlinequiz
{
  "question": "Jika kamu berlari 400 meter mengelilingi lapangan satu putaran penuh dan kembali ke garis start, manakah pernyataan berikut yang paling tepat?",
  "options": [
    "Jarak dan perpindahanku adalah 400 meter.",
    "Jarakku 400 meter, tetapi perpindahanku 0.",
    "Jarak dan perpindahanku 0 karena aku tidak ke mana-mana."
  ],
  "answer": 1,
  "explanation": "Jarak menghitung seluruh lintasan yang ditempuh (400m). Perpindahan hanya melihat selisih antara posisi akhir dan awal. Karena kamu kembali ke titik semula, maka selisih posisinya adalah 0."
}
\`\`\`\n\n`,
  
  "Sub-bab 2: Kecepatan & Percepatan Rata-rata vs Sesaat (Diferensial)": `\n\n\`\`\`inlinequiz
{
  "question": "Seorang anak menjatuhkan mainan dari lantai dua. Jika kita ingin mengetahui 'seberapa cepat mainan itu tepat saat membentur tanah', konsep manakah yang kita gunakan?",
  "options": [
    "Kecepatan Rata-rata (Delta X / Delta T)",
    "Kecepatan Sesaat (dx / dt)",
    "Percepatan Konstan"
  ],
  "answer": 1,
  "explanation": "Kata kunci 'tepat saat' merujuk pada rentang waktu yang sangat singkat mendekati nol, sehingga kita menggunakan konsep Limit (Turunan) yang menghasilkan Kecepatan Sesaat."
}
\`\`\`\n\n`,

  "Sub-bab 3: Penurunan Persamaan GLBB Murni (Integral)": `\n\n\`\`\`inlinequiz
{
  "question": "Syarat utama agar ketiga rumus GLBB (s = v0*t + 0.5*a*t^2, dll) berlaku secara mutlak adalah...",
  "options": [
    "Kecepatan benda (v) harus selalu bertambah (dipercepat).",
    "Benda tidak boleh berbalik arah.",
    "Percepatan benda (a) harus selalu konstan tidak berubah terhadap waktu."
  ],
  "answer": 2,
  "explanation": "Dalam pembuktian integral, kita mengeluarkan 'a' dari dalam tanda integral karena 'a' bernilai konstan. Jika percepatan berubah-ubah, rumus GLBB tidak akan berlaku dan kita harus melakukan integral secara manual dari awal."
}
\`\`\`\n\n`,

  "Sub-bab 4: Analisis Grafik x-t, v-t, dan a-t": `\n\n\`\`\`inlinequiz
{
  "question": "Pada grafik v-t (Kecepatan terhadap Waktu), jika kurva memotong sumbu X (misal dari kecepatan +10 m/s menjadi -5 m/s), apa makna fisiknya?",
  "options": [
    "Benda berhenti sepenuhnya.",
    "Benda berbalik arah pergerakan.",
    "Percepatan benda menjadi nol."
  ],
  "answer": 1,
  "explanation": "Sumbu X pada grafik v-t adalah batas antara kecepatan positif (maju) dan negatif (mundur). Saat kurva menembus sumbu X, kecepatan sesaat menjadi 0 sesaat sebelum berganti tanda, artinya benda berbalik arah."
}
\`\`\`\n\n`,

  "Sub-bab 1: Analisis Gerak Jatuh Bebas (GJB)": `\n\n\`\`\`inlinequiz
{
  "question": "Jika dua benda berbeda massa (misal: bola bowling 5kg dan bola bekel 50g) dijatuhkan bersamaan dari ketinggian 10 meter dalam ruang hampa udara, manakah yang lebih dulu menyentuh tanah?",
  "options": [
    "Bola bowling, karena massanya lebih berat.",
    "Bola bekel, karena gesekannya lebih kecil.",
    "Keduanya akan menyentuh tanah pada saat yang bersamaan."
  ],
  "answer": 2,
  "explanation": "Rumus jatuh bebas v_t = sqrt(2gh) tidak memiliki variabel massa (m). Semua benda jatuh di bumi ditarik dengan percepatan gravitasi yang sama (g), sehingga di ruang hampa mereka akan jatuh berbarengan."
}
\`\`\`\n\n`,

  "Sub-bab 2: Gerak Vertikal ke Atas dan ke Bawah": `\n\n\`\`\`inlinequiz
{
  "question": "Sebuah bola dilempar ke atas dengan kecepatan awal 20 m/s. Saat mencapai titik puncaknya (titik tertinggi), bagaimana kondisi kecepatannya?",
  "options": [
    "Kecepatan maksimum dan percepatan gravitasi nol.",
    "Kecepatan sesaatnya nol, tetapi percepatan gravitasinya tetap 10 m/s^2 ke bawah.",
    "Kecepatan dan percepatannya dua-duanya nol."
  ],
  "answer": 1,
  "explanation": "Di titik puncak, benda 'berhenti sesaat' untuk berbalik arah (v = 0). Namun, bumi tidak pernah berhenti menariknya, sehingga percepatan gravitasi (a = -g) selalu bekerja setiap saat."
}
\`\`\`\n\n`,

  "Sub-bab 3: Kasus Susulan Dua Benda": `\n\n\`\`\`inlinequiz
{
  "question": "Dalam kasus Polisi menangkap Pencuri yang berangkat dari titik awal yang sama, apa syarat utama persamaan matematis agar penangkapan terjadi?",
  "options": [
    "Waktu tempuh Polisi = Waktu tempuh Pencuri",
    "Kecepatan Polisi = Kecepatan Pencuri",
    "Jarak tempuh (Posisi) Polisi = Jarak tempuh (Posisi) Pencuri"
  ],
  "answer": 2,
  "explanation": "Agar mereka bisa saling menangkap atau menyusul, mereka harus berada di titik koordinat (posisi) yang persis sama pada saat kejadian. Waktu tempuh bisa jadi berbeda jika salah satunya berangkat terlambat."
}
\`\`\`\n\n`
};

async function main() {
  const course = await prisma.course.findFirst({
    where: { title: "Physics for Beginners" }
  });

  if (!course) return;

  const modules = await prisma.courseModule.findMany({
    where: { courseId: course.id }
  });

  for (const mod of modules) {
    let newContent = mod.contentMd;
    let updated = false;

    for (const [key, quizBlock] of Object.entries(inlineQuizzes)) {
      if (mod.title.includes(key) && !newContent.includes('```inlinequiz')) {
        // Insert it right before the last horizontal rule (---) if any, or at the end
        if (newContent.includes('---')) {
          newContent = newContent.replace('---', quizBlock + '---');
        } else {
          newContent += quizBlock;
        }
        updated = true;
      }
    }

    if (updated) {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { contentMd: newContent }
      });
      console.log(`Injected inline quiz to: ${mod.title}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
