import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const chapterTitle = "Modul 3: ELEKTROMAGNETISME, FISIKA MODERN, DAN PEMANTAPAN FINAL";
let currentIndex = 200;

const modulesData = [
  // ========================== BAGIAN 1 ==========================
  {
    section: "Bagian 1: Listrik Statis 1 (Gaya Coulomb & Medan Listrik)",
    items: [
      { t: "Sub-bab 1: Hukum Coulomb untuk gaya interaksi antar muatan titik", d: "" },
      { t: "Sub-bab 2: Prinsip superposisi gaya Coulomb untuk 3 atau lebih muatan", d: "" },
      { t: "Sub-bab 3: Definisi Medan Listrik sebagai Gaya per satuan muatan", d: "" },
      { t: "Sub-bab 4: Kuat medan listrik di sekitar muatan kontinu", d: "" },
      { t: "Latihan Soal: Mencari titik ekuilibrium di antara dua muatan beda tanda", d: "" }
    ]
  },
  // ========================== BAGIAN 2 ==========================
  {
    section: "Bagian 2: Listrik Statis 2 (Potensial Listrik & Energi Potensial Listrik)",
    items: [
      { t: "Sub-bab 1: Energi potensial listrik dan usaha memindahkan muatan", d: "" },
      { t: "Sub-bab 2: Potensial listrik sebagai besaran skalar", d: "" },
      { t: "Sub-bab 3: Hubungan medan listrik homogen, beda potensial, dan jarak", d: "" },
      { t: "Latihan Soal: Menghitung kerja untuk menyusun 4 muatan di titik sudut persegi", d: "" }
    ]
  },
  // ========================== BAGIAN 3 ==========================
  {
    section: "Bagian 3: Listrik Statis 3 (Kapasitor)",
    items: [
      { t: "Sub-bab 1: Konsep Kapasitansi keping sejajar", d: "" },
      { t: "Sub-bab 2: Energi yang tersimpan dalam kapasitor", d: "" },
      { t: "Sub-bab 3: Rangkaian seri dan paralel kapasitor", d: "" },
      { t: "Latihan Soal: Jaringan kapasitor jembatan Wheatstone ekuivalen", d: "" }
    ]
  },
  // ========================== BAGIAN 4 ==========================
  {
    section: "Bagian 4: Listrik Arus Searah (DC) 1 (Hukum Ohm & Rangkaian Resistor)",
    items: [
      { t: "Sub-bab 1: Arus, rapat arus, dan Hukum Ohm hambatan kawat", d: "" },
      { t: "Sub-bab 2: Rangkaian Resistor Seri, Paralel, dan Jembatan Wheatstone", d: "" },
      { t: "Sub-bab 3: Transformasi hambatan bentuk Delta ke Star (Wye)", d: "" },
      { t: "Latihan Soal: Melatih logika spasial menyederhanakan rangkaian kawat", d: "" }
    ]
  },
  // ========================== BAGIAN 5 ==========================
  {
    section: "Bagian 5: Listrik Arus Searah (DC) 2 (Hukum Kirchhoff I dan II)",
    items: [
      { t: "Sub-bab 1: Hukum I Kirchhoff (Kekekalan muatan) titik percabangan", d: "" },
      { t: "Sub-bab 2: Hukum II Kirchhoff pada rangkaian satu loop", d: "" },
      { t: "Sub-bab 3: Penyelesaian rangkaian kompleks Dua Loop atau lebih", d: "" },
      { t: "Sub-bab 4: Daya dan Energi listrik yang didisipasikan pada resistor", d: "" },
      { t: "Latihan Soal: Menggunakan metode Aturan Cramer untuk sistem 3 variabel arus", d: "" }
    ]
  },
  // ========================== BAGIAN 6 ==========================
  {
    section: "Bagian 6: Medan Magnetik (Hukum Biot-Savart & Ampere)",
    items: [
      { t: "Sub-bab 1: Garis-garis gaya magnet dan Aturan Tangan Kanan", d: "" },
      { t: "Sub-bab 2: Kuat medan magnet induksi kawat lurus panjang berarus", d: "" },
      { t: "Sub-bab 3: Medan magnet di pusat kawat melingkar dan Solenoida", d: "" },
      { t: "Latihan Soal: Soal vektor 3D menentukan resultan medan magnet B", d: "" }
    ]
  },
  // ========================== BAGIAN 7 ==========================
  {
    section: "Bagian 7: Gaya Magnetik (Gaya Lorentz)",
    items: [
      { t: "Sub-bab 1: Gaya Lorentz pada kawat berarus dalam medan magnet", d: "" },
      { t: "Sub-bab 2: Gaya magnet antara dua kawat lurus berarus sejajar", d: "" },
      { t: "Sub-bab 3: Gaya Lorentz pada muatan bergerak vertikal ke dalam medan magnet", d: "" },
      { t: "Latihan Soal: Analisis spektrometer massa, rasio m/q", d: "" }
    ]
  },
  // ========================== BAGIAN 8 ==========================
  {
    section: "Bagian 8: Induksi Elektromagnetik 1 (Hukum Faraday-Lenz)",
    items: [
      { t: "Sub-bab 1: Fluks Magnetik sebagai perkalian dot medan magnet dan luasan", d: "" },
      { t: "Sub-bab 2: Hukum Lenz untuk menentukan arah arus induksi", d: "" },
      { t: "Sub-bab 3: Hukum Faraday, GGL Induksi akibat perubahan fluks", d: "" },
      { t: "Latihan Soal: Aturan Rantai Kalkulus membuktikan rumus GGL kawat", d: "" }
    ]
  },
  // ========================== BAGIAN 9 ==========================
  {
    section: "Bagian 9: Induksi Elektromagnetik 2 (Induktansi & Transformator)",
    items: [
      { t: "Sub-bab 1: GGL Induksi diri akibat perubahan arus di induktor", d: "" },
      { t: "Sub-bab 2: Energi magnetik yang tersimpan dalam Induktor", d: "" },
      { t: "Sub-bab 3: Induktansi Silang dan prinsip kerja Transformator", d: "" },
      { t: "Latihan Soal: Efisiensi transformator non-ideal transmisi tegangan tinggi", d: "" }
    ]
  },
  // ========================== BAGIAN 10 ==========================
  {
    section: "Bagian 10: Rangkaian Listrik Bolak-Balik (AC)",
    items: [
      { t: "Sub-bab 1: Tegangan dan Arus AC sinusoida (Maksimum dan RMS)", d: "" },
      { t: "Sub-bab 2: Sifat R, L, C murni pada tegangan AC (Fasor)", d: "" },
      { t: "Sub-bab 3: Impedansi rangkaian seri R-L-C dan Diagram Fasor", d: "" },
      { t: "Sub-bab 4: Frekuensi resonansi rangkaian R-L-C murni", d: "" },
      { t: "Latihan Soal: Analisis geometri fasor tegangan dan arus AC", d: "" }
    ]
  },
  // ========================== BAGIAN 11 ==========================
  {
    section: "Bagian 11: Gelombang Elektromagnetik (Spektrum GEM)",
    items: [
      { t: "Sub-bab 1: Persamaan Maxwell konseptual dan terciptanya GEM", d: "" },
      { t: "Sub-bab 2: Hubungan vektor Medan Listrik dan Medan Magnet (c=E/B)", d: "" },
      { t: "Sub-bab 3: Spektrum gelombang elektromagnetik dan aplikasi", d: "" },
      { t: "Latihan Soal: Evaluasi literasi sains aplikasi gelombang mikro", d: "" }
    ]
  },
  // ========================== BAGIAN 12 ==========================
  {
    section: "Bagian 12: Fisika Modern 1 (Relativitas Khusus Einstein)",
    items: [
      { t: "Sub-bab 1: Postulat Relativitas Khusus dan kegagalan Galilei", d: "" },
      { t: "Sub-bab 2: Dilatasi Waktu dan Kontraksi Panjang", d: "" },
      { t: "Sub-bab 3: Massa, Momentum Relativistik, dan Kesetaraan Massa-Energi", d: "" },
      { t: "Latihan Soal: Aljabar Faktor Lorentz gamma", d: "" }
    ]
  },
  // ========================== BAGIAN 13 ==========================
  {
    section: "Bagian 13: Fisika Kuantum 1 (Radiasi Benda Hitam & Efek Fotolistrik)",
    items: [
      { t: "Sub-bab 1: Hipotesis Kuantum Planck", d: "" },
      { t: "Sub-bab 2: Efek Fotolistrik, Fungsi Kerja, Potensial Penghenti", d: "" },
      { t: "Sub-bab 3: Grafik energi kinetik maksimum terhadap frekuensi", d: "" },
      { t: "Latihan Soal: Analisis persamaan linear membuktikan konstanta Planck", d: "" }
    ]
  },
  // ========================== BAGIAN 14 ==========================
  {
    section: "Bagian 14: Fisika Kuantum 2 (Efek Compton & Dualisme Gelombang-Partikel)",
    items: [
      { t: "Sub-bab 1: Hamburan Compton (cahaya partikel menumbuk elektron)", d: "" },
      { t: "Sub-bab 2: Panjang Gelombang De Broglie", d: "" },
      { t: "Latihan Soal: Rumus De Broglie panjang gelombang elektron mikroskop", d: "" }
    ]
  },
  // ========================== BAGIAN 15 ==========================
  {
    section: "Bagian 15: Fisika Atom (Model Atom Bohr)",
    items: [
      { t: "Sub-bab 1: Kegagalan atom Rutherford dan Postulat Spektrum Bohr", d: "" },
      { t: "Sub-bab 2: Tingkat energi diskrit kulit atom Hidrogen", d: "" },
      { t: "Sub-bab 3: Transisi elektron dan deret spektrum garis", d: "" },
      { t: "Latihan Soal: Invers rasio panjang gelombang spektrum hidrogen", d: "" }
    ]
  },
  // ========================== BAGIAN 16 ==========================
  {
    section: "Bagian 16: Fisika Inti (Struktur Nuklir & Defek Massa)",
    items: [
      { t: "Sub-bab 1: Gaya ikat inti nuklir kuat versus gaya tolak Coulomb", d: "" },
      { t: "Sub-bab 2: Defek massa inti dan Energi Ikat Inti nukleus", d: "" },
      { t: "Latihan Soal: Konversi desimal sma ke MeV", d: "" }
    ]
  },
  // ========================== BAGIAN 17 ==========================
  {
    section: "Bagian 17: Peluruhan Radioaktif (Waktu Paruh dan Radioisotop)",
    items: [
      { t: "Sub-bab 1: Karakteristik Sinar Alfa, Beta, dan Gamma", d: "" },
      { t: "Sub-bab 2: Persamaan reaksi peluruhan inti alami dan buatan", d: "" },
      { t: "Sub-bab 3: Aktivitas Radioaktif dan Waktu Paruh", d: "" },
      { t: "Latihan Soal: Penggunaan Logaritma Natural mencari umur fosil C-14", d: "" }
    ]
  },
  // ========================== BAGIAN 18 ==========================
  {
    section: "Bagian 18: Tryout Fokus Penggabungan Mekanika Klasik + Elektromagnetik",
    items: [
      { t: "Latihan Soal Terpadu: Gerak parabola memotong medan listrik tegak lurus gravitasi", d: "" }
    ]
  },
  // ========================== BAGIAN 19 ==========================
  {
    section: "Bagian 19: Tryout Fokus Penggabungan Termodinamika + Mekanika Fluida",
    items: [
      { t: "Latihan Soal Terpadu: Balon udara gas ideal didesak udara luar (Gaya Archimedes)", d: "" }
    ]
  },
  // ========================== BAGIAN 20 ==========================
  {
    section: "Bagian 20: Analisis Data Fisika & Literasi Saintifik",
    items: [
      { t: "Latihan Soal: Jurnal numerasi rasio konversi energi massa ke termal (SNBT)", d: "" }
    ]
  },
  // ========================== BAGIAN 21 ==========================
  {
    section: "Bagian 21: Final Assessment, Simulasi Waktu UTBK Real-Time",
    items: [
      { t: "Tryout Final UTBK (Simulasi Real-Time)", d: "" }
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

  // Bersihkan data lama jika ada
  await prisma.courseModule.deleteMany({
    where: { 
      courseId: course.id,
      chapterTitle: chapterTitle
    }
  });

  for (const part of modulesData) {
    for (const item of part.items) {
      const isLatihan = item.t.startsWith("Latihan") || item.t.startsWith("Tryout");
      let content = `# ${item.t}\n\n(Materi akan ditambahkan kemudian)`;
      let quiz = null;

      if (isLatihan) {
        content += "\n\nSilakan kerjakan evaluasi di bawah ini sebelum melanjutkan.";
        quiz = JSON.stringify({
          question: `Ini adalah soal *placeholder* untuk materi ${part.section}. Jawaban benarnya adalah Opsi A.`,
          options: ["Opsi A (Benar)", "Opsi B (Salah)", "Opsi C (Salah)", "Opsi D (Salah)"],
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

  console.log("Completed adding Modul 3!");
}

main().finally(() => prisma.$disconnect());
