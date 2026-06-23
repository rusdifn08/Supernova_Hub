import { Controller, Get, Post, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { AuthGuard } from '../../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  getFinanceData(@Request() req: any) {
    return this.financeService.getFinanceData(req.user.sub);
  }

  @Post()
  createTransaction(
    @Request() req: any,
    @Body() body: { type: string, amount: number, name: string, category: string, date?: string }
  ) {
    const txDate = body.date ? new Date(body.date) : new Date();
    return this.financeService.createTransaction(
      req.user.sub,
      body.type,
      body.amount,
      body.name,
      body.category,
      txDate
    );
  }

  @Delete(':id')
  deleteTransaction(@Request() req: any, @Param('id') id: string) {
    return this.financeService.deleteTransaction(req.user.sub, id);
  }

  @Get('categories')
  getCategories(@Request() req: any) {
    return this.financeService.getCategories(req.user.sub);
  }

  @Post('categories')
  createCategory(
    @Request() req: any,
    @Body() body: { type: string, name: string, icon: string, color: string, bg: string, border: string }
  ) {
    return this.financeService.createCategory(
      req.user.sub,
      body.type,
      body.name,
      body.icon,
      body.color,
      body.bg,
      body.border
    );
  }
}
