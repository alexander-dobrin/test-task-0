import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as classValidator from 'class-validator';
import * as dotentv from 'dotenv';
import { AppModule } from './app.module';

dotentv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  classValidator.useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
