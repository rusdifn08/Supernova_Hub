import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { AuthGuard } from '../../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Post('exp')
  addExp(@Request() req: any, @Body() body: { amount: number, message: string }) {
    return this.gamificationService.addExp(req.user.sub, body.amount, body.message);
  }

  @Get('stats')
  getStats(@Request() req: any) {
    return this.gamificationService.getStats(req.user.sub);
  }
}
