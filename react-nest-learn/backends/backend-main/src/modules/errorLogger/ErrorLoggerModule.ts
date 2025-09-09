import { DatabaseModule } from '@modules/database/DatabaseModule';
import { Module } from '@nestjs/common';
import {
  ErrorLogRepository,
  errorLogRepositoryProvider,
} from '@src/ExceptionFilter/repositories/ErrorLogRepository';
import { ErrorLogService } from '@src/ExceptionFilter/services/ErrorLogService';

@Module({
  imports: [DatabaseModule, ],
  providers: [
    ...errorLogRepositoryProvider,
    ErrorLogService,
    ErrorLogRepository,
  ],
  exports: [ErrorLogService],
})
export class ErrorLoggerModule {}
