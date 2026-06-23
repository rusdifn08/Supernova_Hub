import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async getFinanceData(userId: string) {
    const transactions = await this.prisma.financeTransaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((tx: any) => {
      if (tx.type === 'INCOME') totalIncome += tx.amount;
      if (tx.type === 'EXPENSE') totalExpense += tx.amount;
    });

    const totalBalance = totalIncome - totalExpense;

    return {
      transactions,
      totalBalance,
      totalIncome,
      totalExpense
    };
  }

  async createTransaction(userId: string, type: string, amount: number, name: string, category: string, date: Date) {
    return this.prisma.financeTransaction.create({
      data: {
        userId,
        type,
        amount,
        name,
        category,
        date
      }
    });
  }

  async deleteTransaction(userId: string, id: string) {
    const tx = await this.prisma.financeTransaction.findFirst({
      where: { id, userId }
    });
    if (!tx) throw new Error("Transaction not found");

    return this.prisma.financeTransaction.delete({
      where: { id }
    });
  }

  async getCategories(userId: string) {
    return this.prisma.financeCategory.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' }
    });
  }

  async createCategory(userId: string, type: string, name: string, icon: string, color: string, bg: string, border: string) {
    return this.prisma.financeCategory.create({
      data: {
        userId,
        type,
        name,
        icon,
        color,
        bg,
        border
      }
    });
  }
}
