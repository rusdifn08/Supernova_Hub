import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contentData: Record<string, string> = {
  "Sub-bab 1: Formulasi Hukum II Newton (ΣF = ma)": `Pernahkah kamu mencoba mendorong sebuah mobil mogok? Rasanya berat sekali, bukan? Lalu bandingkan dengan mendorong sebuah sepeda motor yang kehabisan bensin. Motor jauh lebih mudah didorong dan lebih cepat melaju. Mengapa hal ini bisa terjadi, padahal tenaga (gaya) dorongan yang kamu berikan mungkin sama kuatnya?

Di sinilah kita berkenalan dengan karya agung Sir Isaac Newton yang paling terkenal di seluruh alam semesta, **Hukum II Newton**.

Jika Hukum I Newton berbicara tentang benda yang "dibiarkan sendirian" (tidak ada gaya total), maka Hukum II Newton berbicara tentang benda yang "diganggu" oleh gaya luar yang kuat ($\\Sigma F \\neq 0$).

### Formula Emas: $\\Sigma F = m \\cdot a$
Sebenarnya, rumusan asli dari Newton bukan seperti di atas. Namun, untuk mempermudah pemahaman kita, kita sering menulisnya sebagai:
**$$\\Sigma F = m \\cdot a$$**

Mari kita bedah rumus ini dengan analogi yang sangat membumi:
- **$\\Sigma F$ (Total Gaya/Total Force):** Ini adalah sang *Aktor Utama*. Ia mewakili seluruh tarikan dan dorongan yang saling memperebutkan kendali atas benda. Bayangkan ini seperti mesin yang menarik kereta. Semakin besar mesinnya ($\\Sigma F$ besar), semakin besar dampaknya.
- **$m$ (Massa / Mass):** Ini adalah si *Pemalas*. Semakin besar massa suatu benda, semakin malas benda itu untuk bergerak atau berubah arah. Massa adalah seberapa keras kepala sebuah benda. Mobil mogok tadi jauh lebih keras kepala (massanya besar) dibandingkan sepeda motor.
- **$a$ (Percepatan / Acceleration):** Ini adalah *Hasil Akhir* atau *Produk*. Seberapa cepat si benda menuruti tarikan gaya. Apakah ia melaju kencang tiba-tiba (percepatan besar) atau sangat lambat (percepatan kecil).

Jika kita putar balik rumusnya untuk mencari tahu "Seberapa menonjol Hasil Akhirnya ($a$)?":
$$a = \\frac{\\Sigma F}{m}$$

Rumus ini bercerita sangat jujur:
1. "Hei, kalau kau ingin benda ini cepat melesat ($a$ besar), kau harus menariknya dengan gaya yang sangat kuat ($\\Sigma F$ yang diletakkan di atas pembilang)!"
2. "Tapi hati-hati, kalau benda yang kau tarik itu sangat gendut/berat ($m$ besar yang diletakkan di penyebut), hasil kecepatan melesatmu ($a$) akan hancur lebur menjadi sangat kecil!"

Inilah mengapa mendorong mobil butuh banyak orang ($\\Sigma F$ harus diperbesar) agar bisa menyeimbangi massanya ($m$) yang raksasa, demi mendapatkan secercah pergerakan ($a$).

### Cara Menghitung $\\Sigma F$ yang Benar
Seringkali kesalahan terbesar pemula adalah menganggap *F* di dalam rumus itu hanya satu buah gaya saja. SALAH BESAR!
Tanda $\\Sigma$ (Sigma) berarti **Total Seluruh Gaya**.

Bayangkan kamu sedang bermain tarik tambang.
- Tim Kanan menarik ke arah kanan dengan gaya $+100 \\text{ N}$.
- Tim Kiri menarik ke arah kiri dengan gaya $-70 \\text{ N}$ (tanda minus karena arahnya ke kiri).

Maka $\\Sigma F$ yang dimasukkan ke rumus bukanlah 100, bukan pula 70, melainkan hasil pertempuran mereka berdua!
$$\\Sigma F = (+100) + (-70) = +30 \\text{ N}$$
Berarti secara kenyataan, benda itu hanya merasakan gaya "bersih" sebesar $30 \\text{ N}$ ke arah kanan! Gaya bersih inilah yang berhak dikalikan dengan massa untuk mencari percepatan!

\`\`\`inlinequiz
{
  "question": "Jika dua orang mendorong lemari yang sama ke arah kanan masing-masing dengan gaya 50 N, dan gaya gesek lantai yang menahan ke kiri adalah 30 N, berapakah nilai Sigma F yang dimasukkan ke dalam rumus m * a?",
  "options": [
    "50 N",
    "100 N",
    "70 N",
    "130 N"
  ],
  "answer": 2,
  "explanation": "Luar biasa! Orang pertama (50) + Orang kedua (50) = 100 N ke kanan. Gaya gesek (-30 N) ke kiri. Maka total pertempuran (Sigma F) adalah 100 - 30 = 70 N ke arah kanan!"
}
\`\`\`

### Dimensi Baru: Menganalisis Dua Sumbu Sekaligus (Sumbu X dan Y)
Di dunia nyata, kita hidup di dimensi 3D, tapi di soal SMA biasanya kita dibatasi pada 2 dimensi (X dan Y).
Aturan emas dari analisis Hukum II Newton adalah: **JANGAN PERNAH MENCAMPURADUKKAN GAYA ATAS-BAWAH DENGAN GAYA KIRI-KANAN!**

Mereka berdua hidup di dimensi yang tidak saling menyapa. Oleh karena itu, tulislah dua buah rumus secara terpisah:
1. **Fokus ke Sumbu Mendatar (Sumbu X):** $\\Sigma F_x = m \\cdot a_x$
2. **Fokus ke Sumbu Vertikal (Sumbu Y):** $\\Sigma F_y = m \\cdot a_y$

Misalnya kamu menarik koper di lantai mendatar bandara.
- Apakah koper itu melayang naik ke atap? Tidak.
- Apakah koper itu amblas masuk ke dalam lantai dasar? Tidak.
Artinya, di Sumbu Vertikal (atas-bawah), koper itu DIAM tidak bergerak! Jika diam, ingat Hukum I Newton, percepatannya nol ($a_y = 0$).
Maka khusus untuk Sumbu Y kopermu: $\\Sigma F_y = 0$. (Gaya Normal ke atas dan Gaya Berat ke bawah saling membatalkan).

Sedangkan untuk kopermu yang melaju kencang ke depan, barulah Sumbu X-nya menggunakan rumus penuh: $\\Sigma F_x = m \\cdot a_x$!

\`\`\`inlinequiz
{
  "question": "Seseorang menyeret koper dengan tali lurus ke kanan sejajar lantai. Ke arah manakah vektor percepatan (a) yang dihasilkan dari benda tersebut?",
  "options": [
    "Vertikal murni sejajar dengan Gaya Berat (w).",
    "Horizontal murni searah dengan resultan gaya (ke kanan).",
    "Miring ke arah gravitasi bumi.",
    "Tidak memiliki percepatan karena massanya besar."
  ],
  "answer": 1,
  "explanation": "Benar! Hukum II Newton menyebutkan bahwa vektor Percepatan (a) selalu, selalu, dan selalu menunjuk ke arah yang persis sama dengan arah Resultan Gayanya (Sigma F). Karena koper menang ditarik ke kanan, maka ia hanya bisa dipercepat ke arah kanan (horizontal)!"
}
\`\`\`
`,

  "Sub-bab 2: Sifat Gaya Gesek Statis dan Kinetis": `Gaya Gesek ($f$) adalah pahlawan tanpa tanda jasa sekaligus musuh nomor satu bagi para insinyur mekanik. 
Tanpa gaya gesek, kamu tidak akan bisa berjalan di atas tanah (kakimu akan terus terpeleset seperti di atas es yang disiram sabun cair). Mobilmu tidak akan bisa mengerem. Tapi, gaya gesek pula yang membuat mesin mobilmu cepat panas, rantai sepedamu cepat aus, dan memakan banyak bahan bakar!

Satu prinsip utama dari Gaya Gesek: **Arahnya SELALU berlawanan (bermusuhan) dengan arah (atau rencana arah) pergerakan benda!**
Jika kamu ingin mendorong meja ke Utara, maka gaya gesek akan muncul melawanmu ke Selatan.

Tapi tahukah kamu, bahwa Gaya Gesek itu punya kepribadian ganda? Ia bisa berubah wujud menjadi "Statis" atau "Kinetis". Mari kita kuliti mereka satu per satu.

### 1. Gaya Gesek Statis ($f_s$): Sang Penjaga Gerbang
Kata "Statis" berarti diam. Gaya gesek statis adalah gaya tak terlihat yang menahan benda selama benda itu **MASIH DIAM**.

Gaya gesek statis memiliki sifat ajaib: **Bisa Berubah-ubah Menyesuaikan Diri!**
Bayangkan kamu mendorong lemari besi berat sendirian dengan kekuatan dorong $10 \\text{ N}$. Lemari itu tidak bergeser satu milimeter pun! Artinya lemari itu sedang mempertahankan Kesetimbangan Translasi ($\\Sigma F = 0$). Dari mana datangnya keseimbangan ini? 
Ternyata Gaya Gesek Statis *baru saja* menciptakan gaya ajaib sebesar $10 \\text{ N}$ untuk melawanimu!

Merasa kesal, kamu mendorong lebih keras: $50 \\text{ N}$. Lemari tetap membeku diam! Apa yang terjadi? Gaya Gesek Statis di lantai secara ajaib "meningkatkan" kekuatan pertahanannya menjadi persis $50 \\text{ N}$!

Gaya gesek statis akan terus mengikuti sebesar apa pun gayamu... sampai akhirnya ia menyerah karena mencapai **batas maksimal kemampuannya**. Batas maksimal ini disebut dengan *Gaya Gesek Statis Maksimum* ($f_{s,max}$).

Rumus untuk mencari kekuatan maksimal pertahanan si lantai ini adalah:
**$$f_{s,max} = \\mu_s \\cdot N$$**
- $\\mu_s$ (Mu Statis): Tingkat kekasaran permukaan (sebuah angka pecahan, misal 0.4 atau 0.8). Semakin kasar ampelas lantai, semakin besar angkanya.
- $N$ (Gaya Normal): Seberapa kuat benda itu mendesak lantai. Benda yang ditekan sangat kuat ke lantai akan jauh lebih sulit diseret!

Jika doronganmu (misalnya $100 \\text{ N}$) berhasil melewati angka pertahanan $f_{s,max}$ (misal pertahanan lantainya hanya $80 \\text{ N}$), maka Pintu Gerbang jebol! Lemari akhirnya bergerak terseret!

\`\`\`inlinequiz
{
  "question": "Sebuah brankas menempel di lantai. Gaya gesek statis maksimum (f_s,max) yang mampu menahan brankas adalah 300 N. Kamu mendorong pelan brankas itu dengan gaya murni hanya 50 N. Berapakah besar gaya gesek statis AKTUAL yang sedang dilawan oleh tanganmu saat ini?",
  "options": [
    "300 N",
    "250 N",
    "50 N",
    "0 N"
  ],
  "answer": 2,
  "explanation": "Brilian! Banyak siswa terkecoh dan menjawab 300N. 300N hanyalah batas akhir (kapasitas nyawanya). Jika kamu cuma mendorong 50N, maka gaya gesek cukup 'meniru' kekuatanmu sebesar 50N untuk membuat benda itu tetap diam seimbang (50 - 50 = 0). Ia tidak akan memukulmu balik dengan 300N (jika begitu brankasnya akan mengejarmu mundur ke belakang dong)!"
}
\`\`\`

### 2. Gaya Gesek Kinetis ($f_k$): Sang Pengganggu
Setelah pintu gerbang dijebol dan lemari akhirnya mulai meluncur (bergerak), Gaya Gesek Statis langsung pamit pulang. Posisinya digantikan oleh saudara kembarnya yang lebih lemah, yaitu **Gaya Gesek Kinetis ($f_k$)**.
Kata "Kinetis" berarti bergerak.

Sifat utama $f_k$: **Nilainya konstan dan paten, tidak pernah berubah-ubah!** Secepat apapun lemarinya bergerak, besar gaya hambatannya akan selalu sama.

Rumusnya:
**$$f_k = \\mu_k \\cdot N$$**
- $\\mu_k$ (Mu Kinetis): Angka kekasaran saat sedang terseret. Uniknya, $\\mu_k$ **selalu lebih kecil** daripada $\\mu_s$.

Pernahkah kamu merasakan, mendorong mobil mogok itu sangat berat *hanya pada detik-detik awal* (saat kamu berusaha menjebol pertahanan $\\mu_s$). Tapi begitu bannya mulai bergulir pelan, tiba-tiba dorongannya terasa jauh lebih ringan? Itu karena pertahanan besarnya sudah digantikan oleh hambatan kecil si $\\mu_k$!

### Kesimpulan Algoritma Menyelesaikan Soal
Jika kamu diberikan soal tentang gaya gesek, kamu TIDAK BOLEH langsung menghitung gaya kinetis. Kamu harus melewati "Pengecekan Bea Cukai" terlebih dahulu:
- **Langkah 1:** Hitung kekuatan doronganmu ($F_{tarik}$).
- **Langkah 2:** Hitung benteng pertahanan terakhir lantai ($f_{s,max} = \\mu_s \\cdot N$).
- **Langkah 3 (Pengecekan):**
  - Jika $F_{tarik} \\leq f_{s,max}$ $\\rightarrow$ Benda belum sanggup bergerak! Artinya $a = 0$. Dan gaya gesek aktual yang bekerja adalah SAMA dengan doronganmu.
  - Jika $F_{tarik} > f_{s,max}$ $\\rightarrow$ Hore! Benda bergerak! Artinya benda memiliki percepatan. Sekarang, tendang keluar si Statis, dan gunakan gaya $f_k$ ke dalam rumus Hukum II Newton: $\\Sigma F = F_{tarik} - f_k = m \\cdot a$.

\`\`\`inlinequiz
{
  "question": "Mana dari pilihan berikut ini yang WAJIB digunakan di dalam rumus Sigma F = m.a untuk benda yang SUDAH TERSERET dan sedang berakselerasi?",
  "options": [
    "Gaya Gesek Kinetis (f_k)",
    "Gaya Gesek Statis Maksimum (f_s,max)",
    "Gaya Normal (N)",
    "Gaya Gravitasi Bebas (g)"
  ],
  "answer": 0,
  "explanation": "Luar biasa! Selama benda dalam kondisi bergerak terseret (kinetis), satu-satunya gaya gesek yang ikut dalam pertempuran (Sigma F) adalah Gaya Gesek Kinetis (f_k). Gaya Statis (f_s) hanya berlaku jika benda itu masih tertidur diam!"
}
\`\`\`
`,

  "Sub-bab 3: Analisis Gerak pada Bidang Miring Kasar": `Mari kita tinggalkan lantai mendatar yang membosankan dan menuju ke area perosotan tajam! Bidang miring adalah salah satu skenario favorit di Ujian Nasional dan UTBK karena menuntut kemampuan Trigonometri tingkat tinggi.

Ketika sebuah balok diletakkan di atas sebuah bidang miring (misalnya dengan sudut kemiringan $\\theta = 30^\\circ$), gaya berat aslinya ($w$) menunjuk langsung menembus ke inti bumi (vertikal). Namun, lantainya tidak lagi mendatar! Lantainya *miring*.

### Trik Super: Memutar Kepala (dan Sumbu Koordinat)
Alih-alih memaksa diri menganalisis benda yang bergerak miring-miring dengan koordinat X-Y yang lurus vertikal-horizontal, para fisikawan punya satu trik jenius: **Putar saja kepala kita (sumbu koordinatnya) menyesuaikan kemiringan bidang tersebut!**

- Jadikan **Sumbu X sejajar/menempel dengan permukaan bidang miring** (arah merosot ke bawah adalah X positif).
- Jadikan **Sumbu Y menembus masuk membelah bidang miring 90 derajat** (arah Gaya Normal $N$ adalah Y positif).

Nah, sekarang siapa yang tiba-tiba "salah arah"? Ya, Gaya Berat ($w$)!
Awalnya $w$ lurus ke bawah, tapi karena sumbu koordinat sudah kita miringkan, si $w$ terlihat menggantung miring di antara kuadran.
Oleh karena itu, Gaya Berat $w$ **WAJIB DIURAIKAN/DIBELAH** menjadi dua saudara kembar:
1. **$w_x$ (Mendorong meluncur ke bawah tebing):** 
   Rumusnya adalah **$$w_x = m \\cdot g \\cdot \\sin\\theta$$**
   *Tips Hapal: Sumbu X yang MeroSot menggunakan SiN.*
2. **$w_y$ (Menekan masuk membentur landasan bidang miring):**
   Rumusnya adalah **$$w_y = m \\cdot g \\cdot \\cos\\theta$$**
   *Tips Hapal: Sumbu Y yang menimpa Keras menggunakan KoS.*

### Menggambar Ulang FBD Bidang Miring Kasar
Sekarang, lupakan $w$ yang lama! Kita bekerja murni dengan $w_x$ dan $w_y$.
Mari kita panggil 4 Aktor Utama di bidang miring kasar ini:

1. **Di Sumbu Y (Tegak lurus terhadap bidang miring):**
   - Ke arah atas miring, menolak masuknya benda: **Gaya Normal ($N$)**.
   - Ke arah bawah menembus masuk bidang miring: **Gaya Berat Proyeksi ($w_y = mg \\cos\\theta$)**.
   - Apakah benda terbang meninggalkan bidang miring? Tidak! Ia menempel rapat. Artinya Sumbu Y seimbang mutlak! $\\Sigma F_y = 0$.
   - **$$N - mg \\cos\\theta = 0 \\rightarrow N = mg \\cos\\theta$$**
   - Perhatikan baik-baik! Di bidang miring, **Gaya Normal ($N$) TIDAK LAGI SAMA dengan Berat ($w$)!** Gaya Normal mengecil menjadi sebatas $mg \\cos\\theta$ saja.

2. **Di Sumbu X (Sejajar dengan peluncuran ke bawah tebing):**
   - Ke arah bawah tebing, gaya jahat tak kasat mata yang terus menarik turun benda: **Gaya Berat Meluncur ($w_x = mg \\sin\\theta$)**.
   - Ke arah atas tebing, sang pahlawan yang menahan rem agar tidak licin jatuh: **Gaya Gesek ($f$)**.

### Skenario Peluncuran 
Misalkan sebuah balok ditinggalkan di atas bidang miring kasar. Apakah ia akan merosot? Tergantung pada hasil pertandingan Tarik Tambang Sumbu X!

- **Gaya Penarik ($F_{tarik}$)** = $w_x = mg \\sin\\theta$.
- **Gaya Pertahanan Lantai ($f_{s,max}$)** = $\\mu_s \\cdot N = \\mu_s \\cdot (mg \\cos\\theta)$.

Mari kita bandingkan keduanya:
1. Jika $mg \\sin\\theta \\leq \\mu_s \\cdot mg \\cos\\theta$, maka **Balok membeku diam menempel di dinding tebing!** Pertahanan lantainya terlalu kuat.
2. Jika $mg \\sin\\theta > \\mu_s \\cdot mg \\cos\\theta$, maka Pintu Gerbang jebol! **Balok merosot kencang ke dasar jurang!**
   - Saat mulai meluncur, gaya gesek berubah menjadi Kinetis ($f_k = \\mu_k \\cdot mg \\cos\\theta$).
   - Kecepatan luncurnya dihitung dari: $\\Sigma F_x = m \\cdot a$
   - $(mg \\sin\\theta) - f_k = m \\cdot a$

### Kondisi Ajaib: TEPAT AKAN BERGERAK
Terkadang, pembuat soal memasukkan satu kalimat sakti mandraguna: *"Balok **tepat akan meluncur** ke bawah."*
Kata "Tepat Akan Berubah Nasib" artinya pertarungan tarik tambang itu berada di ujung tanduk, **seri dengan sempurna (imbang mutlak di batas maksimal)**!
Artinya gaya tarik sama persis dengan batas maksimum daya tahan gesek.
$$mg \\sin\\theta = f_{s,max}$$
$$mg \\sin\\theta = \\mu_s \\cdot (mg \\cos\\theta)$$
Coret variabel yang sama di kiri dan kanan ($mg$ dicoret):
$$\\sin\\theta = \\mu_s \\cdot \\cos\\theta$$
$$\\frac{\\sin\\theta}{\\cos\\theta} = \\mu_s$$
**$$\\tan\\theta = \\mu_s$$**

Fakta yang mengejutkan! Ternyata untuk membuat benda *tepat akan meluncur*, kita hanya butuh mengetahui **sudut bidang miringnya (tangen)** dan **kekasarannya (mu)**! Seberat apa pun benda (massa) yang kamu letakkan di atas kayu itu, baik itu kapas ataupun emas, mereka akan TEPAT MELUNCUR pada sudut yang sama persis! Massa benda tersebut tidak berpengaruh (karena variabel massanya saling membatalkan di kedua sisi)! Ini adalah salah satu trik fisika terindah yang pernah ditemukan Galileo.

\`\`\`inlinequiz
{
  "question": "Jika seorang ilmuwan meletakkan buku fisika bermassa 1 kg di atas papan kayu kasar, lalu perlahan-lahan mengangkat papan tersebut hingga sudut miring di mana buku itu 'Tepat Akan Tergelincir' turun. Lalu ilmuwan itu mengganti bukunya dengan koper besi bermassa 50 kg di atas jenis papan kayu kasar yang sama. Pada sudut berapakah koper itu akan 'Tepat Akan Tergelincir'?",
  "options": [
    "Jauh lebih landai (sudut kecil) karena koper 50x lipat lebih berat.",
    "Jauh lebih terjal (sudut besar) karena butuh gravitasi lebih curam.",
    "Persis pada sudut kemiringan yang SAMA dengan si buku fisika.",
    "Tidak bisa diprediksi tanpa mengetahui kecepatan angin."
  ],
  "answer": 2,
  "explanation": "Brilian sekali! Inilah magis dari rumus tan(theta) = mu_s. Variabel Massa (m) dan Gravitasi (g) tereliminasi total (dicoret silang di rumusan). Asalkan permukaan kulit bukunya memiliki kekasaran (mu_s) yang sama dengan kulit kopernya, mereka berdua akan selip pada sudut ambruk yang identik, terlepas dari perbandingan massanya!"
}
\`\`\`
`
};

const cbtLatihanSoalBagian7 = [
  {
    question: "Sebuah balok bermassa $20 \\text{ kg}$ diletakkan di atas lantai kasar dengan koefisien gesek statis $\\mu_s = 0.6$ dan kinetis $\\mu_k = 0.4$. Balok kemudian ditarik dengan gaya horizontal $100 \\text{ N}$. Apakah balok bergerak dan berapakah gaya gesek yang bekerja padanya? ($g=10 \\text{ m/s}^2$)",
    options: ["Balok tidak bergerak, gaya gesek $= 100 \\text{ N}$", "Balok tidak bergerak, gaya gesek $= 120 \\text{ N}$", "Balok bergerak, gaya gesek $= 80 \\text{ N}$", "Balok bergerak, gaya gesek $= 100 \\text{ N}$"],
    answer: 0 // N = mg = 200N. fs_max = 0.6*200 = 120N. F_tarik = 100N. Karena 100 < 120, benda diam. Gaya gesek statis aktual = gaya yang dilawan = 100N.
  },
  {
    question: "Melanjutkan soal sebelumnya (Massa $20 \\text{ kg}$, $\\mu_s = 0.6$, $\\mu_k = 0.4$), jika sekarang gaya tarik diperbesar menjadi $150 \\text{ N}$, berapakah percepatan yang dialami balok tersebut?",
    options: ["$7.5 \\text{ m/s}^2$", "$1.5 \\text{ m/s}^2$", "$3.5 \\text{ m/s}^2$", "$0 \\text{ m/s}^2$ (masih diam)"],
    answer: 2 // 150 > 120 (bergerak). Pakai fk = 0.4 * 200 = 80N. Sigma F = 150 - 80 = 70. a = Sigma F / m = 70 / 20 = 3.5.
  },
  {
    question: "Sebuah benda bermassa $m$ meluncur merosot pada bidang miring licin (tanpa gesekan) dengan sudut kemiringan $\\theta$. Percepatan benda saat merosot ke bawah adalah...",
    options: ["$g \\sin\\theta$", "$g \\cos\\theta$", "$mg \\sin\\theta$", "$m \\cos\\theta$"],
    answer: 0 // Sigma Fx = ma => mg sin(theta) = ma => a = g sin(theta).
  },
  {
    question: "Pada bidang miring yang memiliki koefisien gesek $\\mu_s$, syarat agar benda yang asalnya diam 'tepat akan mulai meluncur' ke bawah adalah jika sudut kemiringannya memenuhi persamaan...",
    options: ["$\\sin\\theta = \\mu_s$", "$\\cos\\theta = \\mu_s$", "$\\tan\\theta = \\mu_s$", "$\\cot\\theta = \\mu_s$"],
    answer: 2 // Tepat bergerak: mg sin(theta) = mu_s * mg cos(theta) => tan(theta) = mu_s.
  },
  {
    question: "Sebuah balok ditekan lurus mendatar merapat ke dinding (vertikal) oleh gaya dorong tangan $F$. Koefisien gesek balok dengan dinding adalah $\\mu$. Jika balok diam (tidak melorot jatuh ke bawah), maka syarat minimal gaya dorong $F$ haruslah...",
    options: ["$F \\ge \\frac{mg}{\\mu}$", "$F \\le \\mu mg$", "$F = mg$", "$F = \\mu mg$"],
    answer: 0 // Sigma Fy = 0 => fs - mg = 0 => fs = mg. fs_max = mu * N = mu * F. Supaya tidak melorot, fs_max >= mg => mu * F >= mg => F >= mg / mu.
  },
  {
    question: "Truk gandeng sedang berakselerasi di jalan mendatar. Gandengan truk terhubung dengan tali tambang mendatar ke badan depan truk. Massa truk bagian depan $2000 \\text{ kg}$ dan massa gandengannya $1000 \\text{ kg}$. Jika mesin truk memberikan gaya dorong $6000 \\text{ N}$ (abaikan gesekan ban dengan jalan), berapakah tegangan tali yang menarik gandengannya?",
    options: ["$6000 \\text{ N}$", "$4000 \\text{ N}$", "$2000 \\text{ N}$", "$1000 \\text{ N}$"],
    answer: 2 // Sistem total: a = F / m_total = 6000 / (2000+1000) = 6000 / 3000 = 2 m/s^2. Tinjau gandengan saja: Sigma F = m_gandeng * a => T = 1000 * 2 = 2000 N.
  },
  {
    question: "Pada kasus bidang miring kasar di mana sudutnya $\\theta$, gaya normal yang diberikan landasan kepada kotak selalu bernilai $N = mg \\cos\\theta$. Manakah pernyataan di bawah ini yang PALING TEPAT menjelaskan alasannya?",
    options: ["Karena Gaya Normal adalah Gaya Aksi-Reaksi dari Gaya Berat benda secara utuh.", "Karena hanya komponen berat yang tegak lurus bidang ($mg \\cos\\theta$) yang diimbangi (dilawan) oleh landasan agar benda tidak ambles.", "Karena lantai selalu mengurangi gaya berat aslinya dengan cosinus.", "Karena Gaya Normal adalah gaya yang selalu ke atas menuju pusat angkasa."],
    answer: 1 // Gaya normal selalu menetralkan desakan ke lantai. Komponen berat yang mendesak lantai tegak lurus hanyalah w_y = mg cos(theta).
  },
  {
    question: "Seorang anak menarik kereta luncur bermassa $10 \\text{ kg}$ di atas salju (licin) dengan gaya $40 \\text{ N}$. Tali yang ditarik oleh anak itu miring membetuk sudut $60^\\circ$ terhadap arah mendatar. Berapakah percepatan mendatar yang dialami kereta tersebut? ($\\cos 60^\\circ = 0.5$)",
    options: ["$2 \\text{ m/s}^2$", "$4 \\text{ m/s}^2$", "$0.2 \\text{ m/s}^2$", "$8 \\text{ m/s}^2$"],
    answer: 0 // Gaya penarik mendatar Fx = F cos(60) = 40 * 0.5 = 20 N. Percepatan a = Fx / m = 20 / 10 = 2 m/s^2.
  },
  {
    question: "Pada kasus benda merosot di bidang miring kasar yang memiliki sudut kemiringan $37^\\circ$ (diketahui $\\sin 37^\\circ = 0.6, \\cos 37^\\circ = 0.8$), koefisien gesekan kinetis lantai $\\mu_k = 0.25$. Berapakah percepatan luncur benda? ($g=10$)",
    options: ["$6 \\text{ m/s}^2$", "$2 \\text{ m/s}^2$", "$4 \\text{ m/s}^2$", "$8 \\text{ m/s}^2$"],
    answer: 2 // a = g sin0 - mu_k g cos0 = 10(0.6) - 0.25(10)(0.8) = 6 - 0.25(8) = 6 - 2 = 4 m/s^2.
  },
  {
    question: "Gaya gesek yang bekerja saat roda karet mobil sedang menggelinding (menggelinding sempurna MURNI tanpa slip atau tanpa mengesot sama sekali di jalan aspal yang kasar) adalah...",
    options: ["Gaya gesek kinetis, karena roda tersebut sedang bergerak maju.", "Gaya gesek statis, karena titik sentuh roda tidak pernah bergeser relatif terhadap aspal.", "Tidak ada gaya gesek sama sekali karena menggelinding lebih mudah daripada diseret.", "Gaya normal murni."],
    answer: 1 // Pada gerak menggelinding sempurna tanpa selip, titik kontak sesaat antara ban dan jalan adalah DIAM (statis) relatif terhadap aspal. Karenanya gaya geseknya adalah statis. Jika kinetis, ban tersebut sedang nge-drift (selip/mengesot).
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
    
    if (mod.title === "Latihan Soal: Syarat Tepat Bergerak pada Bidang Miring") {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { quizJson: JSON.stringify(cbtLatihanSoalBagian7) }
      });
      console.log(`Updated CBT Tryout: ${mod.title} with ${cbtLatihanSoalBagian7.length} questions`);
    }
  }
}

main().finally(() => prisma.$disconnect());
