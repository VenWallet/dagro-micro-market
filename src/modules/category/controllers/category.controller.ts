import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Put } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() body: CategoryDto) {
    return this.categoryService.create(body);
  }

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateCategoryDto) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
