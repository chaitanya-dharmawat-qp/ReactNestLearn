import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorLogService } from './services/ErrorLogService';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly errorLogService: ErrorLogService,
  ) {
    // Logger.log('using all exceptions filter with dependencies'+httpAdapterHost+errorLogService);
  }

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const http = host.switchToHttp();

    try {
      let errorMessage;
      let httpStatus;

      if (exception instanceof HttpException) {
        errorMessage = exception.message;
        httpStatus = exception.getStatus();
        // Log error if http status is >= 400 i.e. All server  errors
        if (httpStatus >= 400) {
          this.logger.error(exception.stack);
          await this.errorLogService.logToDb(exception);
        }
      } else if (exception) {
        this.logger.error(exception);
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = errorMessage ?? 'Internal server error';
        await this.errorLogService.logGenericErrorToDb(exception);
      }
      this.httpAdapterHost.httpAdapter.reply(
        http.getResponse(),
        errorMessage,
        httpStatus,
      );
    } catch (error) {
      //Error while catching error
      this.logger.error(
        'Error occurred while handling application exception',
        error,
      );
      this.httpAdapterHost.httpAdapter.reply(
        http.getResponse(),
        'INTERNAL SERVER ERROR' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
