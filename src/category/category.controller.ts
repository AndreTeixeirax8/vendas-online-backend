import { Controller, Get, Post, UsePipes, ValidationPipe,Body, Delete, Param } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CategoryService } from './category.service';
import { ReturnCategory } from './dtos/return-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult } from 'typeorm';

@Roles(UserType.ADMIN,UserType.USER,UserType.ROOT)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return this.categoryService.findAllCategories();
  }

  @Roles(UserType.ADMIN, UserType.ROOT)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }

  @Roles(UserType.ADMIN, UserType.ROOT)
  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(categoryId);
  }
}