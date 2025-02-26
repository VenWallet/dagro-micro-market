import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackingController } from './controllers/packing.controller';
import { PackingEntity } from './entities/packing.entity';
import { PackingService } from './services/packing.service';

@Module({
  imports: [TypeOrmModule.forFeature([PackingEntity])],
  exports: [PackingService],
  controllers: [PackingController],
  providers: [PackingService],
})
export class PackingModule {}
