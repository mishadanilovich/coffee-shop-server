import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
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
    default: '+375(33)333-33-33',
  })
  @IsNotEmpty()
  @IsString()
  contactPhone: string;

  @ApiProperty({
    default: 'TestTest123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  password: string;

  @ApiProperty({
    default: 'Test street',
  })
  @IsOptional()
  @IsString()
  address: string;
}
