import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const quizzes = [
  {
    title: "Latihan Soal: Fungsi Polinomial Kinematika", // Bagian 1
    questions: [
      {
        question: "Sebuah partikel bergerak dengan persamaan posisi $x(t) = 3t^2 - 12t + 5$ meter. Kapan partikel tersebut berhenti sesaat?",
        options: ["t = 2 detik", "t = 3 detik", "t = 4 detik", "t = 0 detik"],
        answer: 0
      },
      {
        question: "Berapa percepatan partikel dari fungsi $x(t) = 3t^2 - 12t + 5$?",
        options: ["6 m/s²", "12 m/s²", "3 m/s²", "0 m/s²"],
        answer: 0
      },
      {
        question: "Sebuah mobil bergerak dengan kecepatan konstan 10 m/s selama 5 detik, lalu direm dengan perlambatan konstan -2 m/s² sampai berhenti. Berapa jarak totalnya?",
        options: ["50 meter", "25 meter", "75 meter", "100 meter"],
        answer: 2
      },
      {
        question: "Grafik v-t sebuah benda berbentuk segitiga sama kaki dengan alas waktu t=0 sampai t=4, dan puncak kecepatan v=10. Berapa perpindahannya?",
        options: ["10 m", "20 m", "40 m", "5 m"],
        answer: 1
      },
      {
        question: "Jika kecepatan adalah turunan pertama dari posisi, maka besaran apakah yang merupakan turunan pertama dari percepatan (da/dt)?",
        options: ["Jerk (Sentakan)", "Impuls", "Momentum", "Momentum Sudut"],
        answer: 0
      }
    ]
  },
  {
    title: "Latihan Soal: Memecahkan SPLDV Kinematika", // Bagian 2
    questions: [
      {
        question: "Dua mobil A dan B berjarak 100 meter saling berhadapan. Mobil A bergerak ke kanan dengan kecepatan konstan 10 m/s. Mobil B ke kiri dengan kecepatan konstan 15 m/s. Kapan mereka berpapasan?",
        options: ["t = 2 detik", "t = 4 detik", "t = 5 detik", "t = 10 detik"],
        answer: 1
      },
      {
        question: "Batu dijatuhkan bebas (GJB) ke dalam sumur sedalam 20 meter. Jika g = 10 m/s², berapa lama batu sampai di dasar sumur?",
        options: ["1 detik", "2 detik", "3 detik", "4 detik"],
        answer: 1
      },
      {
        question: "Sebuah panah ditembakkan lurus ke atas dengan kecepatan awal 30 m/s. Berapa tinggi maksimum yang dicapai panah tersebut? (g = 10 m/s²)",
        options: ["30 meter", "45 meter", "60 meter", "90 meter"],
        answer: 1
      },
      {
        question: "Di puncak lintasannya (tinggi maksimum), berapa percepatan benda yang dilempar vertikal ke atas?",
        options: ["Nol", "10 m/s² ke atas", "10 m/s² ke bawah", "Bergantung massanya"],
        answer: 2
      },
      {
        question: "Pencuri berlari dengan kecepatan konstan 8 m/s. Tiga detik kemudian, polisi mengejar dari tempat yang sama dengan kecepatan konstan 10 m/s. Berapa jarak yang ditempuh polisi saat berhasil menangkap pencuri?",
        options: ["80 meter", "100 meter", "120 meter", "150 meter"],
        answer: 2
      }
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

  for (const q of quizzes) {
    const modules = await prisma.courseModule.findMany({
      where: {
        courseId: course.id,
        title: { contains: q.title }
      }
    });

    for (const mod of modules) {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: {
          quizJson: JSON.stringify(q.questions)
        }
      });
      console.log(`Updated Latihan Soal: ${mod.title}`);
    }
  }

  console.log("Quizzes updated successfully!");
}

main().finally(() => prisma.$disconnect());
