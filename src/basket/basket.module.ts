import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { BasketEntity, BasketItemEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([BasketEntity, BasketItemEntity])],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
