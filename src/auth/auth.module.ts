/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { IsUserExist } from './auth.validator';
import { bmob } from '../config.json';
@Module({
    imports: [
        HttpModule.register({
            headers: {
                'X-Bmob-Application-Id': bmob.applicationId,
                'X-Bmob-REST-API-Key': bmob.restApiKey,
                'Content-Type': 'application/json',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, IsUserExist],
    exports: [AuthService],
})
export class AuthModule {}
