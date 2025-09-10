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
    // this.errorLogService.getAllLogsFromDb().then((errors) => Logger.warn({ fetchingAllErrorsFromDb: errors }));
  }

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const http = host.switchToHttp();

    try {
      let httpStatus;
      let parsedException;

      if (exception instanceof HttpException) {
        httpStatus = exception.getStatus();
        // Log error if http status is >= 400 i.e. All server  errors
        if (httpStatus >= 400) {
          // this.logger.error(exception.stack);
          parsedException = await this.errorLogService.logToDb(exception);
        }
      } else if (exception) {
        // this.logger.error(exception);
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        parsedException =
          await this.errorLogService.logGenericErrorToDb(exception);
      }
      this.httpAdapterHost.httpAdapter.reply(
        http.getResponse(),
        {
          message: parsedException?.errormessage??"Internal Server Error",
          code: parsedException?.errorcode??500,
        },
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
