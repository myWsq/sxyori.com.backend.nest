/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
