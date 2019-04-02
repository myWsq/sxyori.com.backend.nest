import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppGuard } from './app.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppMiddleware } from './app.middleware';
import { UploadModule } from './upload/upload.module';
import { PostModule } from './post/post.module';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';

/**
 * 项目根Module
 * @author wsq
 * @email `wsq961@outlook.com`
 */

@Module({
    imports: [AuthModule, UserModule, UploadModule, PostModule, TeacherModule, CourseModule],
    controllers: [AppController],
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
