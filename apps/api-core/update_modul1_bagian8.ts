import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contentData: Record<string, string> = {
  "Sub-bab 1: Analisis Percepatan Mesin Atwood (Katrol Licin)": `Pernahkah kamu mengambil air dari sumur menggunakan timba? Ada tali yang melilit sebuah roda (katrol), di satu ujung ada ember berisi air berat, di ujung lain ada tanganmu yang menariknya. Rangkaian klasik ini disebut dengan **Mesin Atwood**.

Mesin Atwood adalah alat laboratorium paling sederhana yang diciptakan khusus untuk membuktikan Hukum II Newton. Dua benda dengan massa berbeda ($m_1$ dan $m_2$) digantungkan pada ujung-ujung seutas tali yang melewati sebuah katrol. 

### Perang Tarik Tambang Melewati Bukit
Bayangkan Mesin Atwood ini seperti perlombaan tarik tambang, tapi talinya dilemparkan melewati sebuah bukit (katrol).
- Benda 1 menarik tali ke bawah dengan kekuatan beratnya ($w_1$).
- Benda 2 menarik tali ke bawah di ujung satunya dengan kekuatan beratnya ($w_2$).

Siapa yang menang? Tentu saja benda yang massanya lebih berat!
Jika $m_2$ lebih berat daripada $m_1$, maka $m_2$ akan jatuh merosot ke bawah, sementara $m_1$ akan "terseret" naik ke atas.

### Trik Jenius 1: Membuka Lipatan Sistem
Ada cara panjang dan cara pendek untuk menyelesaikan soal ini. Cara pendeknya sangat jenius: **Buka lipatan katrolnya sehingga lintasannya menjadi lurus!**

Bayangkan tali katrol itu kamu "luruskan" secara mendatar di atas meja. 
- Benda 1 menarik ke arah **Kiri** sebesar $w_1$.
- Benda 2 menarik ke arah **Kanan** sebesar $w_2$.
- Karena $w_2 > w_1$, maka seluruh sistem kereta ini akan melaju ke arah **Kanan**.

Berapa gaya bersih yang menggerakkan sistem ini?
Gaya Penggerak = Gaya yang menang dikurangi Gaya yang kalah.
$\\Sigma F = w_2 - w_1$

Sekarang, siapa saja yang ikut "terseret" alias harus menanggung gaya tersebut? KEDUA-DUANYA! Tali tersebut menarik $m_1$ dan $m_2$ secara bersamaan. Maka massa total sistem adalah $(m_1 + m_2)$.

Mari kita masukkan ke rumus Hukum II Newton ($\\Sigma F = m_{total} \\cdot a$):
$$w_2 - w_1 = (m_1 + m_2) \\cdot a$$

Tinggal kita balik rumusnya untuk mencari nilai percepatan ($a$):
**$$a = \\frac{w_2 - w_1}{m_1 + m_2}$$**

Atau bisa ditulis:
**$$a = \\frac{(m_2 - m_1)g}{(m_1 + m_2)}$$**

Luar biasa! Kamu bisa menghitung percepatan sistem katrol hanya dalam SATU baris tanpa harus pusing menggambar banyak gaya tegang tali! 

### Misteri Tegang Tali ($T$)
Mengapa kita tadi tidak memasukkan Gaya Tegang Tali ($T$) ke dalam rumus $\\Sigma F$?
Karena pada tinjauan "Satu Sistem Utuh", gaya tali di ujung kiri saling membatalkan dengan gaya tali di ujung kanan (mereka adalah gaya internal)!

Lalu, bagaimana jika soal memintamu mencari nilai $T$?
Di sinilah kamu harus memakai kacamata kuda. **Fokus saja pada SALAH SATU BENDA.**
Misalnya, kita tutup mata dari benda 2, dan hanya menatap lekat-lekat pada Benda 1.
Benda 1 (yang ringan) sedang bergerak melesat NAIK ke atas. 
Artinya, tarikan Tali ($T$ ke atas) PASTI LEBIH KUAT daripada beratnya sendiri ($w_1$ ke bawah).
Maka, $\\Sigma F$ untuk Benda 1 adalah:
$$T - w_1 = m_1 \\cdot a$$
*(Percepatan $a$ ini kita ambil dari hasil hitungan "Satu Sistem Utuh" sebelumnya).*

Hanya dengan dua langkah ini, kamu bisa menaklukkan seluruh soal Mesin Atwood level manapun!

\`\`\`inlinequiz
{
  "question": "Jika dua benda di Mesin Atwood memiliki massa yang SAMA PERSIS (misal 5 kg dan 5 kg), berapakah percepatan sistem benda tersebut?",
  "options": [
    "10 m/s^2",
    "5 m/s^2",
    "Nol (0 m/s^2)",
    "Tidak terhingga"
  ],
  "answer": 2,
  "explanation": "Benar sekali! Karena m1 = m2, maka w1 = w2. Tarikan ke kiri sama dengan tarikan ke kanan. Hasil pertempurannya SERI (Sigma F = 0). Maka percepatannya nol, benda tersebut akan diam menggantung seimbang!"
}
\`\`\`
`,

  "Sub-bab 2: Sistem Balok Bertumpuk dan Gaya Gesek Penggerak": `Sekarang kita akan memasuki area yang paling sering menjebak siswa Olimpiade Fisika tingkat dasar: **Balok yang ditumpuk-tumpuk**.

Bayangkan sebuah balok besar (Balok Bawah) diletakkan di lantai. Lalu ada sebuah balok kecil (Balok Atas) diletakkan *di atas* Balok Bawah. Kamu kemudian mengikat tali dan menarik *Balok Bawah* ke depan dengan kuat.

Apa yang terjadi pada Balok Atas?
Ada dua kemungkinan:
1. Ia tetap menempel dan ikut maju bersama Balok Bawah.
2. Ia "tertinggal", lalu terpeleset jatuh ke belakang.

Apa yang membedakan kedua nasib ini? Jawabannya ada pada **Gaya Gesek Antar Balok**.

### Ironi Gaya Gesek: Pahlawan yang Mengerakkan Balok Atas
Tadi kita bilang gaya gesek adalah musuh pergerakan. Tapi anehnya, untuk Balok Atas, gaya gesek adalah satu-satunya alasan dia bisa ikut melaju maju!

Coba perhatikan baik-baik menggunakan Hukum I Newton (Inersia). 
Saat Balok Bawah ditarik kencang ke depan, Balok Atas yang pemalas sebenarnya HANYA INGIN DIAM di tempatnya. 
Karena Balok Bawah kabur ke depan, maka secara relatif seolah-olah Balok Atas ini *terpeleset ke belakang* punggung Balok Bawah. 
Karena arah *kecenderungan merosotnya* ke belakang, maka Permukaan Balok Bawah memberikan Gaya Gesek kepada Balok Atas ke arah **DEPAN** (mencegahnya merosot ke belakang).

Ya, kamu tidak salah dengar. **Gaya gesek yang dirasakan Balok Atas arahnya ke DEPAN!** Gaya gesek inilah yang bertindak sebagai mesin penarik ($\\Sigma F$) bagi Balok Atas sehingga ia bisa ikut berakselerasi maju.

Lalu bagaimana dengan Balok Bawah? 
Menurut Hukum III Newton (Aksi-Reaksi), karena ia sudah mendorong Balok Atas ke depan, maka Balok Atas membalas dengan menarik Balok Bawah ke **BELAKANG**. Jadi bagi Balok Bawah, gaya gesek antar-balok ini benar-benar terasa seperti beban tambahan yang mengeremnya.

### Kapankah Balok Atas Terpeleset?
Balok atas bisa ikut melaju maju karena ditarik oleh **Gaya Gesek Statis ($f_s$)**.
Namun, Gaya Gesek Statis punya batas maksimum ($f_{s,max} = \\mu_s \\cdot N_{atas}$). 

Gaya gesek statis ini harus mampu menyediakan percepatan ($a$) yang *sama besarnya* dengan percepatan tarikan tanganmu di bawah ($f_s = m_{atas} \\cdot a$).
Jika kamu menyentak Balok Bawah *terlalu kencang* (sehingga percepatan tarikanmu luar biasa besar), Balok Atas akan menuntut nilai gaya gesek ($f_s$) yang sangat besar untuk bisa menyamai percepatanmu.
Jika nilai yang dituntut melampaui kemampuan maksimalnya ($f_{s} > f_{s,max}$), maka pertahanan jebol! 

Pada detik itu juga, Balok Atas akan **TERPELESET** (selip). Gaya geseknya langsung berubah turun menjadi Gaya Gesek Kinetis ($f_k$), dan percepatan Balok Atas akan resmi tertinggal (lebih lambat) daripada percepatan Balok Bawah.

\`\`\`inlinequiz
{
  "question": "Jika permukaan antara Balok Atas dan Balok Bawah diolesi minyak super licin sehingga koefisien gesekannya mu = 0. Apa yang terjadi pada Balok Atas jika Balok Bawah ditarik ke depan secara tiba-tiba?",
  "options": [
    "Balok Atas akan ikut maju bersama Balok Bawah.",
    "Balok Atas akan tertinggal di titik koordinat aslinya, lalu jatuh ke bawah saat lantai pijakannya (Balok Bawah) habis.",
    "Balok Atas akan melesat lebih cepat mendahului Balok Bawah.",
    "Kedua balok tidak bisa ditarik sama sekali."
  ],
  "answer": 1,
  "explanation": "Pemahaman yang luar biasa! Karena gaya gesek (sang pahlawan yang menariknya ke depan) bernilai NOL, tidak ada gaya mendatar sama sekali pada Balok Atas (Sigma Fx = 0). Ia akan diam murni di ruang koordinat aslinya karena Inersia, lalu terjatuh vertikal bagaikan trik pesulap menarik taplak meja tanpa menjatuhkan piring di atasnya!"
}
\`\`\`
`,

  "Sub-bab 3: Penyelesaian Persamaan Gerak Simultan": `Di Fisika tingkat lanjut, pembuat soal tidak akan berbaik hati memberimu sistem benda yang bisa diselesaikan dengan "Trik Satu Sistem Utuh" yang kita pelajari di Sub-bab 1.

Terkadang, Benda 1 berada di lantai datar, Benda 2 menggantung, Benda 3 berada di bidang miring, dan ketiganya diikat dengan tali yang berbeda-beda! 
Di sinilah kita harus kembali ke akar yang paling murni: **Sistem Persamaan Linear Dua (atau Tiga) Variabel**.

### Teknik "Bongkar Pasang" (Membelah Sistem)
Kunci dari segala penyelesaian sistem benda terhubung yang kompleks adalah: JANGAN menganalisis sistem secara kesatuan. Bongkarlah sistem itu menjadi potongan-potongan balok yang berdiri sendiri!

**Langkah 1: Gambar FBD untuk Setiap Benda Secara Terpisah**
Isolasi Benda 1. Gambar $w, N, T_1$, dan $f$.
Isolasi Benda 2. Gambar $w, T_1, T_2$, dan lain-lain.

**Langkah 2: Tentukan Kesepakatan Arah Gerak (Penting!)**
Sebelum mulai membuat rumus, kamu harus menebak kemana sistem akan bergerak.
Misalnya, kamu menebak: "Benda 2 yang menggantung akan jatuh ke bawah, sehingga Benda 1 akan terseret ke kanan."
Maka, arah **BAWAH** adalah arah positif untuk Benda 2. Dan arah **KANAN** adalah arah positif untuk Benda 1.
Siapapun gaya yang searah gerak positif, berikan tanda Plus (+). Yang melawan, berikan tanda Minus (-).

**Langkah 3: Tulis Hukum II Newton ($\\Sigma F = ma$) untuk Tiap Benda**
Misal untuk Benda 1 yang terseret ke kanan:
$+T_1 - f_k = m_1 \\cdot a$  *(Persamaan I)*

Misal untuk Benda 2 yang menggantung jatuh ke bawah:
$+w_2 - T_1 = m_2 \\cdot a$  *(Persamaan II)*

Perhatikan bahwa variabel $a$ (percepatan) tidak saya beri angka 1 atau 2, karena mereka diikat oleh satu tali yang kaku. Jika Benda 1 maju $1 \\text{ meter}$, Benda 2 pasti turun $1 \\text{ meter}$ dalam waktu yang sama. Artinya percepatan ($a$) mereka SAMA PERSIS. Ini yang dinamakan "Kendala Kinematis".

**Langkah 4: Operasi Eliminasi Matematika**
Kamu sekarang punya dua buah rumus yang keduanya belum diketahui nilai $T_1$ dan $a$-nya. Bagaimana menyelesaikannya?
Susun ke bawah layaknya kamu belajar Matematika Eliminasi SPLDV di SMP!

  $T_1 - f_k = m_1 \\cdot a$
  $w_2 - T_1 = m_2 \\cdot a$
  ----------------------- (+) Jumlahkan!

Lihat apa yang terjadi jika kamu menjumlahkannya? 
$+T_1$ di atas akan mati (tereliminasi) bertemu dengan $-T_1$ di bawah!
Hasil sisa penjumlahannya di ruas kiri adalah: $-f_k + w_2$.
Hasil sisa penjumlahannya di ruas kanan adalah: $m_1 a + m_2 a$, atau bisa difaktorkan menjadi $(m_1 + m_2) a$.

Maka persamaan gabungan sucinya menjadi:
$w_2 - f_k = (m_1 + m_2) a$

Sihir matematika baru saja bekerja. Kamu baru saja menemukan kembali "Trik Satu Sistem Utuh" yang kita bahas di Sub-bab 1 secara organik melalui aljabar pembuktian murni! Teknik ini 100% tahan banting (anti-gagal) untuk konfigurasi katrol paling aneh sekalipun!

\`\`\`inlinequiz
{
  "question": "Jika dua benda dihubungkan oleh sebuah tali yang TIDAK BISA mulur (kaku), sifat fisis apa yang pasti selalu SAMA di antara kedua benda tersebut selama tali tegang?",
  "options": [
    "Massa kedua benda",
    "Gaya Berat (w) kedua benda",
    "Gaya Normal (N) kedua benda",
    "Besar Kecepatan dan Percepatan Linear (a) kedua benda"
  ],
  "answer": 3,
  "explanation": "Sempurna! Ini disebut 'Syarat Batas Kinematis'. Jika tali tidak bertambah panjang, pergeseran posisi mereka dalam satu detik pasti identik. Oleh karena itu, turunan posisinya (Kecepatan dan Percepatan) wajib sama persis ukurannya!"
}
\`\`\`
`
};

const cbtLatihanSoalBagian8 = [
  {
    question: "Dalam sebuah Mesin Atwood, massa benda pertama $m_1 = 3 \\text{ kg}$ dan massa benda kedua $m_2 = 5 \\text{ kg}$. Katrol licin dan massanya diabaikan. Berapakah percepatan sistem benda tersebut? ($g = 10 \\text{ m/s}^2$)",
    options: ["$2.5 \\text{ m/s}^2$", "$5.0 \\text{ m/s}^2$", "$2.0 \\text{ m/s}^2$", "$10.0 \\text{ m/s}^2$"],
    answer: 0 // a = (5-3)g / (5+3) = 2(10) / 8 = 20/8 = 2.5
  },
  {
    question: "Berdasarkan soal Mesin Atwood sebelumnya ($m_1 = 3 \\text{ kg}$, $m_2 = 5 \\text{ kg}$, $a = 2.5 \\text{ m/s}^2$), berapakah tegangan tali ($T$) yang menghubungkan kedua benda?",
    options: ["$37.5 \\text{ N}$", "$30.0 \\text{ N}$", "$25.0 \\text{ N}$", "$50.0 \\text{ N}$"],
    answer: 0 // Benda 1 naik: T - w1 = m1 a => T = 30 + 3(2.5) = 30 + 7.5 = 37.5 N
  },
  {
    question: "Balok A ($4 \\text{ kg}$) terletak di atas meja datar yang licin. Balok A dihubungkan melalui katrol di ujung meja dengan tali yang menggantungkan Balok B ($6 \\text{ kg}$). Berapakah percepatan yang dialami Balok A? ($g = 10 \\text{ m/s}^2$)",
    options: ["$4 \\text{ m/s}^2$", "$6 \\text{ m/s}^2$", "$10 \\text{ m/s}^2$", "$2.4 \\text{ m/s}^2$"],
    answer: 1 // a = gaya penggerak / massa total = wB / (mA+mB) = 60 / 10 = 6 m/s^2.
  },
  {
    question: "Balok m1 diletakkan di atas balok m2, kemudian balok m2 ditarik di lantai licin. Gaya gesek statis maksimum antara m1 dan m2 adalah $15 \\text{ N}$. Massa m1 = $3 \\text{ kg}$. Berapakah percepatan MAKSIMUM sistem agar m1 tidak selip (jatuh tertinggal) dari atas m2?",
    options: ["$15 \\text{ m/s}^2$", "$5 \\text{ m/s}^2$", "$3 \\text{ m/s}^2$", "$10 \\text{ m/s}^2$"],
    answer: 1 // Gaya pendorong m1 adalah gaya gesek statis. f_s = m1 * a. Maksimal f_s = 15. Maka 15 = 3 * a_max => a_max = 5 m/s^2.
  },
  {
    question: "Dua buah benda dihubungkan dengan tali melalui katrol bebas yang dapat bergerak. Tali ditarik ke atas. Benda 1 memiliki percepatan $a_1$ dan Benda 2 berada pada katrol bebas. Persamaan kendala kinematis percepatan (hubungan antar percepatan) dalam kasus ini adalah...",
    options: ["$a_1 = a_2$", "$a_1 = 2 a_2$", "$a_2 = 2 a_1$", "$a_1 = a_2 = 0$"],
    answer: 1 // Jika benda 1 ditarik tali x meter, katrol bebas m2 yang diikat loop tali akan naik x/2 meter. Jadi a1 = 2 a2.
  },
  {
    question: "Balok A ($2 \\text{ kg}$) di bidang miring sudut $30^\\circ$ (licin) diikat dengan katrol puncak bidang miring menuju Balok B ($1 \\text{ kg}$) yang menggantung vertikal. Ke arah manakah sistem bergerak? (Gunakan $\\sin 30^\\circ = 0.5$, $g=10$)",
    options: ["Balok A merosot turun, Balok B tertarik naik.", "Balok B jatuh turun, Balok A terseret naik tebing.", "Sistem seimbang tidak bergerak.", "Tali terputus karena terlalu tegang."],
    answer: 2 // Daya tarik A merosot = mA g sin(30) = 2(10)(0.5) = 10 N. Daya tarik B jatuh = mB g = 1(10) = 10 N. Seri! Jadi seimbang diam.
  },
  {
    question: "Tiga buah kotak massanya masing-masing $m, 2m$, dan $3m$ didorong bersamaan di lantai licin secara berjejer oleh gaya horizontal $F$ dari belakang balok pertama. Berapakah gaya kontak (gaya desak) antara balok $2m$ dan balok $3m$?",
    options: ["$\\frac{F}{6}$", "$\\frac{F}{2}$", "$\\frac{F}{3}$", "$\\frac{3F}{6}$"],
    answer: 1 // percepatan sistem a = F / 6m. Tinjau balok 3m yang didorong oleh gaya kontak dari 2m (sebut R). R = m3 * a = 3m * (F/6m) = 3/6 F = F/2.
  },
  {
    question: "Pada Mesin Atwood, katrol licin tidak diikutkan dalam hitungan (massanya diabaikan). Jika katrol tersebut MASSANYA DIPERHITUNGKAN dan memiliki Momen Inersia, apa dampak utamanya terhadap pergerakan sistem?",
    options: ["Sistem bergerak jauh lebih cepat", "Percepatan sistem akan menjadi lebih kecil", "Tegangan tali di kiri dan kanan katrol akan menjadi bernilai sama", "Sistem tidak mungkin bisa bergerak sama sekali"],
    answer: 1 // Katrol yang bermassa akan ikut "menumpang" menjadi beban (kemalasan/inersia putar) sehingga penyebut di rumus percepatan menjadi lebih besar (m1+m2 + I/R^2). Hasil akhirnya percepatan menurun.
  },
  {
    question: "Dua buah balok bersentuhan pada bidang miring kasar dan meluncur turun bersama-sama. Balok depan (Balok 1) permukaannya halus, sedangkan balok belakang (Balok 2) permukaannya sangat kasar. Apa yang terjadi dengan gaya kontak/dorong antar keduanya selama meluncur?",
    options: ["Balok 2 mendorong kuat Balok 1.", "Balok 1 menarik Balok 2.", "Balok 2 tertinggal dan gaya kontak antara mereka menjadi nol (saling menjauh).", "Gaya kontak tetap ada namun Balok 1 yang mendorong Balok 2."],
    answer: 2 // Percepatan alamiah Balok 1 besar karena licin. Percepatan Balok 2 lambat karena kasar. Balok 1 akan melesat pergi meninggalkan Balok 2, sehingga mereka tidak lagi bersentuhan. Gaya kontak = 0.
  },
  {
    question: "Persamaan gerak (Hukum II Newton) $\\Sigma F = ma$ pada sebuah benda menunjukkan bahwa...",
    options: ["Gaya (F) merupakan satu-satunya besaran skalar di rumus tersebut.", "Vektor Percepatan (a) tidak pernah memiliki arah.", "Massa (m) akan selalu berubah seiring bertambahnya percepatan.", "Vektor Percepatan (a) yang dihasilkan selalu merupakan vektor kelipatan langsung (skalar m) dari vektor Total Gaya (F)"],
    answer: 3 // a = 1/m * Sigma F. Berarti a adalah vektor F yang diperpendek/diperpanjang sebesar skalar 1/m, tanpa mengubah arah panahnya.
  }
];

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
    
    if (mod.title === "Latihan Soal: Memecahkan SPL pada FBD Dua Benda") {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { quizJson: JSON.stringify(cbtLatihanSoalBagian8) }
      });
      console.log(`Updated CBT Tryout: ${mod.title} with ${cbtLatihanSoalBagian8.length} questions`);
    }
  }
}

main().finally(() => prisma.$disconnect());
