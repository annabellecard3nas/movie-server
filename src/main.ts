import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //transform input data to the desired form (e.g.,
  // from string to integer) or  evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, ////il enleve l'element qui n'est  pas definit dans notre dto
    }),
  );

  await app.listen(process.env.PORT ?? 2662);
}
bootstrap();
