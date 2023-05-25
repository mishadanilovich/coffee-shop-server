import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({
    default: 'test',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    default: 'test@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: '+375(33)333-33-33',
  })
  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @ApiProperty({
    default: 'Test street',
  })
  @IsString()
  @IsOptional()
  address: string;
}
