import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BlogEntity } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntity)
    private repository: Repository<BlogEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }
}
