import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const chapterTitle = "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel";

// Mulai dari orderIndex 23 karena Modul 1-5 berakhir di 22.
let currentIndex = 23;

const modulesData = [
  // ========================== BAGIAN 6 ==========================
  {
    section: "Bagian 6: Dinamika Partikel 1 (Hukum I dan III Newton)",
    items: [
      { t: "Sub-bab 1: Hukum I Newton (Inersia) dan Kesetimbangan Translasi", d: "45m" },
      { t: "Sub-bab 2: Identifikasi Gaya Aksi-Reaksi (Hukum III Newton)", d: "45m" },
      { t: "Sub-bab 3: Menggambar Diagram Benda Bebas (Free Body Diagram)", d: "50m" },
      { t: "Latihan Soal: Gaya Normal pada Lift Dipercepat", d: "40m" }
    ]
  },
  // ========================== BAGIAN 7 ==========================
  {
    section: "Bagian 7: Dinamika Partikel 2 (Hukum II Newton & Gaya Gesek)",
    items: [
      { t: "Sub-bab 1: Formulasi Hukum II Newton (ΣF = ma)", d: "50m" },
      { t: "Sub-bab 2: Sifat Gaya Gesek Statis dan Kinetis", d: "45m" },
      { t: "Sub-bab 3: Analisis Gerak pada Bidang Miring Kasar", d: "60m" },
      { t: "Latihan Soal: Syarat Tepat Bergerak pada Bidang Miring", d: "45m" }
    ]
  },
  // ========================== BAGIAN 8 ==========================
  {
    section: "Bagian 8: Dinamika Sistem Benda Terhubung (Katrol & Balok Bertumpuk)",
    items: [
      { t: "Sub-bab 1: Analisis Percepatan Mesin Atwood (Katrol Licin)", d: "50m" },
      { t: "Sub-bab 2: Sistem Balok Bertumpuk dan Gaya Gesek Penggerak", d: "60m" },
      { t: "Sub-bab 3: Penyelesaian Persamaan Gerak Simultan", d: "60m" },
      { t: "Latihan Soal: Memecahkan SPL pada FBD Dua Benda", d: "50m" }
    ]
  },
  // ========================== BAGIAN 9 ==========================
  {
    section: "Bagian 9: Dinamika Gerak Melingkar",
    items: [
      { t: "Sub-bab 1: Asal Mula Gaya Sentripetal", d: "45m" },
      { t: "Sub-bab 2: Analisis Ayunan Konis", d: "50m" },
      { t: "Sub-bab 3: Kendaraan Berbelok di Tikungan Datar dan Miring", d: "60m" },
      { t: "Latihan Soal: Optimasi Kecepatan Maksimum di Tikungan Miring", d: "45m" }
    ]
  },
  // ========================== BAGIAN 10 ==========================
  {
    section: "Bagian 10: Usaha dan Energi Kinetik",
    items: [
      { t: "Sub-bab 1: Definisi Usaha (Dot Product Gaya & Perpindahan)", d: "45m" },
      { t: "Sub-bab 2: Menghitung Usaha dari Grafik F-x (Integral)", d: "50m" },
      { t: "Sub-bab 3: Teorema Usaha-Energi Kinetik", d: "50m" },
      { t: "Latihan Soal: Usaha oleh Gaya yang Berubah F(x)", d: "40m" }
    ]
  },
  // ========================== BAGIAN 11 ==========================
  {
    section: "Bagian 11: Energi Potensial dan Hukum Kekekalan Energi Mekanik",
    items: [
      { t: "Sub-bab 1: Gaya Konservatif vs Non-konservatif", d: "45m" },
      { t: "Sub-bab 2: Hukum Kekekalan Energi pada Roller Coaster & Bandul", d: "60m" },
      { t: "Sub-bab 3: Usaha oleh Gaya Gesek", d: "45m" },
      { t: "Latihan Soal: Lintasan Loop Melingkar", d: "40m" }
    ]
  },
  // ========================== BAGIAN 12 ==========================
  {
    section: "Bagian 12: Momentum Linear dan Impuls",
    items: [
      { t: "Sub-bab 1: Konsep Impuls sebagai Integral Gaya (F dt)", d: "45m" },
      { t: "Sub-bab 2: Hukum Kekekalan Momentum Linear", d: "50m" },
      { t: "Sub-bab 3: Gaya Rata-rata pada Tumbukan Singkat", d: "45m" },
      { t: "Latihan Soal: Analisis Grafik F-t (Luas Geometri)", d: "40m" }
    ]
  },
  // ========================== BAGIAN 13 ==========================
  {
    section: "Bagian 13: Tumbukan (Lenting Sempurna, Sebagian, Tidak Lenting)",
    items: [
      { t: "Sub-bab 1: Konsep Koefisien Restitusi (e)", d: "45m" },
      { t: "Sub-bab 2: Energi Kinetik yang Terdisipasi (Hilang)", d: "50m" },
      { t: "Sub-bab 3: Tumbukan 2 Dimensi (Biliar)", d: "60m" },
      { t: "Latihan Soal: Sistem Persamaan Non-linear pada Tumbukan", d: "50m" }
    ]
  },
  // ========================== BAGIAN 14 ==========================
  {
    section: "Bagian 14: Titik Berat dan Pusat Massa",
    items: [
      { t: "Sub-bab 1: Perbedaan Titik Berat dan Pusat Massa", d: "40m" },
      { t: "Sub-bab 2: Pusat Massa Sistem Partikel Diskrit 1D & 2D", d: "50m" },
      { t: "Sub-bab 3: Titik Berat Benda Tegar Kontinu (Simetri & Pemotongan)", d: "60m" },
      { t: "Latihan Soal: Titik Berat Pelat Berlubang (Weighted Average)", d: "45m" }
    ]
  },
  // ========================== BAGIAN 15 ==========================
  {
    section: "Bagian 15: Dinamika Rotasi 1 (Momen Inersia & Torsi)",
    items: [
      { t: "Sub-bab 1: Konsep Momen Gaya/Torsi (Cross Product)", d: "45m" },
      { t: "Sub-bab 2: Menghitung Momen Inersia Partikel Diskrit", d: "45m" },
      { t: "Sub-bab 3: Momen Inersia Benda Tegar & Teorema Sumbu Sejajar", d: "60m" },
      { t: "Latihan Soal: Perkalian Cross Vektor Torsi 3 Dimensi", d: "45m" }
    ]
  },
  // ========================== BAGIAN 16 ==========================
  {
    section: "Bagian 16: Dinamika Rotasi 2 (Hukum II Newton untuk Rotasi)",
    items: [
      { t: "Sub-bab 1: Sistem Katrol Bermassa (Translasi & Rotasi)", d: "60m" },
      { t: "Sub-bab 2: Gerak Menggelinding Murni (Tanpa Slip)", d: "60m" },
      { t: "Sub-bab 3: Perbandingan Percepatan Benda Menggelinding", d: "50m" },
      { t: "Latihan Soal: SPL 3 Variabel pada Katrol Bermassa", d: "50m" }
    ]
  },
  // ========================== BAGIAN 17 ==========================
  {
    section: "Bagian 17: Usaha, Energi Rotasi, dan Momentum Sudut",
    items: [
      { t: "Sub-bab 1: Energi Kinetik Total Menggelinding", d: "45m" },
      { t: "Sub-bab 2: Kekekalan Energi Mekanik Rotasi", d: "50m" },
      { t: "Sub-bab 3: Hukum Kekekalan Momentum Sudut", d: "50m" },
      { t: "Latihan Soal: Proporsionalitas Berbalik Nilai Momentum Sudut", d: "40m" }
    ]
  },
  // ========================== BAGIAN 18 ==========================
  {
    section: "Bagian 18: Kesetimbangan Benda Tegar",
    items: [
      { t: "Sub-bab 1: Syarat Kesetimbangan Statis Total", d: "45m" },
      { t: "Sub-bab 2: Analisis Gaya pada Tangga Bersandar", d: "60m" },
      { t: "Sub-bab 3: Sistem Engsel dan Tegangan Kabel", d: "60m" },
      { t: "Latihan Soal: Pemilihan Poros Rotasi untuk Eliminasi Variabel", d: "50m" }
    ]
  },
  // ========================== BAGIAN 19 ==========================
  {
    section: "Bagian 19: Elastisitas dan Hukum Hooke",
    items: [
      { t: "Sub-bab 1: Tegangan, Regangan, dan Modulus Young", d: "45m" },
      { t: "Sub-bab 2: Hukum Hooke pada Pegas (F = kx)", d: "45m" },
      { t: "Sub-bab 3: Rangkaian Pegas Seri dan Paralel", d: "50m" },
      { t: "Sub-bab 4: Energi Potensial Elastis Pegas", d: "45m" },
      { t: "Latihan Soal: Analogi Rangkaian Jembatan Wheatstone pada Pegas", d: "50m" }
    ]
  }
];

async function main() {
  const course = await prisma.course.findFirst({
    where: { title: "Physics for Beginners" }
  });

  if (!course) {
    console.error("Course not found!");
    return;
  }

  // Optional: hapus jika ada orderIndex >= 23 untuk mencegah duplikasi jika script dijalankan ulang.
  await prisma.courseModule.deleteMany({
    where: { 
      courseId: course.id,
      orderIndex: { gte: 23 }
    }
  });

  for (const part of modulesData) {
    for (const item of part.items) {
      
      const isLatihan = item.t.startsWith("Latihan");
      let content = `# ${item.t}\n\n(Materi akan ditambahkan kemudian)`;
      let quiz = null;

      if (isLatihan) {
        content += "\\n\\nSilakan kerjakan Latihan Soal di bawah ini sebelum melanjutkan.";
        quiz = JSON.stringify({
          question: `Ini adalah soal *placeholder* untuk materi ${part.section}. Jawaban benarnya adalah Opsi 1.`,
          options: ["Opsi 1 (Benar)", "Opsi 2 (Salah)", "Opsi 3 (Salah)", "Opsi 4 (Salah)"],
          answer: 0
        });
      }

      await prisma.courseModule.create({
        data: {
          courseId: course.id,
          chapterTitle: chapterTitle,
          sectionTitle: part.section,
          title: item.t,
          duration: item.d,
          orderIndex: currentIndex,
          contentMd: content,
          quizJson: quiz
        }
      });
      currentIndex++;
    }
    console.log(`Successfully seeded ${part.section}`);
  }

  console.log("Completed adding Bagian 6 to 19!");
}

main().finally(() => prisma.$disconnect());
