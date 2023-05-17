import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePasswords } from '../utils/bcrypt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const userDB = await this.usersService.findByEmail(email);

    if (userDB && comparePasswords(password, userDB.password)) {
      const { password, ...result } = userDB;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.usersService.create(dto);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      throw new ForbiddenException('Error during registration');
    }
  }

  async login(user: Omit<UserEntity, 'password'>) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
