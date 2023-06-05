import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth';
import { EmailModule } from './email';
import { BlogsModule, BlogEntity } from './blogs';
import { UsersModule, UserEntity } from './users';
import { LessonsModule, LessonEntity } from './lessons';
import { BaristasModule, BaristaEntity } from './baristas';
import { MenuModule, CategoryEntity, MenuItemEntity } from './menu';
import { ApplicationsModule, ApplicationEntity } from './applications';
import { BasketModule, BasketEntity, BasketItemEntity } from './basket';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UserEntity,
        BaristaEntity,
        LessonEntity,
        BlogEntity,
        ApplicationEntity,
        CategoryEntity,
        MenuItemEntity,
        BasketEntity,
        BasketItemEntity,
      ],
      synchronize: true,
    }),
    EmailModule,
    UsersModule,
    AuthModule,
    BaristasModule,
    LessonsModule,
    BlogsModule,
    ApplicationsModule,
    MenuModule,
    BasketModule,
  ],
})
export class AppModule {}
