import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { CreateApplicationDto } from '../applications';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserRequest(userRequest: CreateApplicationDto) {
    await this.mailerService.sendMail({
      from: process.env.SHOP_EMAIL,
      to: process.env.SHOP_EMAIL,
      subject: "User's request",
      text: `${userRequest.username} has a few questions. Contact phone: ${userRequest.contactPhone}`,
      template: './userRequest',
      context: {
        ...userRequest,
      },
    });
  }
}
