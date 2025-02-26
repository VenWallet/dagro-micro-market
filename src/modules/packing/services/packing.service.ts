import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { InteractionType } from 'src/shared/enums/interaction-type.enum';
import { PackingEntity } from '../entities/packing.entity';
import { PackingDto } from '../dto/packing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PackingService {
  constructor(
    @InjectRepository(PackingEntity)
    private readonly repository: Repository<PackingEntity>,
  ) {}

  async save(entity: PackingEntity): Promise<PackingEntity> {
    return await this.repository.save(entity);
  }

  async create(dto: PackingDto): Promise<PackingEntity> {
    const newEntity = this.repository.create(dto);

    return await this.repository.save(newEntity);
  }

  async findAll(): Promise<PackingEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<PackingEntity | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateData: Partial<PackingEntity>): Promise<void> {
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
