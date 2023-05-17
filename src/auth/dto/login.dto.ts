import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    default: 'test@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'TestTest123',
  })
  @IsNotEmpty()
  password: string;
}
