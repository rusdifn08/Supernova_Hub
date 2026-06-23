# Supernova Hub (Learning, Productivity & Finance)

Sebuah platform *All-in-One* modern dan interaktif yang dibangun menggunakan arsitektur monorepo dengan performa tinggi. Platform ini dirancang untuk menjadi pusat kehidupan digital Anda—menggabungkan pengalaman **e-learning** tingkat lanjut, **Productivity Tracker** yang komprehensif (seperti alternatif Notion), serta sistem **Money Management** cerdas untuk mengelola keuangan dan aset.

## 🌟 Keunggulan Aplikasi

- **All-in-One Super App**: Satu aplikasi terpusat untuk belajar, mengelola produktivitas, dan memantau kesehatan finansial Anda.
- **Arsitektur Monorepo & Microservices**: Source code terkelola rapi yang memudahkan skalabilitas dan pengembangan tim.
- **Real-Time Interactivity**: Komunikasi instan dengan dukungan WebSockets (Gorilla WS) dan Redis untuk sinkronisasi seketika antar perangkat.
- **Pengalaman Visual Memukau (Next-Gen UI)**: Dibangun dengan Next.js 16 dan React 19, dilengkapi Three.js (Fiber) untuk model 3D, serta Framer Motion, GSAP, dan Rive App untuk transisi dan animasi micro-interactions yang mulus.
- **Performa Backend Tinggi & Aman**: Menggunakan kombinasi NestJS (TypeScript) dengan Prisma ORM (PostgreSQL) sebagai API Core, dan Golang (Go 1.26) sebagai Real-Time API untuk menghandle *high-concurrency*.
- **Dockerized**: Semua infrastruktur pendukung dapat dijalankan dengan mudah melalui container Docker.
- **Cross-Platform**: Mencakup web (Next.js) dan dipersiapkan untuk aplikasi mobile (terdapat folder `apps/mobile`).

## 🚀 Fitur Utama

### 📚 1. E-Learning Platform
- **Pembelajaran Interaktif & Visualisasi 3D**: Menyajikan materi pembelajaran dengan cara yang jauh lebih interaktif menggunakan rendering objek tiga dimensi pada web browser.
- **Live Class & Real-time Quiz**: Terintegrasi langsung dengan WebSocket untuk pengalaman belajar dua arah.

### 🎯 2. Productivity Tracker (Notion-like)
- **To-Do List & Task Management**: Mengelola tugas harian dan proyek dengan struktur yang jelas.
- **Habit Tracker**: Memantau perkembangan kebiasaan baik setiap hari dengan analitik mendalam.
- **Workspace & Notes**: Ruang kerja terpadu bergaya Notion untuk menulis catatan, mendokumentasikan ide, dan berkolaborasi secara real-time.

### 💰 3. Money Management & Assets
- **Income & Expense Tracking**: Pencatatan arus kas (pengeluaran dan pemasukan) harian yang rinci.
- **Asset & Investment Management**: Mengelola portofolio investasi dan memantau pertumbuhan berbagai jenis aset (saham, reksa dana, properti, dll) di satu dashboard.
- **Financial Analytics**: Grafik interaktif untuk merencanakan anggaran dan memproyeksikan target finansial bulanan hingga tahunan.

### ⚙️ 4. Core System
- **Sistem Autentikasi**: Login dan registrasi yang aman bagi pengguna.
- **Koneksi State Cepat**: Menggunakan Zustand untuk manajemen state yang efisien pada sisi frontend.
- **Real-time Synchronized Data**: Aktivitas pengguna di seluruh fitur (belajar, tugas, keuangan) akan tersinkronisasi seketika berkat event pub/sub di Redis dan Golang microservices.

## 🛠️ Cara Menjalankan Aplikasi (How to Run)

Proyek ini menggunakan **Bun** sebagai *package manager* utama dan *task runner* berkecepatan tinggi.

### Prasyarat
- [Bun](https://bun.sh/) v1.x (Atau Node.js versi terbaru)
- [Go](https://go.dev/) v1.26+ (Untuk menjalankan service Real-Time)
- [Docker](https://www.docker.com/) & Docker Compose (Untuk Database PostgreSQL & Redis)

### Langkah-langkah Instalasi

**1. Clone Repository**
```bash
git clone https://github.com/rusdifn08/Supernova_Hub.git
cd "APPS SUPERNOVA LEARNING"
```

**2. Jalankan Infrastruktur (Docker)**
Jalankan layanan database dan redis di belakang layar menggunakan Docker Compose:
```bash
cd docker
docker-compose up -d
cd ..
```

**3. Install Dependencies**
Install semua *packages* untuk semua aplikasi di dalam monorepo ini:
```bash
bun install
```

**4. Setup Database (Prisma)**
Lakukan inisialisasi schema database dan jalankan ke database lokal:
```bash
cd apps/api-core
bunx prisma generate
bunx prisma db push
cd ../..
```

**5. Menjalankan Aplikasi Secara Bersamaan (Development)**
Gunakan perintah utama ini dari root directory untuk menjalankan **Frontend (Web)** dan **Backend (API Core)** secara serentak:
```bash
bun run dev
```
- **Web App** dapat diakses di: `http://localhost:3000` (atau port Next.js default)
- **API Core** akan berjalan pada port API default-nya.

**6. Menjalankan Microservices Secara Terpisah**
Jika Anda ingin menjalankan setiap service di terminal yang berbeda, Anda dapat menjalankan command berikut dari root direktori:

- **Web (Next.js Frontend)**: 
  ```bash
  bun run dev:web
  ```
- **API Core (NestJS)**: 
  ```bash
  bun run dev:api-core
  ```
- **API Realtime (Golang)**: 
  ```bash
  bun run dev:api-realtime
  ```

---
*Supernova Hub — Merevolusi gaya hidup digital Anda dari edukasi, produktivitas, hingga manajemen keuangan melalui teknologi mutakhir.*
