import { Module } from '@nestjs/common'
import { databaseProviders } from './providers/DatabaseProvider'


@Module({
  imports: [],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
