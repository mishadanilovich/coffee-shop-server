import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../../types';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  contactPhone: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address?: string;

  @Column('text', { array: true, default: [Role.User] })
  roles: Role[];
}
