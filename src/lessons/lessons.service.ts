import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LessonEntity } from './entities';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private repository: Repository<LessonEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }
}
