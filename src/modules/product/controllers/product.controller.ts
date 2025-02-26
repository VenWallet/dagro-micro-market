import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Put } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { ProductDto, UpdateProductDto } from '../dto/product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: ProductDto) {
    return this.productService.create(body);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
