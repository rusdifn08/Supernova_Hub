import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const chapterTitle = "Modul 2: FLUIDA, TERMODINAMIKA, GELOMBANG, DAN OPTIK";
let currentIndex = 100;

const modulesData = [
  // ========================== BAGIAN 1 ==========================
  {
    section: "Bagian 1: Fluida Statis 1 (Tekanan & Hukum Pascal)",
    items: [
      { t: "Sub-bab 1: Konsep Tekanan Hidrostatis murni dan Tekanan Mutlak", d: "" },
      { t: "Sub-bab 2: Hukum Pascal dan Aplikasinya", d: "" },
      { t: "Sub-bab 3: Paradoks Hidrostatis dan Bejana Berhubungan", d: "" },
      { t: "Latihan Soal: Logika Perbandingan Rasio Ketinggian Cairan pada Pipa U", d: "" }
    ]
  },
  // ========================== BAGIAN 2 ==========================
  {
    section: "Bagian 2: Fluida Statis 2 (Hukum Archimedes & Tegangan Permukaan)",
    items: [
      { t: "Sub-bab 1: Gaya Apung (Gaya Archimedes)", d: "" },
      { t: "Sub-bab 2: Syarat Benda Mengapung, Melayang, dan Tenggelam", d: "" },
      { t: "Sub-bab 3: Tegangan Permukaan, Kapilaritas, dan Sudut Kontak", d: "" },
      { t: "Latihan Soal: Gaya Tegangan Tali dengan Resultan Vektor 3 Gaya", d: "" }
    ]
  },
  // ========================== BAGIAN 3 ==========================
  {
    section: "Bagian 3: Fluida Dinamis 1 (Persamaan Kontinuitas)",
    items: [
      { t: "Sub-bab 1: Sifat Fluida Ideal", d: "" },
      { t: "Sub-bab 2: Debit Aliran Fluida dan Persamaan Kontinuitas", d: "" },
      { t: "Sub-bab 3: Perubahan Kelajuan Fluida", d: "" },
      { t: "Latihan Soal: Rasio Perbandingan Luas Penampang Lingkaran", d: "" }
    ]
  },
  // ========================== BAGIAN 4 ==========================
  {
    section: "Bagian 4: Fluida Dinamis 2 (Asas Bernoulli & Aplikasinya)",
    items: [
      { t: "Sub-bab 1: Formulasi Asas Bernoulli", d: "" },
      { t: "Sub-bab 2: Teorema Torricelli (Tangki Bocor)", d: "" },
      { t: "Sub-bab 3: Analisis Gaya Angkat Pesawat, Tabung Pitot, dan Venturimeter", d: "" },
      { t: "Latihan Soal: Substitusi Kontinuitas ke Persamaan Bernoulli", d: "" }
    ]
  },
  // ========================== BAGIAN 5 ==========================
  {
    section: "Bagian 5: Suhu, Pemuaian, dan Perpindahan Kalor",
    items: [
      { t: "Sub-bab 1: Skala Termometer Sembarang dan Interpolasi Linear", d: "" },
      { t: "Sub-bab 2: Pemuaian Panjang, Luas, Volume, dan Anomali Air", d: "" },
      { t: "Sub-bab 3: Mekanisme Konduksi, Konveksi, dan Radiasi Benda Hitam", d: "" },
      { t: "Latihan Soal: Membuat Skala Termometer X", d: "" }
    ]
  },
  // ========================== BAGIAN 6 ==========================
  {
    section: "Bagian 6: Azas Black dan Perubahan Wujud Zat",
    items: [
      { t: "Sub-bab 1: Kalor Jenis, Kapasitas Kalor, dan Grafik Pemanasan", d: "" },
      { t: "Sub-bab 2: Kalor Laten (Lebur dan Uap)", d: "" },
      { t: "Sub-bab 3: Prinsip Kekekalan Energi Kalor (Azas Black)", d: "" },
      { t: "Latihan Soal: Persamaan Aljabar Linear Pencampuran 3 Zat Beda Suhu", d: "" }
    ]
  },
  // ========================== BAGIAN 7 ==========================
  {
    section: "Bagian 7: Teori Kinetik Gas Ideal 1",
    items: [
      { t: "Sub-bab 1: Asumsi-asumsi Mikroskopis Gas Ideal", d: "" },
      { t: "Sub-bab 2: Persamaan Keadaan Gas Ideal", d: "" },
      { t: "Sub-bab 3: Analisis Grafik Keadaan Gas", d: "" },
      { t: "Latihan Soal: Analisis Perbandingan Nilai Besaran dari Grafik Gas", d: "" }
    ]
  },
  // ========================== BAGIAN 8 ==========================
  {
    section: "Bagian 8: Teori Kinetik Gas Ideal 2",
    items: [
      { t: "Sub-bab 1: Hubungan Tekanan Gas dengan Energi Kinetik Rata-rata", d: "" },
      { t: "Sub-bab 2: Kecepatan Efektif (v_rms) Gas Ideal", d: "" },
      { t: "Sub-bab 3: Teorema Ekuipartisi Energi", d: "" },
      { t: "Latihan Soal: Rasio Perbandingan v_rms pada Campuran Gas Isotop", d: "" }
    ]
  },
  // ========================== BAGIAN 9 ==========================
  {
    section: "Bagian 9: Termodinamika 1 (Hukum I Termodinamika)",
    items: [
      { t: "Sub-bab 1: Perjanjian Tanda untuk W, Q, dan ΔU", d: "" },
      { t: "Sub-bab 2: Menghitung Usaha dari Grafik P-V", d: "" },
      { t: "Sub-bab 3: Penerapan Hukum I Termodinamika pada 4 Proses Utama", d: "" },
      { t: "Latihan Soal: Penggunaan Konstanta Laplace pada Proses Adiabatik", d: "" }
    ]
  },
  // ========================== BAGIAN 10 ==========================
  {
    section: "Bagian 10: Termodinamika 2 (Siklus Gas dan Hukum II Termodinamika)",
    items: [
      { t: "Sub-bab 1: Analisis Total Kerja, Kalor, dan Energi Dalam pada Siklus Tertutup", d: "" },
      { t: "Sub-bab 2: Mesin Kalor Ideal Carnot", d: "" },
      { t: "Sub-bab 3: Mesin Pendingin (Kulkas/AC Ideal)", d: "" },
      { t: "Sub-bab 4: Konsep Entropi (Pengenalan Dasar)", d: "" },
      { t: "Latihan Soal: Manipulasi Persentase Efisiensi Mesin Carnot", d: "" }
    ]
  },
  // ========================== BAGIAN 11 ==========================
  {
    section: "Bagian 11: Gerak Harmonik Sederhana (GHS) Kinematika",
    items: [
      { t: "Sub-bab 1: Persamaan Simpangan, Kecepatan, dan Percepatan", d: "" },
      { t: "Sub-bab 2: Konsep Fase, Sudut Fase, dan Beda Fase Getaran", d: "" },
      { t: "Sub-bab 3: Hubungan Percepatan GHS dengan Simpangannya", d: "" },
      { t: "Latihan Soal: Turunan Fungsi Trigonometri Kelajuan Maksimum Bandul", d: "" }
    ]
  },
  // ========================== BAGIAN 12 ==========================
  {
    section: "Bagian 12: Dinamika GHS (Bandul dan Pegas)",
    items: [
      { t: "Sub-bab 1: Gaya Pemulih pada Sistem Massa-Pegas", d: "" },
      { t: "Sub-bab 2: Gaya Pemulih pada Ayunan Bandul Matematis", d: "" },
      { t: "Sub-bab 3: Hukum Kekekalan Energi Mekanik pada GHS", d: "" },
      { t: "Latihan Soal: Analitik Konseptual Ayunan Fisis vs Bandul Matematis", d: "" }
    ]
  },
  // ========================== BAGIAN 13 ==========================
  {
    section: "Bagian 13: Gelombang Mekanik (Gelombang Berjalan)",
    items: [
      { t: "Sub-bab 1: Karakteristik Gelombang Transversal dan Longitudinal", d: "" },
      { t: "Sub-bab 2: Membaca dan Membentuk Persamaan Gelombang Berjalan", d: "" },
      { t: "Sub-bab 3: Kecepatan Transversal Partikel vs Kecepatan Rambat", d: "" },
      { t: "Latihan Soal: Menghitung Beda Fase Antar Dua Titik", d: "" }
    ]
  },
  // ========================== BAGIAN 14 ==========================
  {
    section: "Bagian 14: Gelombang Stasioner (Berdiri)",
    items: [
      { t: "Sub-bab 1: Prinsip Superposisi Gelombang", d: "" },
      { t: "Sub-bab 2: Persamaan Gelombang Stasioner Ujung Terikat", d: "" },
      { t: "Sub-bab 3: Persamaan Gelombang Stasioner Ujung Bebas", d: "" },
      { t: "Sub-bab 4: Menentukan Letak Simpul dan Perut", d: "" },
      { t: "Latihan Soal: Logika Matematika Letak Simpul Gelombang Stasioner", d: "" }
    ]
  },
  // ========================== BAGIAN 15 ==========================
  {
    section: "Bagian 15: Gelombang Bunyi 1 (Sumber Bunyi dan Resonansi)",
    items: [
      { t: "Sub-bab 1: Cepat Rambat Bunyi pada Dawai Padat (Percobaan Melde)", d: "" },
      { t: "Sub-bab 2: Cepat Rambat Bunyi pada Gas dan Fluida", d: "" },
      { t: "Sub-bab 3: Pola Nada Dasar dan Nada Atas (Dawai, Pipa Organa)", d: "" },
      { t: "Latihan Soal: Pola Barisan Bilangan Kasus Resonansi Gabungan", d: "" }
    ]
  },
  // ========================== BAGIAN 16 ==========================
  {
    section: "Bagian 16: Gelombang Bunyi 2 (Intensitas, Taraf Intensitas, Efek Doppler)",
    items: [
      { t: "Sub-bab 1: Intensitas Gelombang Sferis", d: "" },
      { t: "Sub-bab 2: Taraf Intensitas Bunyi (TI)", d: "" },
      { t: "Sub-bab 3: Perubahan TI Akibat Penambahan Jumlah atau Jarak", d: "" },
      { t: "Sub-bab 4: Efek Doppler untuk Gelombang Bunyi", d: "" },
      { t: "Latihan Soal: Manipulasi Logaritma Taraf Intensitas", d: "" }
    ]
  },
  // ========================== BAGIAN 17 ==========================
  {
    section: "Bagian 17: Optik Geometri 1 (Pemantulan: Cermin Datar & Lengkung)",
    items: [
      { t: "Sub-bab 1: Hukum Snellius untuk Pemantulan Cahaya", d: "" },
      { t: "Sub-bab 2: Sifat Bayangan pada Cermin Datar dan Cermin Bersudut", d: "" },
      { t: "Sub-bab 3: Persamaan Cermin Cekung dan Cembung", d: "" },
      { t: "Latihan Soal: Bayangan Maya Diperbesar (Fungsi Rasional)", d: "" }
    ]
  },
  // ========================== BAGIAN 18 ==========================
  {
    section: "Bagian 18: Optik Geometri 2 (Pembiasan: Lensa tipis & Kaca Plan Paralel)",
    items: [
      { t: "Sub-bab 1: Indeks Bias, Hukum Snellius, dan Pemantulan Sempurna", d: "" },
      { t: "Sub-bab 2: Pembiasan pada Lensa Cembung dan Cekung", d: "" },
      { t: "Sub-bab 3: Persamaan Pembuat Lensa (Lens Maker Equation)", d: "" },
      { t: "Latihan Soal: Pemantulan Sempurna Serat Optik (Batas Limit)", d: "" }
    ]
  },
  // ========================== BAGIAN 19 ==========================
  {
    section: "Bagian 19: Alat Optik (Mata, Kacamata, Lup, Mikroskop, Teleskop)",
    items: [
      { t: "Sub-bab 1: Cacat Mata dan Kekuatan Lensa Kacamata", d: "" },
      { t: "Sub-bab 2: Perbesaran Anguler Lup", d: "" },
      { t: "Sub-bab 3: Sistem Dua Lensa pada Mikroskop dan Teropong Bintang", d: "" },
      { t: "Latihan Soal: Pemodelan Persamaan Linear Mikroskop Akomodasi Minimum", d: "" }
    ]
  },
  // ========================== BAGIAN 20 ==========================
  {
    section: "Bagian 20: Optik Fisis (Interferensi, Difraksi, Polarisasi)",
    items: [
      { t: "Sub-bab 1: Interferensi Celah Ganda Young", d: "" },
      { t: "Sub-bab 2: Difraksi Celah Tunggal dan Kisi Difraksi", d: "" },
      { t: "Sub-bab 3: Interferensi pada Lapisan Tipis", d: "" },
      { t: "Sub-bab 4: Polarisasi Cahaya", d: "" },
      { t: "Latihan Soal: Aproksimasi Trigonometri Sudut Difraksi Sangat Kecil", d: "" }
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

  // Bersihkan data jika sudah pernah dijalankan
  await prisma.courseModule.deleteMany({
    where: { 
      courseId: course.id,
      chapterTitle: chapterTitle
    }
  });

  for (const part of modulesData) {
    for (const item of part.items) {
      const isLatihan = item.t.startsWith("Latihan");
      let content = `# ${item.t}\n\n(Materi akan ditambahkan kemudian)`;
      let quiz = null;

      if (isLatihan) {
        content += "\n\nSilakan kerjakan Latihan Soal di bawah ini sebelum melanjutkan.";
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

  console.log("Completed adding Modul 2!");
}

main().finally(() => prisma.$disconnect());
