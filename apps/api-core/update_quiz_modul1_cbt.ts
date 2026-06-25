import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const quizzes = [
  {
    title: "Latihan Soal: Fungsi Polinomial Kinematika", // Bagian 1
    questions: [
      {
        question: "Sebuah partikel bergerak dengan persamaan posisi $x(t) = 3t^2 - 12t + 5$ meter. Kapan partikel tersebut berhenti sesaat?",
        options: ["$t = 2$ detik", "$t = 3$ detik", "$t = 4$ detik", "$t = 0$ detik"],
        answer: 0
      },
      {
        question: "Berapa percepatan partikel dari fungsi $x(t) = 3t^2 - 12t + 5$?",
        options: ["$6 \\text{ m/s}^2$", "$12 \\text{ m/s}^2$", "$3 \\text{ m/s}^2$", "$0 \\text{ m/s}^2$"],
        answer: 0
      },
      {
        question: "Sebuah mobil bergerak dengan kecepatan konstan $10 \\text{ m/s}$ selama $5$ detik, lalu direm dengan perlambatan konstan $-2 \\text{ m/s}^2$ sampai berhenti. Berapa jarak totalnya?",
        options: ["$50$ meter", "$25$ meter", "$75$ meter", "$100$ meter"],
        answer: 2
      },
      {
        question: "Grafik $v-t$ sebuah benda berbentuk segitiga sama kaki dengan alas waktu $t=0$ sampai $t=4$, dan puncak kecepatan $v=10$. Berapa perpindahannya?",
        options: ["$10$ m", "$20$ m", "$40$ m", "$5$ m"],
        answer: 1
      },
      {
        question: "Jika kecepatan adalah turunan pertama dari posisi $v = \\frac{dx}{dt}$, maka besaran apakah yang merupakan turunan pertama dari percepatan $\\frac{da}{dt}$?",
        options: ["Jerk (Sentakan)", "Impuls", "Momentum", "Momentum Sudut"],
        answer: 0
      },
      // 5 New Questions for Remedial
      {
        question: "Suatu partikel memiliki persamaan kecepatan $v(t) = 4t - 8$. Pada detik ke berapa partikel tersebut berbalik arah?",
        options: ["$t = 4$ detik", "$t = 8$ detik", "$t = 2$ detik", "$t = 1$ detik"],
        answer: 2
      },
      {
        question: "Jika diketahui fungsi percepatan $a(t) = 6t$. Jika pada $t=0$, $v_0 = 2 \\text{ m/s}$, berapakah persamaan kecepatannya $v(t)$?",
        options: ["$v(t) = 3t^2 + 2$", "$v(t) = 6t^2 + 2$", "$v(t) = 3t^2$", "$v(t) = 6t + 2$"],
        answer: 0
      },
      {
        question: "Luas daerah di bawah kurva grafik percepatan terhadap waktu ($a-t$) mewakili besaran apa?",
        options: ["Perpindahan ($\\Delta x$)", "Perubahan Kecepatan ($\\Delta v$)", "Jarak Total", "Kecepatan Sesaat"],
        answer: 1
      },
      {
        question: "Sebuah kereta bergerak dengan kecepatan $72 \\text{ km/jam}$. Karena ada sapi melintas, masinis mengerem dengan perlambatan $4 \\text{ m/s}^2$. Berapa jarak henti kereta tersebut?",
        options: ["$100$ m", "$400$ m", "$50$ m", "$25$ m"],
        answer: 2
      },
      {
        question: "Persamaan $x(t) = \\int v(t) dt$ menunjukkan bahwa posisi adalah anti-turunan dari kecepatan. Syarat penting saat melakukan integral tak tentu ini adalah menambahkan...",
        options: ["Konstanta gravitasi ($g$)", "Konstanta kecepatan awal ($v_0$)", "Konstanta posisi awal ($x_0$)", "Konstanta waktu ($t_0$)"],
        answer: 2
      }
    ]
  },
  {
    title: "Latihan Soal: Memecahkan SPLDV Kinematika", // Bagian 2
    questions: [
      {
        question: "Dua mobil A dan B berjarak $100$ meter saling berhadapan. Mobil A bergerak ke kanan dengan kecepatan konstan $10 \\text{ m/s}$. Mobil B ke kiri dengan kecepatan konstan $15 \\text{ m/s}$. Kapan mereka berpapasan?",
        options: ["$t = 2$ detik", "$t = 4$ detik", "$t = 5$ detik", "$t = 10$ detik"],
        answer: 1
      },
      {
        question: "Batu dijatuhkan bebas (GJB) ke dalam sumur sedalam $20$ meter. Jika $g = 10 \\text{ m/s}^2$, berapa lama batu sampai di dasar sumur?",
        options: ["$1$ detik", "$2$ detik", "$3$ detik", "$4$ detik"],
        answer: 1
      },
      {
        question: "Sebuah panah ditembakkan lurus ke atas dengan kecepatan awal $30 \\text{ m/s}$. Berapa tinggi maksimum yang dicapai panah tersebut? ($g = 10 \\text{ m/s}^2$)",
        options: ["$30$ meter", "$45$ meter", "$60$ meter", "$90$ meter"],
        answer: 1
      },
      {
        question: "Di puncak lintasannya (tinggi maksimum), berapa percepatan benda yang dilempar vertikal ke atas?",
        options: ["Nol", "$10 \\text{ m/s}^2$ ke atas", "$10 \\text{ m/s}^2$ ke bawah", "Bergantung massanya"],
        answer: 2
      },
      {
        question: "Pencuri berlari dengan kecepatan konstan $8 \\text{ m/s}$. Tiga detik kemudian, polisi mengejar dari tempat yang sama dengan kecepatan konstan $10 \\text{ m/s}$. Berapa jarak yang ditempuh polisi saat berhasil menangkap pencuri?",
        options: ["$80$ meter", "$100$ meter", "$120$ meter", "$150$ meter"],
        answer: 2
      },
      // 5 New Questions for Remedial
      {
        question: "Sebuah bola dilemparkan vertikal ke bawah dari atap gedung dengan kecepatan awal $5 \\text{ m/s}$. Jika tiba di tanah dalam $2$ detik, berapakah tinggi gedung tersebut? ($g = 10 \\text{ m/s}^2$)",
        options: ["$30$ m", "$20$ m", "$10$ m", "$25$ m"],
        answer: 0
      },
      {
        question: "Dua kelereng A dan B dijatuhkan dari ketinggian yang berbeda. Ketinggian A adalah $4$ kali ketinggian B ($h_A = 4 h_B$). Berapakah perbandingan waktu jatuh mereka ($t_A : t_B$)?",
        options: ["$4 : 1$", "$2 : 1$", "$16 : 1$", "$1 : 2$"],
        answer: 1
      },
      {
        question: "Jika sebuah benda dilempar ke atas dengan kecepatan $v_0$ dan kembali ke tangan pelempar setelah $6$ detik. Berapakah $v_0$ tersebut? ($g = 10 \\text{ m/s}^2$)",
        options: ["$60 \\text{ m/s}$", "$15 \\text{ m/s}$", "$30 \\text{ m/s}$", "$45 \\text{ m/s}$"],
        answer: 2
      },
      {
        question: "Pencuri kabur dengan mobil berkecepatan $20 \\text{ m/s}$. Mobil patroli polisi yang diam langsung mengejar dengan percepatan konstan $2 \\text{ m/s}^2$. Kapan polisi berhasil menyusul pencuri?",
        options: ["$10$ detik", "$20$ detik", "$15$ detik", "$5$ detik"],
        answer: 1
      },
      {
        question: "Pada persamaan posisi benda jatuh bebas $h = \\frac{1}{2}gt^2$, grafik fungsi $h$ terhadap $t$ (posisi terhadap waktu) berbentuk kurva apa?",
        options: ["Garis Lurus Linear", "Eksponensial", "Parabola (Kuadratik)", "Logaritmik"],
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
      console.log(`Updated CBT Soal (10 Soal + LaTeX): ${mod.title}`);
    }
  }

  console.log("CBT Quizzes updated successfully!");
}

main().finally(() => prisma.$disconnect());
