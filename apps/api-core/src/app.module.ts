import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductivityModule } from './modules/productivity/productivity.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { FinanceModule } from './modules/finance/finance.module';
import { LearningModule } from './modules/learning/learning.module';

@Module({
  imports: [AuthModule, ProductivityModule, GamificationModule, FinanceModule, LearningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
