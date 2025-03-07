import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category.controller';
import { CategoryEntity } from './entities/category.entity';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  exports: [CategoryService],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
