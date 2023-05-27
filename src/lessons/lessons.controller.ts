import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LessonsService } from './lessons.service';
import { JwtAuthGuard } from '../auth';

@Controller('lessons')
@ApiTags('lessons')
@ApiBearerAuth()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.lessonsService.findAll();
  }
}
