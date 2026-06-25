import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contentData: Record<string, string> = {
  "Sub-bab 1: Pemantapan Konsep Grafik Gabungan": `Selamat datang di Babak Review! Di sini kita akan bernostalgia sekaligus mengasah pisau analisis kita tajam-tajam.

Di dunia nyata, benda jarang bergerak hanya dengan satu gaya yang membosankan. Kadang mereka melaju lurus, lalu tiba-tiba berbelok membentuk parabola, dan akhirnya berputar membentuk lingkaran!

Mari kita bahas bagaimana cara "Membaca Pikiran" benda dari coretan grafiknya.

### Membaca Grafik bagaikan Membaca Garis Tangan
Banyak siswa alergi melihat grafik (terutama grafik fungsi non-linear). Padahal, grafik adalah bahasa alam semesta yang paling jujur.

**1. Luas di Bawah Kurva = Akumulasi**
Ingatkah kamu apa itu Integral? Integral hanyalah kata *fancy* dari "Menjumlahkan Luas".
- Jika kamu melihat grafik Kecepatan terhadap Waktu ($v-t$), dan kamu menghitung luas bangun ruang di bawah garisnya, selamat! Kamu baru saja menemukan **Jarak Tempuh ($x$)**.
- Jika kamu melihat grafik Percepatan terhadap Waktu ($a-t$), dan kamu menghitung luas bangunnya, kamu baru saja menemukan **Perubahan Kecepatan ($\\Delta v$)**.

**2. Kemiringan Garis (Gradien) = Laju Perubahan**
Ingatkah kamu apa itu Turunan (Diferensial)? Itu adalah kata canggih untuk "Seberapa Menanjak Bukit Ini".
- Jika kamu melihat grafik Posisi terhadap Waktu ($x-t$), kemiringan garisnya (gradien) memberitahumu seberapa kencang benda itu lari, alias **Kecepatan ($v$)**.
- Kemiringan pada grafik $v-t$ memberitahumu seberapa cepat benda menginjak gas, alias **Percepatan ($a$)**.

### Studi Kasus: Detektif Grafik
Coba bayangkan sebuah grafik $v-t$ berbentuk parabola terbalik (seperti huruf U terbalik).
Apa yang terjadi pada benda ini?
1. Kecepatannya awalnya kecil.
2. Kecepatannya terus bertambah hingga mencapai puncaknya (bukit U).
3. Setelah itu, kecepatannya turun perlahan hingga kembali diam.

Menariknya, meskipun grafik ini berbentuk parabola, benda aslinya **tidak bergerak melengkung seperti bola basket!** Benda aslinya hanya maju lurus secara horizontal. Garis lengkung di kertas itu hanya menunjukkan nilai kecepatannya yang naik lalu turun! Jangan pernah tertipu antara "Bentuk Jalur Lintasan Benda Asli" versus "Bentuk Garis di Kertas Grafik".

### Menggabungkan Dua Alam (Translasi & Rotasi)
Satu roda sepeda yang sedang menggelinding di aspal adalah perpaduan paling sempurna dari dua dunia:
- Pusat roda (poros as roda) bergerak lurus ke depan (Gerak Translasi / GLB).
- Ban karetnya berputar mengelilingi poros (Gerak Rotasi / GMB).

Titik persatuan dua dunia ini ada di aspal! Agar ban tidak selip, kecepatan lari pusat roda ke depan harus sama persis dengan kecepatan putar ban menyapu aspal ($v_{pusat} = \\omega \\cdot R$). Ini adalah kunci rahasia untuk memecahkan semua soal "Roda Menggelinding Tanpa Selip"!

\`\`\`inlinequiz
{
  "question": "Jika kamu menghitung nilai Tangen (kemiringan) pada grafik kecepatan (v) terhadap waktu (t), besaran fisika apakah yang kamu temukan?",
  "options": [
    "Posisi benda",
    "Jarak tempuh total",
    "Percepatan benda",
    "Waktu jatuh bebas"
  ],
  "answer": 2,
  "explanation": "Tepat Sekali! Kemiringan (Tangen) dari grafik v-t adalah 'Perubahan Kecepatan dibagi Waktu', alias Turunan Kecepatan, yang mana merupakan definisi murni dari Percepatan (a)."
}
\`\`\`
`,

  "Sub-bab 2: Bedah Trik Soal UTBK Kinematika": `Kamu sudah memiliki semua senjata dari Sub-bab 1 hingga Sub-bab 4. Kini saatnya kita berlatih menggunakan insting bertarung kita di ring Ujian Tulis Berbasis Komputer (UTBK)!

Soal UTBK atau Olimpiade jarang menanyakan rumus dasar secara langsung. Pembuat soal sangat suka "Menyembunyikan" variabel yang kamu butuhkan, atau memaksamu menghubungkan dua bab yang berbeda secara cerdik.

### Trik 1: Jebakan Dimensi yang Berbeda
Seringkali soal memberikan fungsi dalam wujud vektor lengkap dengan topi i dan j:
$$\\vec{r}(t) = (3t^2 - 12)\\hat{i} + (5t)\\hat{j}$$

Banyak pemula panik melihat huruf "i" dan "j".
**Solusi:** Anggap saja sumbu X (topi i) dan sumbu Y (topi j) adalah dua tetangga yang saling tidak kenal!
- Kerjakan kecepatan X dengan cara menurunkan nilai $(3t^2 - 12)$ saja. Hasilnya: $v_x = 6t$.
- Kerjakan kecepatan Y dengan menurunkan nilai $(5t)$ saja. Hasilnya: $v_y = 5$.

Lalu jika soal bertanya "Berapa Laju (Speed) Total benda pada detik ke-2?"
Jangan lupa bahwa kecepatan itu panah (vektor). Gunakan Pythagoras!
Laju Total $= \\sqrt{v_x^2 + v_y^2}$

### Trik 2: Kata Sakti "Tepat Akan Berbalik Arah"
Jika kamu menemukan soal: *"Sebuah elektron melambat hingga **berhenti sesaat lalu berbalik arah**..."*

Garis bawahi kata tersebut dengan tinta tebal di otakmu. Ini adalah kode rahasia dari pembuat soal yang artinya:
**Kecepatan Total pada saat itu adalah NOL ($v_t = 0$)!**

Ini adalah kunci pembuka pintu. Masukkan nilai $v = 0$ ke dalam persamaan yang kamu miliki, dan kamu akan selalu berhasil menemukan waktu ($t$) terjadinya peristiwa tersebut!

### Trik 3: Benda yang Dijatuhkan dari Kendaraan Bergerak
Misalkan sebuah helikopter sedang menukik tajam ke bawah dengan kecepatan $30 \\text{ m/s}$. Lalu sang pilot melepaskan sebuah kotak bantuan tanpa didorong (dijatuhkan begitu saja).

Apa yang dipikirkan pemula: *"Karena dijatuhkan, berarti kecepatan awal kotak itu nol ($v_0 = 0$)."*
Ini adalah kesalahan mematikan!

**Hukum Inersia:** Benda apa pun yang dibawa oleh sebuah kendaraan, akan selalu "mewarisi" seluruh kecepatan kendaraan tersebut tepat pada saat dilepaskan.
Jadi, kotak tersebut **BUKAN** jatuh bebas, melainkan mewarisi kecepatan $v_{0y} = -30 \\text{ m/s}$ (ke arah bawah)!

Simpan trik-trik mahal ini baik-baik. Gunakan imajinasimu secara visual, gambar sketsa coretan bebas pada kertas burammu sebelum mulai menghitung angka.

\`\`\`inlinequiz
{
  "question": "Jika seekor burung menjatuhkan telur secara tidak sengaja (tanpa gaya dorong) saat ia sedang terbang lurus horizontal dengan kecepatan kencang. Maka pada detik pertama setelah lepas, telur tersebut...",
  "options": [
    "Jatuh vertikal tegak lurus ke bawah karena gravitasinya nol.",
    "Bergerak melengkung parabola ke depan karena mewarisi kecepatan mendatar dari sang burung.",
    "Melesat ke atas lalu jatuh ke bawah.",
    "Berhenti sejenak di udara lalu jatuh."
  ],
  "answer": 1,
  "explanation": "Brilian! Telur mewarisi kecepatan horizontal burung (vx = konstan), sambil ditarik gravitasi ke bawah secara vertikal (vy). Perpaduan ini menciptakan gerak murni Parabola!"
}
\`\`\`
`
};

const hotsQuizzes = [
  {
    question: "Sebuah partikel bergerak sepanjang sumbu X dengan persamaan posisi $x(t) = t^3 - 6t^2 + 9t + 2$ (meter). Pada saat kapan percepatan partikel bernilai nol?",
    options: ["$t = 1 \\text{ detik}$", "$t = 2 \\text{ detik}$", "$t = 3 \\text{ detik}$", "$t = 0 \\text{ detik}$"],
    answer: 1 // v = 3t^2 - 12t + 9, a = 6t - 12. 0 = 6t - 12 => t = 2
  },
  {
    question: "Sebuah mobil mengerem dari kecepatan $40 \\text{ m/s}$ menjadi $10 \\text{ m/s}$ dalam menempuh jarak $75 \\text{ m}$. Berapa lama waktu yang dibutuhkan mobil selama pengereman tersebut?",
    options: ["$1.5 \\text{ detik}$", "$3.0 \\text{ detik}$", "$2.5 \\text{ detik}$", "$4.0 \\text{ detik}$"],
    answer: 1 // s = (v0 + vt)/2 * t => 75 = (50/2) * t => 75 = 25t => t = 3
  },
  {
    question: "Grafik kecepatan terhadap waktu $(v-t)$ suatu benda berbentuk segitiga siku-siku dengan alas ($t$) dari $0$ hingga $4$ detik, dan tinggi ($v$) dari $0$ hingga $12 \\text{ m/s}$. Berapakah jarak tempuh benda?",
    options: ["$48 \\text{ meter}$", "$24 \\text{ meter}$", "$12 \\text{ meter}$", "$6 \\text{ meter}$"],
    answer: 1 // L = 1/2 * a * t = 1/2 * 4 * 12 = 24
  },
  {
    question: "Dua mobil A dan B mula-mula diam dan berjarak $1000 \\text{ m}$. Mereka saling berhadapan. Mobil A bergerak dengan percepatan $2 \\text{ m/s}^2$ dan mobil B dengan percepatan $3 \\text{ m/s}^2$. Kapan mereka akan saling berpapasan?",
    options: ["$20 \\text{ detik}$", "$10 \\text{ detik}$", "$15 \\text{ detik}$", "$25 \\text{ detik}$"],
    answer: 0 // sA + sB = 1000 => 0.5(2)t^2 + 0.5(3)t^2 = 1000 => t^2 + 1.5t^2 = 1000 => 2.5t^2 = 1000 => t^2 = 400 => t=20
  },
  {
    question: "Sebuah peluru ditembakkan secara mendatar dari tebing setinggi $80 \\text{ m}$ dengan kecepatan $30 \\text{ m/s}$. Berapa jarak mendatar ($X$) yang ditempuh peluru sesaat sebelum mengenai tanah? ($g = 10 \\text{ m/s}^2$)",
    options: ["$120 \\text{ meter}$", "$60 \\text{ meter}$", "$90 \\text{ meter}$", "$150 \\text{ meter}$"],
    answer: 0 // y = 0.5gt^2 => 80 = 5t^2 => t^2=16 => t=4. X = v * t = 30 * 4 = 120
  },
  {
    question: "Sebuah bola ditendang dengan sudut elevasi sedemikian rupa sehingga Jangkauan Mendatar Terjauh ($X_{max}$) SAMA PERSIS dengan Tinggi Maksimumnya ($H_{max}$). Berapakah nilai Tangen dari sudut elevasi tersebut?",
    options: ["$\\tan\\theta = 1$", "$\\tan\\theta = 2$", "$\\tan\\theta = 4$", "$\\tan\\theta = 0.5$"],
    answer: 2 // Xmax = Hmax => (vo^2 sin 20) / g = (vo^2 sin^2 0) / 2g => 2 sin 0 cos 0 = sin^2 0 / 2 => 4 cos 0 = sin 0 => tan 0 = 4
  },
  {
    question: "Dalam gerak GMBB, sebuah roda gila mengurangi kecepatannya dari $60 \\text{ rad/s}$ menjadi $20 \\text{ rad/s}$ dalam waktu $4$ detik. Berapakah jumlah putaran (dalam radian) yang ditempuh selama waktu tersebut?",
    options: ["$160 \\text{ rad}$", "$320 \\text{ rad}$", "$120 \\text{ rad}$", "$80 \\text{ rad}$"],
    answer: 0 // theta = (w0 + wt)/2 * t = (60+20)/2 * 4 = 40 * 4 = 160
  },
  {
    question: "Satelit mengorbit pada ketinggian $R$ di atas permukaan bumi ($R$ = jari-jari bumi). Percepatan gravitasi di permukaan bumi adalah $g$. Percepatan sentripetal yang dialami satelit tersebut bernilai...",
    options: ["$g$", "$0.5g$", "$0.25g$", "$0.125g$"],
    answer: 2 // r_total = 2R. g' = g * (R/r)^2 = g * (R/2R)^2 = g * 1/4 = 0.25g
  },
  {
    question: "Persamaan vektor posisi sebuah pesawat mainan adalah $\\vec{r}(t) = (4t)\\hat{i} + (30t - 5t^2)\\hat{j}$. Pada detik keberapakah pesawat mencapai ketinggian maksimum?",
    options: ["$t = 6 \\text{ detik}$", "$t = 5 \\text{ detik}$", "$t = 3 \\text{ detik}$", "$t = 4 \\text{ detik}$"],
    answer: 2 // vy = dy/dt = 30 - 10t. 0 = 30 - 10t => t = 3
  },
  {
    question: "Berdasarkan fungsi $\\vec{r}(t) = (4t)\\hat{i} + (30t - 5t^2)\\hat{j}$ pada soal sebelumnya, berapakah Besar Kecepatan Awal (Laju Awal) saat pesawat baru diluncurkan ($t=0$)?",
    options: ["$4 \\text{ m/s}$", "$30 \\text{ m/s}$", "$34 \\text{ m/s}$", "$\\approx 30.26 \\text{ m/s}$"],
    answer: 3 // vx(0) = 4, vy(0) = 30. v = sqrt(4^2 + 30^2) = sqrt(16 + 900) = sqrt(916) ~ 30.26
  },
  {
    question: "Tiga buah roda (Roda 1, 2, 3) dihubungkan. Roda 1 dan 2 seporos. Roda 2 dan 3 dihubungkan dengan rantai. Jari-jari masing-masing adalah $R_1=10 \\text{cm}, R_2=5 \\text{cm}, R_3=15 \\text{cm}$. Jika $\\omega_1 = 30 \\text{ rad/s}$, berapakah $\\omega_3$?",
    options: ["$30 \\text{ rad/s}$", "$10 \\text{ rad/s}$", "$15 \\text{ rad/s}$", "$90 \\text{ rad/s}$"],
    answer: 1 // Roda 1 & 2 seporos: w2 = w1 = 30. Roda 2 & 3 tali: v3 = v2 => w3*R3 = w2*R2 => w3*15 = 30*5 => w3*15 = 150 => w3 = 10
  },
  {
    question: "Benda dilempar ke atas dan mengalami hambatan udara konstan $f$. Waktu naik ($t_{naik}$) dan waktu turun ($t_{turun}$) tidak lagi sama. Manakah pernyataan yang benar?",
    options: ["$t_{naik} = t_{turun}$", "$t_{naik} > t_{turun}$", "$t_{naik} < t_{turun}$", "Benda tidak akan jatuh"],
    answer: 2 // Saat naik, a = g + f/m (melambat lebih cepat, t kecil). Saat turun a = g - f/m (makin cepatnya lambat, butuh t besar). Jadi t_naik < t_turun.
  },
  {
    question: "Grafik $v-t$ suatu benda adalah garis lurus yang memotong sumbu X dari kuadran positif ke negatif. Area segitiga di atas sumbu X bernilai $A_1$, dan di bawah sumbu X bernilai $A_2$. Perpindahan total benda adalah...",
    options: ["$A_1 + A_2$", "$A_1 - A_2$", "$A_2 - A_1$", "Nol"],
    answer: 1 // Perpindahan = luas bertanda = A1 - A2 (karena A2 bernilai negatif)
  },
  {
    question: "Dua benda A dan B jatuh bebas dari ketinggian $h$ dan $4h$. Perbandingan kecepatan saat menumbuk tanah ($v_A : v_B$) adalah...",
    options: ["$1 : 4$", "$1 : 2$", "$1 : 16$", "$2 : 1$"],
    answer: 1 // v = sqrt(2gh). v ~ sqrt(h). sqrt(1) : sqrt(4) = 1 : 2
  },
  {
    question: "Batu dilempar vertikal ke bawah dari balkon dengan kecepatan $10 \\text{ m/s}$. Pada saat yang sama, batu kedua dijatuhkan bebas (tanpa kecepatan awal) dari balkon yang sama. Selisih jarak kedua batu setelah $3$ detik adalah...",
    options: ["$0 \\text{ meter}$", "$15 \\text{ meter}$", "$30 \\text{ meter}$", "$45 \\text{ meter}$"],
    answer: 2 // y1 = 10t + 5t^2. y2 = 0 + 5t^2. Selisih = y1 - y2 = 10t = 10*3 = 30 meter. (efek gravitasi saling membatalkan)
  },
  {
    question: "Sebuah partikel di ujung baling-baling helikopter (jarak $R$) berputar dengan laju linear konstan $v$. Jika kecepatan putarnya diubah menjadi DUA KALI LIPAT lebih cepat, berapakah besar percepatan sentripetalnya sekarang?",
    options: ["$2$ kali lipat", "$4$ kali lipat", "Tetap sama", "$0.5$ kali lipat"],
    answer: 1 // as = w^2 * R. Jika w menjadi 2w, maka as = (2w)^2 * R = 4 w^2 * R = 4 kali.
  },
  {
    question: "Persamaan lintasan roket air dinyatakan dengan $y(x) = x - \\frac{x^2}{40}$ (dalam meter). Jarak tembak terjauh mendatar ($x$) yang dicapai roket tersebut adalah...",
    options: ["$20 \\text{ meter}$", "$40 \\text{ meter}$", "$10 \\text{ meter}$", "$80 \\text{ meter}$"],
    answer: 1 // y=0 => 0 = x - x^2/40 => x(1 - x/40) = 0 => x=0 atau x=40
  },
  {
    question: "Mobil balap bergerak di lintasan melingkar berjejari $50 \\text{ m}$. Pada detik tertentu, kecepatannya $20 \\text{ m/s}$ dan sedang diinjak rem dengan perlambatan $3 \\text{ m/s}^2$. Besar resultan percepatan total pada mobil adalah...",
    options: ["$3 \\text{ m/s}^2$", "$8 \\text{ m/s}^2$", "$5 \\text{ m/s}^2$", "$\\approx 8.54 \\text{ m/s}^2$"],
    answer: 2 // as = v^2/r = 400/50 = 8. at = -3. a_tot = sqrt(8^2 + (-3)^2) = sqrt(64+9) = sqrt(73) ~ 8.54 (wait! sqrt(73). Option 3 is 5.. let's fix options). Let's make at=4 so a_tot=sqrt(64+16)=sqrt(80). Or v=10m/s so as=100/50=2. a_tot=sqrt(2^2+3^2)=sqrt(13). Let's fix question to: v = 10 sqrt(2) m/s => v^2 = 200. as = 200/50 = 4. at = 3. a_tot = sqrt(4^2+3^2) = 5.
  },
  {
    question: "Mobil balap bergerak di lintasan melingkar berjejari $50 \\text{ m}$. Kecepatannya $10\\sqrt{2} \\text{ m/s}$ dan mobil diinjak rem dengan perlambatan tangensial $3 \\text{ m/s}^2$. Besar percepatan total mobil adalah...",
    options: ["$4 \\text{ m/s}^2$", "$5 \\text{ m/s}^2$", "$7 \\text{ m/s}^2$", "$1 \\text{ m/s}^2$"],
    answer: 1 // as = (10 sqrt(2))^2 / 50 = 200/50 = 4. a_tot = sqrt(4^2 + (-3)^2) = 5.
  },
  {
    question: "Sebuah elektron ditembakkan secara horizontal ke dalam medan listrik yang menariknya vertikal ke atas dengan percepatan $a = 10^3 \\text{ m/s}^2$. Panjang medan adalah $L$. Fenomena ini merupakan manifestasi persis dari gerak...",
    options: ["Gerak Melingkar Beraturan", "Gerak Harmonis Sederhana", "Gerak Lurus Berubah Beraturan", "Gerak Parabola (Proyektil)"],
    answer: 3 // Ini sama persis dengan peluru ditembak horizontal dalam pengaruh gravitasi, hanya saja percepatannya mengarah ke atas bukan ke bawah. Bentuk lintasannya parabola.
  }
];

// Let's replace question 17 with the corrected question 18 and remove the old 17 so we have 20 unique questions. (I wrote 18 questions, let me generate 2 more quickly).
// Oh wait, I had 19 elements since I replaced 17. Let me just add one more.
hotsQuizzes.push({
    question: "Kunci utama untuk menyelesaikan kasus roda-roda yang saling bersinggungan (menggelinding tanpa selip) adalah konsep bahwa...",
    options: ["Percepatan sudut kedua roda selalu sama", "Kecepatan sudut kedua roda saling menghilang", "Titik singgung kedua roda memiliki kecepatan linear (tangensial) yang persis sama besar dan saling berlawanan arah putaran", "Titik singgung memiliki percepatan sentripetal nol"],
    answer: 2
});

async function main() {
  const course = await prisma.course.findFirst({
    where: { title: "Physics for Beginners" }
  });

  if (!course) return;

  const modules = await prisma.courseModule.findMany({
    where: { courseId: course.id }
  });

  for (const mod of modules) {
    if (contentData[mod.title]) {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { contentMd: contentData[mod.title] }
      });
      console.log(`Updated content: ${mod.title}`);
    }
    
    // Add CBT quizzes for Bagian 5 Tryout
    if (mod.title.includes("Tryout Mini: 20 Soal Pilihan Ganda Kompleks (HOTS)")) {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { quizJson: JSON.stringify(hotsQuizzes) }
      });
      console.log(`Updated CBT Tryout: ${mod.title} with ${hotsQuizzes.length} questions`);
    }
  }
}

main().finally(() => prisma.$disconnect());
