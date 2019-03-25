/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Controller, Post, Body, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
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
    @UseInterceptors(ClassSerializerInterceptor)
    async me(@AuthUser() user: User) {
        return user;
    }

    @Post()
    async login(@Body() body: LoginDto) {
        const user = await this.userService.findOneUser(body.username);
        return this.authService.signJwt(user);
    }
}
