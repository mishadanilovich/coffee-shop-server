import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaristaEntity } from './entities';

@Injectable()
export class BaristasService {
  constructor(
    @InjectRepository(BaristaEntity)
    private repository: Repository<BaristaEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }
}
