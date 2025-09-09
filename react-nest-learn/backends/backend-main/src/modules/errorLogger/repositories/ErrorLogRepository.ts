import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ErrorLogEntity } from '../entities/ErrorLogEntity';

export const errorLogRepositoryProvider = [
  {
    provide: 'ERRORLOG_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<ErrorLogEntity> =>
      dataSource.getRepository(ErrorLogEntity),
    inject: ['DATA_SOURCE'],
  },
];

@Injectable()
export class ErrorLogRepository {
  constructor(
    @Inject('ERRORLOG_REPOSITORY')
    private repository: Repository<ErrorLogEntity>,
  ) {}
  async logHttpExceptionToDb(exception: HttpException): Promise<void> {
    const ex = this.repository.create({
      errorcode: exception.getStatus(),
      errormessage: exception.message,
    });
    const savedexception = await this.repository.save(ex);
    Logger.warn({ exceptionSavedToDb: savedexception });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async logGenericExceptionToDb(exception: any): Promise<void> {
    const message = exception?.message ?? 'Internal Server Error :' + exception;
    const ex = this.repository.create({
      errormessage: message ?? 'INTERNAL SERVER ERROR',
    });
    await this.repository.save(ex);
  }
}
