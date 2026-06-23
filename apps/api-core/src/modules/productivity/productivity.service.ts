import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GamificationService } from '../gamification/gamification.service';

@Injectable()
export class ProductivityService {
  constructor(
    private prisma: PrismaService,
    private gamification: GamificationService
  ) {}

  async getDashboardData(userId: string) {
    const todos = await this.prisma.productivityItem.findMany({
      where: { userId, type: 'TODO' },
      orderBy: { createdAt: 'desc' }
    });

    const weekly = await this.prisma.productivityItem.findMany({
      where: { userId, type: 'WEEKLY' },
      orderBy: { createdAt: 'desc' }
    });

    const habits = await this.prisma.productivityItem.findMany({
      where: { userId, type: 'HABIT' },
      orderBy: { createdAt: 'desc' }
    });

    const notes = await this.prisma.workspaceNote.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const reading = await this.prisma.readingBook.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return { todos, weekly, habits, notes, reading };
  }

  async createTodo(userId: string, title: string) {
    return this.prisma.productivityItem.create({
      data: { userId, type: 'TODO', title }
    });
  }

  async createWeekly(userId: string, title: string, day: string) {
    return this.prisma.productivityItem.create({
      data: { userId, type: 'WEEKLY', title, day }
    });
  }

  async createHabit(userId: string, title: string) {
    return this.prisma.productivityItem.create({
      data: { userId, type: 'HABIT', title }
    });
  }

  async createNote(userId: string, title: string, content: string) {
    return this.prisma.workspaceNote.create({
      data: { userId, title, content }
    });
  }

  async toggleItemStatus(userId: string, itemId: string) {
    const item = await this.prisma.productivityItem.findFirst({
      where: { id: itemId, userId }
    });
    if (!item) throw new Error('Item not found');

    const newStatus = !item.isCompleted;
    let newStreak = item.streak;
    let newLastCompleted = item.lastCompleted;

    if (newStatus === true) {
      if (item.type === 'TODO' || item.type === 'WEEKLY') {
        await this.gamification.addExp(userId, 10, `Completed ${item.type} task!`);
      } else if (item.type === 'HABIT') {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        const lastCompletedStr = item.lastCompleted?.toISOString().split('T')[0];

        if (lastCompletedStr !== todayStr) {
          newStreak += 1;
          newLastCompleted = now;
          await this.gamification.addExp(userId, 15, `Completed Habit: ${item.title}`);
        }
      }
    } else {
      if (item.type === 'HABIT' && newStreak > 0) {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        const lastCompletedStr = item.lastCompleted?.toISOString().split('T')[0];

        if (lastCompletedStr === todayStr) {
          newStreak -= 1;
        }
      }
    }

    return this.prisma.productivityItem.update({
      where: { id: itemId },
      data: { 
        isCompleted: newStatus,
        streak: newStreak,
        lastCompleted: newLastCompleted
      }
    });
  }

  async createReadingBook(userId: string, title: string, author: string, totalPages: number, status?: string, currentChapter?: string) {
    return this.prisma.readingBook.create({
      data: {
        userId, title, author, totalPages,
        status: status || 'PLAN_TO_READ',
        currentChapter
      }
    });
  }

  async updateReadingProgress(userId: string, id: string, readPages: number, notes?: string, status?: string, currentChapter?: string) {
    const book = await this.prisma.readingBook.findFirst({
      where: { id, userId }
    });
    if (!book) throw new Error("Book not found");

    return this.prisma.readingBook.update({
      where: { id },
      data: { 
        readPages, 
        notes: notes !== undefined ? notes : book.notes,
        status: status !== undefined ? status : book.status,
        currentChapter: currentChapter !== undefined ? currentChapter : book.currentChapter
      }
    });
  }
}
