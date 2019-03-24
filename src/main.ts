/**
 * 入口文件
 * @author wsq
 * @email wsq961@outlook.com
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './app-exception.filter';
import { AppInterceptor } from './app.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new AppInterceptor());
  await app.listen(3002);
  // tslint:disable-next-line:no-console
  console.log('Server is running on http://localhost:3002');
}
bootstrap();
