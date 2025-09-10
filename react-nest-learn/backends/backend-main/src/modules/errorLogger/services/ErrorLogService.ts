import { ErrorLogRepository } from '@modules/errorLogger/repositories/ErrorLogRepository';
import { HttpException, Injectable } from '@nestjs/common';
import { ErrorLogEntity } from '../entities/ErrorLogEntity';

@Injectable()
export class ErrorLogService {
  constructor(private readonly repository: ErrorLogRepository) {}
  async logToDb(exception: HttpException): Promise<ErrorLogEntity> {
    return this.repository.logHttpExceptionToDb(exception);
  }
  async logGenericErrorToDb(exception: object): Promise<ErrorLogEntity> {
    return this.repository.logGenericExceptionToDb(exception);
  }
  async getAllLogsFromDb(): Promise<ErrorLogEntity[]> {
    return this.repository.getAllLogsFromDb();
  }
}
