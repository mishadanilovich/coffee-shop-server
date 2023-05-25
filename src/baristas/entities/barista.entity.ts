import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('baristas')
export class BaristaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  quote?: string;
}
