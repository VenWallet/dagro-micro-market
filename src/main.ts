import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const configService = new ConfigService();

  const port = configService.get('PORT');

  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.enableCors();
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Dagro Micro Market API')
    .setDescription('Dagro Micro Market API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);

  const url = await app.getUrl();

  console.log(`Server is running on ${url}`);
}

bootstrap();
