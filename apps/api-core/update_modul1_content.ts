import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contentData = [
  // ========================== BAGIAN 1 ==========================
  {
    title: "Sub-bab 1: Jarak Tempuh vs Perpindahan Posisi",
    contentMd: `
# Sub-bab 1: Jarak Tempuh vs Perpindahan Posisi

Halo! Selamat datang di awal perjalananmu memahami mekanika klasik. Mari kita mulai dari konsep yang paling mendasar namun sering kali menjebak: **Perbedaan antara Jarak dan Perpindahan**.

Pernahkah kamu menyadari bahwa kamu bisa saja berjalan ribuan langkah seharian, namun dalam kacamata Fisika, kamu dianggap "tidak bergerak ke mana-mana"? Mari kita bahas kenapa bisa begitu.

![Visualisasi Jarak dan Perpindahan](/images/kinematics_distance_displacement.png)

## 1. Jarak Tempuh (Distance)
Jarak adalah besaran **skalar**. Artinya, ia hanya peduli pada "seberapa jauh" kamu melangkah, tanpa memedulikan arahnya. Jarak adalah total lintasan yang kamu lewati.
* Jika kamu maju 5 meter, lalu mundur 3 meter, jarak yang kamu tempuh adalah $5 + 3 = 8 \\text{ meter}$.
* Jarak selalu bernilai positif (atau nol). Tidak pernah negatif.

## 2. Perpindahan Posisi (Displacement)
Berbeda dengan jarak, perpindahan adalah besaran **vektor**. Ia sangat peduli pada "arah" dan hanya melihat **posisi awal** dan **posisi akhir** kamu, mengabaikan bagaimana lintasanmu di tengah jalan.
Secara matematis, perpindahan $\\Delta x$ didefinisikan sebagai selisih posisi akhir terhadap posisi awal:

$$ \\Delta x = x_f - x_i $$

Di mana:
* $x_f$ = posisi akhir (final)
* $x_i$ = posisi awal (initial)

Mari kita bedah contoh sebelumnya secara matematis:
Jika kamu mulai di titik $x = 0$, maju 5 meter ke arah sumbu X positif ($x = +5$), lalu mundur 3 meter (berhenti di $x = +2$).
* Perpindahanmu adalah: $\\Delta x = 2 - 0 = +2 \\text{ meter}$.
Tanda positif menunjukkan arah perpindahanmu ke kanan dari titik awal.

### 💡 Mari Kita Berpikir:
Coba bayangkan sebuah lintasan balap mobil berbentuk lingkaran penuh dengan keliling 1 km. Seorang pembalap melesat dari garis *start* dan kembali tepat ke garis *start* yang sama.
* **Berapa Jaraknya?** Ya, $1 \\text{ km}$.
* **Berapa Perpindahannya?** $0 \\text{ km}$! Karena posisi awal dan akhirnya persis di titik yang sama ($x_f = x_i$). 

Inilah esensi mengapa dalam fisika, gerakan melingkar penuh tidak menghasilkan perpindahan apa-apa!

---
> **Konsep Kunci:** Jika ada soal yang menanyakan *Jarak*, jumlahkan semua besaran lintasannya. Jika yang ditanya *Perpindahan*, tarik garis lurus dari titik Awal ke titik Akhir dan tentukan arahnya!
    `
  },
  {
    title: "Sub-bab 2: Kecepatan & Percepatan Rata-rata vs Sesaat (Diferensial)",
    contentMd: `
# Sub-bab 2: Kecepatan & Percepatan (Pendekatan Kalkulus)

Sekarang kita masuk ke ranah yang lebih menantang. Di SMP, kamu diajarkan bahwa kecepatan adalah jarak dibagi waktu ($v = s/t$). Namun di level lanjut, formula tersebut **hanya berlaku jika kecepatannya konstan**. Bagaimana jika kecepatannya selalu berubah setiap detik? 

Di sinilah **Kalkulus (Diferensial/Turunan)** masuk untuk menyelamatkan kita!

![Grafik Kalkulus Kinematika](/images/kinematics_calculus_graphs.png)

## 1. Kecepatan Rata-rata vs Kecepatan Sesaat

**Kecepatan Rata-rata ($\\bar{v}$)** mengukur perpindahan total dalam rentang waktu tertentu. Ini sama seperti membagi total waktu perjalananmu ke luar kota.
$$ \\bar{v} = \\frac{\\Delta x}{\\Delta t} = \\frac{x_2 - x_1}{t_2 - t_1} $$

Namun, apakah kecepatan rata-rata memberitahu kita kecepatan mobilmu persis di detik ke-5? Tidak! Untuk mengetahui "kecepatan persis pada saat tertentu" (yang ditunjukkan oleh *speedometer*), kita menggunakan **Kecepatan Sesaat**.

Kecepatan sesaat adalah kecepatan rata-rata saat selang waktu $\\Delta t$ mendekati nol. Dalam bahasa kalkulus, ini disebut **Limit** yang menjadi **Turunan (Derivatif)** dari fungsi posisi terhadap waktu:

$$ v(t) = \\lim_{\\Delta t \\to 0} \\frac{\\Delta x}{\\Delta t} = \\frac{dx}{dt} $$

Artinya: Kecepatan sesaat $v(t)$ adalah **gradien (kemiringan garis singgung)** dari grafik fungsi posisi $x(t)$.

## 2. Percepatan Rata-rata vs Percepatan Sesaat

Sama halnya dengan kecepatan, **Percepatan Sesaat ($a$)** adalah turunan dari fungsi kecepatan terhadap waktu:

$$ a(t) = \\frac{dv}{dt} $$

Dan karena $v = \\frac{dx}{dt}$, kita bisa menyimpulkan bahwa percepatan adalah **turunan kedua** dari posisi!

$$ a(t) = \\frac{d}{dt} \\left( \\frac{dx}{dt} \\right) = \\frac{d^2x}{dt^2} $$

### 🧠 Interaksi Konsep
Bayangkan kamu diberi fungsi posisi sebuah partikel:
$x(t) = 2t^3 - 4t^2 + 5$ meter.

Bagaimana mencari fungsinya? Mudah, kita turunkan!
* **Kecepatan:** $v(t) = \\frac{dx}{dt} = 6t^2 - 8t$ (m/s)
* **Percepatan:** $a(t) = \\frac{dv}{dt} = 12t - 8$ (m/s²)

Jika ditanya "kapan benda berhenti?", kamu tinggal memasukkan nilai $v(t) = 0$ dan mencari nilai $t$-nya! Keren kan?
    `
  },
  {
    title: "Sub-bab 3: Penurunan Persamaan GLBB Murni (Integral)",
    contentMd: `
# Sub-bab 3: Penurunan Persamaan GLBB Murni Menggunakan Integral

Pernahkah kamu disuruh menghafal 3 rumus dewa GLBB ini?
1. $v_t = v_0 + at$
2. $s = v_0 t + \\frac{1}{2}at^2$
3. $v_t^2 = v_0^2 + 2as$

Taukah kamu bahwa semua rumus itu **bukanlah sihir**, melainkan murni hasil turunan dari Kalkulus Integral? Mari kita buktikan bersama bahwa kamu tidak perlu menghafal jika kamu paham konsepnya!

Dalam GLBB (Gerak Lurus Berubah Beraturan), ada satu syarat mutlak: **Percepatan ($a$) harus konstan**.

## Bukti Rumus 1: Kecepatan dari Percepatan
Kita tahu bahwa percepatan adalah turunan kecepatan: $a = \\frac{dv}{dt}$.
Mari kita pindah ruaskan $dt$:
$$ dv = a \\, dt $$
Sekarang kita integralkan kedua sisi. Kita asumsikan saat awal ($t = 0$), kecepatannya adalah $v_0$, dan saat $t = t$, kecepatannya adalah $v_t$.

$$ \\int_{v_0}^{v_t} dv = \\int_{0}^{t} a \\, dt $$
Karena $a$ itu konstan (tetap), kita bisa mengeluarkannya dari dalam integral!
$$ [v]_{v_0}^{v_t} = a \\, [t]_{0}^{t} $$
$$ v_t - v_0 = a(t - 0) $$
$$ \\mathbf{v_t = v_0 + at} $$
*(Tada! Rumus pertama berhasil kita buktikan!)*

## Bukti Rumus 2: Posisi dari Kecepatan
Kita tahu bahwa kecepatan adalah turunan posisi: $v = \\frac{dx}{dt}$.
Maka $dx = v \\, dt$.
Substitusikan rumus pertama $v = v_0 + at$ ke dalam persamaan:
$$ dx = (v_0 + at) \\, dt $$
Integralkan dari posisi awal $x_0$ pada saat $t=0$, ke posisi $x_t$ pada saat $t$:
$$ \\int_{x_0}^{x_t} dx = \\int_{0}^{t} (v_0 + at) \\, dt $$
$$ x_t - x_0 = \\left[ v_0 t + \\frac{1}{2}at^2 \\right]_0^t $$
Jika kita anggap perpindahan $s = x_t - x_0$, maka:
$$ \\mathbf{s = v_0 t + \\frac{1}{2}at^2} $$
*(Luar biasa, rumus kedua terbukti nyata!)*

Melalui manipulasi aljabar mensubstitusi variabel $t = \\frac{v_t - v_0}{a}$ ke dalam rumus kedua, kamu akan dengan mudah mendapatkan rumus ketiga: $v_t^2 = v_0^2 + 2as$. 

Dengan memahami *darimana asal rumusnya*, insting fisikamu akan jauh lebih tajam dibanding hanya menghafal mati!
    `
  },
  {
    title: "Sub-bab 4: Analisis Grafik x-t, v-t, dan a-t",
    contentMd: `
# Sub-bab 4: Analisis Grafik $x-t$, $v-t$, dan $a-t$

Membaca grafik adalah kompetensi inti (Core Competency) yang paling disukai oleh pembuat soal UTBK maupun Olimpiade. Sebuah grafik seringkali menyembunyikan cerita utuh mengenai perjalanan suatu partikel tanpa harus menulis panjang lebar.

Ingat kembali prinsip kalkulus yang kita bahas di Sub-bab 2:
* $v = \\frac{dx}{dt}$ (Kecepatan adalah Gradien grafik Posisi-Waktu)
* $a = \\frac{dv}{dt}$ (Percepatan adalah Gradien grafik Kecepatan-Waktu)

Dan kebalikannya dari sifat Integral:
* **Perpindahan** ($\\Delta x$) adalah **Luas Daerah di bawah kurva** grafik $v-t$.
* **Perubahan Kecepatan** ($\\Delta v$) adalah **Luas Daerah di bawah kurva** grafik $a-t$.

## 1. Analisis Grafik Posisi vs Waktu ($x-t$)
- Jika grafiknya **datar horizontal**: Berarti posisinya tidak berubah. Benda **diam**. (Gradien = 0, jadi $v = 0$).
- Jika grafiknya **garis lurus miring**: Benda bergerak dengan kecepatan konstan (GLB).
- Jika grafiknya **melengkung (parabola)**: Benda bergerak dengan kecepatan berubah (GLBB).
  - Melengkung menghadap ke atas (seperti senyum): $a > 0$ (dipercepat positif).
  - Melengkung menghadap ke bawah (cemberut): $a < 0$ (diperlambat / dipercepat negatif).

## 2. Analisis Grafik Kecepatan vs Waktu ($v-t$)
Ini adalah grafik yang *paling kaya informasi*. 
- Kemiringan garis (gradien) menunjukkan **percepatan**. Jika garis miring ke atas, $a$ positif. Jika miring ke bawah, $a$ negatif.
- Jika garis memotong sumbu X (misal dari kecepatan positif menjadi negatif), itu artinya benda **berhenti sesaat lalu berbalik arah**!
- Luas area di antara garis grafik dan sumbu X (waktu) adalah total perpindahan. 
  - Area di atas sumbu X = Benda maju.
  - Area di bawah sumbu X = Benda mundur.
  - *Jarak total* = Jumlah dari |Area Atas| + |Area Bawah|.

### 🔎 Simulasi Pikiran
Bayangkan kamu melihat grafik $v-t$ berbentuk segitiga yang alasnya (waktu) dari $t=0$ hingga $t=10$, dan puncaknya di $v=20$. 
Berapa jarak total yang ditempuh benda tersebut?
Cukup hitung luas segitiga! $L = \\frac{1}{2} \\times \\text{alas} \\times \\text{tinggi} = \\frac{1}{2} \\times 10 \\times 20 = 100$ meter!
    `
  },
  {
    title: "Sub-bab 1: Analisis Gerak Jatuh Bebas (GJB)", // This belongs to BAGIAN 2
    contentMd: `
# Bagian 2: Sub-bab 1: Analisis Gerak Jatuh Bebas (GJB)

Setelah memahami pondasi teoretis GLBB murni, saatnya kita aplikasikan pada kasus nyata yang paling banyak ditemui di bumi kita: **Gravitasi!**

Mari kita bahas salah satu gerakan paling fundamental, yaitu Gerak Jatuh Bebas (GJB).

![Ilustrasi Gerak Jatuh Bebas](/images/free_fall_gravity.png)

## Apa itu Gerak Jatuh Bebas?
Gerak Jatuh Bebas adalah gerak suatu benda yang dijatuhkan dari ketinggian tertentu **tanpa kecepatan awal** ($v_0 = 0$) dan hanya dipengaruhi oleh percepatan gravitasi bumi ($g$).

Dalam Fisika tingkat atas, kita membuat kesepakatan tanda (Sign Convention):
1. Titik awal jatuhnya benda dianggap sebagai titik pangkal kordinat ($y = 0$).
2. Arah ke bawah kita anggap sebagai arah sumbu $Y$ negatif.
3. Karena gravitasi bumi selalu menarik ke bawah, maka percepatannya bernilai konstan: $a = -g$ (dengan $g \\approx 9,8 \\text{ m/s}^2$ atau $10 \\text{ m/s}^2$ untuk penyederhanaan).

## Transformasi Rumus GLBB menjadi GJB
Mari kita lihat betapa cantiknya rumus GLBB saat bertransformasi karena syarat mutlak $v_0 = 0$ dan $a = g$.

* Rumus 1: $v_t = v_0 + at \\quad \\rightarrow \\quad \\mathbf{v_t = g \\cdot t}$
*(Artinya: Semakin lama benda jatuh, kecepatannya meningkat lurus sebanding dengan waktu.)*

* Rumus 2: $h = v_0 t + \\frac{1}{2}at^2 \\quad \\rightarrow \\quad \\mathbf{h = \\frac{1}{2}gt^2}$
*(Artinya: Jarak tempuh jatuh meningkat secara eksponensial kuadrat seiring waktu! Inilah yang terlihat di gambar ilustrasi di atas, di mana jarak bola yang jatuh semakin lebar tiap detiknya.)*

* Rumus 3: $v_t^2 = v_0^2 + 2ah \\quad \\rightarrow \\quad \\mathbf{v_t = \\sqrt{2gh}}$
*(Artinya: Kecepatan jatuh saat menyentuh tanah murni tergantung pada dari ketinggian berapa ia dijatuhkan!)*

### 🤔 Diskusi Paradoks Galileo
Di zaman dahulu, Aristoteles berpendapat bahwa bola besi yang berat akan jatuh lebih cepat daripada bulu ayam. Namun, Galileo Galilei membantahnya melalui eksperimen Menara Pisa (konon kabarnya). 

Coba lihat rumus $v_t = \\sqrt{2gh}$. Di manakah letak variabel massa ($m$)?
Jawabannya: **Tidak Ada!**

Secara teoretis (dalam ruang hampa udara di mana gaya gesekan udara diabaikan), seekor gajah dan sehelai bulu ayam yang dijatuhkan dari ketinggian yang sama akan menyentuh tanah pada detik dan kecepatan yang persis sama. 
Gesekan udaralah (yang bergantung pada luas penampang) yang membuat fenomena jatuh tampak berbeda di dunia nyata kita!
    `
  },
  {
    title: "Sub-bab 2: Gerak Vertikal ke Atas dan ke Bawah",
    contentMd: `
# Bagian 2: Sub-bab 2: Gerak Vertikal ke Atas (GVA) dan ke Bawah (GVB)

Jika sebelumnya kita menjatuhkan benda secara cuma-cuma ($v_0 = 0$), bagaimana jika kita **melemparnya** dengan kecepatan awal? Inilah yang membedakan GVA dan GVB dari Gerak Jatuh Bebas!

## 1. Gerak Vertikal ke Bawah (GVB)
Ini adalah kasus di mana kamu melempar sebuah bola lurus ke bawah, jadi $v_0 \\neq 0$. Benda langsung memiliki kecepatan awal yang positif searah dengan tarikan gravitasi.

Rumusnya sama dengan GLBB, namun kita ubah variabel jalurnya menjadi $h$ (tinggi) dan percepatan menjadi gravitasi positif $g$:
$$ v_t = v_0 + gt $$
$$ h = v_0 t + \\frac{1}{2}gt^2 $$
$$ v_t^2 = v_0^2 + 2gh $$

Benda yang mengalami GVB akan melesat lebih cepat menabrak tanah dibanding benda yang jatuh bebas.

## 2. Gerak Vertikal ke Atas (GVA)
Ini adalah kasus di mana kamu melawan kodrat alam. Kamu melempar bola lurus ke langit.
Karena arah awal (ke atas) melawan arah gravitasi (ke bawah), maka percepatan gravitasinya berfungsi sebagai **perlambatan**. Kita harus menggunakan **$a = -g$**.

Persamaan GVA:
$$ v_t = v_0 - gt $$
$$ h = v_0 t - \\frac{1}{2}gt^2 $$
$$ v_t^2 = v_0^2 - 2gh $$

### Momen Puncak: Titik Tertinggi
Ketika sebuah benda dilempar ke atas, ia tidak akan naik selamanya. Gaya gravitasi akan mengeremnya secara perlahan hingga benda tersebut **berhenti sesaat di titik tertinggi** sebelum akhirnya jatuh kembali.

Syarat Mutlak di Titik Tertinggi adalah: **$v_t = 0$**

Berdasarkan syarat itu, kita bisa menemukan dua rumus ajaib yang sangat berguna untuk ujian:

1. **Waktu Mencapai Titik Puncak ($t_{max}$):**
$$ 0 = v_0 - gt \\implies \\mathbf{t_{max} = \\frac{v_0}{g}} $$

2. **Ketinggian Maksimum ($h_{max}$):**
$$ 0 = v_0^2 - 2gh \\implies \\mathbf{h_{max} = \\frac{v_0^2}{2g}} $$

### 🔄 Sifat Simetris GVA
Jika kamu mengabaikan gesekan udara, alam semesta bekerja dengan sangat seimbang dan simetris:
1. **Simetri Waktu:** Waktu benda untuk naik dari tanah ke titik puncak **PERSIS SAMA** dengan waktu benda dari titik puncak jatuh ke tanah kembali. (Total waktu di udara $= 2 \\times t_{max}$).
2. **Simetri Kecepatan:** Kecepatan benda saat melesat ke atas (misal $10 \\text{ m/s}$) akan persis sama besarnya dengan kecepatannya saat ia jatuh kembali melewati titik yang sama (arahnya saja yang menjadi ke bawah, $-10 \\text{ m/s}$).

Konsep kesimetrisan ini akan menyelamatkan banyak waktumu dalam perhitungan aljabar nanti!
    `
  },
  {
    title: "Sub-bab 3: Kasus Susulan Dua Benda",
    contentMd: `
# Bagian 2: Sub-bab 3: Kasus Susulan Dua Benda

Selamat datang di tantangan yang membutuhkan nalar tinggi: **Kasus Pertemuan atau Susulan Dua Benda!** 

Biasanya soal berbunyi: *"Mobil Polisi P mengejar Mobil Penjahat M..."* atau *"Batu A dijatuhkan, dua detik kemudian Batu B dilempar menyusul..."*

Untuk memecahkan kasus-kasus seperti ini, kamu memerlukan penguasaan Sistem Persamaan Linear Dua Variabel (SPLDV). Kunci utamanya adalah **menemukan penghubung (bridging equation)** antara dua benda tersebut.

## Skenario 1: Benda Bergerak Berlawanan Arah (Saling Mendekat)
Bayangkan Mobil A berada di kota X dan Mobil B berada di kota Y. Jarak kedua kota adalah $S_{total}$. Keduanya bergerak lurus dan pada akhirnya bertemu di suatu titik di tengah-tengah.

**Kunci Logika:**
Saat mereka berpapasan, total jarak yang ditempuh Mobil A ($S_A$) ditambah dengan jarak yang ditempuh Mobil B ($S_B$) pasti sama dengan total jarak awal mereka!

$$ S_A + S_B = S_{total} $$

Lalu kita substitusi rumus geraknya. Jika Mobil A bergerak dengan kecepatan konstan (GLB) maka $S_A = v_A \\cdot t_A$. Jika Mobil B bergerak dipercepat (GLBB) maka $S_B = v_{0B}t_B + \\frac{1}{2}a_Bt_B^2$.

## Skenario 2: Menyusul Searah (Satu Berangkat Lebih Dulu)
Bayangkan pencuri kabur dengan mobil kecepatannya $v_P$ (konstan). Lima detik kemudian, mobil polisi mengejar dari titik yang sama namun dengan GLBB (mulai dari nol dan dipercepat $a$). Kapan polisi berhasil menangkap pencuri?

**Kunci Logika:**
Syarat utama polisi menangkap pencuri adalah **Posisi mereka harus sama persis di detik penangkapan!** Karena mereka berangkat dari titik yang sama, artinya **Jarak Tempuh Polisi = Jarak Tempuh Pencuri**.

$$ S_{Polisi} = S_{Pencuri} $$

Lalu bagaimana dengan waktunya?
Jika pencuri sudah bergerak selama $t$ detik, dan polisi baru berangkat 5 detik *setelah* pencuri, berarti waktu gerak polisi lebih singkat 5 detik!
Maka kita definisikan: 
$t_{Pencuri} = t$
$t_{Polisi} = t - 5$

Mari kita substitusi:
$$ S_{Polisi} (GLBB) = S_{Pencuri} (GLB) $$
$$ v_{0Polisi}(t-5) + \\frac{1}{2}a(t-5)^2 = v_{Pencuri} \\cdot t $$

Nah! Dari sini akan tercipta Persamaan Kuadrat dalam variabel $t$ berbentuk $ax^2 + bx + c = 0$. Kamu tinggal menggunakan rumus Kecap (Rumus ABC) untuk menemukan waktu $t$ pertemuannya.

### 💡 Konklusi Pola Pikir
Dalam setiap kasus kinematika 2 partikel, jangan langsung panik melihat soal cerita yang panjang.
1. Tetapkan titik acuan (Origin $x=0$).
2. Identifikasi apakah benda melakukan GLB atau GLBB.
3. Buatlah persamaan posisi $x_1(t)$ dan $x_2(t)$.
4. Jika disuruh mencari waktu susulan/pertemuan, cukup buat persamaannya sama: **$x_1(t) = x_2(t)$**.
    `
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

  for (const item of contentData) {
    const updated = await prisma.courseModule.updateMany({
      where: {
        courseId: course.id,
        title: {
          contains: item.title.replace("Bagian 2: ", "").replace("Sub-bab 1: Analisis Gerak Jatuh Bebas (GJB)", "Analisis Gerak Jatuh Bebas") // handle small discrepancies in title
        }
      },
      data: {
        contentMd: item.contentMd
      }
    });
    
    // Exact match approach since title string might have slight differences
    const records = await prisma.courseModule.findMany({
      where: { courseId: course.id }
    });

    const target = records.find(r => r.title.includes(item.title) || item.title.includes(r.title));
    if (target) {
      await prisma.courseModule.update({
        where: { id: target.id },
        data: { contentMd: item.contentMd }
      });
      console.log(`Updated content for: ${target.title}`);
    } else {
      console.log(`Could NOT find target for: ${item.title}`);
    }
  }

  console.log("Modul 1 content detailed successfully!");
}

main().finally(() => prisma.$disconnect());
