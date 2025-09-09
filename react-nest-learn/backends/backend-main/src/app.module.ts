import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

import { AllExceptionsFilter } from '@modules/errorLogger/AllExceptionFilter';
import { ErrorLoggerModule } from '@modules/errorLogger/ErrorLoggerModule';
import { TodoModule } from '@modules/todo/TodoModule';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadAppConfig } from './config/loadAppConfig';
import { DatabaseModule } from '@modules/database/DatabaseModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(__dirname, `./config/.env.${process.env.ENVIRONMENT}`),
      ],
      load: [loadAppConfig],
    }),
    DatabaseModule,
    TodoModule,
    ErrorLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
