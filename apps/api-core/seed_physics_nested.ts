import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const nestedModules = [
  // ========================== BAGIAN 1 ==========================
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 1: Kinematika Partikel 1D (Gerak Lurus) dengan Pendekatan Kalkulus",
    title: "Sub-bab 1: Jarak Tempuh vs Perpindahan Posisi",
    duration: "45m",
    orderIndex: 1,
    contentMd: `# Sub-bab 1: Perbedaan konseptual antara jarak tempuh total dan perpindahan posisi.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 1: Kinematika Partikel 1D (Gerak Lurus) dengan Pendekatan Kalkulus",
    title: "Sub-bab 2: Kecepatan & Percepatan Rata-rata vs Sesaat (Diferensial)",
    duration: "60m",
    orderIndex: 2,
    contentMd: `# Sub-bab 2: Analisis kecepatan dan percepatan rata-rata versus kecepatan dan percepatan sesaat menggunakan konsep turunan (diferensial).\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 1: Kinematika Partikel 1D (Gerak Lurus) dengan Pendekatan Kalkulus",
    title: "Sub-bab 3: Penurunan Persamaan GLBB Murni (Integral)",
    duration: "60m",
    orderIndex: 3,
    contentMd: `# Sub-bab 3: Penurunan persamaan Gerak Lurus Berubah Beraturan (GLBB) murni menggunakan integral tak tentu.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 1: Kinematika Partikel 1D (Gerak Lurus) dengan Pendekatan Kalkulus",
    title: "Sub-bab 4: Analisis Grafik x-t, v-t, dan a-t",
    duration: "50m",
    orderIndex: 4,
    contentMd: `# Sub-bab 4: Analisis grafik hubungan antara posisi (x-t), kecepatan (v-t), dan percepatan (a-t).\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 1: Kinematika Partikel 1D (Gerak Lurus) dengan Pendekatan Kalkulus",
    title: "Latihan Soal: Fungsi Polinomial Kinematika",
    duration: "30m",
    orderIndex: 5,
    contentMd: `# Latihan Soal Bagian 1\n\nDiberikan fungsi percepatan $a(t)$ dalam bentuk polinomial, carilah fungsi posisi $x(t)$ dan mencari waktu saat benda berbalik arah. (Tipe UM UGM).\n\nSilakan kerjakan Quiz di bawah ini:`,
    quizJson: JSON.stringify({
      question: "Jika fungsi kecepatan suatu partikel adalah v(t) = 3t^2 - 12, pada detik ke berapakah partikel tersebut berbalik arah?",
      options: ["t = 0", "t = 2", "t = 3", "t = 4"],
      answer: 1
    })
  },
  // ========================== BAGIAN 2 ==========================
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 2: Aplikasi GLB dan GLBB pada Kasus Nyata",
    title: "Sub-bab 1: Analisis Gerak Jatuh Bebas (GJB)",
    duration: "45m",
    orderIndex: 6,
    contentMd: `# Sub-bab 1: Analisis gerak jatuh bebas (GJB) dengan dan tanpa memperhitungkan hambatan udara (konseptual).\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 2: Aplikasi GLB dan GLBB pada Kasus Nyata",
    title: "Sub-bab 2: Gerak Vertikal ke Atas dan ke Bawah",
    duration: "50m",
    orderIndex: 7,
    contentMd: `# Sub-bab 2: Gerak vertikal ke atas dan ke bawah: Analisis titik tertinggi dan waktu tempuh simetris.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 2: Aplikasi GLB dan GLBB pada Kasus Nyata",
    title: "Sub-bab 3: Kasus Susulan Dua Benda",
    duration: "60m",
    orderIndex: 8,
    contentMd: `# Sub-bab 3: Kasus susulan dua benda yang bergerak searah atau berlawanan arah dengan percepatan berbeda.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 2: Aplikasi GLB dan GLBB pada Kasus Nyata",
    title: "Latihan Soal: Memecahkan SPLDV Kinematika",
    duration: "45m",
    orderIndex: 9,
    contentMd: `# Latihan Soal Bagian 2\n\nMemecahkan sistem persamaan linear dua variabel (SPLDV) untuk menentukan titik temu dua mobil yang bergerak dengan persamaan waktu yang berbeda. (Tipe SNBT Penalaran Matematis).\n\nSilakan kerjakan Quiz di bawah ini:`,
    quizJson: JSON.stringify({
      question: "Mobil A bergerak dengan kecepatan konstan 20 m/s. 5 detik kemudian Mobil B mengejar dari posisi awal yang sama dengan percepatan konstan 4 m/s^2 (tanpa kecepatan awal). Kapan Mobil B menyusul Mobil A?",
      options: ["t = 10s", "t = 15s", "t = 20s", "t = 5s"],
      answer: 1 // Just a dummy placeholder answer
    })
  },
  // ========================== BAGIAN 3 ==========================
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 3: Kinematika 2D (Gerak Parabola/Peluru)",
    title: "Sub-bab 1: Prinsip Superposisi Gerak X dan Y",
    duration: "45m",
    orderIndex: 10,
    contentMd: `# Sub-bab 1: Prinsip superposisi gerak: Pemisahan gerak lurus beraturan di sumbu X dan gerak lurus berubah beraturan di sumbu Y.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 3: Kinematika 2D (Gerak Parabola/Peluru)",
    title: "Sub-bab 2: Rumus Tinggi Maksimum dan Jangkauan",
    duration: "60m",
    orderIndex: 11,
    contentMd: `# Sub-bab 2: Penurunan matematis rumus waktu mencapai titik puncak, tinggi maksimum, dan jarak jangkauan terjauh.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 3: Kinematika 2D (Gerak Parabola/Peluru)",
    title: "Sub-bab 3: Parabola dari Ketinggian Tertentu",
    duration: "50m",
    orderIndex: 12,
    contentMd: `# Sub-bab 3: Analisis gerak parabola yang ditembakkan dari ketinggian tertentu (tidak dari tanah).\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 3: Kinematika 2D (Gerak Parabola/Peluru)",
    title: "Sub-bab 4: Persamaan Lintasan Parabola y(x)",
    duration: "50m",
    orderIndex: 13,
    contentMd: `# Sub-bab 4: Persamaan lintasan parabola y(x) tanpa parameter waktu t.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 3: Kinematika 2D (Gerak Parabola/Peluru)",
    title: "Latihan Soal: Penggunaan Identitas Trigonometri",
    duration: "45m",
    orderIndex: 14,
    contentMd: `# Latihan Soal Bagian 3\n\nPenggunaan identitas trigonometri $\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$ untuk mencari sudut elevasi optimal agar proyektil mengenai target pada koordinat (x,y) tertentu. (Tipe SIMAK UI).\n\nSilakan kerjakan Quiz di bawah ini:`,
    quizJson: JSON.stringify({
      question: "Berapa sudut elevasi yang diperlukan agar sebuah peluru mencapai jarak terjauh maksimum (tanpa hambatan udara)?",
      options: ["30 derajat", "45 derajat", "60 derajat", "90 derajat"],
      answer: 1
    })
  },
  // ========================== BAGIAN 4 ==========================
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 4: Kinematika 2D (Gerak Melingkar Kinematika)",
    title: "Sub-bab 1: Konsep Posisi, Kecepatan, Percepatan Sudut",
    duration: "45m",
    orderIndex: 15,
    contentMd: `# Sub-bab 1: Konsep posisi sudut, kecepatan sudut, dan percepatan sudut dalam radian.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 4: Kinematika 2D (Gerak Melingkar Kinematika)",
    title: "Sub-bab 2: Analogi Persamaan GMBB dan GLBB",
    duration: "45m",
    orderIndex: 16,
    contentMd: `# Sub-bab 2: Analogi persamaan Gerak Melingkar Berubah Beraturan (GMBB) dengan persamaan GLBB.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 4: Kinematika 2D (Gerak Melingkar Kinematika)",
    title: "Sub-bab 3: Besaran Anguler vs Besaran Linear",
    duration: "45m",
    orderIndex: 17,
    contentMd: `# Sub-bab 3: Hubungan antara besaran sudut (anguler) dan besaran tangensial (linear).\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 4: Kinematika 2D (Gerak Melingkar Kinematika)",
    title: "Sub-bab 4: Percepatan Sentripetal vs Tangensial",
    duration: "50m",
    orderIndex: 18,
    contentMd: `# Sub-bab 4: Percepatan sentripetal versus percepatan tangensial, dan resultan percepatan total.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 4: Kinematika 2D (Gerak Melingkar Kinematika)",
    title: "Latihan Soal: Analisis Roda-roda Terhubung",
    duration: "45m",
    orderIndex: 19,
    contentMd: `# Latihan Soal Bagian 4\n\nSoal analisis roda-roda yang dihubungkan dengan tali atau seporos, membutuhkan penalaran perbandingan senilai dan berbalik nilai matematika.\n\nSilakan kerjakan Quiz di bawah ini:`,
    quizJson: JSON.stringify({
      question: "Dua roda A dan B dihubungkan dengan rantai. Jika Roda A dua kali lebih besar dari Roda B, maka kecepatan linear v di tepi kedua roda adalah...",
      options: ["v_A dua kali v_B", "v_A sama dengan v_B", "v_B dua kali v_A", "Tergantung massanya"],
      answer: 1
    })
  },
  // ========================== BAGIAN 5 ==========================
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 5: Review Kinematika dan Tryout Mini 1",
    title: "Sub-bab 1: Pemantapan Konsep Grafik Gabungan",
    duration: "45m",
    orderIndex: 20,
    contentMd: `# Sub-bab 1: Pemantapan konsep grafik gabungan (parabola dan gerak melingkar).\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 5: Review Kinematika dan Tryout Mini 1",
    title: "Sub-bab 2: Bedah Trik Soal UTBK Kinematika",
    duration: "60m",
    orderIndex: 21,
    contentMd: `# Sub-bab 2: Bedah trik penyelesaian soal kinematika yang menjebak dari UTBK tahun-tahun sebelumnya.\n\n(Materi akan ditambahkan kemudian)`
  },
  {
    chapterTitle: "Modul 1: Fondasi Mekanika Klasik dan Analisis Sistem Partikel",
    sectionTitle: "Bagian 5: Review Kinematika dan Tryout Mini 1",
    title: "Tryout Mini: 20 Soal Pilihan Ganda Kompleks (HOTS)",
    duration: "90m",
    orderIndex: 22,
    contentMd: `# Latihan Soal Bagian 5\n\n20 Soal Pilihan Ganda kompleks (HOTS) yang mensimulasikan waktu ujian asli, mewajibkan penggunaan turunan dan integral fungsi sederhana.\n\nSilakan kerjakan Tryout Mini di bawah ini:`,
    quizJson: JSON.stringify({
      question: "Seorang astronot di bulan (tanpa gesekan udara) melempar batu mendatar. Lintasan yang dibentuk oleh batu tersebut adalah...",
      options: ["Parabola murni", "Garis lurus ke bawah", "Hiperbola", "Garis linear miring"],
      answer: 0
    })
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

  // Hapus modul lama
  await prisma.courseModule.deleteMany({
    where: { courseId: course.id }
  });

  // Masukkan hirarki baru
  for (const mod of nestedModules) {
    await prisma.courseModule.create({
      data: {
        courseId: course.id,
        chapterTitle: mod.chapterTitle,
        sectionTitle: mod.sectionTitle,
        title: mod.title,
        duration: mod.duration,
        orderIndex: mod.orderIndex,
        contentMd: mod.contentMd,
        quizJson: mod.quizJson || null
      }
    });
  }

  console.log("Successfully seeded nested modules for Physics!");
}

main().finally(() => prisma.$disconnect());
