import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const quizzes = {
  1: JSON.stringify({
    question: "Manakah di bawah ini yang merupakan besaran skalar murni?",
    options: ["Kecepatan", "Jarak", "Perpindahan", "Percepatan"],
    answer: 1
  }),
  2: JSON.stringify({
    question: "Sebuah mobil maju 10 meter dan mundur 10 meter. Berapakah perpindahannya?",
    options: ["20 meter", "0 meter", "10 meter", "-20 meter"],
    answer: 1
  }),
  3: JSON.stringify({
    question: "Kelajuan mengukur skalar, sementara kecepatan mengukur...",
    options: ["Waktu Tempuh", "Jarak Tempuh", "Vektor Perpindahan", "Percepatan Konstan"],
    answer: 2
  }),
  4: JSON.stringify({
    question: "Kecepatan sesaat dapat diartikan secara geometris sebagai...",
    options: ["Luas daerah di bawah kurva", "Gradien garis singgung kurva", "Jarak titik ke sumbu X", "Intersep sumbu Y"],
    answer: 1
  }),
  5: JSON.stringify({
    question: "Hukum Suci Gerak Lurus Beraturan (GLB) menyatakan bahwa...",
    options: ["Percepatan bernilai konstan", "Kecepatan terus bertambah", "Kecepatan bernilai konstan", "Posisi bernilai konstan"],
    answer: 2
  }),
  6: JSON.stringify({
    question: "Dalam fungsi x(t) = x0 + v*t, komponen v*t merepresentasikan...",
    options: ["Posisi referensi awal", "Kecepatan akhir", "Percepatan", "Akumulasi perpindahan"],
    answer: 3
  }),
  7: JSON.stringify({
    question: "Pada grafik Posisi terhadap Waktu (x-t), jika kemiringan (gradien) garis adalah nol, maka benda...",
    options: ["Bergerak sangat cepat", "Berada dalam keadaan diam", "Bergerak mundur", "Memiliki percepatan tinggi"],
    answer: 1
  }),
  8: JSON.stringify({
    question: "Dalam relativitas Galilean, gerak benda dipandang sebagai...",
    options: ["Sesuatu yang mutlak", "Sesuatu yang relatif terhadap kerangka acuan", "Ilusi optik semata", "Tergantung pada massa benda"],
    answer: 1
  })
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
    if (quizzes[mod.orderIndex as keyof typeof quizzes]) {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { quizJson: quizzes[mod.orderIndex as keyof typeof quizzes] }
      });
      console.log(`Added quiz to Module ${mod.orderIndex}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
