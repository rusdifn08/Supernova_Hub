import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contentData: Record<string, string> = {
  // Fix the invalid JSON from previous run
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
GLBB: $$v_t = v_0 + a \\cdot t$$
Coba kamu ganti simbolnya sesuai kamus di atas. Apa hasilnya?
GMBB: **$$\\omega_t = \\omega_0 + \\alpha \\cdot t$$**

**Rumus GLBB 2 (Mencari Jarak Tempuh):**
GLBB: $$x = v_0 \\cdot t + \\frac{1}{2}a \\cdot t^2$$
GMBB: **$$\\theta = \\omega_0 \\cdot t + \\frac{1}{2}\\alpha \\cdot t^2$$**

**Rumus GLBB 3 (Rumus Tanpa Waktu):**
GLBB: $$v_t^2 = v_0^2 + 2a \\cdot x$$
GMBB: **$$\\omega_t^2 = \\omega_0^2 + 2\\alpha \\cdot \\theta$$**

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
$$\\omega_t^2 = \\omega_0^2 + 2\\alpha \\cdot \\theta$$
$$0^2 = 10^2 + 2(-2) \\cdot \\theta$$
$$0 = 100 - 4\\theta$$
Pindahkan $-4\\theta$ ke kiri menjadi $4\\theta$:
$$4\\theta = 100$$
Bagi dengan 4:
$$\\theta = 25 \\text{ radian}$$

Keren, kan? Semudah mengerjakan GLBB!

\`\`\`inlinequiz
{
  "question": "Jika pada GLBB, 'a' bernilai negatif berarti mobil sedang direm (melambat). Jika pada GMBB 'alpha' bernilai negatif, apa makna fisisnya?",
  "options": [
    "Benda berputar ke arah yang berlawanan.",
    "Benda berhenti seketika.",
    "Putaran benda semakin lama semakin lambat."
  ],
  "answer": 2,
  "explanation": "Benar! Makna perlambatan di GLBB dan GMBB sama. Alpha negatif menunjukkan bahwa kecepatan putar benda semakin lambat hingga akhirnya akan diam (seperti kipas angin yang dicabut listriknya)."
}
\`\`\`
`,

  // Bagian 3
  "Sub-bab 3: Parabola dari Ketinggian Tertentu": `Pernahkah kamu bermain meriam air dari atas balkon rumahmu? Atau menjatuhkan paket bantuan dari pesawat terbang yang sedang melaju kencang?

Kasus-kasus ini sedikit berbeda dengan melempar bola basket dari tanah. Di sini, benda **sudah memiliki ketinggian awal** (kita sebut $h_0$ atau $y_0$) sebelum dia mulai terbang!

Tenang saja, prinsip Superposisi yang sudah kita pelajari tetap berlaku secara sakral. Sumbu X dan Sumbu Y saling cuek. Hanya saja, titik awal lemparan tidak lagi berada di angka nol.

### Menyesuaikan Posisi Awal (Ketinggian)
Mari kita buka kembali rumus Posisi (Ketinggian) GLBB yang kita gunakan pada gerak vertikal:
$$y = v_{0y} \\cdot t - \\frac{1}{2}g \\cdot t^2$$

Rumus ini berasumsi bahwa kamu melempar dari tanah ($y_0 = 0$). Tapi karena sekarang kamu melempar dari atas gedung setinggi $h_0$, kita tinggal menjumlahkan ketinggian awalnya di depan rumus! Jadinya seperti ini:
$$y = h_0 + v_{0y} \\cdot t - \\frac{1}{2}g \\cdot t^2$$

### Kasus Klasik: Melempar Lurus Mendatar dari Atas Gedung
Coba bayangkan: Kamu sedang berdiri di atap gedung, lalu menendang bola sepak dengan sangat keras **secara mendatar (horizontal) lurus ke depan**.

Apa yang unik dari tendangan mendatar ini?
- Bola melaju sangat cepat ke depan ($v_{0x}$ ada nilainya).
- Tapi, apakah kamu menendang bola itu *ke atas*? Tidak! Kamu menendangnya mendatar. 
Artinya, **kecepatan awal naik/turunnya adalah nol! ($v_{0y} = 0$)**.

Mari kita masukkan angka 0 ini ke rumus ketinggian kita yang baru tadi:
$$y = h_0 + 0 \\cdot t - \\frac{1}{2}g \\cdot t^2$$
$$y = h_0 - \\frac{1}{2}g \\cdot t^2$$

**Kapan bola menyentuh tanah?**
Tanah berarti ketinggiannya sudah habis, alias $y = 0$. Mari kita letakkan angka 0 di posisi $y$:
$$0 = h_0 - \\frac{1}{2}g \\cdot t^2$$

Bagaimana cara mencari waktu jatuhnya ($t$)? Mari kita pindahkan $-\\frac{1}{2}g \\cdot t^2$ ke sisi kiri agar menjadi positif!
$$\\frac{1}{2}g \\cdot t^2 = h_0$$
Kalikan silang (angka 2 naik ke atas, huruf g turun ke bawah):
$$t^2 = \\frac{2 \\cdot h_0}{g}$$
Untuk menghilangkan kuadrat, kita akarkan:
$$t = \\sqrt{\\frac{2 \\cdot h_0}{g}}$$

Wah! Coba perhatikan. Apakah waktu jatuhnya bergantung pada seberapa keras kamu menendang ke depan? Sama sekali tidak ada variabel $v_{0x}$ di sana!
Ini membuktikan asas Galileo: Benda yang ditendang super keras secara mendatar akan jatuh ke tanah pada **waktu yang bersamaan persis** dengan benda yang dijatuhkan pelan dari ketinggian yang sama! Ajaib bukan?

\`\`\`inlinequiz
{
  "question": "Jika kamu menjatuhkan batu secara vertikal dari atas gedung (A), dan di saat yang sama menendang batu lain secara mendatar dari gedung yang sama (B), manakah yang menyentuh tanah lebih dulu?",
  "options": [
    "Batu A menyentuh tanah lebih dulu.",
    "Batu B menyentuh tanah lebih dulu.",
    "Kedua batu menyentuh tanah bersamaan."
  ],
  "answer": 2,
  "explanation": "Luar biasa! Karena gerak sumbu X (horizontal) dan Y (vertikal) saling terpisah, dorongan mendatar pada batu B sama sekali tidak memengaruhi seberapa cepat gravitasi menariknya ke bawah. Keduanya akan jatuh bersamaan!"
}
\`\`\`
`,

  "Sub-bab 4: Persamaan Lintasan Parabola y(x)": `Selama ini, jika kita ingin tahu di mana posisi bola basket yang kita lempar, kita selalu bertanya pada "Waktu" ($t$).
"Eh, kalau waktunya $t = 2$ detik, posisi bola ada di titik mana ($x, y$)?"

Tapi, pernahkah kamu bertanya-tanya, apakah kita bisa membuat satu rumus super yang **langsung menghubungkan ketinggian ($y$) dengan jarak mendatar ($x$)**, tanpa mempedulikan waktu ($t$) sama sekali?
Rumus ini akan memberi kita bentuk murni dari lintasan peluru itu sendiri!

Mari kita buktikan bahwa kita bisa melakukannya dengan teknik subtitusi aljabar yang sangat indah.

### Langkah 1: Membajak Rumus Sumbu X
Kita tahu bahwa pergerakan sumbu X adalah Gerak Lurus Beraturan (konstan) tanpa hambatan:
$$x = v_{0x} \\cdot t$$
Kita ingat bahwa $v_{0x} = v_0 \\cos(\\theta)$, jadi:
$$x = (v_0 \\cos\\theta) \\cdot t$$

Sekarang, ayo kita putar balik rumus ini untuk mencari $t$:
Pindahkan $(v_0 \\cos\\theta)$ ke ruas kiri sebagai pembagi:
$$t = \\frac{x}{v_0 \\cos\\theta}$$

Simpan rumus waktu ini baik-baik! Kita akan menggunakannya sebagai "kuda troya" untuk menyusup ke rumus sumbu Y.

### Langkah 2: Menyusup ke Rumus Sumbu Y
Rumus posisi ketinggian (GLBB) di sumbu Y adalah:
$$y = v_{0y} \\cdot t - \\frac{1}{2}g \\cdot t^2$$
Ingat bahwa $v_{0y} = v_0 \\sin\\theta$:
$$y = (v_0 \\sin\\theta) \\cdot t - \\frac{1}{2}g \\cdot t^2$$

Nah, saatnya beraksi! Ganti SEMUA huruf $t$ di rumus atas dengan "Kuda Troya" yang kita buat di Langkah 1 ($t = \\frac{x}{v_0 \\cos\\theta}$):

$$y = (v_0 \\sin\\theta) \\cdot \\left( \\frac{x}{v_0 \\cos\\theta} \\right) - \\frac{1}{2}g \\cdot \\left( \\frac{x}{v_0 \\cos\\theta} \\right)^2$$

Tahan napasmu, mari kita sederhanakan ini pelan-pelan.
Lihat bagian pertama:
$(v_0 \\sin\\theta) \\cdot \\frac{x}{v_0 \\cos\\theta}$
- Variabel $v_0$ di atas dan di bawah saling membatalkan (coret)!
- Kita punya $\\frac{\\sin\\theta}{\\cos\\theta}$. Apa itu? Di matematika dasar, $\\sin$ dibagi $\\cos$ adalah **$\\tan$ (tangen)**!
Maka bagian pertama berubah wujud menjadi sangat elegan: $\\tan\\theta \\cdot x$.

Sekarang lihat bagian kedua:
$\\frac{1}{2}g \\cdot \\left( \\frac{x}{v_0 \\cos\\theta} \\right)^2$
Kita kuadratkan bagian dalamnya:
$\\frac{1}{2}g \\cdot \\frac{x^2}{v_0^2 \\cos^2\\theta}$
Lalu kita rapikan penulisannya menjadi satu baris pembagian:
$\\frac{g \\cdot x^2}{2 v_0^2 \\cos^2\\theta}$

### Hasil Akhir: Persamaan Murni Parabola
Mari kita gabungkan bagian pertama dan kedua yang sudah kita sederhanakan tadi:

**$$y = (\\tan\\theta) \\cdot x - \\frac{g}{2 v_0^2 \\cos^2\\theta} \\cdot x^2$$**

Boom! Kamu baru saja menemukan **Persamaan Lintasan Parabola**.
Coba kamu perhatikan baik-baik persamaannya. 
Tidak ada huruf $t$ lagi di sana! Persamaan ini langsung menjawab *"Jika bola maju sejauh $x$ meter, berapa ketinggian $y$-nya?"*

Di pelajaran Matematika SMA, bentuk fungsi $y = Ax - Bx^2$ adalah grafik kuadrat sempurna berbentuk lengkung parabola ke bawah. Rumus fisika kita ini secara matematis membuktikan bahwa lintasan barang yang dilempar itu **selalu berbentuk parabola**, bukan setengah lingkaran, bukan oval, tapi murni parabola! Sangat memukau bukan?

\`\`\`inlinequiz
{
  "question": "Pada persamaan lintasan y(x) tanpa waktu, kita menggunakan properti trigonometri di mana Sinus dibagi Cosinus. Menjadi fungsi trigonometri apakah itu?",
  "options": [
    "Cotangen",
    "Secan",
    "Tangen"
  ],
  "answer": 2,
  "explanation": "Benar! sin(theta) / cos(theta) adalah tangen (tan). Inilah alasan mengapa sudut lemparan sangat memengaruhi kelengkungan parabola!"
}
\`\`\`
`,

  // Bagian 4
  "Sub-bab 3: Besaran Anguler vs Besaran Linear": `Pernahkah kamu memutar roda sepeda yang terbalik dengan tanganmu? 

Bayangkan ada seekor lalat kecil hinggap di jari-jari roda di dekat poros tengah (pusat roda), dan ada seekor kupu-kupu yang hinggap di pinggiran ban paling luar.
Saat kamu memutar roda tersebut dengan cepat, siapa yang merasa pusing lebih dulu?

Mari kita bongkar fenomena ini dengan membedakan dua jenis kecepatan:
1. **Kecepatan Sudut ($\\omega$)**: Seberapa cepat putarannya.
2. **Kecepatan Linear/Tangensial ($v$)**: Seberapa kencang "angin" yang dirasakan karena melesat maju di lintasannya.

### Sudut Pandang Kecepatan Sudut ($\\omega$)
Roda sepeda adalah benda yang padat dan kaku (*rigid body*). Artinya, saat roda berputar setengah lingkaran (180 derajat), SEMUA titik di roda tersebut juga ikut berputar 180 derajat dalam waktu yang sama persis.

Lalat di tengah menyapu sudut 180 derajat. Kupu-kupu di pinggir ban juga menyapu sudut 180 derajat. 
Artinya: **Kecepatan sudut ($\\omega$) mereka berdua SAMA BESAR!**

### Sudut Pandang Kecepatan Linear ($v$)
Tapi tunggu dulu, mari kita lihat jarak tempuh aslinya (lintasan melengkung yang dilalui).
Lalat di dekat poros (jari-jari kecil) hanya menempuh lintasan lengkung yang sangat pendek.
Kupu-kupu di pinggir ban (jari-jari besar) harus menempuh keliling luar ban yang jarak lengkungnya sangat sangat jauh!

Karena Kupu-kupu harus menempuh jarak jauh dalam waktu yang sama dengan Lalat yang menempuh jarak pendek, maka **kupu-kupu harus melesat jauh lebih kencang!** 
Oleh karena itu, Kecepatan Linear ($v$) Kupu-kupu jauh lebih besar daripada lalat.

### Jembatan Rumusnya!
Bagaimana cara kita mengubah besaran putar (sudut) menjadi besaran lurus (linear)?
Fisika menyediakan jembatan yang sangat kuat, yaitu **Jari-Jari ($R$)**.
Semakin jauh kamu dari pusat putaran (semakin besar $R$), semakin kencang kecepatan linearmu.

Hubungannya sangat sederhana, tinggal kalikan dengan jari-jari ($R$):
1. **Posisi Linear/Jarak Lengkung ($s$):**
   $$s = \\theta \\cdot R$$
   *(Sudut putarnya dikalikan jari-jari).*

2. **Kecepatan Linear/Tangensial ($v$):**
   $$v = \\omega \\cdot R$$
   *(Kecepatan putarnya dikalikan jari-jari).*

3. **Percepatan Linear/Tangensial ($a_t$):**
   $$a_t = \\alpha \\cdot R$$
   *(Percepatan putarnya dikalikan jari-jari).*

Jadi kesimpulannya: Meskipun satu benda kaku berputar dengan satu kecepatan putar yang sama ($\\omega$), titik-titik di ujung terluar benda itu akan selalu melesat membelah angin lebih cepat ($v$ tinggi) dibandingkan titik di dekat poros. Itulah mengapa jika piringan CD diputar terlalu ekstrim, pinggirannya bisa hancur!

\`\`\`inlinequiz
{
  "question": "Jika dua orang menaiki Komedi Putar (Carousel), Anak A duduk di kuda-kudaan dekat tiang tengah, dan Anak B duduk di kuda-kudaan paling luar (pinggir). Siapakah yang memiliki kecepatan linear (tangensial) lebih besar?",
  "options": [
    "Anak A, karena jarak tempuhnya lebih dekat.",
    "Keduanya sama besar, karena berada di komedi putar yang sama.",
    "Anak B, karena dia berada di jari-jari (R) yang lebih jauh dari pusat putaran."
  ],
  "answer": 2,
  "explanation": "Luar Biasa! Anak B memiliki jari-jari R yang lebih besar. Karena v = omega * R, dan omega mereka sama (berada di wahana yang sama), maka v milik Anak B lebih besar dan dia akan merasakan hembusan angin lebih kencang!"
}
\`\`\`
`,

  "Sub-bab 4: Percepatan Sentripetal vs Tangensial": `Kamu mungkin pernah mendengar bahwa percepatan berarti "menambah kecepatan" (makin cepat).
Tapi di gerak melingkar, ada satu jenis percepatan rahasia yang **tidak pernah** mengubah kecepatan, melainkan hanya **mengubah arah**!

Mari berkenalan dengan dua saudara kembar beda sifat:

### 1. Percepatan Tangensial ($a_t$) - Si Pengubah Angka Speedometer
Ini adalah percepatan yang sudah kita kenal sehari-hari. 
Kata "Tangensial" artinya "menyinggung lintasan". Ini adalah percepatan yang bekerja searah dengan pergerakan benda.
Fungsi utamanya hanya satu: **Membuat benda melaju lebih kencang atau lebih lambat.**
Jika kamu naik motor di lintasan melingkar lalu menarik gas, kamu merasakan percepatan tangensial.

Rumusnya tadi sudah kita pelajari di sub-bab sebelumnya, yaitu jembatan dari percepatan sudut:
$$a_t = \\alpha \\cdot R$$

### 2. Percepatan Sentripetal ($a_s$ atau $a_c$) - Si Pembelok Arah
"Sentripetal" berasal dari bahasa Latin yang artinya "Mencari Pusat".
Bayangkan kamu mengikat batu di ujung tali dan memutarnya. Apa yang menahan batu itu agar tidak terbang lurus kabur? Tali! 
Tali itu terus-menerus "menarik" batu ke arah tengah (pusat) putaran. Tarikan inilah yang menciptakan percepatan sentripetal.

Fungsi utama percepatan sentripetal **bukanlah** mengubah angka kecepatan, melainkan **mengubah ARAH gerak secara terus-menerus** sehingga benda terpaksa berbelok membentuk lingkaran! Jika percepatan sentripetal ini hilang sedetik saja (talinya putus), batu itu akan terbang lurus terlempar (Hukum Inersia Newton).

Rumus percepatan sentripetal ini sangat populer dan patut diingat:
$$a_s = \\frac{v^2}{R}$$
Atau jika kita substitusi $v = \\omega \\cdot R$:
$$a_s = \\omega^2 \\cdot R$$

Semakin kencang benda bergerak ($v$ besar) atau semakin sempit tikungannya ($R$ kecil), benda akan membutuhkan percepatan pembelok ($a_s$) yang jauh lebih besar agar tidak tergelincir! Inilah alasan mengapa menikung tajam dengan kecepatan tinggi di jalan basah sangat berbahaya.

### 3. Percepatan Total (Resultan)
Jadi saat benda melakukan GMBB (putarannya makin lama makin cepat), benda itu diserang oleh dua percepatan sekaligus!
- Ditarik ke arah depan agar makin cepat ($a_t$).
- Ditarik ke arah dalam pusat agar berbelok ($a_s$).

Arah "depan/menyinggung" dan arah "ke pusat putaran" itu tegak lurus membentuk sudut 90 derajat!
Bagaimana cara menjumlahkan dua vektor yang tegak lurus? Yup, panggil pahlawan kita: Pythagoras!

$$a_{total} = \\sqrt{a_t^2 + a_s^2}$$

Di GMB (Gerak Melingkar Beraturan di mana kecepatan konstan), nilai $a_t = 0$, sehingga percepatan totalnya murni hanya $a_s$. Tapi di GMBB, benda ditarik ke depan dan ke dalam secara bersamaan!

\`\`\`inlinequiz
{
  "question": "Satelit GPS mengorbit bumi dengan kecepatan linear yang konstan (tetap). Apakah satelit tersebut memiliki percepatan?",
  "options": [
    "Tidak, karena kecepatannya konstan berarti percepatannya nol.",
    "Ya, satelit memiliki percepatan sentripetal yang terus menariknya berbelok mengelilingi bumi.",
    "Ya, satelit memiliki percepatan tangensial yang mengubah kecepatannya."
  ],
  "answer": 1,
  "explanation": "Brilian! Kecepatan konstan hanya berarti percepatan tangensial (at) yang nol. Namun agar bisa berbelok mengelilingi bumi membentuk lingkaran, satelit WAJIB memiliki percepatan sentripetal (as) yang disediakan oleh gaya gravitasi Bumi!"
}
\`\`\`
`
};

const cbtQuizzesBagian3 = [
  {
    question: "Sebuah peluru ditembakkan dengan kecepatan awal $40 \\text{ m/s}$ dengan sudut elevasi $30^\\circ$. Berapakah kecepatan awal komponen vertikalnya ($v_{0y}$)?",
    options: ["$20 \\text{ m/s}$", "$40 \\text{ m/s}$", "$20\\sqrt{3} \\text{ m/s}$", "$10 \\text{ m/s}$"],
    answer: 0
  },
  {
    question: "Dalam gerak parabola dengan hambatan udara diabaikan, percepatan yang bekerja pada sumbu X adalah...",
    options: ["$9.8 \\text{ m/s}^2$", "Sama dengan percepatan gravitasi", "Nol", "Berkurang seiring waktu"],
    answer: 2
  },
  {
    question: "Untuk mendapatkan jarak mendatar maksimal ($X_{max}$), berapakah sudut elevasi tembakan yang harus digunakan di atas tanah datar?",
    options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
    answer: 1
  },
  {
    question: "Sebuah batu ditendang horizontal dari atas tebing setinggi $45 \\text{ m}$ dengan kecepatan awal $15 \\text{ m/s}$. Berapa waktu yang dibutuhkan untuk jatuh ke tanah? ($g = 10 \\text{ m/s}^2$)",
    options: ["$3$ detik", "$4.5$ detik", "$1.5$ detik", "$9$ detik"],
    answer: 0
  },
  {
    question: "Pada titik tertinggi (puncak) dari lintasan parabola, pernyataan manakah yang benar?",
    options: ["Kecepatan total benda sama dengan nol", "Percepatan benda sama dengan nol", "Kecepatan vertikal benda ($v_y$) sama dengan nol", "Kecepatan horizontal benda ($v_x$) sama dengan nol"],
    answer: 2
  },
  {
    question: "Dari persamaan lintasan tanpa waktu $y = x \\tan\\theta - \\frac{g x^2}{2 v_0^2 \\cos^2\\theta}$, terbukti bahwa grafik lintasan gerak proyektil selalu berbentuk matematis...",
    options: ["Fungsi Linear", "Fungsi Eksponensial", "Fungsi Lingkaran", "Fungsi Kuadrat (Parabola)"],
    answer: 3
  },
  {
    question: "Seorang kiper menendang bola melambung tinggi. Faktor apa saja yang TIDAK MEMPENGARUHI seberapa jauh jarak tembakan bola ke depan ($X_{max}$)? (Asumsikan hambatan udara nol).",
    options: ["Sudut elevasi tendangan ($\\theta$)", "Kecepatan awal tendangan ($v_0$)", "Massa bola (Kg)", "Percepatan gravitasi tempat kiper bermain ($g$)"],
    answer: 2
  },
  {
    question: "Sebuah pesawat melempar bantuan medis secara mendatar dengan kecepatan pesawat $100 \\text{ m/s}$ pada ketinggian $500$ meter. Pada saat dijatuhkan, berapakah kecepatan awal vertikal ($v_{0y}$) kotak medis tersebut?",
    options: ["$100 \\text{ m/s}$", "$0 \\text{ m/s}$", "$-10 \\text{ m/s}$", "$500 \\text{ m/s}$"],
    answer: 1
  },
  {
    question: "Dua benda A dan B ditembakkan dari sudut $30^\\circ$ dan $60^\\circ$ dengan kecepatan awal yang SAMA PERSIS. Manakah dari pernyataan ini yang tepat terkait jarak jatuhnya ($X_{max}$)?",
    options: ["Benda A jatuh lebih jauh dari B", "Benda B jatuh lebih jauh dari A", "Kedua benda jatuh pada jarak yang sama", "Benda B tidak bergerak ke depan"],
    answer: 2
  },
  {
    question: "Jika di bulan percepatan gravitasinya jauh lebih kecil (seperenam dari bumi), apa yang terjadi jika astronot menembakkan bola parabola di bulan dibandingkan di bumi?",
    options: ["Waktu melayang lebih singkat", "Ketinggian maksimal bola akan lebih rendah", "Jarak mendatar tembakan ($X_{max}$) akan jauh lebih besar", "Lintasan peluru tidak akan berbentuk parabola"],
    answer: 2
  }
];

const cbtQuizzesBagian4 = [
  {
    question: "Sebuah roda berputar sebanyak $1200$ rotasi per menit (rpm). Berapakah kecepatan sudutnya ($\\omega$) dalam satuan $\\text{rad/s}$?",
    options: ["$40\\pi \\text{ rad/s}$", "$20\\pi \\text{ rad/s}$", "$1200 \\text{ rad/s}$", "$60\\pi \\text{ rad/s}$"],
    answer: 0
  },
  {
    question: "Dalam Gerak Melingkar Beraturan (GMB), roda berputar secara konstan tanpa perlambatan atau percepatan putar. Pada kasus ini, besaran manakah yang bernilai nol?",
    options: ["Kecepatan Sudut ($\\omega$)", "Percepatan Sentripetal ($a_s$)", "Percepatan Sudut ($\\alpha$)", "Percepatan Total ($a_{tot}$)" ],
    answer: 2
  },
  {
    question: "Besaran 'Kecepatan Sudut ($\\omega$)' dalam Fisika adalah analogi (kembaran) langsung dari besaran apa di lintasan linear?",
    options: ["Jarak ($x$)", "Waktu ($t$)", "Percepatan ($a$)", "Kecepatan Linear ($v$)"],
    answer: 3
  },
  {
    question: "Sebuah kipas angin memiliki percepatan sudut $\\alpha = 4 \\text{ rad/s}^2$. Jika ia mulai dari keadaan diam, berapakah kecepatan sudut kipas pada $t = 3$ detik?",
    options: ["$12 \\text{ rad/s}$", "$1.33 \\text{ rad/s}$", "$7 \\text{ rad/s}$", "$0 \\text{ rad/s}$"],
    answer: 0
  },
  {
    question: "Sebuah bianglala berputar. Titik A berada $10$ meter dari poros pusat, sedangkan Titik B berada $2$ meter dari poros pusat. Jika dibandingkan, bagaimana kecepatan linear (tangensial) mereka?",
    options: ["Kecepatan $v$ titik A = $v$ titik B", "Kecepatan $v$ titik A > $v$ titik B", "Kecepatan $v$ titik A < $v$ titik B", "Kecepatan $v$ titik A bernilai nol"],
    answer: 1
  },
  {
    question: "Gaya atau tarikan yang senantiasa menahan benda agar terus melengkung berbelok dan tidak terbang lurus menjauhi lintasan lingkarannya akan menciptakan...",
    options: ["Percepatan Tangensial", "Percepatan Sentripetal", "Percepatan Linear", "Percepatan Sudut"],
    answer: 1
  },
  {
    question: "Rumus dari percepatan sentripetal ($a_s$) yang sering menjebak siswa saat ujian adalah...",
    options: ["$a_s = \\omega^2 \\cdot R$", "$a_s = \\frac{v}{R^2}$", "$a_s = \\alpha \\cdot R$", "$a_s = \\omega \\cdot R^2$"],
    answer: 0
  },
  {
    question: "Sebuah mobil masuk tikungan melingkar. Si sopir menginjak pedal gas sehingga kelajuan mobil bertambah. Percepatan manakah yang dihasilkan akibat injakan pedal gas ini?",
    options: ["Percepatan Sentripetal", "Percepatan Sudut", "Percepatan Tangensial", "Percepatan Radial"],
    answer: 2
  },
  {
    question: "Bagaimana cara menentukan percepatan total dari benda yang bergerak melingkar berubah beraturan (GMBB)?",
    options: ["Menjumlahkan aljabar biasa $a_t + a_s$", "Menggunakan Theorema Pythagoras $\\sqrt{a_t^2 + a_s^2}$", "Hanya melihat nilai percepatan sudut $\\alpha$", "Mencari rata-rata percepatan"],
    answer: 1
  },
  {
    question: "Jika diubah menggunakan persamaan kinematika putaran, rumus GMBB $v_t^2 = v_0^2 + 2as$ akan berubah wujud 100% sama dengan format...",
    options: ["$\\omega_t = \\omega_0 + \\alpha t$", "$\\theta = \\omega_0 t + \\frac{1}{2}\\alpha t^2$", "$\\omega_t^2 = \\omega_0^2 + 2\\alpha\\theta$", "$v_t = \\omega_0 R$"],
    answer: 2
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
    
    // Add CBT quizzes for Bagian 3
    if (mod.title.includes("Latihan Soal: Penggunaan Identitas Trigonometri")) {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { quizJson: JSON.stringify(cbtQuizzesBagian3) }
      });
      console.log(`Updated CBT: ${mod.title}`);
    }
    
    // Add CBT quizzes for Bagian 4
    if (mod.title.includes("Latihan Soal: Analisis Roda-roda Terhubung")) {
      await prisma.courseModule.update({
        where: { id: mod.id },
        data: { quizJson: JSON.stringify(cbtQuizzesBagian4) }
      });
      console.log(`Updated CBT: ${mod.title}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
