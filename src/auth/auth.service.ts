import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePasswords } from '../utils';
import { UsersService, UserEntity, CreateUserDto } from '../users';

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
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    try {
      const userData = await this.usersService.create(dto);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      throw new ForbiddenException('Error during registration');
    }
  }

  login(user: Omit<UserEntity, 'password'>) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
