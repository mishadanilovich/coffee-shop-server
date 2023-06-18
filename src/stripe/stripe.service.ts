import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { BasketService } from '../basket';

@Injectable()
export class StripeService {
  private stripe;
  constructor(private basketService: BasketService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async checkoutBasket(id: string) {
    const currentBasket = await this.basketService.findById(id, [
      'items',
      'items.menuItem',
    ]);

    const totalPrice = currentBasket.items.reduce(
      (acc, menu) => acc + menu.menuItem.price * menu.count,
      0,
    );

    return this.stripe.paymentIntents.create({
      amount: +(totalPrice * 100).toFixed(2),
      currency: 'byn',
      payment_method_types: ['card'],
    });
  }
}
