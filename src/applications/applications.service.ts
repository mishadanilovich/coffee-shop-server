import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';

import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationEntity } from './entities/application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private repository: Repository<ApplicationEntity>,
    private readonly mailerService: MailerService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    try {
      await this.mailerService.sendMail({
        from: process.env.SHOP_EMAIL,
        to: process.env.SHOP_EMAIL,
        subject: 'Test',
        text: `${createApplicationDto.username} has a few questions. Contact phone: ${createApplicationDto.contactPhone}`,
        html: '',
      });

      // await this.repository.save(createApplicationDto);
    } catch (error) {
      throw new BadRequestException('Error during creating the application');
    }
  }
}
