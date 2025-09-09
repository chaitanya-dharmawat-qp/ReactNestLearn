import { ErrorLogRepository } from '@modules/errorLogger/repositories/ErrorLogRepository';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorLogService {
  constructor(private readonly repository: ErrorLogRepository) {}
  async logToDb(exception: HttpException): Promise<void> {
    return this.repository.logHttpExceptionToDb(exception);
  }
  async logGenericErrorToDb(exception: object): Promise<void> {
    return this.repository.logGenericExceptionToDb(exception);
  }
}
