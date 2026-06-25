import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const modules = await prisma.courseModule.findMany({
    where: { title: { contains: "Sub-bab 3" } }
  });
  console.log("Sub-bab 3 titles:");
  modules.forEach(m => console.log(`"${m.title}"`));
  
  const modules4 = await prisma.courseModule.findMany({
    where: { title: { contains: "Sub-bab 4" } }
  });
  console.log("Sub-bab 4 titles:");
  modules4.forEach(m => console.log(`"${m.title}"`));
}

main().finally(() => prisma.$disconnect());
