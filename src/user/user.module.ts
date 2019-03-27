/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
