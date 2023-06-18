import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { StripeService } from './stripe.service';
import { JwtAuthGuard } from '../auth/guards';

@Controller('stripe')
@ApiTags('stripe')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('basket/:id')
  checkout(@Param('id') id: string) {
    try {
      return this.stripeService.checkoutBasket(id);
    } catch (error) {
      return error;
    }
  }
}
