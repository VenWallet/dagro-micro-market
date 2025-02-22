import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, IsNull, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { IndexEnum } from '../enums/index.enum';
import { FeaturedEntity } from '../entities/featured.entity';
import { FeaturedDto } from '../dto/featured.dto';

@Injectable()
export class FeaturedRepository {
  constructor(
    @InjectRepository(FeaturedEntity)
    private readonly repository: Repository<FeaturedEntity>,
  ) {}

  async save(entity: FeaturedEntity): Promise<FeaturedEntity> {
    return await this.repository.save(entity);
  }

  async create(dto: FeaturedDto): Promise<FeaturedEntity> {
    const newEntity = this.repository.create(dto);

    return await this.repository.save(newEntity);

    // return newWallet;
  }

  async findAll(): Promise<FeaturedEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<FeaturedEntity | null> {
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

  async update(id: number, updateData: Partial<FeaturedEntity>): Promise<void> {
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

  async upsert(filter: Partial<FeaturedEntity>, updateData: Partial<FeaturedEntity>): Promise<InsertResult> {
    return await this.repository.upsert({ ...filter, ...updateData }, ['contract', 'tokenId', 'userAddress']);
  }

  async findFeatured(user: string): Promise<FeaturedEntity[]> {
    const query = this.repository
      .createQueryBuilder('featured')
      .select([
        'featured.id AS "id"',
        'featured.user AS "user"',
        'featured.tokenId AS "tokenId"',
        'featured.contract AS "contract"',
        'featured.clicks AS "clicks"',
        'featured.views AS "views"',
        'featured.isHighlighted AS "isHighlighted"',
        'featured.lastInteractedAt AS "lastInteractedAt"',
        'featured.createdAt AS "createdAt"',
        '(featured.clicks + featured.views) / 2 AS interactionScore',
      ])
      .where('featured.user = :user', { user })
      .orderBy('interactionScore', 'DESC');

    const featuredList = await query.getRawMany();

    return featuredList.map((item) => plainToClass(FeaturedEntity, item));
  }
}
