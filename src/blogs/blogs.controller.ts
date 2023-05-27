import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../auth';

@Controller('blogs')
@ApiTags('blogs')
@ApiBearerAuth()
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.blogsService.findAll();
  }
}
