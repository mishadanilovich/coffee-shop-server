import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MenuItemEntity } from './menu-item.entity';
import { CategoryType, categoryTypes } from '../../types';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: categoryTypes,
  })
  type: CategoryType;

  @OneToMany(() => MenuItemEntity, (menu) => menu.category, {
    cascade: true,
  })
  menu: MenuItemEntity[];
}
