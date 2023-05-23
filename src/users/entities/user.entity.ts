import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address?: string;
}
