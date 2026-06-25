import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  
  for (const user of users) {
    const progress = await prisma.userModuleProgress.findMany({
      where: { userId: user.id },
      include: { module: true }
    });
    
    // Group by course
    const courses = new Set(progress.map(p => p.module.courseId));
    
    for (const courseId of courses) {
      const allModules = await prisma.courseModule.count({ where: { courseId } });
      const completedModules = await prisma.userModuleProgress.count({
        where: { userId: user.id, module: { courseId }, isCompleted: true }
      });
      
      const progressPercent = Math.round((completedModules / allModules) * 100);
      
      await prisma.userCourse.upsert({
        where: { userId_courseId: { userId: user.id, courseId } },
        update: { progressPercent, status: progressPercent === 100 ? 'COMPLETED' : 'IN_PROGRESS' },
        create: { userId: user.id, courseId, progressPercent, status: progressPercent === 100 ? 'COMPLETED' : 'IN_PROGRESS' }
      });
      
      console.log(`Synced user ${user.id} for course ${courseId} at ${progressPercent}%`);
    }
  }
}

main().finally(() => prisma.$disconnect());
