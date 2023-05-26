import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuItemEntity, CategoryEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItemEntity, CategoryEntity])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
