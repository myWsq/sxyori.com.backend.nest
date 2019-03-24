/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Controller, Post, Body, Put, Get, Request } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { AppExceptionMap, AppException } from 'src/app.exception';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { Auth, AuthUser } from 'src/app.decorator';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Get()
    @Auth()
    async me(@AuthUser() user: User) {
        return user;
    }

    @Post()
    async login(@Body() body: LoginDto) {
        const user = await this.userService.findOneUser(body.username);
        if (!user) {
            throw new AppException(AppExceptionMap.USER_NOT_FOUND);
        } else {
            if (await bcrypt.compare(body.password, user.password)) {
                return this.authService.signJwt(user);
            } else {
                throw new AppException(AppExceptionMap.PASSWORD_ERROR);
            }
        }
    }

    @Put()
    async register(@Body() body: RegisterDto) {
        const user = await this.userService.findOneUser(body.username);
        if (user) {
            throw new AppException(AppExceptionMap.USER_ALREADY_EXISTS);
        } else {
            body.password = await bcrypt.hash(body.password, 3);
            return await this.userService.createUser(body);
        }
    }
}
