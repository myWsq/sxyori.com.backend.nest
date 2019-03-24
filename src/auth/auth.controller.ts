import { Controller, Post, Body, Put } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { AppExceptionMap, AppException } from 'src/app.exception';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async login(@Body() body: LoginDto) {
        const user = await this.userService.findOneUser(body.username);
        if (!user) {
            throw new AppException(AppExceptionMap.USER_NOT_FOUND);
        } else {
            if (user.password === body.password) {
                return user;
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
            return await this.userService.createUser(body);
        }
    }
}
