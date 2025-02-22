import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';
import { IndexEnum } from '../enums/index.enum';
import { FeaturedRepository } from '../repositories/featured.repository';
import { FeaturedEntity } from '../entities/featured.entity';
import { InteractionType } from 'src/shared/enums/interaction-type.enum';
import { RegisterInteractionDto } from '../dto/featured.dto';

@Injectable()
export class FeaturedService {
  constructor(private readonly featuredRepository: FeaturedRepository) {}

  async registerInteraction(dto: RegisterInteractionDto): Promise<void> {
    try {
      const filter: any = dto.user ? { user: dto.user, contract: dto.contract } : { contract: dto.contract };

      let featured =
        (await this.featuredRepository.findOneByFilter(filter)) ||
        (await this.featuredRepository.create({ ...filter, clicks: 0, views: 0, lastInteractedAt: new Date() }));

      if (dto.interactionType === InteractionType.CLICK) {
        featured.clicks++;
      } else {
        featured.views++;
      }

      featured.lastInteractedAt = new Date();

      await this.featuredRepository.save(featured);

      return;
    } catch (error) {
      console.error('Error en registerInteraction:', error);
      throw new ExceptionHandler(error);
    }
  }

  async findAll(): Promise<FeaturedEntity[]> {
    try {
      return await this.featuredRepository.findAll();
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  async findFeatured(user: string): Promise<FeaturedEntity[]> {
    try {
      return await this.featuredRepository.findFeatured(user);
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  async findOne(id: number): Promise<FeaturedEntity> {
    try {
      const networkFound = await this.featuredRepository.findOne(id);

      if (!networkFound) {
        throw new NotFoundException('Red no encontrada');
      }

      return networkFound;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
