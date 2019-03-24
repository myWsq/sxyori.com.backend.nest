import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AppException } from './app.exception';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    const status = exception.getStatus();
    const error = exception.getError();
    response
      .status(status)
      .json(error);
  }
}
