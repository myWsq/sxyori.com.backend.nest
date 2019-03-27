/**
 * 入口文件
 * @author wsq
 * @email wsq961@outlook.com
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './app-exception.filter';
import { AppInterceptor } from './app.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { AppException, AppExceptionMap } from './app.exception';
import { createConnection } from 'typeorm';
import * as session from 'express-session';

import 'reflect-metadata';

import { ormconfig, jwtSecretKey } from './config.json';

async function bootstrap() {
    /** 连接数据库 */
    await createConnection({
        ...ormconfig,
        type: 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        cache: true,
    });
    const app = await NestFactory.create(AppModule);
    app.use(
        session({
            secret: jwtSecretKey,
            resave: false,
            saveUninitialized: true,
        }),
    );
    app.useGlobalFilters(new AppExceptionFilter());
    app.useGlobalInterceptors(new AppInterceptor());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            validationError: {
                target: false,
                value: true,
            },
            exceptionFactory: errors =>
                new AppException(AppExceptionMap.VALIDATION_ERROR(errors)),
        }),
    );
    await app.listen(3002);
    // tslint:disable-next-line:no-console
    console.log('Server is running on http://localhost:3002');
}
bootstrap();
