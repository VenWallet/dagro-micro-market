import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { InteractionType } from 'src/shared/enums/interaction-type.enum';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryDto } from '../dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async save(entity: CategoryEntity): Promise<CategoryEntity> {
    return await this.repository.save(entity);
  }

  async create(dto: CategoryDto): Promise<CategoryEntity> {
    const newEntity = this.repository.create(dto);

    return await this.repository.save(newEntity);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<CategoryEntity | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateData: Partial<CategoryEntity>): Promise<void> {
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
