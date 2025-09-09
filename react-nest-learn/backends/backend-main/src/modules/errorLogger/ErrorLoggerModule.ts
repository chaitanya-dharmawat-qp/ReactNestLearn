import { DatabaseModule } from '@modules/database/DatabaseModule';
import { Module } from '@nestjs/common';
import {
  ErrorLogRepository,
  errorLogRepositoryProvider,
} from '@modules/errorLogger/repositories/ErrorLogRepository';
import { ErrorLogService } from '@modules/errorLogger/services/ErrorLogService';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...errorLogRepositoryProvider,
    ErrorLogService,
    ErrorLogRepository,
  ],
  exports: [ErrorLogService],
})
export class ErrorLoggerModule {}
