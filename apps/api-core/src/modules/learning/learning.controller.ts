import { Controller, Get, Post, Param, Request, UseGuards } from '@nestjs/common';
import { LearningService } from './learning.service';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('learning')
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  // Public catalog - no auth required
  @Get('courses')
  getAllCourses(@Request() req: any) {
    // Try to extract userId if token is present, otherwise pass null
    const userId = req.user?.sub || null;
    return this.learningService.getAllCourses(userId);
  }

  // Legacy endpoint for dashboard compatibility (GET /learning)
  @UseGuards(AuthGuard)
  @Get()
  getDashboardLearning(@Request() req: any) {
    return this.learningService.getAllCourses(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('courses/:id')
  getCourseDetails(@Request() req: any, @Param('id') id: string) {
    return this.learningService.getCourseDetails(req.user.sub, id);
  }

  @UseGuards(AuthGuard)
  @Get('modules/:id')
  getModuleContent(@Request() req: any, @Param('id') id: string) {
    return this.learningService.getModuleContent(req.user.sub, id);
  }

  @UseGuards(AuthGuard)
  @Post('modules/:id/complete')
  markModuleCompleted(@Request() req: any, @Param('id') id: string) {
    return this.learningService.markModuleCompleted(req.user.sub, id);
  }
}

