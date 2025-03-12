import {
  Logger,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(`Status: ${status} Error: ${exception}`);


    const errorMessage =
      exception instanceof Error ? exception.message : String(exception);

    if (!response.headersSent) {
      response.status(status).json({
        statusCode: status,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
