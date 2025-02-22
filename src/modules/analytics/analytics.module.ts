import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturedEntity } from './entities/featured.entity';
import { FeaturedService } from './services/featured.service';
import { FeaturedRepository } from './repositories/featured.repository';
import { FeaturedController } from './controllers/featured.controller';
import { PurchaseController } from './controllers/purchase.controller';
import { PurchaseEntity } from './entities/purchase.entity';
import { PurchaseService } from './services/purchase.service';
import { PurchaseRepository } from './repositories/purchase.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeaturedEntity, PurchaseEntity])],
  exports: [FeaturedService, FeaturedRepository, PurchaseService, PurchaseRepository],
  controllers: [FeaturedController, PurchaseController],
  providers: [FeaturedService, FeaturedRepository, PurchaseService, PurchaseRepository],
})
export class AnalyticsModule {}
