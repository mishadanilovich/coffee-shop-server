import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BasketItemEntity } from './basket-item.entity';
import { UserEntity } from '../../users';

@Entity('baskets')
export class BasketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ nullable: true })
  deliveryMethod: string;

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @DeleteDateColumn({ type: 'timestamptz', select: false })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt?: Date;

  @Column({ type: 'timestamptz', nullable: true, select: false })
  submittedAt?: Date;

  @OneToMany(() => BasketItemEntity, (basketItem) => basketItem.basket, {
    cascade: true,
  })
  items: BasketItemEntity[];
}
