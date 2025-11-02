import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config({ path: process.cwd() + `/.env.${process.env.NODE_ENV}` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  // app.useGlobalPipes(new ValidationPipe());
  console.log(`This application is running on: ${await app.getUrl()}`);
}
bootstrap();
