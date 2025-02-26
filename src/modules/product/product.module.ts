import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
