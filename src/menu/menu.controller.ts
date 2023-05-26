import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MenuService } from './menu.service';
import { CreateCategoryDto, CreateMenuItemDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CategoryType } from '../interfaces';

@Controller('menu')
@ApiTags('menu')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('category')
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.menuService.createCategory(createCategoryDto);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        'Error when saving the category. Check the category type or try again later!',
      );
    }
  }

  @UsePipes(ValidationPipe)
  @Post('item')
  createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuService.createMenuItem(createMenuItemDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get('category/:type')
  async findOneCategory(@Param('type') type: CategoryType) {
    try {
      return await this.menuService.findOneCategory(type);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        'Please change the category type or try again later!',
      );
    }
  }
}
