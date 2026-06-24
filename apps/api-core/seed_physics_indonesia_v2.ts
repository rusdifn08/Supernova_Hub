import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const physicsModules = [
  {
    title: "Modul 1: Fondasi Kinematika dan Paradigma Ruang Waktu",
    duration: "60m",
    orderIndex: 1,
    contentMd: `# Modul 1: Fondasi Kinematika dan Paradigma Ruang Waktu

Selamat datang di titik nol pembelajaran fisika klasik. Sebelum kita bisa memprediksi ke mana sebuah roket akan mendarat atau seberapa cepat sebuah mobil balap berakselerasi, kita harus memahami *panggung* tempat semua kejadian ini berlangsung: Ruang dan Waktu.

## 1.1 Apa itu Kinematika?
Dalam hierarki ilmu Fisika, Mekanika Klasik dibagi menjadi dua cabang utama:
1. **Kinematika**: Ilmu yang mendeskripsikan *bagaimana* benda bergerak, tanpa mempedulikan gaya atau massa yang menyebabkannya. Ini murni tentang geometri gerak.
2. **Dinamika**: Ilmu yang menjelaskan *mengapa* benda bergerak (melibatkan Gaya, Massa, dan Hukum Newton).

Pada modul pertama ini, kita murni berfokus pada **Kinematika**. Kita akan menjadi pengamat murni yang mencatat koordinat spasial seiring berjalannya detik demi detik waktu. Memahami kinematika ibarat belajar abjad sebelum Anda bisa menulis sebuah novel maha karya fisika kuantum atau relativitas Einstein.

## 1.2 Kerangka Acuan (Frame of Reference)
Gerak adalah konsep yang **relatif**. Seseorang yang duduk di dalam kereta yang melaju dengan kecepatan 100 km/jam merasa dirinya diam relatif terhadap kursinya. Namun, bagi pengamat di peron stasiun, orang tersebut bergerak dengan kecepatan 100 km/jam. Tanpa kerangka acuan, konsep "gerak" kehilangan makna fisisnya.

> [!IMPORTANT]
> **Aksioma Relativitas Galilean Dasar:** Tidak ada gerak yang absolut di alam semesta ini. Sebuah benda dikatakan bergerak HANYA JIKA posisinya berubah terhadap suatu titik referensi (kerangka acuan) yang disepakati.

### Memilih Titik Nol (Origin)
Dalam model matematika, kerangka acuan sering divisualisasikan dengan **Sistem Koordinat Kartesius** yang ditemukan oleh René Descartes.
- Titik pusat $(0,0)$ adalah titik pengamat berdiri (Origin).
- Sumbu $x$ mewakili posisi horizontal (kiri/kanan, timur/barat).
- Sumbu $y$ mewakili posisi vertikal (atas/bawah).
- Sumbu $z$ mewakili kedalaman (maju/mundur ke arah pengamat dalam dimensi 3D).

Untuk fase awal ini, kita akan mempelajari **gerak satu dimensi (1D)**, sehingga kita cukup berkutat pada Sumbu X saja.

\`\`\`mermaid
flowchart LR
    A((x = -5\nKiri)) --- B((-4)) --- C((-3)) --- D((-2)) --- E((-1)) --- F((x = 0 \n Origin / Titik Nol)) --- G((+1)) --- H((+2)) --- I((+3)) --- J((+4)) --- K((x = +5\nKanan))
    style F fill:#f9f,stroke:#333,stroke-width:4px
    style A fill:#ddd
    style K fill:#ddd
\`\`\`

## 1.3 Peran Fundamental Waktu ($t$)
Selain ruang spasial (posisi), kita membutuhkan dimensi keempat sebagai mesin penggerak alam: **Waktu**.
Waktu dalam paradigma mekanika klasik Newton (pra-Einstein) bersifat absolut, mengalir maju secara konstan untuk semua pengamat di alam semesta tanpa terkecuali. 
- Kita menggunakan simbol $t$ (dari kata *time*).
- Diukur secara standar dalam **sekon (s)** menurut Sistem Internasional (SI).
- Titik mulai pengamatan biasanya ditandai dengan menekan *stopwatch*, di mana $t = 0$.

## 1.4 Notasi Matematika Dasar Posisi dan Waktu
Sebelum kita bisa melakukan simulasi pergerakan, kita perlu menterjemahkan bahasa Indonesia menjadi persamaan matematis.
- Posisi awal pada detik ke-0 (saat stopwatch dimulai) dilambangkan sebagai $x_0$ (baca: x-nol).
- Posisi akhir pada waktu tertentu $t$ dilambangkan sebagai $x(t)$ (baca: x fungsi dari t) atau $x_t$.
- Selisih perubahan posisi disebut Delta X ($\\Delta x$).
- Selisih perubahan waktu disebut Delta T ($\\Delta t$).

Simbol $\\Delta$ (huruf besar Yunani Delta) berarti "Nilai Akhir dikurangi Nilai Awal". Ini adalah simbol paling sering muncul dalam seluruh bab fisika!

## 1.5 Deep Dive: Pemodelan Ruang dan Waktu
Mari kita berlatih melihat alam semesta melalui mata seorang fisikawan. Jika Anda melihat kelereng menggelinding di lantai lurus:
1. Anda tetapkan titik awal lantai tersebut sebagai $x = 0$.
2. Anda asumsikan arah kanan sebagai nilai positif (+), arah kiri sebagai nilai negatif (-).
3. Anda tekan stopwatch tepat saat kelereng dilepas.

Jika pada detik ke-3 ($t = 3$ s), kelereng berada sejauh 12 meter di sebelah kanan Anda, maka Anda mencatatnya dalam notasi matematis sebagai:
**$$ x(3) = +12 \\text{ m} $$**

Ini mungkin terdengar sangat sederhana, namun dari catatan-catatan seperti inilah Johannes Kepler mampu merumuskan orbit mengelilingi matahari, dan dari mana NASA menerbangkan wahana pendarat menuju kawah di Mars.

---

## 1.6 🧠 Sesi Latihan dan Contoh Soal Pemahaman Fundamental
Latihan di bawah ini dirancang untuk memaksa otak Anda berpikir relatif berdasarkan sistem kordinat.

### Soal Contoh 1: Penentuan Posisi Relatif
**Kasus:** Ada tiga buah rumah berderet lurus di satu jalan dari Barat ke Timur: Rumah Andi, Rumah Budi, dan Rumah Cici.
Jarak dari Rumah Andi ke Budi adalah 50 meter. Jarak dari Rumah Budi ke Cici adalah 30 meter.
Pertanyaan:
Tentukan koordinat posisi ($x$) masing-masing rumah jika:
A) Rumah Budi dijadikan sebagai Titik Acuan (Origin / $x=0$).
B) Rumah Andi dijadikan sebagai Titik Acuan (Origin / $x=0$).

**Pembahasan Langkah demi Langkah:**
Sumbu $x$ membentang Barat-Timur. Kita sepakati Timur adalah positif ($+$) dan Barat adalah negatif ($-$).
Urutan rumah dari Barat ke Timur: Andi $\\rightarrow$ Budi $\\rightarrow$ Cici.

**Jawaban Skenario A (Rumah Budi = 0):**
- Posisi Budi: $x_{Budi} = 0$ meter.
- Rumah Andi berada di Barat (kiri) Budi sejauh 50m. Posisi Andi: $x_{Andi} = -50$ meter.
- Rumah Cici berada di Timur (kanan) Budi sejauh 30m. Posisi Cici: $x_{Cici} = +30$ meter.

**Jawaban Skenario B (Rumah Andi = 0):**
- Posisi Andi: $x_{Andi} = 0$ meter.
- Rumah Budi berada di Timur Andi sejauh 50m. Posisi Budi: $x_{Budi} = +50$ meter.
- Rumah Cici berada di Timur Budi sejauh 30m. Posisi Cici dari Andi adalah $50 + 30 = 80m$. Posisi Cici: $x_{Cici} = +80$ meter.

> *Perhatikan bahwa meskipun koordinat angkanya berubah secara drastis, letak fisik rumah-rumah tersebut di dunia nyata tidak berpindah sama sekali. Ini membuktikan bahwa posisi hanyalah nilai relatif.*

### Soal Contoh 2: Perubahan Waktu ($\\Delta t$)
**Kasus:** Seorang pelari melewati tanda 100m tepat pada pukul 14:05:10, dan melewati tanda 200m tepat pada pukul 14:05:35. Berapakah interval waktu pengamatan ($\\Delta t$) dan perubahan posisi ($\\Delta x$) pelari tersebut?

**Pembahasan:**
- Posisi Awal ($x_0$): 100 m
- Posisi Akhir ($x_t$): 200 m
- Waktu Awal ($t_0$): 10 detik (kita abaikan jam dan menit karena sama)
- Waktu Akhir ($t_t$): 35 detik

**Kalkulasi Perubahan Waktu:**
$$ \\Delta t = t_t - t_0 = 35 - 10 = 25 \\text{ sekon} $$

**Kalkulasi Perubahan Posisi:**
$$ \\Delta x = x_t - x_0 = 200 - 100 = 100 \\text{ meter} $$

Ini adalah fondasi matematika paling dasar. Jika Anda mengalikan kemampuan ini hingga ribuan baris kalkulasi, Anda mendapatkan mesin fisika yang menggerakkan video game modern.

---

## 1.7 Tantangan Eksperimen Pikiran Akhir (Gedankenexperiment)
Sebagai penutup modul fondasi ini, mari kita asah logika spasial-temporal Anda layaknya fisikawan teoretis:

**Bayangkan Anda berada di luar angkasa hampa yang pekat gulita, tanpa ada satu pun bintang, planet, atau debu referensi.** 
Jika tiba-tiba ada sebuah batu yang melayang sejajar melewati wahana Anda, mungkinkah Anda yang sebenarnya sedang bergerak dan batunya yang diam? Ataukah batunya yang bergerak mendatangi Anda yang diam? Ataukah Anda berdua sebenarnya sama-sama bergerak?

Jawaban dari Albert Einstein dalam relativitasnya menyatakan: **Semua skenario di atas adalah mutlak BENAR.** Di alam semesta hampa tanpa titik acuan absolut, gerak tidak bisa dibedakan dari keadaan diam. Anda hanya bisa mengatakan "Batu itu bergerak relatif terhadap pesawat saya" atau "Pesawat saya bergerak relatif terhadap batu itu".

Dengan bekal pemikiran kritis mengenai posisi dan kerangka acuan ini, Anda sekarang telah siap untuk melangkah ke Modul 2, di mana kita akan mulai membedah dua variabel kinematika yang paling sering membuat siswa tersandung: Jarak versus Perpindahan. Mari kita mulai petualangan perhitungan vektor!`
  },
  {
    title: "Modul 2: Demarkasi Besaran Skalar vs Vektor (Jarak vs Perpindahan)",
    duration: "75m",
    orderIndex: 2,
    contentMd: `# Modul 2: Demarkasi Besaran Skalar vs Vektor (Jarak vs Perpindahan)

Inilah titik percabangan terbesar pertama bagi siswa fisika pemula: menyadari bahwa "seberapa jauh Anda pergi" memiliki dua makna yang secara matematis sangat berbeda.

## 2.1 Dikotomi Skalar dan Vektor
Dalam fisika, seluruh besaran yang bisa diukur terbagi dalam dua klan besar:

### A. Besaran Skalar
Skalar adalah entitas matematika yang **hanya memiliki nilai (magnitudo)**.
Contoh:
- Suhu ($30^\\circ C$)
- Massa (50 kg)
- Waktu (10 sekon)
*Anda tidak mungkin mengatakan "Berat saya 50 kg ke arah Utara." Skalar tidak peduli arah.*

### B. Besaran Vektor
Vektor adalah entitas canggih yang memiliki **nilai (magnitudo) DAN arah**.
Contoh:
- Gaya (Mendorong 10 Newton ke Kanan)
- Posisi (5 meter ke Utara dari pohon)
- Kecepatan (Melaju 100 km/jam ke Barat)

## 2.2 Skalar Fisis: Jarak (Distance)
**Jarak ($s$)** adalah besaran skalar.
- **Definisi**: Total lintasan riil mikroskopis yang dilewati oleh partikel dari titik awal hingga berhenti.
- **Sifat**: Bersifat akumulatif murni. Tidak bisa negatif. Semakin banyak Anda bergerak, angkanya semakin besar, tidak peduli arah Anda.

## 2.3 Vektor Fisis: Perpindahan (Displacement)
**Perpindahan ($\\Delta x$)** adalah besaran vektor.
- **Definisi**: Jarak garis lurus paling pendek dari Titik Awal ke Titik Akhir, dilengkapi dengan arah.
- **Rumus Matematika**: 
  $$ \\Delta x = x_{akhir} - x_{awal} $$
- **Sifat**: Sangat peduli arah. Bisa positif (gerak ke kanan/maju), bisa negatif (gerak ke kiri/mundur), dan bisa **nol**.

> [!TIP]
> **Ingat Analogi Siklus Tertutup:** Jika Anda lari memutari lapangan sepak bola satu putaran penuh lalu kembali berdiri di titik Start:
> - **Jarak** Anda = 400 meter (Anda pasti berkeringat).
> - **Perpindahan** Anda = 0 meter (Secara fisika, Anda seolah-olah "tidak ke mana-mana").

## 2.4 Studi Kasus Analisis Vektor 1 Dimensi
Bayangkan Anda berada di posisi $x_0 = 0$.
1. Anda berjalan maju ke kanan sejauh 5 meter. Posisi Anda $x_1 = 5$.
2. Anda berbalik mundur ke kiri sejauh 8 meter. Posisi Anda $x_2 = -3$.

Mari kita hitung:
**Jarak Total**: $|5| + |-8| = 13$ meter. (Lintasan langkah kaki Anda).
**Perpindahan**: $x_{akhir} - x_{awal} = -3 - 0 = -3$ meter. (Berarti Anda berada 3 meter di sebelah kiri dari titik asal).

\`\`\`mermaid
flowchart LR
    A((x=-3 \n Akhir)) <-- Bergerak mundur 8m --- B((x=+5 \n Titik Balik))
    C((x=0 \n Start)) --->|Maju 5m| B
    style C fill:#9f9
    style A fill:#f99
\`\`\`

Memahami perbedaan absolut antara skalar dan vektor ini krusial. Kegagalan membedakan keduanya adalah alasan mengapa roket bisa salah orbit. Pada modul berikutnya, kita akan melihat bagaimana turunan dari kedua besaran ini melahirkan Kelajuan dan Kecepatan.`
  },
  {
    title: "Modul 3: Kelajuan vs Kecepatan (Dari Skalar ke Vektor Fisis)",
    duration: "70m",
    orderIndex: 3,
    contentMd: `# Modul 3: Kelajuan vs Kecepatan (Dari Skalar ke Vektor Fisis)

Setelah menguasai Jarak dan Perpindahan, kita menambahkan satu variabel baru ke dalam persaman: **Waktu**. 
Berapa cepat jarak atau perpindahan tersebut berubah seiring berjalannya waktu? Di sinilah lahir konsep Kelajuan (Speed) dan Kecepatan (Velocity). Dalam bahasa percakapan sehari-hari, dua kata ini sering disamakan. Namun dalam Fisika, perbedaannya bagai siang dan malam.

## 3.1 Kelajuan (Speed): Anak dari Jarak
Karena Jarak adalah besaran skalar, maka turunan atau lajunya juga merupakan skalar.
- **Definisi**: Kelajuan adalah rasio antara Jarak total yang ditempuh dengan Waktu total yang dibutuhkan.
- **Sifat**: Sama seperti Jarak, kelajuan tidak peduli pada arah dan tidak pernah bernilai negatif. 

**Rumus Kelajuan Rata-Rata ($v$)**:
$$ v = \\frac{\\text{Jarak Total}}{\\text{Waktu Total}} = \\frac{\\Sigma s}{\\Sigma t} $$

**Contoh di Dunia Nyata**: Spidometer di dalam mobil. Jarum spidometer menunjukkan angka "80 km/jam". Ia tidak memberi tahu Anda apakah Anda mengemudi menuju jurang atau menuju rumah. Ia hanya mengukur skalar.

## 3.2 Kecepatan (Velocity): Pewaris Takhta Vektor
Karena Perpindahan adalah vektor, turunannya pun adalah vektor.
- **Definisi**: Kecepatan adalah seberapa cepat **perpindahan** posisi terjadi ke arah tertentu.
- **Sifat**: Memiliki arah. Kecepatan bisa bernilai positif (melaju ke kanan/atas), negatif (mundur/ke kiri/bawah), dan bisa nol mutlak jika perpindahannya nol.

**Rumus Kecepatan Rata-Rata ($\\bar{v}$)**:
$$ \\bar{v} = \\frac{\\text{Perpindahan}}{\\text{Interval Waktu}} = \\frac{\\Delta x}{\\Delta t} = \\frac{x_2 - x_1}{t_2 - t_1} $$

## 3.3 Bedah Kasus: The "Return to Origin" Paradox
Mari kita lihat kekuatan matematika vektor dalam memecahkan paradoks sehari-hari.

> **Skenario:** Seorang pilot mengendarai pesawat jet dari Jakarta ke Bali (sejauh 1.000 km lurus ke Timur). Penerbangan ke sana memakan waktu 1 jam. Pesawat langsung putar balik kembali ke Jakarta (1.000 km ke Barat) yang juga memakan waktu 1 jam.

Mari kita hitung:
- **Total Jarak ($s$)**: 1.000 km + 1.000 km = 2.000 km
- **Total Waktu ($t$)**: 1 jam + 1 jam = 2 jam

**Kelajuan Rata-Rata**:
$$ \\text{Kelajuan} = \\frac{2000 \\text{ km}}{2 \\text{ jam}} = 1000 \\text{ km/jam} $$

Namun, bagaimana dengan kecepatannya?
- Posisi Awal ($x_1$): Jakarta (anggap kordinat 0)
- Posisi Akhir ($x_2$): Jakarta (kembali ke kordinat 0)
- **Perpindahan ($\\Delta x$)**: $0 - 0 = 0 \\text{ km}$

**Kecepatan Rata-Rata**:
$$ \\bar{v} = \\frac{\\Delta x}{\\Delta t} = \\frac{0 \\text{ km}}{2 \\text{ jam}} = 0 \\text{ km/jam} $$

> [!CAUTION]
> **Kesimpulan Kritis:** Benda yang bergerak sangat cepat dengan kelajuan tinggi bisa memiliki Kecepatan Rata-Rata bernilai NOL jika benda tersebut pada akhirnya kembali ke titik semula. Fisika menghargai "hasil akhir spasial" pada perhitungan vektor.

Memahami hal ini akan mengantarkan kita pada pemahaman tentang analisis kecepatan pada durasi waktu yang teramat sangat singkat, yang disebut Kecepatan Sesaat di modul berikutnya.`
  },
  {
    title: "Modul 4: Kecepatan Sesaat dan Limit Kalkulus dalam Kinematika",
    duration: "80m",
    orderIndex: 4,
    contentMd: `# Modul 4: Kecepatan Sesaat dan Limit Kalkulus

Pada modul sebelumnya kita membahas Kecepatan Rata-Rata, yang mengukur pergerakan dari awal hingga akhir tanpa peduli apa yang terjadi di pertengahan jalan. Namun, alam semesta bergerak secara kontinyu dari detik ke detik. Untuk membaca pergerakan alam secara akurat di setiap milisekonnya, Fisika harus meminjam alat terkuat dari Matematika: **Kalkulus**.

## 4.1 Problematika Kecepatan Rata-Rata
Jika Anda mengukur kecepatan dari menit ke-0 hingga menit ke-60, Anda mendapat kecepatan rata-rata. Namun bagaimana jika mobil itu sempat berhenti di lampu merah pada menit ke-15? Kecepatan rata-rata tidak bisa "melihat" lampu merah tersebut; ia mem-blur seluruh sejarah perjalanan Anda.

Bagaimana cara kita mengetahui kecepatan mobil *tepat pada detik ke-15, koma 34*?

## 4.2 Menuju Nol: Konsep Limit ($\lim_{\\Delta t \\to 0}$)
Ide Isaac Newton (dan Leibniz) sangat elegan: Untuk mencari kecepatan pada satu momen sesaat, kita perkecil rentang waktu pengamatan ($\\Delta t$) menjadi sangat kecil, sekecil-kecilnya hingga hampir menyentuh angka nol, tetapi bukan nol mutlak.

Jika $\\Delta t$ terus mengecil menjadi pecahan waktu terkecil (milisekon, nanosekon), kecepatan rata-rata yang diukur di rentang yang nyaris nol itu akan menjadi **Kecepatan Sesaat (Instantaneous Velocity)**.

## 4.3 Definisi Matematis Turunan Posisi
Di dalam matematika, operasi melilit rentang waktu hingga mendekati nol disimbolkan dengan limit. Rasio $\\frac{\\Delta x}{\\Delta t}$ akan bertransformasi menjadi **Derivatif (Turunan)** $\\frac{dx}{dt}$.

$$ v(t) = \lim_{\\Delta t \\to 0} \\frac{\\Delta x}{\\Delta t} = \\frac{dx}{dt} $$

- Notasi $dx$ bermakna "perubahan posisi yang sangat kecil tak berhingga" (infinitesimal).
- Notasi $dt$ bermakna "rentang waktu yang sangat kecil tak berhingga".

> [!TIP]
> **Trik Mengingat:** Jika kelajuan rata-rata adalah membaca riwayat seluruh perjalanan, Kecepatan Sesaat ($v$) adalah apa yang Anda lihat ketika Anda melihat ke arah *spidometer* di satu kedipan mata tertentu.

## 4.4 Arti Geometris: Gradien Garis Singgung
Jika Anda menggambarkan pergerakan mobil dalam bentuk kurva grafik Posisi terhadap Waktu (Kurva x-t).
- Kecepatan Rata-rata adalah garis lurus (sekan) yang menghubungkan dua titik di kurva.
- **Kecepatan Sesaat** adalah garis singgung (tangen) yang menggores kurva hanya di TEPAT SATU TITIK yang sedang dievaluasi. Kemiringan (gradien) dari garis singgung tersebut adalah nilai eksak dari kecepatan sesaat benda.

### Mengapa ini penting untuk GLB?
Kalkulus sesaat ini sangat penting. Namun dalam topik kita selanjutnya, Gerak Lurus Beraturan (GLB), kita akan dihadapkan pada skenario paling membahagiakan: sebuah gerak di mana **kecepatan rata-rata selalu SAMA PERSIS dengan kecepatan sesaatnya** setiap waktu.`
  },
  {
    title: "Modul 5: Konsep Dasar Gerak Lurus Beraturan (GLB)",
    duration: "65m",
    orderIndex: 5,
    contentMd: `# Modul 5: Konsep Dasar Gerak Lurus Beraturan (GLB)

Selamat! Anda telah melewati teori-teori rumit kalkulus dan vektor. Sekarang kita menyatukan kepingan puzzle tersebut ke dalam model gerakan paling purba, stabil, dan elegan di mekanika klasik: **Gerak Lurus Beraturan (GLB) / Uniform Rectilinear Motion**.

## 5.1 Apa itu GLB?
Definisi GLB terukir langsung dalam namanya:
- **Gerak**: Ada perubahan posisi terhadap waktu.
- **Lurus**: Lintasannya berupa satu dimensi garis lurus murni. Artinya vektor arah tidak pernah berbelok sedetik pun.
- **Beraturan**: Nilai kecepatan selalu stabil, konsisten, dan identik dari awal waktu (Big Bang) hingga akhir waktu.

> [!IMPORTANT]
> **Hukum Suci GLB:** Pada Gerak Lurus Beraturan, kecepatan benda ($v$) bernilai konstan absolut. 
> $$ v = \\text{Konstan} $$

## 5.2 Hubungan dengan Hukum I Newton (Inersia)
Mengapa benda bisa mengalami GLB?
Sir Isaac Newton merumuskan Hukum Inersia: *"Setiap benda akan mempertahankan keadaan diam atau bergerak lurus beraturan, kecuali ada gaya eksternal (resultan gaya) yang bekerja padanya."*

Artinya, jika resultan gaya yang bekerja pada benda adalah nol ($\\Sigma F = 0$), benda itu secara otomatis akan melakukan GLB tanpa henti. Di luar angkasa yang sunyi dan tanpa gesekan, setiap benda melayang bebas dengan GLB.

## 5.3 Konsekuensi Logis: Percepatan Nol
Apa yang terjadi ketika kecepatan suatu benda konstan?
Mari kita ingat bahwa **Percepatan ($a$)** adalah laju perubahan kecepatan terhadap waktu ($a = \\frac{dv}{dt}$).
Jika kecepatan tidak berubah, laju perubahannya otomatis **TIDAK ADA**.

Secara matematis: Turunan dari sebuah konstanta adalah nol.
Karena $v = C$ (konstan), maka $a = \\frac{d(C)}{dt} = 0$.

**Sifat Inti GLB**: Percepatan mutlak sama dengan **0**. 

## 5.4 Implikasi GLB pada Kecepatan Sesaat
Karena kecepatan selalu sama di setiap detiknya, maka **Kecepatan Sesaat = Kecepatan Rata-Rata**.
Anda tidak perlu menggunakan limit kalkulus yang rumit untuk menghitung kecepatan di GLB. Jika mobil melaju konstan 50 m/s sejak jam 1 hingga jam 3, maka di menit berapapun Anda melihat, kecepatannya pasti eksak 50 m/s.

Ini membuat rumus kecepatan rata-rata $\\bar{v} = \\frac{\\Delta x}{\\Delta t}$ langsung sah digunakan sebagai identitas tunggal $v$ pada GLB. Dan dari situlah kita akan menurunkan fungsi absolut pemodelan ruang dan waktu di Modul 6.`
  },
  {
    title: "Modul 6: Konstruksi Matematika: Fungsi Posisi x(t)",
    duration: "90m",
    orderIndex: 6,
    contentMd: `# Modul 6: Konstruksi Matematika - Fungsi Posisi x(t)

Misi utama seorang fisikawan adalah memprediksi ke mana sebuah objek akan berada di masa depan. Kita tidak hanya mengamati, kita mengkalkulasi takdir (dalam kerangka mekanika deterministik). Pada modul ini, kita akan meracik "mantra peramal" bagi benda yang bergerak dengan GLB.

## 6.1 Beranjak dari Definisi
Mari kita berangkat dari persamaan GLB yang sudah kita setujui di modul sebelumnya:
$$ v = \\frac{\\Delta x}{\\Delta t} $$

Kita bisa menguraikan komponen delta (perubahan):
- $\\Delta x = x(t) - x_0$
  Di mana $x(t)$ adalah posisi akhir (posisi pada waktu $t$), dan $x_0$ adalah posisi awal (saat stopwatch dinyalakan).
- $\\Delta t = t - t_0$
  Kita bisa mereset stopwatch agar waktu awal $t_0 = 0$. Sehingga $\\Delta t = t - 0 = t$.

Mari substitusikan kembali uraian ini ke dalam persamaan utama:
$$ v = \\frac{x(t) - x_0}{t} $$

## 6.2 Aljabar Menuju Fungsi Takdir
Kita perlu mengisolasi $x(t)$ (Posisi Masa Depan) sendirian di salah satu sisi persamaan. Ini membutuhkan dua langkah aljabar dasar.

**Langkah 1**: Kalikan kedua ruas dengan $t$ untuk menghilangkan penyebut.
$$ v \\cdot t = x(t) - x_0 $$

**Langkah 2**: Pindahkan posisi awal ($-x_0$) ke ruas sebelahnya (menjadi $+x_0$).
$$ x_0 + v \\cdot t = x(t) $$

Susun ulang agar lebih rapi secara konvensional:
> ### $$ x(t) = x_0 + v \\cdot t $$

## 6.3 Anatomi Persamaan Posisi (Deep Analysis)
Mari kita bedah filosofi dari fungsi linear mahakarya ini:
* **$x(t)$** $\\rightarrow$ Adalah **Visi Masa Depan**. Ini menjawab pertanyaan "Di koordinat mana benda ini akan berada saat jam menunjukkan waktu $t$?"
* **$x_0$** $\\rightarrow$ Adalah **Warisan Masa Lalu**. Posisi titik mulai Anda. Jika Anda memulai balapan 10 meter di depan garis start, alam semesta memperhitungkan "bonus" ini.
* **$v \\cdot t$** $\\rightarrow$ Adalah **Akumulasi Masa Kini**. Seberapa banyak perpindahan yang Anda *hasilkan* dan *kumpulkan* setiap detiknya (kecepatan $v$) dikalikan berapa lama Anda melangsungkan aksi tersebut (waktu $t$).

Secara puitis, persamaan ini berkata:
*"Posisi Anda di masa depan adalah hasil dari posisi awal tempat Anda dilahirkan, ditambah dengan seluruh perpindahan yang Anda akumulasikan perlahan-lahan seiring berjalannya waktu."*

### Contoh Pemodelan
Sebuah roket Voyager meninggalkan stasiun bumi (posisi awal $x_0 = 1.000$ km dari pusat) dengan kecepatan konstan menembus ruang hampa sebesar $v = 10.000$ km/jam.
Di mana roket berada 5 jam kemudian?
- $x(t) = x_0 + v \\cdot t$
- $x(5) = 1.000 + (10.000 \\times 5)$
- $x(5) = 1.000 + 50.000 = 51.000$ km.
Kalkulasi sempurna dan deterministik tanpa memerlukan eksperimen fisik.`
  },
  {
    title: "Modul 7: Analisis Grafik Kinematika (x-t dan v-t) pada GLB",
    duration: "75m",
    orderIndex: 7,
    contentMd: `# Modul 7: Analisis Grafik Kinematika (x-t dan v-t) pada GLB

Fisikawan sangat mencintai representasi visual. Mata manusia didesain lebih hebat dalam membaca pola garis daripada rentetan angka desimal. Di sinilah pentingnya kemampuan Anda menerjemahkan **Persamaan Matematis** menjadi **Grafik Geometris**.

Kita akan membedah dua grafik paling penting dalam kinematika 1D.

## 7.1 Grafik Posisi terhadap Waktu (Grafik x-t)
Grafik $x-t$ meletakkan **Waktu (s)** di sumbu horisontal ($X$) dan **Posisi (m)** di sumbu vertikal ($Y$).

Jika kita lihat kembali fungsi kita: $x(t) = v \\cdot t + x_0$.
Secara matematis, ini sangat identik dengan persamaan garis lurus aljabar linier:
**$y = m \\cdot x + c$**
- Variabel fungsi ($y$) $\\rightarrow$ Posisi ($x$).
- Sumbu horizontal ($x$) $\\rightarrow$ Waktu ($t$).
- Intersep Y ($c$) $\\rightarrow$ Posisi Awal ($x_0$).
- **Gradien / Kemiringan ($m$) $\\rightarrow$ Kecepatan ($v$).**

> [!TIP]
> **Aturan Emas Grafik x-t**: Kemiringan (gradien) dari grafik Posisi vs Waktu selalu menggambarkan Kecepatan benda.
> - Garis yang menanjak naik tajam = Kecepatan maju sangat besar.
> - Garis menanjak landai = Kecepatan maju pelan.
> - Garis datar/horizontal murni (gradien nol) = Kecepatan nol (Benda **DIAM**).
> - Garis menurun ke bawah = Kecepatan negatif (Benda **MUNDUR** ke titik asal).

\`\`\`mermaid
xychart-beta
    title "Grafik Posisi terhadap Waktu (GLB) Maju Konstan"
    x-axis "Waktu t (sekon)" [0, 1, 2, 3, 4, 5]
    y-axis "Posisi x (meter)" 0 --> 50
    line [10, 18, 26, 34, 42, 50]
\`\`\`
*(Contoh di atas memiliki intersep $x_0 = 10$, dan kecepatan $v = 8$ m/s, ditandai dari garis yang menanjak linier).*

## 7.2 Grafik Kecepatan terhadap Waktu (Grafik v-t)
Apa jadinya jika sumbu vertikalnya kita ubah menjadi **Kecepatan (v)**?
Ingat Hukum Suci GLB di Modul 5: Kecepatan selalu konstan!

Oleh karena itu, pada grafik v-t, garis GLB tidak akan pernah naik atau turun. Ia adalah garis datar, sejajar sempurna secara horizontal dengan sumbu waktu.

\`\`\`mermaid
xychart-beta
    title "Grafik Kecepatan terhadap Waktu (GLB)"
    x-axis "Waktu t (sekon)" [0, 1, 2, 3, 4, 5]
    y-axis "Kecepatan v (m/s)" 0 --> 30
    line [25, 25, 25, 25, 25, 25]
\`\`\`

### Integrasi Geometris: Mencari Jarak dari Grafik
Fakta mengagumkan dari Kalkulus Integral yang diaplikasikan ke geometri:
**"Luas area yang diarsir di bawah garis grafik v-t adalah sama dengan Perpindahan ($\\Delta x$) benda tersebut."**

Jika benda bergerak selama 5 detik dengan kecepatan 25 m/s, grafik tersebut membentuk sebuah balok persegi panjang dengan dimensi:
- Panjang (alas) = 5
- Lebar (tinggi) = 25
Luas = Alas $\\times$ Tinggi = $5 \\times 25 = 125$ meter.

Secara matematis, ini adalah kalkulasi $\\Delta x = v \\cdot t$. Geometri dan aljabar saling merangkul membentuk kesatuan harmoni kebenaran yang mutlak.`
  },
  {
    title: "Modul 8: Studi Kasus Kompleks dan Relativitas Galilean",
    duration: "85m",
    orderIndex: 8,
    contentMd: `# Modul 8: Studi Kasus Kompleks dan Relativitas Galilean

Sebagai modul pamungkas penutup materi GLB, kita akan menantang intuisi Anda dengan kasus dunia nyata yang menggabungkan semua prinsip dari Modul 1 hingga 7. Kita akan menganalisis kasus pencegatan antar dua objek.

## 8.1 Studi Kasus: Tabrakan (Intercept) Dua Benda
Masalah fisika paling klasik adalah masalah pertemuan.

**Skenario:**
Kereta A berada di posisi $x_A = 0$ m dan melaju ke kanan (Timur) dengan kecepatan $v_A = 20$ m/s.
Kereta B berada sejauh 1.000 meter di sebelah kanan ($x_B = 1000$ m) dan melaju ke kiri (Barat) mendekati Kereta A dengan kecepatan $v_B = -30$ m/s (Tanda minus menandakan arah ke kiri).

Kapan dan di koordinat mana kedua kereta tersebut bertabrakan secara tragis?

### A. Konstruksi Persamaan Takdir
Kita tuliskan fungsi posisi $x(t)$ untuk masing-masing kereta berdasarkan persamaan $x(t) = x_0 + vt$:
- Fungsi Kereta A: $x_A(t) = 0 + 20t$
- Fungsi Kereta B: $x_B(t) = 1000 - 30t$

### B. Momen Persimpangan
Secara definisi logis, "Bertabrakan" berarti berada pada **waktu yang sama** ($t$) dan **lokasi koordinat yang persis sama** ($x_A = x_B$).
Mari kita samakan kedua persamaan tersebut:
$$ 20t = 1000 - 30t $$

Pindahkan variabel $t$ ke satu sisi (tambahkan 30t ke ruas kiri):
$$ 20t + 30t = 1000 $$
$$ 50t = 1000 $$
$$ t = 20 \\text{ sekon} $$

**Momen Waktu Kejadian:** Ledakan tabrakan terjadi tepat pada detik ke-20.

### C. Lokasi Episenter Ledakan
Untuk mencari koordinat $x$ tabrakan, masukkan waktu $t=20$ ke salah satu persamaan (pilih yang mana saja hasilnya akan konsisten):
$$ x_A(20) = 20 \\times 20 = 400 \\text{ meter} $$
*(Verifikasi dari sisi B: $x_B(20) = 1000 - 30(20) = 1000 - 600 = 400$ meter. Sangat konsisten!)*

Keduanya akan bertabrakan di penanda KM 400.

## 8.2 Pengantar Relativitas Galilean
Skenario di atas membuktikan kekuatan persamaan absolut Newton-Galilean. Galilean bertumpu pada keyakinan bahwa *waktu absolut sama di mana-mana*. Detik ke-20 bagi masinis A adalah sama persis dengan detik ke-20 bagi masinis B.

Jika Kereta A diamati dari kerangka acuan Kereta B (Seolah-olah pengamat duduk di B dan menganggap B diam), maka Kereta A terlihat mendekat dengan kecepatan yang merupakan jumlah relatif absolut keduanya ($20 - (-30) = 50$ m/s). 

## 8.3 Kesimpulan Akhir
Seluruh ilmu roket, satelit GPS, balistik peluru, dan navigasi pelayaran dunia dibangun dari blok lego kecil bernama GLB ini. Kita belum menambahkan faktor percepatan (gravitasi atau gesekan), yang akan mengubah fungsi linier ini menjadi fungsi parabola (kuadratik) yang melahirkan Gerak Lurus Berubah Beraturan (GLBB).

Namun, sebelum beranjak ke sana, pastikan fondasi Anda tak tertembus. Selamat telah menyelesaikan program Master Class Kinematika Fundamental bagian GLB!
`
  }
];

async function main() {
  const course = await prisma.course.findFirst({
    where: { title: "Physics for Beginners" }
  });

  if (!course) {
    console.error("Course 'Physics for Beginners' not found. Please run the original seed first.");
    return;
  }

  // Delete existing dummy modules for this course
  await prisma.courseModule.deleteMany({
    where: { courseId: course.id }
  });
  console.log('Deleted old generic modules.');

  // Create new extremely detailed modules
  for (const mod of physicsModules) {
    await prisma.courseModule.create({
      data: {
        courseId: course.id,
        title: mod.title,
        duration: mod.duration,
        orderIndex: mod.orderIndex,
        contentMd: mod.contentMd
      }
    });
    console.log('Created:', mod.title);
  }

  console.log('Successfully updated Physics for Beginners course with 8 COMPREHENSIVE modules!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
