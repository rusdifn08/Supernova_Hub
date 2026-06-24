import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ProductivityService } from './productivity.service';
import { AuthGuard } from '../../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('productivity')
export class ProductivityController {
  constructor(private readonly productivityService: ProductivityService) {}

  @Get()
  async getDashboardData(@Request() req: any) {
    return this.productivityService.getDashboardData(req.user.sub);
  }

  @Get('calendar')
  async getCalendarData(@Request() req: any) {
    return this.productivityService.getCalendarData(req.user.sub);
  }

  @Post('todo')
  createTodo(@Request() req: any, @Body('title') title: string) {
    return this.productivityService.createTodo(req.user.sub, title);
  }

  @Post('weekly')
  createWeekly(@Request() req: any, @Body() body: { title: string, day: string }) {
    return this.productivityService.createWeekly(req.user.sub, body.title, body.day);
  }

  @Post('habit')
  createHabit(@Request() req: any, @Body('title') title: string) {
    return this.productivityService.createHabit(req.user.sub, title);
  }

  @Post('note')
  createNote(@Request() req: any, @Body() body: { title: string, content: string }) {
    return this.productivityService.createNote(req.user.sub, body.title, body.content);
  }

  @Patch(':id/toggle')
  toggleItemStatus(@Request() req: any, @Param('id') id: string) {
    return this.productivityService.toggleItemStatus(req.user.sub, id);
  }

  @Post('reading')
  createReadingBook(@Request() req: any, @Body() body: { title: string, author: string, totalPages: number, status?: string, currentChapter?: string }) {
    return this.productivityService.createReadingBook(req.user.sub, body.title, body.author, body.totalPages, body.status, body.currentChapter);
  }

  @Patch('reading/:id')
  updateReadingProgress(@Request() req: any, @Param('id') id: string, @Body() body: { readPages: number, notes?: string, status?: string, currentChapter?: string }) {
    return this.productivityService.updateReadingProgress(req.user.sub, id, body.readPages, body.notes, body.status, body.currentChapter);
  }
}
