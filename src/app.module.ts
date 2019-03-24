/**
 * 项目根Module
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppGuard } from './app.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppGuard,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
