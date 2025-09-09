import { DatabaseModule } from "@modules/database/DatabaseModule";
import { Module } from "@nestjs/common";
import { errorLogRepositoryProvider, ErrorLogRepository } from "./repositories/ErrorLogRepository";
import { ErrorLogService } from "./services/ErrorLogService";

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
