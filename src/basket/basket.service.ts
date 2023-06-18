import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BasketEntity, BasketItemEntity } from './entities';
import {
  AddBasketItemDto,
  CreateBasketDto,
  RemoveBasketItemDto,
  SubmitBasketDto,
} from './dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity)
    private basketRepository: Repository<BasketEntity>,

    @InjectRepository(BasketItemEntity)
    private basketItemRepository: Repository<BasketItemEntity>,
  ) {}

  createBasket(userId: string, createBasketDto: CreateBasketDto) {
    return this.basketRepository.save({ ...createBasketDto, userId });
  }

  async submitBasket({ id, ...submitBasketDto }: SubmitBasketDto) {
    await this.basketRepository.update(
      { id },
      { ...submitBasketDto, submittedAt: new Date() },
    );
  }

  findAll(userId: string) {
    return this.basketRepository.find({
      where: { userId },
      relations: ['items', 'items.menuItem'],
    });
  }

  async findOrCreateCurrentBasket(userId) {
    const qb = this.basketRepository.createQueryBuilder('basket');

    qb.where('basket.userId = :userId', { userId });
    qb.andWhere('basket.deletedAt IS NULL');
    qb.andWhere('basket.submittedAt IS NULL');
    qb.leftJoinAndSelect('basket.items', 'items').orderBy(
      'items.createdAt',
      'DESC',
    );
    qb.leftJoinAndSelect('items.menuItem', 'menuItem');

    return (
      (await qb.getOne()) ?? (await this.basketRepository.save({ userId }))
    );
  }

  findById(id: string, relations?: string[]) {
    return this.basketRepository.findOne({ where: { id }, relations });
  }

  async remove(userId: string, basketId: string) {
    const basket = await this.basketRepository.findOneOrFail({
      where: { id: basketId, userId },
      relations: ['items'],
    });

    await this.basketRepository.softRemove(basket);
  }

  async addBasketItem({ menuItemId, basketId }: AddBasketItemDto) {
    const existingBasketItem = await this.basketItemRepository.findOne({
      where: { menuItemId, basketId },
    });

    if (!existingBasketItem) {
      await this.basketItemRepository.save({ menuItemId, basketId });
    } else {
      await this.basketItemRepository
        .createQueryBuilder('basketItem')
        .update()
        .set({
          basketId,
          count: () => 'count + 1',
        })
        .where('basketId = :basketId', { basketId })
        .andWhere('menuItemId = :menuItemId', { menuItemId })
        .execute();
    }
  }

  async removeBasketItem({ menuItemId, basketId }: RemoveBasketItemDto) {
    const existingBasketItem = await this.basketItemRepository.findOne({
      where: { menuItemId, basketId },
    });

    if (!existingBasketItem) {
      throw new NotFoundException('Basket item not found');
    }

    if (existingBasketItem.count === 1) {
      await this.basketItemRepository.remove(existingBasketItem);
    } else {
      await this.basketItemRepository
        .createQueryBuilder()
        .update()
        .set({
          basketId,
          count: () => 'count - 1',
        })
        .where('basketId = :basketId', { basketId })
        .andWhere('menuItemId = :menuItemId', { menuItemId })
        .execute();
    }
  }
}
