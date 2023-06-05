import { IsArray, IsOptional } from 'class-validator';
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { AddBasketItemDto } from './add-basket-item.dto';
import { SubmitBasketDto } from './submit-basket.dto';

export class CreateBasketDto extends PartialType(
  PickType(SubmitBasketDto, [
    'username',
    'contactPhone',
    'deliveryMethod',
    'paymentMethod',
  ]),
) {
  @ApiProperty({
    isArray: true,
    type: OmitType(AddBasketItemDto, ['basketId']),
  })
  @IsArray()
  @Type(() => OmitType(AddBasketItemDto, ['basketId']))
  @IsOptional()
  items: Omit<AddBasketItemDto, 'basketId'>[];
}
