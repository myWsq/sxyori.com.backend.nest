/**
 * 自定义错误层次过滤器, 将错误解析为{code,message}的形式
 * @author wsq
 * @email `wsq961@outlook.com`
 */
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
        response.status(status).json(error);
    }
}
