import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateMenuItemDto } from './create-menu-item.dto';
import { CategoryType } from '../../interfaces';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: OmitType(CreateMenuItemDto, ['categoryId']) })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OmitType(CreateMenuItemDto, ['categoryId']))
  menu: Omit<CreateMenuItemDto, 'categoryId'>[];

  @ApiProperty()
  @IsString()
  type: CategoryType;
}
