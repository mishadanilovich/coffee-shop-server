import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitBasketDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deliveryMethod: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
}
