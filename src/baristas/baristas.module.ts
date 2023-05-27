import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BaristasService } from './baristas.service';
import { BaristasController } from './baristas.controller';
import { BaristaEntity } from './entities';

@Module({
  controllers: [BaristasController],
  providers: [BaristasService],
  imports: [TypeOrmModule.forFeature([BaristaEntity])],
})
export class BaristasModule {}
