import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lessons')
export class LessonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  lessonUrl?: string;
}
