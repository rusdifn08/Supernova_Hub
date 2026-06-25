import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contentData: Record<string, string> = {
  "Sub-bab 1: Prinsip Superposisi Gerak X dan Y": `Halo! Selamat datang di dunia 2 Dimensi. Sejauh ini, kita hanya belajar benda yang bergerak lurus maju-mundur (sumbu X) atau atas-bawah (sumbu Y). Tapi di dunia nyata, gerakan jarang sekali yang hanya lurus.

Pernahkah kamu bermain *Angry Birds*? Atau melempar bola basket ke dalam ring? Bola itu bergerak maju ke depan (sumbu X), tetapi pada saat yang bersamaan, ia juga terbang ke atas lalu jatuh ke bawah ditarik gravitasi (sumbu Y).

Gabungan dari dua gerakan inilah yang membentuk lintasan melengkung yang cantik, yang kita sebut sebagai **Gerak Parabola** atau **Gerak Peluru**.

### Rahasia Terbesar Kinematika 2D: "Prinsip Superposisi"

Rahasia untuk menyelesaikan *semua* soal gerak parabola sebenarnya sangat sederhana, dan ini sering kali disembunyikan oleh rumus-rumus rumit. Rahasianya adalah asas yang dicetuskan oleh Bapak Fisika kita, Galileo Galilei:

> **"Gerak pada sumbu X (horizontal) dan gerak pada sumbu Y (vertikal) itu saling cuek, merdeka, dan tidak memengaruhi satu sama lain sama sekali!"**

Artinya, apa yang terjadi pada gerakan maju-mundur tidak akan pernah mengganggu gerakan atas-bawah. Mereka hanya berbagi satu hal yang sama, yaitu: **Waktu ($t$)**.

Mari kita bedah satu per satu:

#### 1. Sumbu X (Maju ke Depan)
Di udara, apakah ada dorongan mesin roket yang menempel di bola basket? Tidak ada!
Apakah ada angin kencang yang mengerem bola? (Dalam fisika SMA, kita asumsikan tidak ada hambatan udara).
Karena tidak ada gaya tarik atau gaya dorong apa pun secara horizontal, maka tidak ada percepatan ($a_x = 0$).

Ingat Hukum I Newton? Benda yang tidak ditarik atau didorong akan mempertahankan kecepatannya. 
Artinya, **kecepatan maju bola selalu konstan (tetap) dari awal sampai akhir!**
Ini adalah **Gerak Lurus Beraturan (GLB)**.
Rumusnya sangat gampang, hanya ada satu:
$$x = v_x \cdot t$$

#### 2. Sumbu Y (Atas dan Bawah)
Sekarang lupakan gerakan maju. Fokus pada gerakan atas-bawah bola.
Saat bola melayang di udara, siapa bos yang selalu menariknya ke bawah? Betul, **Gravitasi Bumi** ($g$).
Karena ditarik gravitasi, kecepatannya selalu berubah-ubah. Saat naik ia makin lambat, saat turun ia makin cepat.
Artinya, di sumbu Y terjadi **Gerak Lurus Berubah Beraturan (GLBB)**.
Rumusnya adalah 3 rumus ajaib GLBB yang sudah kita pelajari:
1. $v_y = v_{0y} - g \cdot t$
2. $y = v_{0y} \cdot t - \\frac{1}{2}g \cdot t^2$
3. $v_y^2 = v_{0y}^2 - 2g \cdot y$

### Membongkar Kecepatan Awal ($v_0$)
Saat kamu melempar bola miring ke atas dengan sudut kemiringan $\\theta$ (dibaca: teta), kamu memberikan kecepatan gabungan (miring). 

Misalnya kecepatan miringnya adalah $v_0$. Kita tidak bisa langsung memasukkan $v_0$ ini ke dalam rumus GLB atau GLBB, karena dia miring! Kita harus "memecahnya" menjadi komponen X dan komponen Y menggunakan Trigonometri dasar (Segitiga Siku-siku).

- **Kecepatan Maju Awal ($v_{0x}$):** Sisi yang menempel di samping sudut $\\theta$. 
  Gunakan Cosinus! 
  $$v_{0x} = v_0 \cdot \\cos(\\theta)$$
- **Kecepatan Naik Awal ($v_{0y}$):** Sisi yang tegak lurus di depan sudut $\\theta$. 
  Gunakan Sinus!
  $$v_{0y} = v_0 \cdot \\sin(\\theta)$$

Selesai! Kamu sekarang memegang dua kunci penting: $v_{0x}$ untuk mengurus jarak mendatar, dan $v_{0y}$ untuk mengurus tinggi.

\`\`\`inlinequiz
{
  "question": "Sebuah peluru ditembakkan miring ke udara. Jika kita mengabaikan gesekan udara, manakah komponen kecepatan yang nilainya TIDAK PERNAH berubah dari awal peluru terbang sampai membentur tanah?",
  "options": [
    "Kecepatan Vertikal (Vy)",
    "Kecepatan Horizontal (Vx)",
    "Kecepatan Miring Total (V total)"
  ],
  "answer": 1,
  "explanation": "Tepat sekali! Kecepatan horizontal (Vx) selalu konstan (GLB) karena tidak ada tarikan gravitasi ke arah depan/belakang, sedangkan Vy akan terus berubah karena ditarik gravitasi."
}
\`\`\`
`,

  "Sub-bab 2: Rumus Tinggi Maksimum dan Jangkauan": `Sekarang mari kita menjadi detektif dan membuktikan dari mana datangnya rumus "Tinggi Maksimum" dan "Jangkauan Terjauh" yang sering diajarkan untuk dihafal di sekolah. 

Ingat, kita tidak akan menghafal. Kita akan menurunkannya dengan logika murni!

### 1. Mencari Waktu ke Puncak (Titik Tertinggi)
Bayangkan kamu melempar batu ke atas. Kapan batu itu berhenti naik dan mulai jatuh turun?
Tentu saja, saat **kecepatan naiknya habis!**

Artinya, **syarat mencapai titik tertinggi (puncak) adalah kecepatan vertikal sesaatnya sama dengan nol ($v_y = 0$).** Kecepatan majunya ($v_x$) tetap ada ya, makanya dia tidak jatuh lurus, tapi tetap melaju ke depan.

Mari kita ambil rumus kecepatan GLBB pada sumbu Y:
$$v_y = v_{0y} - g \cdot t$$
Kita tahu $v_{0y}$ adalah $v_0 \\sin(\\theta)$, mari kita ganti:
$$v_y = v_0 \\sin(\\theta) - g \cdot t$$

Karena syarat di puncak adalah $v_y = 0$, mari kita masukkan angka 0:
$$0 = v_0 \\sin(\\theta) - g \cdot t$$
Pindahkan $-g \cdot t$ ke ruas kiri (menjadi positif):
$$g \cdot t = v_0 \\sin(\\theta)$$
Untuk mencari waktu $t$ (kita sebut $t_{puncak}$), kita tinggal membagi kedua sisi dengan $g$:
**$$t_{puncak} = \\frac{v_0 \\sin(\\theta)}{g}$$**

*Wah, kamu baru saja menemukan rumus waktu ke puncak secara mandiri!*

### 2. Mencari Tinggi Maksimum ($H_{max}$ atau $Y_{max}$)
Sekarang kita sudah tahu berapa lama batu itu bisa sampai ke puncak. Lalu seberapa tinggi puncaknya?
Tinggi adalah posisi vertikal ($Y$). Mari kita ambil rumus posisi GLBB pada sumbu Y:
$$y = v_{0y} \cdot t - \\frac{1}{2}g \cdot t^2$$

Kita bisa memasukkan waktu $t_{puncak}$ ke dalam rumus ini. Tapi ada cara yang lebih cepat!
Gunakan rumus GLBB yang ketiga (yang tidak ada waktu $t$-nya):
$$v_y^2 = v_{0y}^2 - 2g \cdot y$$
Masukkan syarat di puncak ($v_y = 0$) dan $v_{0y} = v_0 \\sin(\\theta)$:
$$0^2 = (v_0 \\sin(\\theta))^2 - 2g \cdot Y_{max}$$
$$0 = v_0^2 \\sin^2(\\theta) - 2g \cdot Y_{max}$$
Pindahkan $-2g \cdot Y_{max}$ ke kiri:
$$2g \cdot Y_{max} = v_0^2 \\sin^2(\\theta)$$
Bagi kedua sisi dengan $2g$:
**$$Y_{max} = \\frac{v_0^2 \\sin^2(\\theta)}{2g}$$**

Ini dia rumus tinggi maksimum! Mudah kan?

### 3. Mencari Jangkauan Terjauh / Jarak Jatuh ($X_{max}$)
Berapa jarak mendatar bola sampai menyentuh tanah?
Pertama, kita harus tahu berapa total waktu bola berada di udara ($t_{total}$).
Karena lintasan parabola itu simetris (waktu naik sama dengan waktu turun), maka:
$$t_{total} = 2 \\times t_{puncak}$$
$$t_{total} = \\frac{2 v_0 \\sin(\\theta)}{g}$$

Jarak mendatar bekerja di sumbu X. Sumbu X adalah GLB! Rumusnya hanya:
$$x = v_{0x} \cdot t$$
Ganti $v_{0x}$ dengan $v_0 \\cos(\\theta)$ dan $t$ dengan $t_{total}$:
$$X_{max} = (v_0 \\cos(\\theta)) \cdot \\left( \\frac{2 v_0 \\sin(\\theta)}{g} \\right)$$
Kita kalikan $v_0$ dengan $v_0$ menjadi $v_0^2$, lalu gabungkan sisanya:
$$X_{max} = \\frac{v_0^2 \cdot (2 \\sin(\\theta) \\cos(\\theta))}{g}$$

Di pelajaran Matematika Trigonometri, ada identitas sakti: $2 \\sin(\\theta) \\cos(\\theta) = \\sin(2\\theta)$. Mari kita ganti agar lebih ringkas:
**$$X_{max} = \\frac{v_0^2 \\sin(2\\theta)}{g}$$**

Selesai! Kamu sekarang tidak perlu menghafal secara buta. Jika kamu lupa rumus saat ujian, turunkan saja sendiri dengan prinsip Superposisi!

\`\`\`inlinequiz
{
  "question": "Seorang anak melempar bola basket ke ring. Untuk mencari *waktu* saat bola mencapai titik tertinggi, syarat fisis apa yang harus dipenuhi?",
  "options": [
    "Kecepatan total (V total) harus sama dengan nol",
    "Kecepatan maju (Vx) harus sama dengan nol",
    "Kecepatan vertikal (Vy) harus sama dengan nol"
  ],
  "answer": 2,
  "explanation": "Benar! Titik tertinggi dicapai saat bola kehabisan dorongan vertikalnya, sehingga Vy sesaat bernilai 0, sebelum akhirnya bola berbalik mulai bergerak turun."
}
\`\`\`
`,

  "Sub-bab 1: Konsep Posisi, Kecepatan, Percepatan Sudut": `Selamat datang di **Gerak Melingkar**!
Setelah kita lelah bermain dengan lemparan bola lurus dan lengkung, sekarang mari kita naik Bianglala (Kincir Ria) atau komedi putar.

Dalam gerak lurus, kita mengukur jarak dalam satuan meter ($m$). Tetapi bayangkan sebuah baling-baling helikopter yang sedang berputar. Apakah masuk akal jika kita bertanya "Berapa meter baling-baling ini bergerak?"
Tidak! Karena baling-baling itu tidak ke mana-mana, dia tetap di tempat. Dia hanya **berputar**.

Oleh karena itu, dalam Gerak Melingkar, kita tidak lagi menggunakan besaran linier (meter), melainkan besaran sudut / putaran (derajat atau radian).

### 1. Posisi Sudut ($\\theta$)
Jika dalam gerak lurus posisi disimbolkan dengan $x$ (meter), dalam gerak melingkar posisinya disimbolkan dengan $\\theta$ (dibaca: teta), yang artinya seberapa besar sudut yang telah disapu benda.
Satuannya yang standar dalam SI bukanlah Derajat, melainkan **Radian (rad)**.

> **1 Putaran Penuh (360 derajat) = $2\\pi$ Radian**

*(Catatan: $\\pi$ atau pi adalah konstanta matematika yang nilainya sekitar 3.14. Jadi 1 putaran penuh = sekitar 6.28 radian).*

### 2. Kecepatan Sudut ($\\omega$)
Dalam gerak lurus, kecepatan (v) adalah "berapa meter yang ditempuh setiap detik".
Maka analoginya sangat logis, **Kecepatan Sudut** adalah "berapa sudut (radian) yang disapu setiap detik". 

Simbolnya adalah huruf Yunani omega kecil ($\\omega$), terlihat mirip seperti huruf 'w' melengkung.
Rumus dasarnya sama persis dengan GLB ($v = x/t$), tinggal kita ganti bajunya:
$$\\omega = \\frac{\\Delta\\theta}{t}$$
Satuannya adalah **rad/s**. 

Kadang-kadang, soal di ujian suka iseng menggunakan satuan "rpm" (Rotasi per Menit atau Putaran per Menit). 
Jangan panik! Coba kita pecahkan bersama. Bagaimana cara mengubah 1 rpm ke rad/s?
- 1 Rotasi (putaran) = $2\\pi$ rad
- 1 Menit = $60$ detik
- Jadi, $1 \\text{ rpm} = \\frac{2\\pi \\text{ rad}}{60 \\text{ s}} = \\frac{\\pi}{30} \\text{ rad/s}$. Mudah kan?

### 3. Percepatan Sudut ($\\alpha$)
Jika bianglala yang diam tiba-tiba mulai berputar makin lama makin cepat, berarti dia mengalami **Percepatan Sudut** (percepatan putar).
Simbolnya adalah alpha ($\\alpha$).
Sama seperti gerak lurus ($a = \\Delta v / t$), di sini rumusnya adalah:
$$\\alpha = \\frac{\\Delta\\omega}{t}$$
Satuannya **rad/s²**.

\`\`\`inlinequiz
{
  "question": "Sebuah kipas angin sedang berputar dengan kecepatan 300 putaran per menit (rpm). Besaran fisis apakah '300 rpm' ini?",
  "options": [
    "Posisi Sudut",
    "Kecepatan Sudut",
    "Percepatan Sudut"
  ],
  "answer": 1,
  "explanation": "Tepat! RPM adalah kecepatan sudut (seberapa cepat dia menyapu putaran dalam satu menit), bukan seberapa jauh dia memutar (posisi sudut) atau seberapa cepat putarannya bertambah (percepatan sudut)."
}
\`\`\`
`,

  "Sub-bab 2: Analogi Persamaan GMBB dan GLBB": `Ini adalah salah satu materi yang paling ditakuti oleh murid SMA. Kenapa? Karena terlihat seperti harus menghafal banyak rumus baru dengan simbol-simbol aneh bahasa Yunani.

Tapi mari saya bisikkan rahasianya: **Kamu TIDAK PERLU menghafal satu rumus pun di bab ini!**

Gerak Melingkar Berubah Beraturan (GMBB) adalah **kembaran identik** dari Gerak Lurus Berubah Beraturan (GLBB). Rumus matematis mereka 100% sama persis strukturnya. Satu-satunya yang berbeda hanyalah huruf-huruf simbolnya yang di-"Translate" ke dalam bahasa putaran.

Mari kita buat kamus terjemahannya:
- Jarak Tempuh ($x$) $\\rightarrow$ Posisi Sudut ($\\theta$)
- Kecepatan ($v$) $\\rightarrow$ Kecepatan Sudut ($\\omega$)
- Percepatan ($a$) $\\rightarrow$ Percepatan Sudut ($\\alpha$)
- Waktu ($t$) $\\rightarrow$ Waktu ($t$) ... *(Waktu tidak pernah berubah!)*

### Mari Menerjemahkan 3 Rumus Ajaib GLBB

**Rumus GLBB 1 (Mencari Kecepatan Akhir):**
GLBB: $$v_t = v_0 + a \cdot t$$
Coba kamu ganti simbolnya sesuai kamus di atas. Apa hasilnya?
GMBB: **$$\\omega_t = \\omega_0 + \\alpha \cdot t$$**

**Rumus GLBB 2 (Mencari Jarak Tempuh):**
GLBB: $$x = v_0 \cdot t + \\frac{1}{2}a \cdot t^2$$
GMBB: **$$\\theta = \\omega_0 \cdot t + \\frac{1}{2}\\alpha \cdot t^2$$**

**Rumus GLBB 3 (Rumus Tanpa Waktu):**
GLBB: $$v_t^2 = v_0^2 + 2a \cdot x$$
GMBB: **$$\\omega_t^2 = \\omega_0^2 + 2\\alpha \cdot \\theta$$**

Luar biasa! Coba kamu perhatikan. Persamaannya sama persis, bentuknya, letak kuadratnya, sampai angka pecahannya. 
Inilah bukti betapa cantiknya ilmu Fisika. Konsep alam semesta itu berulang. Jika kamu memahami gerak lurus (translasi), kamu otomatis menguasai gerak berputar (rotasi).

### Kapan Kita Menggunakan Rumus Ini?
Misalkan ada soal: "Sebuah roda mesin berputar dengan kecepatan awal 10 rad/s. Lalu mesin dimatikan sehingga roda melambat ($\\alpha = -2 \\text{ rad/s}^2$). Berapa sudut yang ditempuh roda sebelum akhirnya diam total?"

Lihat kata kuncinya:
- Kecepatan awal ($\\omega_0$) = 10 rad/s
- Roda akhirnya "diam", artinya Kecepatan akhir ($\\omega_t$) = 0 rad/s
- Percepatan ($\\alpha$) = -2 rad/s²
- Ditanya Sudut ($\\theta$) = ?

Dalam soal ini tidak disebutkan Waktu ($t$). Jadi, kita gunakan Rumus 3 (Rumus tanpa waktu)!
$$\\omega_t^2 = \\omega_0^2 + 2\\alpha \cdot \\theta$$
$$0^2 = 10^2 + 2(-2) \cdot \\theta$$
$$0 = 100 - 4\\theta$$
Pindahkan $-4\\theta$ ke kiri menjadi $4\\theta$:
$$4\\theta = 100$$
Bagi dengan 4:
$$\\theta = 25 \\text{ radian}$$

Keren, kan? Semudah mengerjakan GLBB!

\`\`\`inlinequiz
{
  "question": "Jika pada GLBB, 'a' bernilai negatif berarti mobil sedang direm (melambat). Jika pada GMBB '\\alpha' bernilai negatif, apa makna fisisnya?",
  "options": [
    "Benda berputar ke arah yang berlawanan.",
    "Benda berhenti seketika.",
    "Putaran benda semakin lama semakin lambat."
  ],
  "answer": 2,
  "explanation": "Benar! Makna perlambatan di GLBB dan GMBB sama. Alpha negatif menunjukkan bahwa kecepatan putar benda semakin lambat hingga akhirnya akan diam (seperti kipas angin yang dicabut listriknya)."
}
\`\`\`
`
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
    if (contentData[mod.title]) {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { contentMd: contentData[mod.title] }
      });
      console.log(`Updated content: ${mod.title}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
