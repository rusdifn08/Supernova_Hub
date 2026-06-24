import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async addExp(userId: string, amount: number, message: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    let newExp = user.exp + amount;
    let newLevel = user.level;
    let newMaxExp = user.maxExp;
    let newGold = user.gold;
    let newClass = user.playerClass;
    let levelUp = false;

    if (newExp >= newMaxExp) {
      newLevel += 1;
      newExp = newExp - newMaxExp;
      newMaxExp = Math.floor(newMaxExp * 1.5);
      newGold += 100;
      levelUp = true;

      if (newLevel >= 5) newClass = "Apprentice Adept";
      if (newLevel >= 10) newClass = "Master Virtuoso";
      if (newLevel >= 20) newClass = "Grandmaster Ascendant";
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        exp: newExp,
        level: newLevel,
        maxExp: newMaxExp,
        gold: newGold,
        playerClass: newClass,
      }
    });

    const expLog = await this.prisma.expHistory.create({
      data: {
        userId,
        amount,
        message: levelUp ? `LEVEL UP! ${message}` : message
      }
    });

    return {
      level: updatedUser.level,
      exp: updatedUser.exp,
      maxExp: updatedUser.maxExp,
      gold: updatedUser.gold,
      playerClass: updatedUser.playerClass,
      newLog: { id: expLog.id, amount: expLog.amount, message: expLog.message }
    };
  }

  async deductExp(userId: string, amount: number, message: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    let newExp = user.exp - amount;
    if (newExp < 0) newExp = 0; // Prevent negative EXP

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { exp: newExp }
    });

    const expLog = await this.prisma.expHistory.create({
      data: { userId, amount: -amount, message }
    });

    return {
      level: updatedUser.level,
      exp: updatedUser.exp,
      newLog: { id: expLog.id, amount: expLog.amount, message: expLog.message }
    };
  }

  async getStats(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const history = await this.prisma.expHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    
    return {
      level: user?.level || 1,
      exp: user?.exp || 0,
      maxExp: user?.maxExp || 1000,
      gold: user?.gold || 50,
      playerClass: user?.playerClass || "Novice Scholar",
      recentExpGains: history.map(h => ({ id: h.id, amount: h.amount, message: h.message }))
    };
  }
}
