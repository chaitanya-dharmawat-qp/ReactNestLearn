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
  async logHttpExceptionToDb(exception: HttpException): Promise<ErrorLogEntity> {
    const messages = Object.entries(exception.getResponse());
    const ex = this.repository.create({
      errorcode: exception.getStatus(),
      errormessage: messages.flat().at(1),
    });
    const _savedexception = await this.repository.save(ex);
    Logger.warn({ exceptionSavedToDb: _savedexception });
    return _savedexception
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async logGenericExceptionToDb(exception: any): Promise<ErrorLogEntity> {
    const message = exception?.message ?? 'Internal Server Error :' + exception;
    const ex = this.repository.create({
      errormessage: message ?? 'INTERNAL SERVER ERROR',
    });
    return await this.repository.save(ex);
  }
  async getAllLogsFromDb(): Promise<ErrorLogEntity[]> {
    const logs = await this.repository.find();
    return logs ?? [];
  }
}
