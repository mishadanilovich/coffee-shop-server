import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationEntity } from './entities/application.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private repository: Repository<ApplicationEntity>,
    private readonly emailService: EmailService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    try {
      await this.emailService.sendUserRequest(createApplicationDto);

      await this.repository.save(createApplicationDto);
    } catch (error) {
      throw new BadRequestException('Error during creating the application');
    }
  }
}
