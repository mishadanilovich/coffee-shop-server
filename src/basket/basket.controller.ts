import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Patch,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BasketService } from './basket.service';
import {
  CreateBasketDto,
  SubmitBasketDto,
  AddBasketItemDto,
  RemoveBasketItemDto,
} from './dto';
import { JwtAuthGuard } from '../auth/guards';
import { UserId } from '../decorators';
import { RolesGuard } from '../guards';

@Controller('basket')
@ApiTags('basket')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  create(@UserId() userId: string, @Body() createBasketDto: CreateBasketDto) {
    return this.basketService.createBasket(userId, createBasketDto);
  }

  @Get()
  findAll(@UserId() userId: string) {
    return this.basketService.findAll(userId);
  }

  @Get('current')
  async findOrCreateCurrent(@UserId() userId: string) {
    try {
      return await this.basketService.findOrCreateCurrentBasket(userId);
    } catch (err) {
      console.log(err);
      throw new NotFoundException('Basket not found');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(id);
  }

  @Patch('submit')
  @UsePipes(ValidationPipe)
  submitBasket(@Body() submitBasketDto: SubmitBasketDto) {
    return this.basketService.submitBasket(submitBasketDto);
  }

  @Delete(':basketId')
  remove(@UserId() userId: string, @Param('basketId') basketId: string) {
    return this.basketService.remove(userId, basketId);
  }

  @Post('order/add')
  @UsePipes(ValidationPipe)
  addOrder(@Body() addBasketItemDto: AddBasketItemDto) {
    return this.basketService.addBasketItem(addBasketItemDto);
  }

  @Delete('order/remove')
  @UsePipes(ValidationPipe)
  removeOrder(@Body() removeBasketItemDto: RemoveBasketItemDto) {
    return this.basketService.removeBasketItem(removeBasketItemDto);
  }
}
