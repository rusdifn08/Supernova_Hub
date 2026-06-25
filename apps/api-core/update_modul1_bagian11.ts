import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contentData: Record<string, string> = {
  "Sub-bab 1: Gaya Konservatif vs Non-konservatif": `Di alam semesta ini, gaya (tarikan/dorongan) dibagi menjadi dua aliran kepercayaan yang sangat berbeda kelakuannya: **Gaya Konservatif** dan **Gaya Non-Konservatif**.

### 1. Gaya Konservatif (Sang Penjaga Tabungan)
"Konservatif" artinya kolot atau suka menabung (tidak suka membuang-buang energi). Gaya konservatif adalah gaya yang sangat adil. Jika ia menyedot energimu saat kamu naik (menanjak), ia akan MENGEMBALIKAN 100% energi itu kepadamu saat kamu turun kembali!
Sifat utama dari Gaya Konservatif adalah: **"Bentuk lintasan (jauh/dekat/berkelok) TIDAK PENTING. Yang penting hanyalah titik Awal dan titik Akhir!"**

Contoh paling agung dari Gaya Konservatif adalah **Gravitasi**.
Bayangkan kamu membawa batu 1 kg dari lantai 1 ke lantai 2.
- Cara A: Kamu naik tangga lurus vertikal sejauh 3 meter.
- Cara B: Kamu naik tangga berputar melingkar-lingkar sejauh 50 meter.
Berapa Usaha Gravitasi yang melawanmu? Hasilnya SAMA PERSIS! Gravitasi tidak peduli seberapa jauh kamu berkeliling, ia hanya peduli bahwa posisi akhirmu adalah 3 meter di atas lantai 1.

Karena sifatnya yang suka menabung ini, kita bisa memberikan nama pada "tabungan" energi yang sedang disimpan oleh gaya konservatif. Tabungan ini disebut **Energi Potensial (EP)**.
**$$EP = m \\cdot g \\cdot h$$**
(Di mana $h$ adalah ketinggian/posisi akhir).
Saat batu diangkat, gravitasinya bekerja negatif (mencuri energi kinetik). Tapi energi yang dicuri itu tidak hilang! Energi itu ditabung menjadi $EP$ di dalam batu tersebut, siap untuk dikembalikan menjadi energi kinetik (kecepatan ledak) kapanpun batu itu dijatuhkan kembali.

### 2. Gaya Non-Konservatif (Sang Pencuri Permanen)
Berbeda dengan gaya konservatif yang adil, gaya non-konservatif adalah perampok yang kejam. Jika energimu sudah dicuri olehnya, energi itu **HILANG SELAMANYA** ke udara (biasanya berubah menjadi panas atau bunyi), dan tidak akan pernah dikembalikan!
Sifat utama dari Gaya Non-Konservatif adalah: **"Bentuk lintasan SANGAT PENTING! Semakin jauh kamu berjalan, semakin banyak energimu yang akan dirampok!"**

Contoh paling kejam dari Gaya Non-Konservatif adalah **Gaya Gesek (Friksi)**.
Bayangkan kamu menyeret kotak berat di aspal dari Rumah ke Sekolah.
- Cara A: Kamu berjalan lurus (100 meter). Gesekan mencuri energimu sejauh 100 meter.
- Cara B: Kamu tersesat berputar-putar kompleks sejauh (500 meter). Gesekan mencuri energimu sejauh 500 meter!

Gaya gesek TIDAK peduli posisi akhirmu sama-sama di sekolah. Ia peduli pada jejak langkahmu. Semakin panjang jejakmu, semakin banyak energimu yang hangus terbakar menjadi panas. Karena energinya hangus terbuang permanen, Gaya Gesek **TIDAK PERNAH** memiliki rumus Energi Potensial!

\`\`\`inlinequiz
{
  "question": "Mana dari gaya di bawah ini yang merupakan Gaya Konservatif (mampu menyimpan Energi Potensial untuk dikembalikan nanti)?",
  "options": [
    "Gaya Gesekan Udara",
    "Gaya Rem Cakram Kendaraan",
    "Gaya Pegas (Karet yang ditarik)",
    "Gaya Tarik Tali pada ayunan konis"
  ],
  "answer": 2,
  "explanation": "Tepat sekali! Gaya pegas (Hukum Hooke) adalah gaya Konservatif sejati. Saat kamu menarik karet pelontar katapel (memberikan usaha), karet tersebut menabung energimu (Energi Potensial Pegas 1/2 k x^2). Saat kamu lepaskan, ia memuntahkan 100% energi itu kembali menjadi kecepatan proyektil!"
}
\`\`\`
`,

  "Sub-bab 2: Hukum Kekekalan Energi pada Roller Coaster & Bandul": `Hukum Fisika yang paling suci dan tak terbantahkan sepanjang masa adalah:
**"Energi tidak dapat diciptakan, dan tidak dapat dimusnahkan. Energi hanya dapat berubah bentuk."**

Dari hukum ini, lahirlah sebuah anak kesayangan bernama **Hukum Kekekalan Energi Mekanik (EM)**.
Energi Mekanik adalah total kekayaan yang dimiliki sebuah benda, yakni gabungan dari Tabungan Tinggi ($EP$) dan Saldo Kecepatan ($EK$).
**$$EM = EP + EK$$**
**$$EM = mgh + \\frac{1}{2} m v^2$$**

### Syarat Mutlak Berlakunya Kekekalan EM
Hukum ini hanya berlaku asalkan **TIDAK ADA MALING** (Gaya Non-Konservatif, seperti gesekan atau dorongan mesin) yang beraksi.
Selama benda itu murni hanya dilayani oleh gravitasi, maka Total Hartanya ($EM$) akan AWET dari titik awal (Titik 1) sampai titik manapun (Titik 2).
**$$EM_1 = EM_2$$**
**$$EP_1 + EK_1 = EP_2 + EK_2$$**

### Kereta Roller Coaster yang Mematikan
Pernahkah kamu menyadari bahwa *Roller Coaster* itu sama sekali tidak memiliki mesin di gerbongnya? Ya, gerbong *Roller Coaster* itu HANYA ditarik rantai di tanjakan pertama (Titik 1). Setelah sampai di puncak bukit tertinggi, rantai dilepas, dan gerbong dibiarkan meluncur bebas dengan modal gravitasi semata menelusuri sisa rel yang menggila!

Mari kita lacak kekayaannya:
1. **Di Puncak Bukit Pertama ($h$ maksimal, $v=0$)**
   Gerbong berhenti sejenak. Tabungan Ketinggiannya ($EP$) penuh maksimal (1000 Joule). Saldo Kecepatannya ($EK$) masih kosong (0 Joule). Total Kekayaan = 1000 Joule.
2. **Meluncur ke Lembah Terdalam ($h=0$, $v$ maksimal)**
   Saat mencapai dasar lembah, gerbong menyentuh tanah. $EP$ habis (0 Joule). Kemana uangnya? Dicairkan menjadi $EK$ (1000 Joule)! Gerbong melesat dengan kecepatan gila-gilaan. Total Kekayaan = 0 + 1000 = 1000 Joule (Awet!).
3. **Mendaki Bukit Kedua ($h$ setengah puncak)**
   Saat naik kembali, gerbong melambat. Sebagaian $EK$ disetorkan kembali menjadi tabungan $EP$. (Misal $EP$ jadi 600, $EK$ sisa 400). Total Kekayaan = 600 + 400 = 1000 Joule (Tetap Awet!).

Ini menjelaskan mengapa desainer *Roller Coaster* **TIDAK AKAN PERNAH** merancang bukit kedua yang lebih tinggi dari bukit pertama! Jika bukit kedua lebih tinggi, gerbong akan kehabisan "saldo energi" sebelum mencapai puncak bukit kedua, dan akhirnya menggelinding mundur menabrak stasiun awal!

### Jalan Pintas Menghitung Bandul (Pendulum)
Hal yang sama persis terjadi pada Bandul yang berayun.
Bandul disimpangkan sejauh $h$ dari titik terendahnya, lalu dilepaskan.
Saat bandul lewat persis di titik terendah (titik setimbang), kecepatannya maksimal. Kita tidak perlu memusingkan lintasan melengkungnya, langsung saja gunakan Kekekalan EM:
$$mgh_{awal} = \\frac{1}{2} m v_{akhir}^2$$
Massa ($m$) coret, pindahkan angka 2:
$$2gh = v^2$$
**$$v = \\sqrt{2gh}$$**

Lihat betapa saktinya rumus Kekekalan Energi Mekanik ini! Kamu bisa menebak kecepatan benda di dasar jurang hanya dengan modal ketinggiannya, tanpa perlu mengetahui sudut-sudut rumit lintasannya.

\`\`\`inlinequiz
{
  "question": "Sebuah bola bermassa 1 kg dan kotak besi bermassa 10 kg dijatuhkan secara bebas bersamaan dari puncak menara setinggi 20 meter (abaikan gesekan udara). Manakah yang akan mencapai tanah dengan kecepatan yang lebih besar?",
  "options": [
    "Kotak besi 10 kg jauh lebih cepat karena massanya lebih besar (EM lebih banyak).",
    "Bola 1 kg lebih cepat karena tidak memiliki hambatan Inersia.",
    "Keduanya akan mencapai tanah dengan kecepatan yang sama persis.",
    "Kotak besi 10 kg mencapai tanah duluan karena gaya normal."
  ],
  "answer": 2,
  "explanation": "Luar biasa! Pada persamaan Kekekalan Energi Mekanik (mgh = 1/2 m v^2), massa (m) berada di ruas kiri dan kanan sehingga bisa saling DICORET! Ini membuktikan kecepatan jatuh bebas HANYA bergantung pada Gravitasi dan Ketinggian awal (v = akar(2gh)). Benda apapun, dari bulu domba hingga truk gajah, akan mendarat dengan kelajuan sama jika tidak ada gesekan udara!"
}
\`\`\`
`,

  "Sub-bab 3: Usaha oleh Gaya Gesek": `Di Sub-bab 2, kita menari-nari dalam kesempurnaan Hukum Kekekalan Energi Mekanik ($EM_1 = EM_2$). 
Namun sayang seribu sayang, dunia nyata tidaklah sesempurna itu. Di dunia nyata, selalu ada "pajak siluman" yang bernama **Gaya Gesek Udara** dan **Gaya Gesek Aspal**.

Karena Gaya Gesek adalah *Gaya Non-Konservatif* (sang pencuri), maka total kekayaan energi benda TIDAK LAGI AWET.
Kekayaan energi benda di titik akhir (Titik 2) pasti akan **lebih miskin** (lebih kecil) dibandingkan dengan kekayaannya di titik awal (Titik 1).

### Menggabungkan Sang Perampok ke dalam Rumus
Ke mana hilangnya energi tersebut? Hilang menjadi *Usaha oleh Gaya Non-Konservatif ($W_{nc}$)*. (NC = Non-Conservative).
Maka, persamaannya berubah menjadi:
**$$EM_{awal} + W_{nc} = EM_{akhir}$$**
Ingat bahwa $W_{nc}$ (Usaha Gaya Gesek) selalu bernilai **NEGATIF** karena arah gesekan selalu berlawanan arah dengan perpindahan (sudut $180^\\circ$).
**$$W_{nc} = -f_k \\cdot s$$**

Jadi, rumus di dunia nyata yang kejam ini adalah:
**$$EP_1 + EK_1 - (f_k \\cdot s) = EP_2 + EK_2$$**

### Studi Kasus: Bermain Perosotan Kasar
Bayangkan kamu meluncur dari atas perosotan (ketinggian $h = 5$ meter, $EP_{awal} = 500$ Joule).
Jika perosotannya terbuat dari es super licin, seluruh 500 Joule uangmu akan cair menjadi $EK$ (kecepatan) di dasar perosotan. Kamu akan melesat kencang.
Tetapi kenyataannya, perosotannya terbuat dari plastik kusam yang kasar.
Gesekan celanamu dengan plastik memakan korban energi (Usaha Gesek = $150$ Joule hangus menjadi panas di celanamu).

Mari kita hitung kekayaan akhirmu di dasar perosotan:
$$EM_{awal} - |W_{gesek}| = EM_{akhir}$$
$$500 \\text{ J} - 150 \\text{ J} = 350 \\text{ J}$$

Setibanya di tanah ($EP = 0$), sisa uang yang bisa berubah menjadi Saldo Kecepatan (Energi Kinetik) HANYALAH $350$ Joule! Kamu akan meluncur jauh lebih lambat daripada saat di atas es licin.

Inilah rahasia para insinyur merancang parasut atau rem angin pesawat! Mereka menciptakan Gaya Non-Konservatif (gesekan udara) buatan yang sebesar-besarnya untuk merampok (mengurangi) Energi Kinetik (kecepatan mematikan) yang dimiliki kendaraan, hingga akhirnya aman mendarat.

\`\`\`inlinequiz
{
  "question": "Sebuah mobil melaju dengan kecepatan tinggi, lalu tiba-tiba sopir menginjak rem sekuat tenaga sehingga ban berdecit dan menggores aspal sepanjang 50 meter hingga mobil benar-benar berhenti (EK = 0). Ke manakah hilangnya semua Energi Kinetik raksasa yang dimiliki mobil tadi?",
  "options": [
    "Hilang tersedot oleh gravitasi bumi.",
    "Musnah dan hilang dari alam semesta tak bersisa.",
    "Berubah wujud (dikonversi) menjadi energi panas, bunyi decitan, dan kerusakan struktur pada ban serta aspal.",
    "Tersimpan menjadi Energi Potensial di dalam rem cakram."
  ],
  "answer": 2,
  "explanation": "Brilian! Hukum Kekekalan Energi Semesta tidak pernah bohong. Energi kinetik sebesar jutaan Joule itu tidak hilang, melainkan 'dikonversi' secara paksa oleh Gaya Gesek Non-Konservatif menjadi bentuk energi lain (berupa bahang/panas tinggi yang bisa membakar karet ban, dan energi gelombang suara yang memekakkan telinga)!"
}
\`\`\`
`
};

const cbtLatihanSoalBagian11 = [
  {
    question: "Sebuah kelapa bermassa $2 \\text{ kg}$ jatuh bebas dari pohon setinggi $10 \\text{ m}$. Berdasarkan Kekekalan Energi Mekanik, berapakah besar Energi Kinetik kelapa tersebut pada saat berada TEPAT DI TENGAH-TENGAH ketinggian ($h = 5 \\text{ m}$) dari tanah? ($g = 10 \\text{ m/s}^2$)",
    options: ["$100 \\text{ Joule}$", "$200 \\text{ Joule}$", "$50 \\text{ Joule}$", "$0 \\text{ Joule}$"],
    answer: 0 // EM = EP_awal = mgh = 2*10*10 = 200 J. Di tengah (h=5), EP = 2*10*5 = 100 J. Karena EM tetap 200, maka EK = 200 - 100 = 100 J.
  },
  {
    question: "Manakah pernyataan di bawah ini yang merupakan ciri-ciri eksklusif (pasti benar) tentang GAYA KONSERVATIF?",
    options: ["Usaha yang dilakukannya selalu bernilai Positif.", "Usaha total yang dilakukannya pada suatu benda yang bergerak dalam lintasan tertutup (kembali ke titik asal) selalu bernilai NOL.", "Selalu searah dengan arah gerak benda.", "Hanya bisa bekerja di ruang hampa udara."],
    answer: 1 // Sifat utama konservatif: Usaha hanya bergantung posisi awal dan akhir. Jika awal dan akhir sama (lintasan tertutup), perpindahan bersih = 0, Usaha = 0.
  },
  {
    question: "Sebuah kereta roller coaster bermassa $m$ meluncur tanpa kecepatan awal dari puncak bukit setinggi $h = 20 \\text{ m}$. Di dasar lintasan, rel tersebut melingkar membentuk 'Looping' vertikal murni (lingkaran penuh) dengan jari-jari $R = 5 \\text{ m}$. Berapakah kecepatan kereta saat berada di PUNCAK TERTINGGI Loop tersebut ($10 \\text{ m}$ dari tanah)? ($g = 10 \\text{ m/s}^2$)",
    options: ["$10 \\sqrt{2} \\text{ m/s}$", "$10 \\text{ m/s}$", "$20 \\text{ m/s}$", "$100 \\text{ m/s}$"],
    answer: 0 // EM_1 = EM_2. Puncak bukit: mgh1 = m(10)(20) = 200m. Puncak loop: mgh2 + 0.5 m v^2 = m(10)(10) + 0.5 m v^2 = 100m + 0.5 m v^2. 200m = 100m + 0.5 m v^2. 100m = 0.5 m v^2. v^2 = 200 => v = sqrt(200) = 10 sqrt(2).
  },
  {
    question: "Pada kasus Roller Coaster bersirkuit Loop Vertikal (seperti soal sebelumnya), terdapat syarat kritis agar kereta 'TIDAK TERJATUH' saat posisi terbalik di puncak loop. Gaya Normal ($N$) kursi kereta terhadap pantat penumpang di titik kritis (paling minimum) tersebut haruslah bernilai...",
    options: ["$N = mg$", "$N < 0$", "$N = 0$", "$N = m v^2 / R$"],
    answer: 2 // Titik kritis / ambang jatuh: Normal N = 0 (baru mau kehilangan kontak dengan rel). Di titik ini seluruh sentripetal murni disediakan oleh Gravitasi.
  },
  {
    question: "Sebuah peluru massanya $10 \\text{ gram} (0.01 \\text{ kg})$ ditembakkan vertikal lurus ke atas dengan kecepatan $100 \\text{ m/s}$. Ketinggian maksimal ideal yang dihitung pakai Kekekalan Energi adalah $500 \\text{ m}$. Jika ternyata peluru hanya mencapai ketinggian $400 \\text{ m}$ lalu berhenti, berapakah 'Pajak Energi' (Usaha Negatif) yang telah dicuri oleh Gesekan Udara?",
    options: ["$10 \\text{ Joule}$", "$50 \\text{ Joule}$", "$40 \\text{ Joule}$", "$100 \\text{ Joule}$"],
    answer: 0 // EK awal = 0.5 * 0.01 * 10000 = 50 Joule. EP maksimal aslinya = 50 J. Tapi faktanya EP akhir = mgh = 0.01 * 10 * 400 = 40 Joule. Energi hilang = 50 - 40 = 10 Joule (dicuri gesekan).
  },
  {
    question: "Bandul fisis sederhana dilepaskan dari sudut simpangan $\\theta = 60^\\circ$ terhadap garis vertikal. Panjang tali bandul adalah $L$. Kecepatan maksimum bandul di titik setimbang terbawah berbanding lurus dengan parameter apa?",
    options: ["Akar kuadrat dari Panjang Tali ($\\sqrt{L}$)", "Panjang Tali kuadrat ($L^2$)", "Massa bandul ($\\sqrt{m}$)", "Sudut ($\\theta^2$)"],
    answer: 0 // Beda tinggi h = L - L cos(60) = L(1-0.5) = 0.5 L. Kecepatan di dasar v = sqrt(2gh) = sqrt(2 * g * 0.5 L) = sqrt(g L). Jadi sebanding dengan akar L.
  },
  {
    question: "Hukum Kekekalan Energi Mekanik menyatakan bahwa total $EM$ selalu konstan JIKA...",
    options: ["Benda bergerak lurus beraturan.", "Tidak ada gaya sama sekali yang bekerja pada benda.", "Semua gaya yang melakukan usaha (work) pada benda adalah Gaya Konservatif (seperti gravitasi dan pegas).", "Hambatan udara menyeimbangkan gaya gravitasi."],
    answer: 2 // Jika ada gaya non-konservatif yang melakukan usaha, EM akan bocor. Jadi syarat EM kekal adalah hanya gaya konservatif yang beraksi mentransfer energi.
  },
  {
    question: "Benda bermassa $m$ dijatuhkan bebas (tanpa dorongan) ke atas sebuah pegas (konstanta pegas $k$) dari ketinggian $h$ di atas piringan pegas. Benda menimpa pegas dan memampatkannya sejauh $y_{max}$. Berdasarkan analisis Energi, persamaan yang benar menghubungkan seluruh posisi ini adalah...",
    options: ["$mgh = \\frac{1}{2} k y_{max}^2$", "$mg(h + y_{max}) = \\frac{1}{2} k y_{max}^2$", "$mg h = \\frac{1}{2} k (h + y_{max})^2$", "$\\frac{1}{2} m v^2 = ky_{max}$"],
    answer: 1 // Energi total awal (di ketinggian atas sebelum jatuh) adalah mgh relatif ke atas pegas. Jika diukur sampai titik berhenti terdalam, ketinggian total yang ditempuh benda jatuh adalah (h + y_max). Seluruh EP gravitasi (mg(h+y)) diubah jadi EP Pegas (1/2 k y^2).
  },
  {
    question: "Seorang anak bermain perosotan lurus kasar dengan sudut elevasi $30^\\circ$. Panjang perosotan adalah $s$. Koefisien gesek kinetisnya $\\mu_k = \\sqrt{3}/3$. Karena gesekannya sangat kuat, anak itu meluncur menuruni perosotan DENGAN KECEPATAN KONSTAN (Percepatan nol, EK konstan). Ke mana hilangnya Energi Potensial si anak tersebut?",
    options: ["Tidak ada Energi Potensial yang hilang.", "Diubah seluruhnya menjadi Energi Kinetik yang terus bertambah.", "Diserap sempurna 100% (sama besar) oleh Usaha Gaya Gesek menjadi panas.", "Berubah menjadi energi pegas."],
    answer: 2 // Karena EK awal dan EK akhir konstan (delta EK = 0). Rumusnya: EP_awal - W_gesek = EP_akhir. Artinya selisih EP (EP yang turun/hilang) sama besarnya dengan W_gesek yang dirampok. (Faktanya a=0, maka mg sin 30 = fk = mu mg cos 30, Usaha bersih nol).
  },
  {
    question: "Tarzan (massa $M$) berayun melintasi jurang menggunakan akar liana (tali panjang $R$). Saat ia berayun dan berada persis di bagian titik terendah melintas jurang (kecepatannya maksimum $V_{max}$), tegangan tali liana yang harus ia tahan bernilai sebesar...",
    options: ["$Mg$", "$Mg + M \\frac{V_{max}^2}{R}$", "$Mg - M \\frac{V_{max}^2}{R}$", "$M \\frac{V_{max}^2}{R}$"],
    answer: 1 // Di titik terendah lintasan melingkar: Sentripetal = T - w. Maka T - Mg = M V^2/R. Sehingga T = Mg + M V^2/R. (Kombinasi berat asli + beban sentripetal).
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
    
    if (mod.title === "Latihan Soal: Lintasan Loop Melingkar") {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { quizJson: JSON.stringify(cbtLatihanSoalBagian11) }
      });
      console.log(`Updated CBT Tryout Bagian 11: ${mod.title} with ${cbtLatihanSoalBagian11.length} questions`);
    }
  }
}

main().finally(() => prisma.$disconnect());
