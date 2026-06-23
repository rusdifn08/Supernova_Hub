import { $ } from "bun";

async function start() {
  console.log("\n🚀 [SYSTEM] Memulai Supernova Hub Development Environment...");
  
  console.log("\n=========================================");
  console.log("⏳ [1/2] Menyalakan Infrastruktur (Database PostgreSQL & Redis)...");
  try {
    // Jalankan docker-compose up -d
    await $`cd docker && docker-compose up -d`;
    console.log("✅ [DATABASE] Infrastruktur Database & Redis AKTIF!");
  } catch (err) {
    console.error("❌ [ERROR] Gagal menyalakan Docker. Pastikan Docker Desktop sudah berjalan di komputer Anda!");
    process.exit(1);
  }

  console.log("\n=========================================");
  console.log("⏳ [2/2] Menyalakan Backend (API) dan Frontend (Web)...");
  console.log("✅ [BACKEND] Menunggu NestJS aktif...");
  console.log("✅ [FRONTEND] Menunggu Next.js aktif di http://localhost:3000 ...");
  console.log("=========================================\n");

  // Gunakan concurrently untuk menjalankan Web dan API
  await $`bunx concurrently -n "WEB,API" -c "cyan,magenta" "bun run dev:web" "bun run dev:api-core"`;
}

start();
