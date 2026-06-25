import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contentData: Record<string, string> = {
  // ====================== BAGIAN 9 ======================
  "Sub-bab 1: Asal Mula Gaya Sentripetal": `Selamat datang di dunia yang penuh putaran! Di bab ini, kita akan membongkar salah satu kebohongan terbesar yang sering dipercaya orang awam saat naik wahana *Roller Coaster* atau *Korsel*.

Pernahkah kamu duduk di dalam mobil yang tiba-tiba berbelok tajam ke kanan? Tubuhmu pasti merasa "terlempar" keras ke arah kiri, menabrak pintu mobil. Orang-orang sering menyebut gaya "lemparan ke luar" ini sebagai **Gaya Sentrifugal**.
Tahukah kamu? **Gaya Sentrifugal itu sebenarnya TIDAK ADA!** Ia adalah gaya fiktif (gaya khayalan) yang diciptakan oleh otakmu karena tubuhmu menolak untuk berbelok.

### Sang Sutradara Asli: Gaya Sentripetal
Mari kita kembali ke Hukum I Newton: "Benda pemalas selalu ingin bergerak LURUS."
Saat mobil berbelok ke kanan, tubuhmu yang pemalas ingin terus melaju LURUS ke depan (menembus kaca depan). Namun karena mobil berbelok ke kanan, pintu sebelah kirimu tiba-tiba bergerak merangsek ke arah kanan dan "menabrak" tubuhmu yang sedang lurus! Jadi, kamu tidak terlempar ke kiri; pintu mobilnyalah yang memukulmu dari kiri!

Agar sebuah benda bisa **dipaksa** berbelok membentuk lingkaran dan tidak kabur lurus, harus ada sebuah gaya kuat yang secara terus-menerus **menariknya ke arah PUSAT LINGKARAN**. Gaya "penculik" inilah yang disebut dengan **Gaya Sentripetal ($F_s$)**.
Kata sentripetal berasal dari bahasa Latin yang berarti "Mencari Pusat".

### Gaya Sentripetal Bukanlah Gaya Baru!
Ini adalah rahasia terpenting: **Gaya sentripetal bukanlah sebuah jenis gaya baru di alam semesta.** Ia hanyalah sebuah "Jabatan" atau "Titel".
Sama seperti jabatan "Kapten Tim". Siapa pun bisa menjadi kapten tim, baik itu Budi, Andi, atau Joko.
Di dunia Fisika:
- Saat kamu memutar batu yang diikat tali, siapa yang bertindak menarik batu ke pusat? **Gaya Tegang Tali ($T$)**. Maka Tali-lah yang menjabat sebagai Gaya Sentripetal.
- Saat Bumi mengelilingi Matahari, siapa yang menarik Bumi agar tidak kabur ke ujung galaksi? **Gaya Gravitasi ($F_g$)**. Maka Gravitasi-lah yang menjabat sebagai Gaya Sentripetal.
- Saat mobil berbelok di tikungan mendatar, siapa yang menahan bannya? **Gaya Gesek Statis ($f_s$)**.

Jadi, dalam Hukum II Newton untuk gerak melingkar, kita menulis:
$$\\Sigma F_{pusat} = m \\cdot a_s$$
**$$\\Sigma F_{pusat} = m \\cdot \\frac{v^2}{R}$$**
*(Di mana $v$ adalah kecepatan laju kendaraan, dan $R$ adalah jari-jari tikungannya).*

Siapapun gaya yang menunjuk ke arah pusat lingkaran, ia akan mendapat tanda Positif (+). Siapapun gaya yang menunjuk ke luar lingkaran, ia mendapat tanda Minus (-).

\`\`\`inlinequiz
{
  "question": "Saat kamu memutar ember berisi air secara vertikal (seperti kincir ria), tepat saat ember berada di titik TERTINGGI (puncak putaran), airnya tidak tumpah ke kepalamu. Siapa sajakah aktor yang secara bersama-sama sedang menjabat sebagai Gaya Sentripetal (menarik ke pusat/bawah) pada detik tersebut?",
  "options": [
    "Hanya Gaya Gravitasi Bumi (Berat Air).",
    "Gaya Tegang Tali ke atas dikurangi Gaya Berat Air.",
    "Gaya Berat Air ke bawah DAN Gaya Normal dari dasar ember yang juga menekan ke bawah.",
    "Gaya Sentrifugal yang menarik air ke atas."
  ],
  "answer": 2,
  "explanation": "Tepat sekali! Di titik puncak, pusat lingkarannya berada di BAWAH. Gaya berat air (w) mengarah ke bawah, dan dasar ember (yang posisinya sedang terbalik di atas air) juga menekan air ke bawah (Normal). Kedua gaya ini berkolaborasi mendorong air ke pusat lingkaran untuk memaksanya berbelok turun!"
}
\`\`\`
`,

  "Sub-bab 2: Analisis Ayunan Konis": `Pernahkah kamu bermain wahana Ontang-Anting di Dufan? Kursi-kursi digantung dengan tali panjang, lalu pilar tengahnya berputar semakin cepat. Semakin kencang pilar itu berputar, kursimu akan semakin "terangkat" miring ke atas menjauhi pilar, membentuk sebuah lintasan mirip kerucut terbalik. Inilah yang di dalam fisika disebut sebagai **Ayunan Konis** (dari kata *Cone* yang berarti Kerucut).

### Misteri Keseimbangan Ontang-Anting
Mari kita gambar Free Body Diagram (FBD) dari kursimu saat sedang melayang miring di udara dengan sudut $\\theta$ terhadap tiang vertikal.
Hanya ada 2 (dua) gaya asli yang bekerja pada tubuhmu:
1. **Gaya Berat ($w = mg$)** yang menarikmu lurus tembus ke tanah.
2. **Gaya Tegang Tali ($T$)** yang menarikmu miring ke arah poros atap wahana.

Tunggu dulu, jika hanya ada dua gaya itu, SIAPA yang menarik tubuhmu ke arah pusat putaran (pusat lingkaran di udara)?
Jawabannya: **Kembaran dari si Tali!**

Gaya tegang tali yang miring itu harus kita proyeksikan (belah) menjadi dua sumbu:
- Sumbu Y (Vertikal): $T_y = T \\cos\\theta$. Tugasnya adalah melawan gravitasi agar kamu tidak jatuh ke tanah.
- Sumbu X (Horizontal menunjuk pusat): $T_x = T \\sin\\theta$. **Inilah sang Pahlawan Sentripetal kita!**

### Persamaan Matematika Ayunan Konis
Mari kita susun persamaan Hukum II Newton:
**1. Sumbu Y (Atas-Bawah):** Kamu tidak melayang terbang ke langit atau jatuh ke tanah, jadi kamu seimbang secara vertikal.
$$T \\cos\\theta - mg = 0$$
**$$T \\cos\\theta = mg$$**

**2. Sumbu X (Menuju Pusat Lingkaran):** Di sinilah jabatan Sentripetal bekerja.
$$\\Sigma F_{pusat} = m \\cdot a_s$$
**$$T \\sin\\theta = m \\cdot \\frac{v^2}{R}$$**

Mari kita lakukan sihir Matematika Pembagian Persamaan (Persamaan X dibagi Persamaan Y):
$$\\frac{T \\sin\\theta}{T \\cos\\theta} = \\frac{m \\cdot v^2 / R}{mg}$$

Coret huruf $T$ dan huruf $m$:
$$\\tan\\theta = \\frac{v^2}{g \\cdot R}$$

Luar Biasa! Kita baru saja menemukan rumus legendaris Ayunan Konis. 
Rumus ini menyatakan bahwa sudut kemiringan kursi ($\\tan\\theta$) HANYA bergantung pada seberapa kencang wahana itu berputar ($v^2$) dan seberapa panjang lengan wahananya ($R$).
**Massa orang yang duduk ($m$) sama sekali tidak berpengaruh!**
Itu berarti, baik kursi itu diduduki oleh binaragawan 100 kg ataupun anak kecil 20 kg, kursi mereka akan miring pada sudut elevasi yang sama persis jika wahananya berputar pada kecepatan yang sama!

\`\`\`inlinequiz
{
  "question": "Jika operator wahana Ontang-Anting mempercepat putaran mesinnya menjadi 2 KALI LIPAT lebih cepat dari sebelumnya (v menjadi 2v), apa yang akan terjadi pada kemiringan tali (tan theta)?",
  "options": [
    "Miring 2 kali lipat lebih besar.",
    "Miring 4 kali lipat lebih besar.",
    "Tetap sama karena massanya tidak berubah.",
    "Miring setengah kali lipat lebih kecil."
  ],
  "answer": 1,
  "explanation": "Brilian! Karena rumusnya adalah tan(theta) = v^2 / (g R). Nilai kecepatan (v) berada di dalam kuadrat. Jika v dilipatgandakan menjadi 2, maka hasil kuadratnya adalah 4. Jadi kemiringan tali (tangen sudutnya) akan mekar 4 KALI LIPAT lebih ekstrem ke luar!"
}
\`\`\`
`,

  "Sub-bab 3: Kendaraan Berbelok di Tikungan Datar dan Miring": `Pernahkah kamu menonton balapan mobil F1 atau Moto GP? Saat membalap di jalan lurus, mobil atau motor bisa melesat sesuka hati. Tapi saat memasuki tikungan, mengapa mereka harus melambat? Dan mengapa di sirkuit balap, tikungannya tidak dibuat mendatar, melainkan aspalnya sengaja dibuat MIRING menyudut seperti dinding mangkuk raksasa?

### Skenario 1: Tikungan Aspal Mendatar (Jalan Raya Biasa)
Bayangkan sebuah mobil masuk ke tikungan bundaran HI. Apa yang membuat mobil itu berhasil berbelok (tidak terlempar lurus menabrak trotoar)?
Jawabannya adalah **Gaya Gesek Statis ($f_s$) dari aspal ke ban mobil**.

- Pada tikungan datar, Pusat Lingkaran berada di sebelah kiri atau kanan mobil sejajar aspal.
- Satu-satunya gaya mendatar yang bisa menunjuk ke pusat lingkaran adalah $f_s$.
Maka, persamaannya:
$$\\Sigma F_{pusat} = m \\frac{v^2}{R}$$
**$$f_{s,max} = m \\frac{v^2}{R}$$**
**$$\\mu_s \\cdot N = m \\frac{v^2}{R}$$**
Karena jalanan datar, Normal sama dengan Berat ($N = mg$).
$$\\mu_s \\cdot mg = m \\frac{v^2}{R}$$
Massa ($m$) dicoret:
**$$v_{max} = \\sqrt{\\mu_s \\cdot g \\cdot R}$$**

Inilah **Kecepatan Maksimal Mutlak** yang tidak boleh dilanggar. Jika sopir nekat menginjak gas melebihi $v_{max}$, mobil membutuhkan gaya sentripetal yang lebih besar dari kemampuan maksimal aspal ($\\mu_s$). Hasilnya? Mobil akan "Nge-Drift" dan terlempar ke luar trotoar karena kekurangan gaya penarik pusat!

### Skenario 2: Tikungan Aspal Miring (Sirkuit Balap Velodrome)
Di ajang balap, kecepatan mobil sangat gila. Mengandalkan gesekan aspal ($\\mu_s$) sangatlah berisiko. Jika turun hujan, $\\mu_s$ aspal langsung hilang licin dan pembalap akan tewas menabrak dinding!
Solusinya? Para insinyur memiringkan aspalnya sebesar sudut $\\theta$ ke arah dalam.

Dengan memiringkan aspal, kita mengaktifkan pahlawan baru: **Komponen Gaya Normal ($N_x$)**.
Mobil yang miring akan ditekan keluar oleh aspal tegak lurus miring. Gaya Normal miring ini dibelah menjadi dua:
- $N_y = N \\cos\\theta$ (menahan mobil agar tidak jatuh).
- $N_x = N \\sin\\theta$ (menunjuk ke PUSAT LINGKARAN).

Sekarang, yang menyediakan Gaya Sentripetal BUKAN LAGI Gesekan, melainkan Gaya Normal ($N \\sin\\theta$)!
Dengan trik pembagian (Sumbu X dibagi Sumbu Y) yang sama persis seperti pada materi *Ayunan Konis*, kita akan mendapatkan hasil ajaib yang sama:
**$$\\tan\\theta = \\frac{v^2}{g \\cdot R}$$**

Artinya, jika insinyur sudah menentukan sudut kemiringan tikungan $\\theta$, maka ada SATU KECEPATAN SEMPURNA ($v$) yang memungkinkan mobil berbelok mulus **TANPA MEMBUTUHKAN GAYA GESEK SAMA SEKALI** (bahkan jika aspalnya terbuat dari es batu yang super licin)! Kecepatan inilah yang disebut *Design Speed* (Kecepatan Rancangan).

\`\`\`inlinequiz
{
  "question": "Di sebuah tikungan miring ber-es yang 100% sangat licin (tanpa gesekan sama sekali), sebuah mobil sport masuk tikungan dengan kecepatan yang JAUH LEBIH LAMBAT dari 'Kecepatan Sempurna' (Design Speed) tikungan tersebut. Apa yang akan terjadi pada mobil sport tersebut?",
  "options": [
    "Mobil akan berbelok dengan mulus dan aman.",
    "Mobil akan tergelincir melorot turun ke arah PUSAT tikungan (ke jurang dalam).",
    "Mobil akan tergelincir terlempar ke LUAR tikungan (ke pembatas atas).",
    "Mobil akan otomatis berhenti mendadak."
  ],
  "answer": 1,
  "explanation": "Analisis yang tajam! Kecepatan yang terlalu lambat berarti Gaya Sentripetal (mv^2/R) yang dibutuhkan sangatlah KECIL. Padahal Gaya Normal dari aspal (N sin theta) yang menariknya ke pusat tetap SANGAT BESAR (karena tikungannya miring terjal). Akibatnya gaya tarik pusat 'menang', sehingga mobil malah melorot jatuh ke arah parit pusat lingkaran karena saking pelannya!"
}
\`\`\`
`,

  // ====================== BAGIAN 10 ======================
  "Sub-bab 1: Definisi Usaha (Dot Product Gaya & Perpindahan)": `Selamat datang di babak baru Fisika: Dunia Energi! Di bab sebelum-sebelumnya, kita terlalu sibuk memantau *Waktu* dan *Percepatan*. Kita selalu bertanya: "Butuh berapa detik agar mobil ini berhenti?".
Namun, fisika Energi tidak peduli dengan waktu tempuh! Fisika Energi hanya peduli pada **Hasil Akhir dari Jarak Tempuh**.

Pintu masuk ke dunia Energi bernama **Usaha (Work / $W$)**.

### Arti Kata "Usaha" dalam Fisika (Bukan Mencari Uang)
Dalam kehidupan sehari-hari, kamu mendorong tembok beton sampai keringat bercucuran seharian, orang akan berkata, "Usahamu sungguh luar biasa."
Tapi bagi Fisika? Usahamu = **NOL BESAR**!

Kenapa? Karena definisi Usaha dalam fisika adalah: **Harus ada Gaya yang BERHASIL memindahkan posisi benda.**
Jika bendanya tidak berpindah ($s = 0$), maka Usaha = 0.

### Perkalian Titik (Dot Product): Syarat Ketat Usaha
Gaya ($F$) dan Perpindahan ($s$) adalah sebuah Vektor (punya panah arah).
Rumus sejati dari Usaha adalah **Perkalian Titik (Dot Product)** dari kedua vektor tersebut.
**$$W = \\vec{F} \\cdot \\vec{s}$$**
Atau jika dijabarkan sudutnya:
**$$W = F \\cdot s \\cdot \\cos\\theta$$**
(Di mana $\\theta$ adalah sudut jepitan antara panah Gaya dan panah Perpindahan).

Mengapa harus pakai Cosinus? Karena Perkalian Titik memiliki satu filosofi mutlak:
**"Aku hanya mau mengalikan hal-hal yang SEARAH denganku!"**

Mari kita lihat 3 Kasus Usaha:
**Kasus 1: Usaha Positif (Malaikat Pendorong)**
Kamu mendorong koper ke arah KANAN, dan koper berpindah ke KANAN.
Sudut antara doronganmu dan perpindahan adalah $0^\\circ$. (Nilai $\\cos 0^\\circ = 1$).
Usahamu POSITIF ($+F \\cdot s$). Artinya gayamu sedang menyuntikkan *Energi Kehidupan* (mempercepat) ke dalam koper tersebut.

**Kasus 2: Usaha Negatif (Setan Penghambat)**
Koper sedang meluncur ke KANAN, tapi ada Gaya Gesek lantai yang menggoresnya ke arah KIRI.
Sudut antara gaya gesek dan perpindahan adalah $180^\\circ$ (saling berbalik punggung). (Nilai $\\cos 180^\\circ = -1$).
Usaha Gaya Gesek NEGATIF ($-f \\cdot s$). Artinya gaya gesek sedang *Menyedot / Mencuri Energi* dari dalam koper hingga koper mati lemas berhenti.

**Kasus 3: Usaha Nol (Penonton Gabut)**
Koper meluncur ke KANAN. Ada Gaya Berat ($w$) yang menarik koper ke BAWAH.
Sudut antara Gaya Berat ke BAWAH dan Perpindahan ke KANAN adalah $90^\\circ$ (Tegak Lurus siku-siku). (Nilai $\\cos 90^\\circ = 0$).
Usaha Gaya Berat = **NOL**. Artinya gaya gravitasi tidak menyumbang energi maupun mencuri energi koper di jalan datar, ia hanya menonton saja. 
Inilah alasan mengapa orang yang memanggul beras sambil berjalan mendatar tidak melakukan Usaha dari kacamata Fisika!

\`\`\`inlinequiz
{
  "question": "Seorang atlit angkat besi menahan barbel seberat 100 kg di atas kepalanya (tangan terkunci lurus ke atas) sambil DIAM tidak bergerak selama 10 menit. Berapakah Usaha (Work) yang dilakukan atlit tersebut terhadap barbel?",
  "options": [
    "Sangat besar karena gaya tahannya harus melawan gravitasi selama 10 menit.",
    "Tergantung pada tinggi atlit tersebut.",
    "Nol Joule.",
    "Bernilai negatif."
  ],
  "answer": 2,
  "explanation": "Brilian! Definisi paling dasar dari Usaha mekanik adalah (Gaya dikali Perpindahan). Sebesar dan selama apapun ia menahan barbel dengan tangannya, jika barbel itu tidak bergeser posisinya (s = 0), maka Usahanya mutlak NOL. Atlit itu kelelahan karena energinya habis terbuang sebagai panas tubuh internal, bukan disuntikkan menjadi usaha ke barbel."
}
\`\`\`
`,

  "Sub-bab 2: Menghitung Usaha dari Grafik F-x (Integral)": `Rumus $W = F \\cdot s$ (Gaya dikali Jarak) terdengar sangat manis dan mudah. Sayangnya, rumus itu HANYA BERLAKU JIKA Gayanya bernilai konstan (tidak berubah-ubah) dari garis Start hingga Finish.

Bagaimana jika kamu menekan sebuah pegas (per)? 
- Sentimeter pertama, per terasa empuk (gayanya kecil).
- Sentimeter kelima, per terasa super keras (gayanya membesar puluhan kali lipat).
Bisakah kita memakai rumus $W = F \\cdot s$? Tentu TIDAK! Karena nilai $F$-nya plin-plan di setiap milimeternya.

### Sang Penyelamat: Integral dan Grafik
Ketika matematika menemukan variabel yang terus berubah secara kontinu, pahlawan yang dipanggil adalah **Integral** (penjumlahan tak berhingga dari irisan-irisan tipis).
Usaha adalah hasil integral Gaya ($F$) terhadap posisi ruang ($x$):
**$$W = \\int_{x_1}^{x_2} F(x) \\, dx$$**

Jika kamu melihat rumus integral, otak visualmu harus langsung membayangkan sebuah **Grafik**.
Sama seperti materi kinematika sebelumnya (Luas di bawah kurva $v-t$ adalah Jarak), di bab Energi berlaku hukum emas visual:

**"USAHA TOTAL ADALAH LUAS AREA DI BAWAH GRAFIK GAYA TERHADAP POSISI (Grafik $F-x$)."**

Bayangkan kamu melihat sebuah grafik $F-x$. Sumbu Y (tegak) adalah besar Gaya dalam Newton. Sumbu X (mendatar) adalah Posisi dalam Meter.
- Jika garisnya mendatar lurus (Gaya konstan), luas areanya berbentuk **Persegi Panjang** (Panjang $s$ dikali Lebar $F$). Hasilnya $F \\cdot s$.
- Jika garisnya miring naik turun membentuk bukit segitiga, usahanya adalah Luas Segitiga ($1/2 \\cdot \\text{alas} \\cdot \\text{tinggi}$).
- Jika grafik itu terperosok masuk ke bawah sumbu X (nilai F negatif), luas wilayah di bawah itu dihitung sebagai **Usaha Negatif** (Luasan yang mencuri energimu).

### Rahasia Usaha Total (Net Work)
Jika grafik tersebut menanjak ke arah kuadran positif (luas segitiga pertama bernilai $+50$ Joule) lalu nyungsep ke kuadran negatif (luas segitiga kedua bernilai $-20$ Joule), maka:
Usaha Total ($W_{net}$) yang kamu berikan ke benda adalah $+50 + (-20) = 30$ Joule.

Angka $+30$ Joule inilah saldo bersih yang resmi masuk ke rekening energi si benda tersebut!

\`\`\`inlinequiz
{
  "question": "Pada sebuah grafik Gaya (F) di sumbu Y dan Posisi (x) di sumbu X, terlihat sebuah area berbentuk trapesium miring murni di atas sumbu X (semua nilai F positif). Untuk mencari nilai Usaha (Work), apa yang cukup kamu lakukan secara geometri?",
  "options": [
    "Menghitung kemiringan (gradien) dari garis teratas trapesium tersebut.",
    "Mengalikan titik awal x dengan titik akhir F.",
    "Menghitung LUAS area trapesium tersebut.",
    "Mengkuadratkan nilai x lalu membaginya dengan F."
  ],
  "answer": 2,
  "explanation": "Luar Biasa! 'Integral' hanyalah bahasa kaum elit intelektual untuk menyebut kata 'Menghitung Luas Bangun Ruang'. Selama kamu bisa menghitung luas segitiga, kotak, atau trapesium pada grafik F-x, kamu sudah berhasil menyelesaikan soal Integral Fisika!"
}
\`\`\`
`,

  "Sub-bab 3: Teorema Usaha-Energi Kinetik": `Inilah puncak mahakarya dari bab Energi. Kita akan merangkum seluruh jerih payah kita di materi Usaha (Work) dan menghubungkannya dengan kenyataan fisik benda (Energi Kinetik). 

Teorema ini sering disebut **Work-Energy Theorem**, dan ia berbunyi sangat indah:
**"Total Usaha Bersih ($W_{net}$) yang dilakukan kepada suatu benda, SAMA PERSIS dengan Perubahan Energi Kinetik ($\\Delta EK$) benda tersebut."**

Secara matematis:
**$$W_{net} = \\Delta EK$$**
**$$W_{net} = EK_{akhir} - EK_{awal}$$**
**$$W_{net} = \\frac{1}{2} m v_2^2 - \\frac{1}{2} m v_1^2$$**

### Membedah Makna Filosofis Teorema Ini
Bayangkan Energi Kinetik (energi karena kecepatan bergerak) adalah Saldo Uang di Bank.
Usaha (Work) adalah Transaksi Transfer uangnya.

1. **Top-Up Saldo (Usaha Positif)**
Kamu menendang bola (mendorong searah gerakan). Usahamu positif. Kamu men-transfer (menyuntikkan) energi sebesar 100 Joule ke dalam bola.
Saldo Energi Kinetik bola akan bertambah besar ($\\Delta EK$ positif). Akibatnya? Kecepatan bola itu meledak makin kencang!

2. **Ditarik Pajak (Usaha Negatif)**
Bola menggelinding dan dihajar gaya gesek rumput. Usaha gaya gesek bernilai negatif. Gesekan tersebut mencuri 50 Joule dari bola.
Saldo Energi Kinetik bola berkurang drastis ($\\Delta EK$ negatif). Akibatnya? Kecepatan bola meredup dan melambat.

3. **Saldo Tetap (Usaha Nol)**
Gaya gravitasi menarik bola ke bawah saat berjalan di rumput datar. Usahanya nol.
Tidak ada transfer uang. Kecepatan bola tidak terpengaruh sedikitpun oleh gravitasi di jalan mendatar.

### Jalan Pintas Menghancurkan Soal Rumit
Teorema ini adalah alat peretas (*cheat code*) untuk memecahkan soal mekanika ter-rumit yang biasanya butuh 2 lembar kertas jika diselesaikan memakai rumus Kinematika ($v_t^2 = v_0^2 + 2as$) dan Hukum Newton ($\\Sigma F = ma$).

Jika di dalam soal **TIDAK ADA PERTANYAAN TENTANG WAKTU (t)**, namun yang ditanyakan adalah perubahan jarak ($s$) dan perubahan kecepatan akhir ($v$), JANGAN gunakan Kinematika. Langsung gunakan Teorema Usaha-Energi Kinetik!

Misal: *"Sebuah peluru menembus pohon setebal 10 cm, kecepatannya turun dari 100 m/s menjadi 20 m/s. Berapa besar gaya gesek kayu pohon tersebut?"*

Tebak? 1 baris selesai!
$-f \\cdot s = \\frac{1}{2} m v_{akhir}^2 - \\frac{1}{2} m v_{awal}^2$
Masukkan angka jarak ($s=0.1$ m), kecepatan, dan massa. Boom! Ketemu gayanya langsung! Tanpa perlu repot-repot mencari percepatan peluru yang mengerem secara ekstrem di dalam kayu.

\`\`\`inlinequiz
{
  "question": "Jika Total Usaha Bersih (Net Work) yang bekerja pada sebuah mobil balap bernilai NOL selama 5 detik, apa yang bisa disimpulkan tentang kecepatan mobil tersebut?",
  "options": [
    "Kecepatan mobil tersebut adalah Nol (Mobil pasti Diam).",
    "Mobil tersebut mengalami pengereman mendadak.",
    "Kecepatan mobil tersebut tidak berubah (Konstan / GLB).",
    "Massa mobil tersebut berkurang menjadi nol."
  ],
  "answer": 2,
  "explanation": "Pemahaman yang luar biasa! Jika Total Usaha = 0 (tidak ada transfer energi masuk/keluar), maka Perubahan Energi Kinetik (delta EK) juga harus 0. Saldo energinya awet. Artinya energi kinetiknya konstan, sehingga kelajuan mobil itu akan tetap utuh melaju lurus tak bergeming (GLB)!"
}
\`\`\`
`
};

const cbtLatihanSoalBagian9 = [
  {
    question: "Sebuah batu bermassa $2 \\text{ kg}$ diikat di ujung tali sepanjang $0.5 \\text{ m}$ dan diputar secara horizontal di atas meja licin dengan laju $4 \\text{ m/s}$. Berapakah gaya tegangan tali tersebut?",
    options: ["$32 \\text{ N}$", "$16 \\text{ N}$", "$64 \\text{ N}$", "$8 \\text{ N}$"],
    answer: 2 // Fs = m v^2 / r = 2 * (16) / 0.5 = 32 / 0.5 = 64 N
  },
  {
    question: "Pada permainan ayunan konis, seseorang bermassa $m$ duduk di kursi. Lengan ayunan memiliki panjang $L$ dan membentuk sudut $\\theta$ terhadap garis vertikal. Gaya Sentripetal yang menyebabkan ayunan berputar melingkar disediakan BUKAN oleh gravitasi, melainkan oleh...",
    options: ["Gaya normal dari poros tiang tengah.", "Gaya Berat orang tersebut yang mengarah ke dalam.", "Komponen horizontal dari Gaya Tegang Tali yang mengarah ke pusat putaran.", "Gaya sentrifugal yang menarik ke luar."],
    answer: 2
  },
  {
    question: "Bumi berputar mengelilingi Matahari. Jika tiba-tiba massa Bumi membesar menjadi 2 kali lipat aslinya (namun laju dan jaraknya tetap), apa yang terjadi pada Gaya Sentripetal Gravitasi (tarikan) yang dibutuhkan agar Bumi tetap di orbitnya?",
    options: ["Menjadi setengahnya", "Tetap sama (tidak terpengaruh)", "Menjadi 2 kali lipat lebih besar", "Menjadi 4 kali lipat lebih besar"],
    answer: 2 // Fs = m v^2 / r. Jika m jadi 2m, maka Fs jadi 2 kali lipat.
  },
  {
    question: "Sebuah mobil bermassa $1000 \\text{ kg}$ melewati jalan yang membelok mendatar berbentuk busur lingkaran dengan jari-jari $40 \\text{ m}$. Koefisien gesek statis aspal dan ban adalah $\\mu_s = 0.4$. Berapakah laju maksimal (dalam m/s) agar mobil tidak nge-drift (tergelincir ke luar)? ($g=10$)",
    options: ["$16 \\text{ m/s}$", "$40 \\text{ m/s}$", "$12.6 \\text{ m/s}$", "$160 \\text{ m/s}$"],
    answer: 2 // v_max = sqrt(mu * g * R) = sqrt(0.4 * 10 * 40) = sqrt(160) = 4 * sqrt(10) ~ 4 * 3.16 = 12.64 m/s
  },
  {
    question: "Sirkuit balap mobil berbelok miring. Tikungan berjejari $100 \\text{ m}$ dan dibuat miring ke dalam (mangkuk) dengan kemiringan $45^\\circ$ (diketahui $\\tan 45^\\circ = 1$). Berapakah 'Design Speed' murni (laju di mana mobil tidak butuh gaya gesekan ban ke samping sama sekali) untuk melibas tikungan ini? ($g=10$)",
    options: ["$\\approx 31.6 \\text{ m/s}$", "$100 \\text{ m/s}$", "$50 \\text{ m/s}$", "$10 \\text{ m/s}$"],
    answer: 0 // tan(45) = v^2 / gR => 1 = v^2 / 1000 => v^2 = 1000 => v = sqrt(1000) = 10 sqrt(10) ~ 31.62 m/s
  },
  {
    question: "Sebuah pesawat melakukan manuver 'Looping' (berputar satu lingkaran tegak vertikal di angkasa). Di posisi mana pilot akan merasa PALING BERAT (Gaya Normal dari kursinya menekan paling keras)?",
    options: ["Saat di titik tertinggi (kepala di bawah).", "Saat di titik terendah (mulai mendongak naik).", "Saat pesawat dalam posisi miring 90 derajat mendaki.", "Berat pilot terasa sama di seluruh lintasan lingkaran."],
    answer: 1 // Di titik terendah: N - w = m v^2/r => N = w + m v^2/r. Di titik tertinggi: N + w = m v^2/r => N = m v^2/r - w.
  },
  {
    question: "Batu diikat dengan tali lalu diputar secara vertikal (loop tegak). Laju minimal di titik puncak (titik tertinggi) agar batu tidak kendur jatuh ke bawah adalah $v_{min} = \\sqrt{g \\cdot R}$. Pada laju super lambat/kritis ini, berapakah besar Gaya Tegang Talinya saat di puncak?",
    options: ["Sama dengan $mg$", "Setengah $mg$", "Dua kali lipat $mg$", "Nol"],
    answer: 3 // Di puncak: T + mg = m v^2/R. Jika v = sqrt(gR) => T + mg = m(gR)/R = mg => T = 0.
  },
  {
    question: "Koin diletakkan di atas piringan hitam (turntable) berjarak $20 \\text{ cm}$ dari pusat putaran. Piringan berputar makin cepat secara perlahan. Koin tersebut akan terlempar selip ke luar JIKA...",
    options: ["Gaya normal melebihi berat koin.", "Kecepatan sudut ($\\omega$) sudah membutuhkan Gaya Sentripetal ($\\omega^2 R$) yang melebihi Gaya Gesek Statis Maksimal piringan.", "Kecepatan linear putarannya sama dengan kecepatan suaranya.", "Gaya gesek kinetis mengubah arahnya menjadi radial ke luar."],
    answer: 1 // Gaya hambat agar koin ikut melingkar murni adalah gesek statis. Jika kebutuhan f_s (m w^2 r) > f_s_max, koin akan slip.
  },
  {
    question: "Mengapa para pembalap MotoGP mencondongkan (memiringkan rebah) badan dan motornya tajam ke arah dalam tikungan padahal jalanannya adalah aspal mendatar murni?",
    options: ["Agar lutut mereka menggesek aspal sebagai bantuan pengereman tambahan.", "Agar gaya Normal dari aspal miring memutar ikut membidik titik fokus kamera.", "Untuk menciptakan kemiringan artifisial (seolah-olah seperti ayunan konis) sehingga komponen gaya kontak ban (Resultan Normal & Gesek) menunjuk tepat ke pusat massa mereka tanpa melintir (torsi jatuh).", "Untuk mengecoh musuh di belakang mereka."],
    answer: 2 // Pembalap memiringkan diri agar Resultan dari Gaya Normal (ke atas) dan Gesekan Ban (ke pusat lintasan) melewati titik Pusat Massa kendaraannya, sehingga Torsi (Momen Gaya) yang akan membuat ia terjatuh menjadi Nol. Ini konsep fisika tinggi dari ayunan konis.
  },
  {
    question: "Sebuah bola bermassa $m$ meluncur dari puncak perosotan es licin berbentuk gundukan setengah bola berjejari $R$. Mengapa pada sudut kemiringan tertentu, bola tersebut akan terlepas terbang meninggalkan permukaan es mendahului lantai?",
    options: ["Karena esnya licin memantulkan bola.", "Karena udara menekan dari bawah.", "Karena gaya sentripetal yang dibutuhkan terus mengecil seiring turunan, hingga Gaya Berat radikal ($mg \\cos\\theta$) tidak lagi cukup menyediakannya, sehingga Normal anjlok menjadi nol.", "Karena di titik lepas landas tersebut gaya gesek berubah drastis."],
    answer: 2 // Di gundukan luar, gravitasi berkolaborasi. Persamaan radial sentripetal: mg cos0 - N = m v^2/R. Jika v makin kencang, N harus makin mengecil agar seimbang. Saat lepas, N = 0.
  }
];

const cbtLatihanSoalBagian10 = [
  {
    question: "Balok ditarik sejauh $5 \\text{ m}$ mendatar lurus ke kanan dengan gaya konstan $20 \\text{ N}$ yang ujung talinya miring $60^\\circ$ terhadap horizontal (ditarik menyerong ke kanan atas). Berapa Usaha (W) yang dilakukan gaya tersebut? ($\\cos 60^\\circ = 0.5$)",
    options: ["$100 \\text{ Joule}$", "$50 \\text{ Joule}$", "$0 \\text{ Joule}$", "$86.6 \\text{ Joule}$"],
    answer: 1 // W = F s cos0 = 20 * 5 * 0.5 = 50 J.
  },
  {
    question: "Sebuah mobil menabrak dinding dan langsung berhenti total. Usaha yang dilakukan oleh gaya tahan dinding terhadap mobil tersebut bernilai...",
    options: ["Nol", "Positif", "Negatif", "Tidak terdefinisi"],
    answer: 2 // Dinding mendorong mobil ke arah belakang, tapi mobil berpindah (menyusup ringsek) ke arah depan. Gaya berlawanan dengan perpindahan => Usaha negatif.
  },
  {
    question: "Gaya berubah-ubah digambarkan dalam grafik F (sumbu Y) terhadap x (sumbu X). Grafiknya berupa segitiga siku-siku dengan alas dari $x=0$ ke $x=4$ m, dan puncaknya di $F=10$ N. Berapa Usaha total yang dilakukan dari $0$ hingga $4$ meter?",
    options: ["$40 \\text{ Joule}$", "$20 \\text{ Joule}$", "$14 \\text{ Joule}$", "$10 \\text{ Joule}$"],
    answer: 1 // Luas segitiga = 0.5 * alas * tinggi = 0.5 * 4 * 10 = 20 J.
  },
  {
    question: "Gaya $F$ (N) bekerja pada benda berubah menurut fungsi posisi $F(x) = 2x + 4$. Berapakah Usaha yang diberikan untuk memindahkan benda dari titik $x=0$ ke titik $x=3$ m? (Gunakan rumus Integral)",
    options: ["$15 \\text{ Joule}$", "$21 \\text{ Joule}$", "$30 \\text{ Joule}$", "$25 \\text{ Joule}$"],
    answer: 1 // W = int (2x+4) dx = x^2 + 4x. Evaluasi di 3: 3^2 + 4(3) = 9 + 12 = 21 J.
  },
  {
    question: "Peluru $0.01 \\text{ kg}$ melesat dengan laju $400 \\text{ m/s}$ menembus kayu dan keluar dari belakang kayu dengan sisa laju $200 \\text{ m/s}$. Ketebalan kayu $0.1 \\text{ m}$. Berapa GAYA Rata-rata dari kayu yang mengerem peluru tersebut? (Gunakan Teorema Usaha-Energi)",
    options: ["$4000 \\text{ N}$", "$20000 \\text{ N}$", "$6000 \\text{ N}$", "$60000 \\text{ N}$"],
    answer: 3 // -F * s = 0.5 * m * (vt^2 - v0^2) => -F(0.1) = 0.5(0.01)(200^2 - 400^2) => -0.1F = 0.005(40000 - 160000) => -0.1F = 0.005(-120000) => -0.1F = -600 => F = 6000 N.
  },
  {
    question: "Seorang kuli memanggul karung beras seberat $500 \\text{ N}$ (gaya angkat tangannya tegak ke atas) dan berjalan lurus MENDATAR di jalan raya sejauh $100 \\text{ meter}$. Usaha yang disumbangkan oleh Kuli (khusus arah mendatar) terhadap karung beras menurut fisika energi adalah...",
    options: ["$50000 \\text{ Joule}$", "$500 \\text{ Joule}$", "$5 \\text{ Joule}$", "$0 \\text{ Joule}$"],
    answer: 3 // Cos 90 derajat (Tegak lurus terhadap arah jalan) = 0. W = F s cos 90 = 0.
  },
  {
    question: "Sebuah balok diam bermassa $2 \\text{ kg}$ didorong di lantai licin murni dengan gaya $10 \\text{ N}$ searah gerak sejauh $4 \\text{ meter}$. Berdasarkan Teorema Usaha-Energi Kinetik, berapakah kecepatan akhir balok tersebut?",
    options: ["$20 \\text{ m/s}$", "$40 \\text{ m/s}$", "$$\\sqrt{40} \\text{ m/s}$", "$10 \\text{ m/s}$"],
    answer: 2 // W_net = F * s = 10 * 4 = 40 J. Delta EK = 40. => 0.5 * 2 * v^2 - 0 = 40 => 1 * v^2 = 40 => v = sqrt(40) ~ 6.32 m/s.
  },
  {
    question: "Terdapat dua mobil identik. Mobil A melaju dengan kecepatan $v$. Mobil B melaju ugal-ugalan dengan kecepatan DUA KALI LIPAT lebih cepat ($2v$). Jika mereka mengerem mendadak dengan kuat rem (Gaya Gesek) yang sama, perbandingan JARAK TERSERET (Braking Distance) antara Mobil B dibanding Mobil A adalah...",
    options: ["2 kali lipat lebih jauh.", "4 kali lipat lebih jauh.", "Sama saja (1 banding 1).", "8 kali lipat lebih jauh."],
    answer: 1 // W = delta EK => -f * s = 0 - 0.5 m v^2. Maka jarak pengereman s sebanding dengan v^2. Jika kecepatan 2 kali, jarak pengeremannya menjadi (2)^2 = 4 KALI LIPAT lebih jauh. Inilah kenapa mengebut sangat mematikan!
  },
  {
    question: "Gaya pegas memiliki ciri unik di mana nilai gayanya sebanding lurus dengan jarak renggangannya (Hukum Hooke: $F = kx$). Jika diubah ke dalam grafik F terhadap x, kurvanya akan membentuk garis miring lurus segitiga murni. Berapa rumus Usaha total untuk meregangkan pegas dari posisi $0$ ke posisi merenggang $x$?",
    options: ["$W = kx$", "$W = kx^2$", "$W = \\frac{1}{2} kx^2$", "$W = \\sqrt{kx}$"],
    answer: 2 // Luas segitiga = 1/2 * alas * tinggi = 1/2 * (x) * (kx) = 1/2 kx^2. (Ini cikal bakal energi potensial pegas).
  },
  {
    question: "Seseorang menarik balok dengan gaya $F_1 = 50 \\text{ N}$ ke utara. Temannya menarik balok yang sama dengan $F_2 = 50 \\text{ N}$ ke timur. Balok pun terseret serong timur laut sejauh $10 \\sqrt{2} \\text{ meter}$. Berapa total USAHA BERSIH (Net Work) yang mereka tuangkan bersama-sama?",
    options: ["$500 \\text{ Joule}$", "$1000 \\text{ Joule}$", "$500 \\sqrt{2} \\text{ Joule}$", "$250 \\text{ Joule}$"],
    answer: 1 // Total Gaya (Pytagoras) F_res = 50 sqrt(2) N (arah timur laut). Arah perpindahan juga murni timur laut, sejajar, cos 0 = 1. W = F_res * s = 50 sqrt(2) * 10 sqrt(2) = 500 * 2 = 1000 Joule.
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
    
    if (mod.title === "Latihan Soal: Optimasi Kecepatan Maksimum di Tikungan Miring") {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { quizJson: JSON.stringify(cbtLatihanSoalBagian9) }
      });
      console.log(`Updated CBT Tryout Bagian 9: ${mod.title} with ${cbtLatihanSoalBagian9.length} questions`);
    }

    if (mod.title === "Latihan Soal: Usaha oleh Gaya yang Berubah F(x)") {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { quizJson: JSON.stringify(cbtLatihanSoalBagian10) }
      });
      console.log(`Updated CBT Tryout Bagian 10: ${mod.title} with ${cbtLatihanSoalBagian10.length} questions`);
    }
  }
}

main().finally(() => prisma.$disconnect());
