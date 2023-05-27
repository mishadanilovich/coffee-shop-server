import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BaristasService } from './baristas.service';
import { JwtAuthGuard } from '../auth/guards';

@Controller('baristas')
@ApiTags('baristas')
@ApiBearerAuth()
export class BaristasController {
  constructor(private readonly baristasService: BaristasService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.baristasService.findAll();
  }
}
