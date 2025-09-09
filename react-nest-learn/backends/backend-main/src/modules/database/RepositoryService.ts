import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import {
  ANOTHER_DATA_SOURCE,
  DATA_SOURCE,
} from './constants/DatabaseConstants';

@Injectable()
export class RepositoryService {
  constructor(
    @Inject(DATA_SOURCE) private readonly dataSource: DataSource,
    @Inject(ANOTHER_DATA_SOURCE) private readonly anotherDataSource: DataSource,
  ) {}

  getRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    resultSource: 'DATA_SOURCE' | 'ERROR_LOG_DB_PROVIDER',
  ): Repository<T> {
    if (resultSource === 'DATA_SOURCE') {
      return this.dataSource.getRepository(entity);
    }
    //Another data source is breaking this code temp work around
    else {
      return this.anotherDataSource.getRepository(entity);
    }
  }
}
