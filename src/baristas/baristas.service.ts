import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaristaEntity } from './entities/barista.entity';

@Injectable()
export class BaristasService {
  constructor(
    @InjectRepository(BaristaEntity)
    private repository: Repository<BaristaEntity>,
  ) {}

  async findAll() {
    return this.repository.find();
  }
}
