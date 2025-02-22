import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/app.config';
import { AppController } from './app.controller';
import { UtilsModule } from './shared/utils/utils.module';
import { DatabaseConfig } from './config/database/database.config';
import { HttpCustomModule } from './shared/http/http.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot(DatabaseConfig.getDataSourceOptions()),
    UtilsModule,
    HttpCustomModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
