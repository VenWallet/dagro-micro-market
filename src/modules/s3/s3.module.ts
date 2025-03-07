import { Module } from '@nestjs/common';
import { S3Controller } from './controllers/category.controller';
import { S3Service } from './services/s3.service';

@Module({
  imports: [],
  controllers: [S3Controller],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
