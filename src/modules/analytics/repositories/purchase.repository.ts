import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, IsNull, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { IndexEnum } from '../enums/index.enum';
import { PurchaseEntity } from '../entities/purchase.entity';
import { PurchaseDto } from '../dto/purchase.dto';

@Injectable()
export class PurchaseRepository {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly repository: Repository<PurchaseEntity>,
  ) {}

  async save(entity: PurchaseEntity): Promise<PurchaseEntity> {
    return await this.repository.save(entity);
  }

  async create(dto: PurchaseDto): Promise<PurchaseEntity> {
    const newEntity = this.repository.create(dto);

    return await this.repository.save(newEntity);

    // return newWallet;
  }

  async findAll(): Promise<PurchaseEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<PurchaseEntity | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  findOneByFilter(filter: any) {
    const whereClause: any = { contract: filter.contract, tokenId: filter.tokenId };
    if (!filter?.user) {
      whereClause.user = IsNull();
    } else {
      whereClause.user = filter.user;
    }

    return this.repository.findOne({ where: whereClause });
  }

  async update(id: number, updateData: Partial<PurchaseEntity>): Promise<void> {
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

  async upsert(filter: Partial<PurchaseEntity>, updateData: Partial<PurchaseEntity>): Promise<InsertResult> {
    return await this.repository.upsert({ ...filter, ...updateData }, ['contract', 'tokenId', 'userAddress']);
  }
}
