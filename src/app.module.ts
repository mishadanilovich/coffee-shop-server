import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { BaristasModule } from './baristas/baristas.module';
import { BaristaEntity } from './baristas/entities/barista.entity';
import { LessonsModule } from './lessons/lessons.module';
import { LessonEntity } from './lessons/entities/lesson.entity';
import { BlogsModule } from './blogs/blogs.module';
import { BlogEntity } from './blogs/entities/blog.entity';
import { ApplicationsModule } from './applications/applications.module';
import { ApplicationEntity } from './applications/entities/application.entity';
import { EmailModule } from './email/email.module';

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
  ],
})
export class AppModule {}
