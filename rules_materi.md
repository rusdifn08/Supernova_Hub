# Panduan Penulisan Materi Supernova Learning (Beginner-Friendly)

Dokumen ini mendefinisikan standar penulisan materi pelajaran (terutama eksakta seperti Fisika dan Matematika) di dalam platform Supernova Learning agar ramah untuk pemula absolut (SD hingga SMA).

## 1. Asumsi Target Pembaca
*   **Pemula Absolut (Zero Knowledge):** Anggap pembaca sama sekali tidak tahu apa-apa tentang fisika. Jangan pernah berasumsi "pembaca pasti sudah tahu dasar aljabar ini".
*   **Hindari "Lompatan Logika":** Jangan menggunakan kalimat *"Tinggal masukkan rumus X lalu dapat Y"*. Jabarkan secara detail *mengapa* rumus itu digunakan, *bagaimana* cara memasukkannya, dan jabarkan langkah-langkah aljabarnya (pindah ruas, pembagian silang, dsb).

## 2. Gaya Bahasa & Pendekatan
*   **Sangat Detail & Ekstensif:** Tidak ada batasan panjang karakter. Semakin panjang, komprehensif, dan mendalam penjelasannya, semakin baik.
*   **Conversational (Percakapan 2 Arah):** Gunakan gaya bahasa seolah-olah guru sedang duduk di sebelah murid. Gunakan kata "Bayangkan", "Pernahkah kamu...", "Mari kita buktikan bersama!".
*   **Analogi Dunia Nyata:** Sebelum masuk ke konsep abstrak (seperti Vektor, Limit, Diferensial), berikan contoh nyata sehari-hari terlebih dahulu (misal: mobil balap, bianglala, melempar apel).

## 3. Penjabaran Konsep Matematis
Jika ada operasi matematika yang harus dilakukan, jelaskan makna fisisnya terlebih dahulu:
*   **Contoh BURUK:** *"Jika ditanya kapan benda berhenti, masukkan nilai $v(t) = 0$ dan cari $t$ nya."*
*   **Contoh BAIK:** *"Apa artinya benda berhenti? Artinya benda itu tidak punya kecepatan lagi, kan? Secara matematis, kita tulis kecepatan sebagai $v = 0$. Mari kita ambil rumus kecepatan kita tadi, yaitu $v(t) = 10 - 2t$. Karena kita tahu saat berhenti $v = 0$, maka kita tulis $0 = 10 - 2t$. Sekarang, pindahkan $-2t$ ke ruas kiri menjadi positif: $2t = 10$. Lalu, bagi kedua sisi dengan 2, sehingga kita dapatkan $t = 5$ detik!"*

## 4. Format Visual & Interaktif
*   **Standar LaTeX:** Semua simbol matematika wajib menggunakan notasi LaTeX (contoh: $\Delta x$, $v_0$, $\frac{dx}{dt}$).
*   **Kotak Alert (Blok Kutipan):** Gunakan blok *quote* Markdown (`>`) untuk memberikan "Tips Cepat", "Jebakan Logika", atau "Ringkasan".
*   **Inline Quiz:** Wajib menyelipkan *Cek Pemahaman Konsep* (````inlinequiz`) minimal satu kali di dalam atau di akhir setiap sub-bab untuk menguji nalar pemula secara langsung.

**Aturan Emas:** *Tujuan materi ini bukan untuk mengejar hafalan rumus secepat mungkin, melainkan membangun intuisi pemahaman konsep agar siswa bisa menurunkan rumusnya sendiri.*
