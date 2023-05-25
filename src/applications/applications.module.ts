import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { ApplicationEntity } from './entities/application.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ApplicationEntity]),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.SHOP_EMAIL,
          pass: process.env.SHOP_EMAIL_PASSWORD,
        },
      },
    }),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
