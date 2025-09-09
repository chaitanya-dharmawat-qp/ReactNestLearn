import { Module } from '@nestjs/common'
import { databaseProviders } from './providers/DatabaseProvider'
import { anotherDatabaseProviders } from './providers/AnotherDatabaseProvider'


@Module({
  imports: [],
  controllers: [],
  providers: [...databaseProviders,...anotherDatabaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
