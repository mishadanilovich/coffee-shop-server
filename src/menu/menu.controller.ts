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
import { JwtAuthGuard } from '../auth/guards';
import { CategoryType, Role } from '../types';
import { RolesGuard } from '../guards';
import { Roles } from '../decorators';

@Controller('menu')
@ApiTags('menu')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('category')
  @UsePipes(ValidationPipe)
  @Roles(Role.Admin)
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

  @Post('item')
  @UsePipes(ValidationPipe)
  @Roles(Role.Admin)
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
