import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto';
import { JwtAuthGuard } from '../auth';

@Controller('applications')
@ApiTags('applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'The application has been successfully created.',
  })
  @ApiBody({ type: CreateApplicationDto })
  async create(@Body() createApplicationDto: CreateApplicationDto) {
    await this.applicationsService.create(createApplicationDto);
  }
}
