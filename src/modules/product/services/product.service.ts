import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { InteractionType } from 'src/shared/enums/interaction-type.enum';
import { ProductEntity } from '../entities/product.entity';
import { ProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async save(entity: ProductEntity): Promise<ProductEntity> {
    return await this.repository.save(entity);
  }

  async create(dto: ProductDto): Promise<ProductEntity> {
    const newEntity = this.repository.create(dto);

    return await this.repository.save(newEntity);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<ProductEntity | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateData: Partial<ProductEntity>): Promise<void> {
    const updateResult = await this.repository.update({ id }, updateData);
    if (updateResult.affected === 0) {
      throw new NotFoundException('Item no encontrado');
    }
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.repository.delete({ id });
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Item no encontrado');
    }
  }
}
