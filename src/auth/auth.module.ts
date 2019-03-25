/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { IsUserExist } from './auth.validator';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, IsUserExist],
  exports: [AuthService],
})
export class AuthModule {}
