import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LearningService {
  constructor(private prisma: PrismaService) {}

  async getAllCourses(userId: string | null) {
    let enrollments: any[] = [];
    if (userId) {
      enrollments = await this.prisma.userCourse.findMany({
        where: { userId },
        include: {
          course: {
            include: {
              modules: {
                select: {
                  id: true,
                  title: true,
                  orderIndex: true,
                  duration: true,
                  courseId: true,
                  createdAt: true,
                  updatedAt: true,
                },
                orderBy: { orderIndex: 'asc' }
              }
            }
          }
        }
      });
    }
    
    // Fetch all available courses for catalog
    const allCourses = await this.prisma.course.findMany({
      include: {
        modules: {
          select: {
            id: true,
            title: true,
            orderIndex: true,
            duration: true,
            courseId: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    return { enrolled: enrollments, catalog: allCourses };
  }

  async getCourseDetails(userId: string, courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          select: {
            id: true,
            title: true,
            orderIndex: true,
            duration: true,
            courseId: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!course) throw new NotFoundException('Course not found');

    const progress = await this.prisma.userModuleProgress.findMany({
      where: { userId, module: { courseId } }
    });

    const enrollment = await this.prisma.userCourse.findUnique({
      where: { userId_courseId: { userId, courseId } }
    });

    return { course, progress, enrollment };
  }

  async getModuleContent(userId: string, moduleId: string) {
    const module = await this.prisma.courseModule.findUnique({
      where: { id: moduleId },
      include: { course: true }
    });

    if (!module) throw new NotFoundException('Module not found');

    const progress = await this.prisma.userModuleProgress.findUnique({
      where: { userId_moduleId: { userId, moduleId } }
    });

    return { module, isCompleted: progress?.isCompleted || false };
  }

  async markModuleCompleted(userId: string, moduleId: string) {
    const module = await this.prisma.courseModule.findUnique({
      where: { id: moduleId }
    });
    if (!module) throw new NotFoundException('Module not found');

    // Upsert progress
    const progress = await this.prisma.userModuleProgress.upsert({
      where: { userId_moduleId: { userId, moduleId } },
      update: { isCompleted: true, completedAt: new Date() },
      create: { userId, moduleId, isCompleted: true, completedAt: new Date() }
    });

    // Update total course progress
    const allModules = await this.prisma.courseModule.findMany({ where: { courseId: module.courseId } });
    const completedModules = await this.prisma.userModuleProgress.count({
      where: { userId, module: { courseId: module.courseId }, isCompleted: true }
    });

    const progressPercent = Math.round((completedModules / allModules.length) * 100);

    await this.prisma.userCourse.upsert({
      where: { userId_courseId: { userId, courseId: module.courseId } },
      update: { progressPercent, status: progressPercent === 100 ? 'COMPLETED' : 'IN_PROGRESS' },
      create: { userId, courseId: module.courseId, progressPercent, status: progressPercent === 100 ? 'COMPLETED' : 'IN_PROGRESS' }
    });

    return { progress, progressPercent };
  }
}
