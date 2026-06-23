import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findFirst({
    where: { title: { contains: "AI Engineer Core Track" } },
    include: { modules: { orderBy: { orderIndex: 'asc' } } }
  });

  if (!course) { console.error("Course not found!"); return; }
  console.log(`Course: ${course.title}, Modules: ${course.modules.length}`);

  // Step 1: Find and delete the bad module(s) with very long titles (raw syllabus dump)
  let deleted = 0;
  for (const mod of course.modules) {
    if (mod.title.length > 200) {
      console.log(`🗑️  Deleting bad module (title length: ${mod.title.length}): "${mod.title.substring(0, 80)}..."`);
      await prisma.courseModule.delete({ where: { id: mod.id } });
      deleted++;
    }
  }
  console.log(`Deleted ${deleted} bad module(s).`);

  // Step 2: Re-fetch and check module 1 content  
  const updatedCourse = await prisma.course.findFirst({
    where: { id: course.id },
    include: { modules: { orderBy: { orderIndex: 'asc' } } }
  });

  if (!updatedCourse) return;
  console.log(`\nRemaining modules: ${updatedCourse.modules.length}`);
  
  // Print first 5 modules to verify
  for (let i = 0; i < Math.min(5, updatedCourse.modules.length); i++) {
    const m = updatedCourse.modules[i];
    console.log(`  ${i+1}. [order:${m.orderIndex}] "${m.title}" (content: ${m.contentMd?.length || 0} chars)`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
