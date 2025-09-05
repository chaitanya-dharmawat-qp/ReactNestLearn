import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadAppConfig } from './config/loadAppConfig';
import { TodoModule } from '@modules/TodoModule';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(__dirname, `./config/.env.${process.env.ENVIRONMENT}`),
      ],
      load: [loadAppConfig],
    }),
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
