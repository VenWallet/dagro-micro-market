import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { IndexEnum } from '../enums/index.enum';
import { InteractionType } from 'src/shared/enums/interaction-type.enum';
import { PurchaseRepository } from '../repositories/purchase.repository';
import { PurchaseEntity } from '../entities/purchase.entity';
import { RegisterSaleDto } from '../dto/purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(private readonly featuredRepository: PurchaseRepository) {}

  async registerSale(dto: RegisterSaleDto): Promise<void> {
    try {
      const filter = { user: dto.user, contract: dto.contract };

      let featured =
        (await this.featuredRepository.findOneByFilter(filter)) ||
        (await this.featuredRepository.create({ ...filter }));

      featured.sales = featured.sales + dto?.quantity || 1;

      await this.featuredRepository.save(featured);

      return;
    } catch (error) {
      console.error('Error en registerSale:', error);
      throw new ExceptionHandler(error);
    }
  }

  async findAll(): Promise<PurchaseEntity[]> {
    try {
      return await this.featuredRepository.findAll();
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  async findOne(id: number): Promise<PurchaseEntity> {
    try {
      const networkFound = await this.featuredRepository.findOne(id);

      if (!networkFound) {
        throw new NotFoundException('Item no encontrado');
      }

      return networkFound;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
