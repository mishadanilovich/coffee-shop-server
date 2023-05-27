import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';
import { encodePassword } from '../utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async findById(id: string) {
    const userDB = await this.repository.findOneBy({ id });
    const { password, ...user } = userDB;
    return user;
  }

  create(userDto: CreateUserDto) {
    const password = encodePassword(userDto.password);
    return this.repository.save({ ...userDto, password });
  }

  update(id: string, userDto: UpdateUserDto) {
    return this.repository.update({ id }, userDto);
  }
}
