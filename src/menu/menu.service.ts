import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto, CreateMenuItemDto } from './dto';
import { CategoryEntity, MenuItemEntity } from './entities';
import { CategoryType } from '../types';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,

    @InjectRepository(MenuItemEntity)
    private menuItemsRepository: Repository<MenuItemEntity>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.save(createCategoryDto);
  }

  createMenuItem(createMenuItemDto: CreateMenuItemDto) {
    const { categoryId, ...menuItem } = createMenuItemDto;

    return this.menuItemsRepository.save({
      ...menuItem,
      category: { id: categoryId },
    });
  }

  findAll() {
    return this.categoriesRepository.find({
      relations: ['menu'],
    });
  }

  findOneCategory(type: CategoryType) {
    return this.categoriesRepository.findOne({
      where: { type },
      relations: ['menu'],
    });
  }
}
