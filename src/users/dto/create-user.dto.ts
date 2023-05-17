import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    default: 'test@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '',
  })
  @IsString()
  contactPhone: string;

  @ApiProperty({
    default: 'TestTest123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  password: string;
}
