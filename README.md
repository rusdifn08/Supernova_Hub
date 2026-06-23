# Supernova Learning Platform

Sebuah platform pembelajaran modern dan interaktif yang dibangun menggunakan arsitektur monorepo dengan performa tinggi. Platform ini dirancang untuk memberikan pengalaman belajar (e-learning) tingkat lanjut yang dilengkapi dengan fitur real-time, integrasi animasi 3D, dan antarmuka yang sangat dinamis.

## 🌟 Keunggulan Aplikasi

- **Arsitektur Monorepo & Microservices**: Source code terkelola rapi yang memudahkan skalabilitas dan pengembangan tim.
- **Real-Time Interactivity**: Komunikasi instan dengan dukungan WebSockets (Gorilla WS) dan Redis untuk fitur seperti live chat, kuis interaktif, atau notifikasi.
- **Pengalaman Visual Memukau (Next-Gen UI)**: Dibangun dengan Next.js 16 dan React 19, dilengkapi Three.js (Fiber) untuk model 3D, serta Framer Motion, GSAP, dan Rive App untuk transisi dan animasi micro-interactions yang mulus.
- **Performa Backend Tinggi & Aman**: Menggunakan kombinasi NestJS (TypeScript) dengan Prisma ORM (PostgreSQL) sebagai API Core, dan Golang (Go 1.26) sebagai Real-Time API untuk menghandle *high-concurrency*.
- **Dockerized**: Semua infrastruktur pendukung dapat dijalankan dengan mudah melalui container Docker.
- **Cross-Platform**: Mencakup web (Next.js) dan dipersiapkan untuk aplikasi mobile (terdapat folder `apps/mobile`).

## 🚀 Fitur Utama

1. **Sistem Autentikasi**: Login dan registrasi yang aman bagi pengguna.
2. **Manajemen Pengguna**: Pengelolaan data pengguna menggunakan database terpusat (PostgreSQL).
3. **Pembelajaran Interaktif & Visualisasi 3D**: Menyajikan materi pembelajaran dengan cara yang jauh lebih interaktif menggunakan rendering objek tiga dimensi pada web browser.
4. **Koneksi State Cepat**: Menggunakan Zustand untuk manajemen state yang efisien dan tanpa hambatan pada sisi frontend.
5. **Real-time Synchronized Data**: Aktivitas pengguna dapat tersinkronisasi secara seketika melalui microservice berbasis Go dan event pub/sub di Redis.

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
*Supernova Learning Platform — Merevolusi cara belajar melalui teknologi interaktif mutakhir.*
