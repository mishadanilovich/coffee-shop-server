import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { encodePassword } from '../utils/bcrypt';

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
}
