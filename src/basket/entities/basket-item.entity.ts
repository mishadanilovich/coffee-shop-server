import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { BasketEntity } from './basket.entity';
import { MenuItemEntity } from '../../menu';

@Entity('basket_items')
export class BasketItemEntity {
  @Column({ primary: true })
  basketId: string;

  @ManyToOne(() => BasketEntity)
  @JoinColumn({ name: 'basketId' })
  basket: string;

  @Column({ primary: true })
  menuItemId: string;

  @ManyToOne(() => MenuItemEntity)
  @JoinColumn({ name: 'menuItemId' })
  menuItem: MenuItemEntity;

  @Column({ default: 1 })
  count: number;

  @DeleteDateColumn({ type: 'timestamptz', select: false })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt?: Date;
}
