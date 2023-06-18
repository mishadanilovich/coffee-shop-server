import { Module } from '@nestjs/common';

import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { BasketModule } from '../basket';

@Module({
  imports: [BasketModule],
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
