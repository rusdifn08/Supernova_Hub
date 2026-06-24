import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const physicsModules = [
  {
    title: "Modul 1: Demarkasi Besaran Skalar dan Vektor Fisis",
    duration: "45m",
    orderIndex: 1,
    contentMd: `# Modul 1: Demarkasi Besaran Skalar dan Vektor Fisis

Selamat datang di modul pertama **Physics for Beginners**. Pada modul ini, kita akan meletakkan fondasi terpenting dalam kinematika: memahami perbedaan mendasar antara besaran skalar dan vektor fisis.

## 1. Pemahaman Dasar Kinematika
Kinematika adalah cabang ilmu fisika klasik yang mendeskripsikan gerak titik, benda, atau sistem benda tanpa mempertimbangkan gaya yang menyebabkan gerak tersebut. Sebelum kita bisa memodelkan pergerakan alam semesta, kita harus sepakat tentang bahasa matematika yang digunakan.

## 2. Besaran Skalar: Jarak Tempuh Lintasan Riil
Besaran skalar adalah besaran yang hanya memiliki nilai (magnitudo) tanpa memiliki arah. Dalam kinematika, perwakilan skalar paling dasar adalah **Jarak (Distance)**.
- **Definisi Konseptual**: Jarak adalah total panjang lintasan riil yang dilalui oleh suatu benda saat bergerak.
- **Sifat**: Selalu bernilai positif atau nol. Jarak tidak peduli ke mana Anda pergi, ia hanya menghitung "seberapa jauh kaki Anda melangkah".
- **Simbol**: Biasanya dilambangkan dengan $s$ atau $d$.

## 3. Besaran Vektor: Perpindahan Garis Lurus Neto
Berbeda secara absolut dari skalar, besaran vektor memiliki nilai (magnitudo) **dan** arah yang spesifik. Di sinilah **Perpindahan (Displacement)** masuk.
- **Definisi Konseptual**: Perpindahan adalah perubahan posisi suatu benda dari titik awal ke titik akhir. Ia menarik satu garis lurus proyektil dari *Start* ke *Finish*.
- **Sifat**: Bisa bernilai positif, negatif, atau nol. Jika Anda berlari memutari lapangan bola dan kembali ke titik start, Jarak Anda adalah keliling lapangan, namun Perpindahan Anda adalah **Nol**.
- **Simbol**: Dilambangkan dengan $\Delta x$ (delta x) dalam gerak satu dimensi.
- **Rumus Dasar**: $\Delta x = x_{akhir} - x_{awal}$

### Studi Kasus Pemahaman
Bayangkan sebuah semut berjalan sejauh 4 meter ke arah Timur, kemudian berbalik arah dan berjalan sejauh 3 meter ke arah Barat.
* **Jarak Tempuh Semut**: $4m + 3m = 7$ meter lintasan riil.
* **Perpindahan Semut**: $+4m$ (Timur) $+ (-3m)$ (Barat) $= +1$ meter dari titik referensi awal.

Pemahaman tegas akan demarkasi ini akan menghindarkan Anda dari kesalahan fatal saat memodelkan persamaan gerak yang lebih kompleks nanti.`
  },
  {
    title: "Modul 2: Diferensiasi Kelajuan dan Kecepatan",
    duration: "45m",
    orderIndex: 2,
    contentMd: `# Modul 2: Diferensiasi Kelajuan dan Kecepatan

Setelah memahami demarkasi antara jarak dan perpindahan, kini kita melangkah ke level turunan berikutnya: laju perubahan posisi terhadap waktu. Di sinilah muncul diferensiasi antara **Kelajuan (Speed)** dan **Kecepatan (Velocity)**.

## 1. Kelajuan (Besaran Skalar)
Kelajuan adalah rasio dari Jarak riil yang ditempuh benda terhadap total waktu yang dibutuhkan.
- Karena Jarak adalah skalar, maka Kelajuan juga adalah skalar.
- **Kelajuan Rata-Rata ($v$)**: $\frac{\text{Total Jarak}}{\text{Total Waktu}} = \frac{s}{t}$
- **Contoh Fisis**: Speedometer di mobil Anda mengukur *kelajuan*, bukan *kecepatan*. Ia menunjukkan angka 60 km/jam tanpa peduli mobil sedang melaju ke utara atau selatan.

## 2. Kecepatan (Besaran Vektor)
Kecepatan adalah turunan posisi terhadap waktu, atau seberapa cepat sebuah benda **berpindah** lengkap beserta arahnya.
- Karena Perpindahan adalah vektor, maka Kecepatan adalah vektor.
- **Kecepatan Rata-Rata ($\bar{v}$)**: $\frac{\text{Perpindahan Neto}}{\text{Interval Waktu}} = \frac{\Delta x}{\Delta t}$
- **Signifikansi Fisis**: Jika sebuah mobil balap mengitari sirkuit sepanjang 5 km dan kembali ke garis start dalam waktu 2 menit, *kelajuannya* sangat tinggi (150 km/jam). Namun, *kecepatan rata-ratanya* adalah **Nol**, karena perpindahan netonya nol.

## 3. Limit Kalkulus: Kecepatan Sesaat
Untuk menganalisis gerak secara mikroskopis, fisikawan menggunakan konsep *limit* dari kalkulus untuk mencari Kecepatan Sesaat (kecepatan pada detik tertentu yang sangat presisi).
Secara matematis, kecepatan sesaat $v(t)$ didefinisikan sebagai turunan pertama posisi $x$ terhadap waktu $t$:

$$ v = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t} = \frac{dx}{dt} $$

Dengan memahami perbedaan konseptual ini, Anda kini siap masuk ke dalam ranah pemodelan gerak yang paling ideal: Gerak Lurus Beraturan (GLB).`
  },
  {
    title: "Modul 3: Karakteristik Gerak Lurus Beraturan (GLB)",
    duration: "50m",
    orderIndex: 3,
    contentMd: `# Modul 3: Karakteristik Gerak Lurus Beraturan (GLB)

Topik utama kedua dalam silabus kita adalah menganalisis karakteristik khusus dari **Gerak Lurus Beraturan (GLB)**. Ini adalah model matematika paling fundamental untuk mendeskripsikan alam.

## 1. Definisi Mutlak GLB
GLB adalah gerak benda yang lintasannya berupa garis lurus dan memiliki **kecepatan yang konstan** (tetap) dari waktu ke waktu.
- "Garis lurus" berarti arah tidak pernah berubah.
- "Beraturan" berarti magnitudo kecepatan tidak pernah berubah.

## 2. Analisis Derivatif: Turunan Kecepatan Bernilai Nol
Dalam kalkulus kinematika, perubahan kecepatan terhadap waktu disebut **Percepatan (Acceleration)**, yang disimbolkan dengan $a$.
- $a = \frac{dv}{dt}$
- Pada GLB, karena kecepatan ($v$) bersifat konstan/konstan absolut, maka laju perubahan kecepatannya tidak ada.
- **Sifat Esensial GLB**: Oleh karena itu, percepatan pada GLB adalah **Nol Absolut** ($a = 0$). Turunan kecepatan terhadap waktu bernilai nol.

## 3. Visualisasi Vektor
Bayangkan sebuah roket luar angkasa yang mematikan mesinnya di ruang hampa yang jauh dari gravitasi bintang mana pun. Sesuai Hukum Newton I tentang Inersia, roket tersebut akan terus melaju dengan kecepatan awal yang sama, pada garis lurus tak berujung, tanpa ada penambahan atau pengurangan percepatan. Inilah wujud murni GLB di alam semesta nyata.

## 4. Konsekuensi Matematis
Karena kecepatan konstan:
- Kecepatan rata-rata ($\bar{v}$) sama persis dengan kecepatan sesaat ($v$) di setiap titik waktu.
- Rasio perpindahan terhadap waktu selalu menghasilkan garis lurus linear jika diproyeksikan dalam grafik Cartesian.

Di modul berikutnya, kita akan mentranslasikan karakteristik nol-percepatan ini menjadi fungsi pemodelan matematis untuk meramal masa depan.`
  },
  {
    title: "Modul 4: Membangun Fungsi Posisi x(t)",
    duration: "60m",
    orderIndex: 4,
    contentMd: `# Modul 4: Membangun Fungsi Posisi x(t)

Topik ketiga dalam silabus kita berfokus pada melatih pemikiran analitis Anda: Bagaimana kita bisa mengetahui di mana sebuah objek berada di masa depan jika kita tahu keadaannya sekarang?

Di sini, kita akan membangun fungsi posisi kinematika GLB.

## 1. Konstruksi Rumus Posisi
Kita telah mengetahui bahwa untuk GLB, kecepatan $v$ bernilai konstan, di mana:
$$ v = \frac{\Delta x}{\Delta t} $$

Mari kita bedah delta ($\Delta$) tersebut. $\Delta x$ berarti "Posisi Akhir dikurangi Posisi Awal" ($x - x_0$). Sementara $\Delta t$ adalah "Waktu Akhir dikurangi Waktu Awal" ($t - t_0$). Jika kita menetapkan stopwatch mulai dari 0 ($t_0 = 0$), maka $\Delta t = t$.

Substitusikan definisi ini kembali ke rumus:
$$ v = \frac{x - x_0}{t} $$

Kalikan silang waktu $t$ ke sisi kiri:
$$ v \cdot t = x - x_0 $$

Pindahkan posisi referensi awal ($x_0$) ke sisi kiri untuk menyisolasi fungsi posisi masa depan ($x$):
$$ x = x_0 + v \cdot t $$

Atau, lebih elegan jika ditulis sebagai fungsi waktu:
**$$ x(t) = x_0 + v t $$**

## 2. Filosofi Fungsi
Rumus di atas bukan sekadar huruf acak. Persamaan ini memiliki kedalaman filosofis: **"Posisi di masa depan ($x(t)$) merupakan hasil dari posisi Anda saat ini ($x_0$) diakumulasikan dengan seluruh perpindahan yang Anda ciptakan perlahan-lahan seiring waktu ($v \cdot t$)."**

- $x_0$ adalah kondisi inisial (titik referensi spasial).
- $v t$ adalah seberapa banyak alam semesta bergeser untuk Anda berdasarkan kecepatan yang Anda miliki.

Fungsi linier ini adalah *holy grail* dari prediksi mekanika klasik terdasar.`
  },
  {
    title: "Modul 5: Grafik Posisi-Waktu dan Studi Komprehensif",
    duration: "45m",
    orderIndex: 5,
    contentMd: `# Modul 5: Grafik Posisi-Waktu dan Studi Komprehensif

Sebagai penutup dari bab ini, kita akan mempelajari bagaimana membaca bahasa visual fisikawan: **Grafik Kinematika**.

## 1. Grafik Posisi terhadap Waktu (Grafik x-t)
Dari fungsi $x(t) = x_0 + vt$, kita bisa melihat persamaan garis lurus yang identik dengan $y = mx + c$ di aljabar dasar.
- Waktu ($t$) berada di sumbu X (Sumbu Horizontal).
- Posisi ($x$) berada di sumbu Y (Sumbu Vertikal).
- **Gradien / Kemiringan Garis (m)** adalah kecepatan ($v$).
- **Titik Potong Y (c)** adalah posisi referensi awal ($x_0$).

**Implikasi Visual:**
- Jika garisnya menanjak tajam, kecepatannya besar (benda bergerak sangat cepat maju).
- Jika garisnya mendatar horizontal, kemiringannya nol ($v=0$). Ini menandakan benda sedang **diam**.
- Jika garisnya menurun ke bawah, kecepatannya negatif (benda bergerak mundur/berbalik arah ke titik referensi awal).

## 2. Grafik Kecepatan terhadap Waktu (Grafik v-t)
Untuk Gerak Lurus Beraturan, kecepatan benda tidak pernah berubah terhadap waktu.
Maka grafik $v-t$ untuk GLB adalah **sebuah garis horizontal lurus** yang sejajar dengan sumbu waktu.
- Ketinggian garis horizontal merepresentasikan nilai konstan kecepatan.
- **Luas area di bawah kurva** grafik v-t pada selang waktu tertentu merupakan representasi kuantitatif dari **Perpindahan** ($\Delta x$).

## 3. Kesimpulan Silabus Modul 1
Dengan berakhirnya Modul 5, Anda kini memiliki pemahaman konseptual yang kokoh mengenai:
1. Perbedaan antara skalar dan vektor.
2. Definisi limit dari kecepatan sesaat.
3. Alasan mengapa percepatan pada GLB adalah nol absolut.
4. Cara menurunkan fungsi prediksi posisional $x(t) = x_0 + vt$.
5. Menerjemahkan rumus menjadi analisis visual.

Silakan kerjakan evaluasi akhir untuk memvalidasi akumulasi pengetahuan Anda di tahap GLB ini. Selamat melangkah menuju gerak dipercepat (GLBB) di bab selanjutnya!`
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

  // Create new detailed modules
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

  console.log('Successfully updated Physics for Beginners course with comprehensive Indonesian content!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
