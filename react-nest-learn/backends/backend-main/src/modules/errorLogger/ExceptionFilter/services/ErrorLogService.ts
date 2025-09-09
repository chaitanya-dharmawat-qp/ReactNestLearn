import { ErrorLogEntity } from '@modules/errorLogger/entities/ErrorLogEntity';
import { ErrorLogRepository } from '@modules/errorLogger/repositories/ErrorLogRepository';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorLogService {
  constructor(private readonly repository: ErrorLogRepository) {}
  async logToDb(exception: HttpException): Promise<ErrorLogEntity> {
    return this.repository.logHttpExceptionToDb(exception);
  }
  async logGenericErrorToDb(exception: object): Promise<ErrorLogEntity> {
    return this.repository.logGenericExceptionToDb(exception);
  }
}
