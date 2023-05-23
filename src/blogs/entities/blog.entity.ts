import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blogs')
export class BlogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  blogUrl: string;
}
