import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogEntity } from './entities';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports: [TypeOrmModule.forFeature([BlogEntity])],
})
export class BlogsModule {}
