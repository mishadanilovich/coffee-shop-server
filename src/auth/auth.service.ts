import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswords } from '../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const userDB = await this.usersService.findByEmail(email);
    if (userDB) {
      const isMatch = comparePasswords(pass, userDB.password);
      console.log(process.env.JWT_SECRET);
      if (isMatch) {
        const payload = { email: userDB.email, sub: userDB.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException('Wrong password');
      }
    }
    throw new UnauthorizedException('Email not found');
  }
}
