/**
 * 全局拦截器
 * @author wsq
 * @email wsq961@outlook.com
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /** 处理普通流 */
    return next.handle().pipe(
      map(body => ({
        code: 0,
        body,
      })),
    );
  }
}
