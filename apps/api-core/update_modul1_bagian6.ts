import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contentData: Record<string, string> = {
  "Sub-bab 1: Hukum I Newton (Inersia) dan Kesetimbangan Translasi": `Selamat datang di dunia Dinamika! Jika di bab Kinematika kita bertindak seperti kameramen yang hanya **merekam gerak**, di bab Dinamika kita akan menjadi detektif yang **mencari tahu ALASAN (penyebab)** mengapa benda itu bergerak.

Penyebab gerak itu bernama **Gaya (Force)**. Gaya itu bisa tarikan atau dorongan. Tapi sebelum kita bahas orang mendorong barang, kita harus mulai dari sifat asli benda jika ia "Dibiarkan Sendirian". Inilah yang dirumuskan oleh Sir Isaac Newton sebagai Hukum I Newton, atau Hukum Kelembaman (Inersia).

### Pemalas Tingkat Dewa: Inersia
Newton menyadari sesuatu yang sangat revolusioner di zamannya:
**"Benda itu pada dasarnya sangat pemalas."**

Sifat "pemalas" benda ini dibagi menjadi dua skenario:
1. **Benda yang Diam**: Akan mati-matian mempertahankan posisinya agar tetap diam. Ia benci dipaksa bergerak.
2. **Benda yang Sudah Bergerak (Konstan)**: Akan melaju lurus tanpa lelah selamanya! Ia benci disuruh berhenti atau berbelok.

Contoh nyata:
- Saat kamu naik mobil, lalu sopir menginjak pedal gas mendadak, tubuhmu seakan "terlempar" ke belakang sandaran kursi. Apa yang terjadi? Bukannya terlempar, tubuhmu sebenarnya *sedang mempertahankan* posisi diamnya, sementara mobil melesat maju menabrak punggungmu!
- Sebaliknya, saat mobil direm mendadak, tubuhmu terpental ke depan. Kenapa? Karena tubuhmu *sedang asyik* melaju ke depan bersama mobil, dan saat mobil berhenti, tubuhmu ingin "terus maju"!

### Formula Fisika yang Sangat Ringkas
Karena benda yang tidak diganggu itu pemalas, tidak mau berubah kecepatan (artinya kecepatannya selalu konstan, atau percepatan $a = 0$), maka kita bisa menyimpulkan:
Jika **Total Gaya yang bekerja pada benda adalah NOL ($\\Sigma F = 0$)**, maka benda itu pasti sedang diam, ATAU sedang melaju konstan (GLB).

Lambang $\\Sigma$ (baca: Sigma) berasal dari bahasa Yunani yang berarti "Jumlah Total".

### Kesetimbangan Translasi
"Kesetimbangan" berarti benda sedang dalam pengaruh Hukum I Newton. Tidak ada pihak yang menang tarik-tambang!
- Ke kanan ada gaya dorong $10 \\text{ N}$. Ke kiri ada gaya gesek lantai sebesar $10 \\text{ N}$.
- Hasilnya: $+10$ ditambah $-10$ sama dengan $0$.
Karena $\\Sigma F = 0$, benda tersebut berada dalam **Kesetimbangan Translasi**, yang artinya ia tidak akan pernah mengalami percepatan atau perubahan nasib geraknya!

\`\`\`inlinequiz
{
  "question": "Jika sebuah pesawat ruang angkasa di luar angkasa (hampa udara dan gravitasi nol) mematikan seluruh mesin pendorongnya saat sedang melaju dengan kecepatan 10.000 km/jam, apa yang akan terjadi padanya?",
  "options": [
    "Berhenti perlahan-lahan lalu diam.",
    "Berhenti mendadak seketika.",
    "Terus melaju lurus dengan kecepatan 10.000 km/jam tanpa pernah berhenti.",
    "Berbelok membentuk lintasan orbit."
  ],
  "answer": 2,
  "explanation": "Benar! Karena tidak ada gaya gesek udara (ΣF = 0), menurut Hukum I Newton (Inersia), benda yang bergerak akan terus bergerak dengan kecepatan dan arah yang sama selamanya!"
}
\`\`\`
`,

  "Sub-bab 2: Identifikasi Gaya Aksi-Reaksi (Hukum III Newton)": `Seringkali kita mendengar kutipan filosofis: "Untuk setiap aksi, ada reaksi." Ternyata kalimat itu murni dari Hukum III Newton!

Hukum III Newton berbicara tentang satu hal mutlak:
**Di alam semesta ini, gaya TIDAK PERNAH JOMBLO!**
Gaya selalu muncul berpasangan, tidak bisa dipisahkan. Pasangan ini disebut pasangan **Aksi-Reaksi**.

### Aturan Main Pasangan Aksi-Reaksi
Ada 3 syarat ketat agar dua gaya bisa disebut sebagai sepasang kekasih "Aksi-Reaksi":
1. **Besarnya sama kuat (Sama besar).**
2. **Arahnya berlawanan 180 derajat.**
3. *(Ini yang paling penting)* **Bekerja pada DUA benda yang berbeda!**

### Mari Kita Bedah Contoh Klasik
Coba kamu pukul tembok di kamarmu sekeras mungkin. Apa yang terjadi?
Tanganmu akan terasa sangat sakit. Mengapa?
- Tanganmu memberikan gaya **AKSI** mendorong ke arah **Tembok**.
- Sebagai balas dendam, Tembok memberikan gaya **REAKSI** mendorong ke arah **Tanganmu** dengan kekuatan yang persis sama kerasnya!

Coba periksa 3 syarat tadi:
1. Sama besar? Ya. Semakin keras kamu memukul, semakin keras tembok membalas (makin sakit).
2. Berlawanan arah? Ya. Kamu meninju ke depan, tembok membalas mementalkanmu ke belakang.
3. Bekerja di dua benda berbeda? Ya! Aksi ada di tubuh Tembok, Reaksi ada di tubuh Tanganmu. Lulus 3 syarat!

### Jebakan Batman Tersulit di Fisika SMA
Sebuah balok diam di atas meja. Bumi menarik balok itu ke bawah (Gaya Berat, atau $w$). Karena balok menekan meja, meja menahan balok ke atas (Gaya Normal, atau $N$). Balok itu diam ($\\Sigma F = 0$), jadi $w$ dan $N$ bernilai sama besar namun berlawanan arah.
**Pertanyaannya:** Apakah Berat ($w$) dan Normal ($N$) adalah pasangan Aksi-Reaksi?

Banyak siswa akan langsung menjawab **"IYA!"** tanpa pikir panjang, karena melihat gaya itu sama besar dan berlawanan arah.
Mari kita buktikan dengan Syarat ke-3 kita:
- Di tubuh siapa Gaya Berat ($w$) bekerja? Di tubuh **Balok** (karena ia ditarik bumi).
- Di tubuh siapa Gaya Normal ($N$) bekerja? Juga di tubuh **Balok** (ia ditahan oleh meja ke atas).
Wah! Dua gaya ini numpuk saling sikut-sikutan di SATU benda yang sama (si Balok). 
Maka Berat ($w$) dan Normal ($N$) **TIDAK LULUS** syarat ke-3! Mereka bukan pasangan aksi-reaksi. Mereka hanya dua gaya beda orang tua yang kebetulan lewat dan seimbang.

Lalu siapa pasangan aksi dari Gaya Berat ($w$)?
Jika Bumi menarik Balok ke bawah (Aksi di Balok), maka reaksinya: Balok **menarik Bumi** ke atas (Reaksi di Bumi) dengan gaya yang sama kuat! Namun karena Bumi super masif massanya, tarikan dari balok tidak terasa efeknya pada Bumi. Mind-blowing bukan?

\`\`\`inlinequiz
{
  "question": "Sebuah nyamuk kecil bertabrakan dari depan dengan sebuah Truk raksasa yang melaju kencang (Truk menabrak Nyamuk, Nyamuk menabrak Truk). Manakah pernyataan yang benar mengenai gaya tabrakan di antara mereka?",
  "options": [
    "Gaya hantaman Truk ke Nyamuk jauh lebih besar daripada gaya hantaman Nyamuk ke Truk.",
    "Gaya hantaman Nyamuk ke Truk sama besar dengan gaya hantaman Truk ke Nyamuk.",
    "Nyamuk tidak memberikan gaya apapun ke Truk karena massanya terlalu kecil.",
    "Gaya hanya dihasilkan oleh benda yang lebih cepat."
  ],
  "answer": 1,
  "explanation": "Luar biasa! Ini adalah aplikasi murni Hukum III Newton. Truk memukul nyamuk (Aksi), dan Nyamuk otomatis memukul mundur Truk (Reaksi) dengan GAYA YANG SAMA BESAR. Lalu kenapa nyamuknya hancur tapi truknya tidak apa-apa? Karena efek kerusakan/percepatan bergantung pada 'Massa' (tubuh nyamuk rapuh), tapi nilai gaya tabrakannya sendiri 100% sama kuatnya!"
}
\`\`\`
`,

  "Sub-bab 3: Menggambar Diagram Benda Bebas (Free Body Diagram)": `Inilah senjata pamungkas kita di bab Dinamika. Menggambar "Free Body Diagram" (FBD), atau di Indonesia sering disebut Diagram Benda Bebas (DBB), adalah jurus wajib yang harus kamu kuasai. Tanpa FBD, menyelesaikan soal fisika Dinamika sama seperti menyetir mobil dengan mata tertutup!

### Apa itu FBD?
FBD adalah sebuah cara untuk "mengisolasi" benda yang sedang kita selidiki dari lingkungan sekitarnya, lalu kita gambar panah-panah yang mewakili SEMUA gaya tak terlihat yang sedang menyerang benda tersebut.

### Komponen Wajib dalam FBD
Berikut ini adalah 4 gaya dasar yang hampir selalu hadir dan harus kamu selidiki keberadaannya:

**1. Gaya Berat ($W$ atau $w$)**
- Sifat: Selalu muncul karena benda punya massa, dan **selalu ditarik ke arah pusat bumi (tegak lurus lurus ke bawah tanah)**.
- Rumusnya: $w = m \\cdot g$ (Massa dikali Gravitasi).
- Awas: Jangan pernah menggambar gaya berat miring ke samping, se-miring apapun jalanan tempat benda itu berada! Gaya berat selalu menunjuk murni ke lantai bawah (selatan kertasmu).

**2. Gaya Normal ($N$)**
- Sifat: Ini adalah gaya dorong (penolakan) dari bidang sentuh. Kata "Normal" di matematika artinya "Tegak Lurus/Siku-Siku".
- Arah: Selalu tegak lurus 90 derajat mendesak keluar menjauhi permukaan yang bersentuhan. Jika lantai datar, Normal ke atas. Jika lantai miring, Normal ikut miring 90 derajat terhadap lantai! Jika ditempel ke tembok, Normalnya ke samping.

**3. Gaya Tali / Tegangan Tali ($T$)**
- Sifat: Gaya yang diberikan tali. Ingat, tali hanya bisa MENARIK, tidak bisa mendorong!
- Arah: Selalu menunjuk sejajar/searah panjang tali itu **menjauhi** benda.

**4. Gaya Gesek ($f$)**
- Sifat: Musuh abadi pergerakan.
- Arah: Selalu menempel sejajar pada permukaan lantai, dan arahnya **berlawanan** 180 derajat terhadap arah (atau potensi arah) gerakan benda. Benda mau ke kanan, geseknya ke kiri.

### Cara Melukis FBD Langkah Demi Langkah
1. Gambarlah satu titik (atau kotak simpel) di tengah kertas, anggap itu adalah objek bendamu. Pura-pura lupakan benda lain di sekitarnya.
2. Tanyakan ke dirimu: *"Benda ini punya massa tidak?"* Jika ya, tarik garis tegak lurus ke bawah, beri nama $w$.
3. *"Apakah benda ini sedang menempel pada benda lain (lantai/tembok/meja)?"* Jika ya, tarik garis tegak lurus mendorong dari benda tersebut, beri nama $N$.
4. *"Apakah benda ini ditarik tali?"* Jika ya, tarik panah sesuai arah tali, beri nama $T$.
5. *"Apakah lantainya kasar?"* Jika ya, tarik panah menempel di lantai berlawanan arah dengan gerak, beri nama $f$.

Begitu 4 pertanyaan di atas kamu tuntaskan, kamu baru saja melukis maha karya agung yang akan membimbingmu menyelesaikan soal serumit apapun! Semua komponen yang ada di FBD ini nantinya siap dimasukkan ke mesin pemroses kita, yaitu $\\Sigma F = ma$.

\`\`\`inlinequiz
{
  "question": "Sebuah lukisan digantung di dinding menggunakan sebuah paku yang diikat dengan tali, sehingga posisi lukisan tegak lurus miring sedikit. Ke manakah arah panah Gaya Normal (N) pada lukisan tersebut saat kita menggambar FBD?",
  "options": [
    "Lurus tegak ke atas melawan gravitasi.",
    "Lurus sejajar dengan kemiringan tali.",
    "Tegak lurus sejajar/menusuk dinding keluar sejauh 90 derajat mendesak punggung lukisan.",
    "Lukisan tidak memiliki gaya Normal karena digantung, bukan diletakkan."
  ],
  "answer": 2,
  "explanation": "Brilian! Selama ada sentuhan antara permukaan (punggung lukisan menempel bersentuhan dengan dinding), maka wajib muncul Gaya Normal. Arahnya? Selalu 90 derajat MENDESAK KELUAR menjauhi permukaan persentuhan tersebut, dalam hal ini dinding akan mendorong tegak keluar menuju lukisan!"
}
\`\`\`
`
};

const cbtLatihanSoalBagian6 = [
  {
    question: "Seseorang bermassa $60 \\text{ kg}$ berada di dalam sebuah lift yang sedang bergerak dipercepat KELUAR KE ATAS (bergerak naik, percepatan ke atas) dengan percepatan $2 \\text{ m/s}^2$. Jika $g = 10 \\text{ m/s}^2$, berapakah besar Gaya Normal lantai lift yang menekan kaki orang tersebut?",
    options: ["$600 \\text{ N}$", "$720 \\text{ N}$", "$480 \\text{ N}$", "$120 \\text{ N}$"],
    answer: 1 // Sigma F = m a => N - w = m a => N = w + m a = 600 + (60*2) = 720
  },
  {
    question: "Sebuah balok kayu bermassa $m$ ditarik di atas lantai mendatar licin menggunakan tali yang membentuk sudut $\\theta$ terhadap lantai. Jika tegangan tali adalah $T$, maka persamaan Hukum I Newton untuk Kesetimbangan sumbu Vertikal (Sumbu Y) balok tersebut adalah...",
    options: ["$N - mg = 0$", "$N + T\\sin\\theta - mg = 0$", "$N - T\\cos\\theta - mg = 0$", "$T\\sin\\theta - mg = 0$"],
    answer: 1 // Y axis: N up, T sin theta up, mg down. N + Tsin0 - mg = 0
  },
  {
    question: "Menurut Hukum III Newton tentang gaya Aksi-Reaksi, syarat utama dari sepasang gaya aksi-reaksi adalah...",
    options: ["Bekerja pada benda yang sama agar saling meniadakan", "Menghasilkan resultan gaya yang bernilai nol pada sistem yang bergerak", "Bekerja pada DUA benda yang saling berinteraksi secara silang", "Hanya berlaku jika benda dalam keadaan diam mutlak"],
    answer: 2
  },
  {
    question: "Sebuah benda bermassa $2 \\text{ kg}$ ditahan dengan tangan agar menempel diam di dinding vertikal (dindingnya tegak lurus). Gaya dorong horizontal tangan ke dinding adalah $50 \\text{ N}$. Berapakah besar Gaya Normal yang diberikan dinding ke benda tersebut?",
    options: ["$20 \\text{ N}$", "$50 \\text{ N}$", "$70 \\text{ N}$", "$0 \\text{ N}$"],
    answer: 1 // Horizontal force eq: F_tangan = Normal_dinding. Since F=50, N=50.
  },
  {
    question: "Sebuah helikopter yang massanya $3000 \\text{ kg}$ melayang diam (hovering) di udara. Baling-baling memompa udara vertikal ke bawah sehingga memberikan gaya angkat. Berapakah besar gaya angkat udara yang harus dipertahankan agar ia tetap melayang? ($g = 10 \\text{ m/s}^2$)",
    options: ["$0 \\text{ N}$", "$300 \\text{ N}$", "$3000 \\text{ N}$", "$30000 \\text{ N}$"],
    answer: 3 // F_angkat = w = m*g = 30000 N
  },
  {
    question: "Benda bermassa $5 \\text{ kg}$ meluncur di atas lantai es yang sangat licin (Hambatan nol). Pada suatu ketika, benda sudah mencapai kecepatan stabil sebesar $10 \\text{ m/s}$. Berapakah total gaya mendatar yang sedang bekerja (mendorong) benda tersebut sesaat ia sedang meluncur?",
    options: ["$50 \\text{ N}$", "$10 \\text{ N}$", "$0 \\text{ N}$", "$2 \\text{ N}$"],
    answer: 2 // GLB (kecepatan stabil/konstan) artinya percepatan 0, maka Sigma F = 0. Tidak ada gaya mendatar.
  },
  {
    question: "Seseorang berada di dalam lift yang kabelnya terputus dan terjatuh bebas ke bawah ($a = g$). Berapakah besar Gaya Normal (berat semu) yang dirasakan orang tersebut pada kakinya dari lantai lift?",
    options: ["Sama dengan berat orang tersebut ($mg$)", "Nol (Merasakan tanpa bobot)", "Setengah dari berat orang tersebut", "Lebih besar dari berat orang tersebut"],
    answer: 1 // Sigma F = ma => mg - N = ma. Karena a=g, mg - N = mg => N = 0
  },
  {
    question: "Tiga buah buku ditumpuk secara vertikal (Buku 1 paling bawah, Buku 2 di tengah, Buku 3 paling atas). Jika kita mengamati HANYA Buku 2 (menggambar Free Body Diagram khusus Buku 2), ada berapakah total panah gaya Gaya Normal yang mengenai Buku 2?",
    options: ["Hanya 1 (dari Buku 1 ke atas)", "2 (dari Buku 1 ke atas, dan dari Buku 3 menekan ke bawah)", "3 (termasuk dari meja dasar)", "Tidak ada gaya Normal sama sekali"],
    answer: 1 // 2 contact surfaces: Buku 2 disentuh oleh Buku 1 (N dari bawah dorong atas) dan Buku 2 disentuh Buku 3 (N dari buku 3 menekan buku 2 ke bawah).
  },
  {
    question: "Bulan senantiasa ditarik oleh bumi dengan Gaya Gravitasi yang sangat besar sehingga bulan selalu mengorbit bumi (Aksi). Reaksi dari peristiwa ini adalah...",
    options: ["Bulan ditarik oleh Matahari", "Bulan memberikan gaya angkat pada air laut di Bumi (Pasang Surut)", "Bulan menarik Bumi ke arah bulan dengan kekuatan tarik gravitasi yang sama besar", "Tidak ada reaksi karena Bumi jauh lebih masif dari Bulan"],
    answer: 2 // Reaksi langsungnya adalah Bulan menarik Bumi dengan gaya berukuran sama persis. (Menyebabkan pasang surut adalah efeknya)
  },
  {
    question: "Sebuah lampu hias $4 \\text{ kg}$ digantung dengan tali vertikal dari plafon langit-langit atap. Berapakah tegangan tali pada sistem yang diam ini? ($g=10 \\text{ m/s}^2$)",
    options: ["$0 \\text{ N}$", "$4 \\text{ N}$", "$40 \\text{ N}$", "$400 \\text{ N}$"],
    answer: 2 // T - w = 0 => T = 40N
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
    
    if (mod.title === "Latihan Soal: Gaya Normal pada Lift Dipercepat") {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { quizJson: JSON.stringify(cbtLatihanSoalBagian6) }
      });
      console.log(`Updated CBT Tryout: ${mod.title} with ${cbtLatihanSoalBagian6.length} questions`);
    }
  }
}

main().finally(() => prisma.$disconnect());
