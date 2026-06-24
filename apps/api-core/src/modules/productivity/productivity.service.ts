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
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const dayOfWeek = now.getDay(); // 0 is Sunday
    const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), diffToMonday);
    
    // Lazy evaluation for penalties (Overdue TODOs)
    const overdueTodos = await this.prisma.productivityItem.findMany({
      where: {
        userId,
        type: 'TODO',
        status: 'PENDING',
        dueDate: { lt: now }
      }
    });

    for (const todo of overdueTodos) {
      await this.prisma.productivityItem.update({
        where: { id: todo.id },
        data: { status: 'FAILED' }
      });
      await this.gamification.deductExp(userId, 10, `Failed To-Do penalty: ${todo.title}`);
    }

    const todos = await this.prisma.productivityItem.findMany({
      where: { 
        userId, 
        type: 'TODO',
        createdAt: { gte: startOfToday }
      },
      orderBy: { createdAt: 'desc' }
    });

    const weekly = await this.prisma.productivityItem.findMany({
      where: { 
        userId, 
        type: 'WEEKLY',
        createdAt: { gte: startOfWeek }
      },
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
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.productivityItem.create({
      data: { userId, type: 'TODO', title, dueDate: endOfDay, status: 'PENDING' }
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
    let dbStatus = newStatus ? 'COMPLETED' : 'PENDING';

    if (item.status === 'FAILED') {
      throw new Error('Cannot toggle a failed task');
    }

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
        status: dbStatus,
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

  async evaluateDailyPerformance(userId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const todos = await this.prisma.productivityItem.findMany({
      where: { userId, type: 'TODO', createdAt: { gte: startOfDay, lte: endOfDay } }
    });

    const failedTodos = todos.filter(t => t.status === 'FAILED' || (!t.isCompleted && t.dueDate && t.dueDate < new Date())).length;
    const completedTodos = todos.filter(t => t.isCompleted).length;

    const habits = await this.prisma.productivityItem.findMany({
      where: { userId, type: 'HABIT' }
    });

    let failedHabits = 0;
    for (const habit of habits) {
      const lastCompletedDate = habit.lastCompleted ? new Date(habit.lastCompleted) : null;
      if (lastCompletedDate) {
        lastCompletedDate.setHours(0, 0, 0, 0);
      }
      if (!lastCompletedDate || lastCompletedDate.getTime() < startOfDay.getTime()) {
        failedHabits++;
      }
    }

    let status = "NONE";
    const totalItems = todos.length + habits.length;

    if (totalItems === 0) {
      status = "NONE";
    } else {
      const completedHabits = habits.length - failedHabits;
      if (completedTodos === 0 && completedHabits === 0) {
        status = "RED";
      } else if (failedTodos === 0 && failedHabits === 0) {
        status = "GREEN";
      } else if (failedTodos === 1 && failedHabits === 0) {
        status = "YELLOW";
      } else {
        status = "ORANGE";
      }
    }

    return this.prisma.dailyPerformance.upsert({
      where: { userId_date: { userId, date: startOfDay } },
      update: { status, completedTasks: completedTodos, failedTasks: failedTodos, failedHabits },
      create: { userId, date: startOfDay, status, completedTasks: completedTodos, failedTasks: failedTodos, failedHabits }
    });
  }

  async getCalendarData(userId: string) {
    const now = new Date();
    
    // Evaluate today and yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    await this.evaluateDailyPerformance(userId, yesterday);
    await this.evaluateDailyPerformance(userId, now);

    // Return current month's performance
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return this.prisma.dailyPerformance.findMany({
      where: {
        userId,
        date: { gte: startOfMonth }
      },
      orderBy: { date: 'asc' }
    });
  }
}
