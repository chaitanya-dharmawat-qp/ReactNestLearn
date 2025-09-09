import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters not using this because of errors in DI
  await app.listen(process.env.PORT ?? 3000);
  Logger.log('Running Application at: http://localhost:3330/');
}
bootstrap();
