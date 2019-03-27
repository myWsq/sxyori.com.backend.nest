/**
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import {
    Controller,
    Post,
    Body,
    Get,
    Session,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Auth, AuthUser } from '../app.decorator';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';
import { SendSmsCodeDto } from './dto/send-sms-code.dto';
import { map, tap, switchMap } from 'rxjs/operators';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    /** 用户获取信息 */
    @Get()
    @Auth()
    @UseInterceptors(ClassSerializerInterceptor)
    async me(@AuthUser() user: User) {
        return user;
    }

    /** 用户登录 */
    @Post()
    async login(@Body() body: LoginDto) {
        const user = await this.userService.findOneUser(body.username);
        return this.authService.signJwt(user);
    }

    /** 发送短信验证码 */
    @Post('sms')
    sendSmsCode(@Body() body: SendSmsCodeDto, @Session() session: any) {
        return this.authService
            .verifyCaptchaCode(body.captchaCode, session.captchaToken)
            .pipe(
                switchMap(token =>
                    this.authService.sendSmsCode(body.mobile, token),
                ),
            );
    }

    /** 生成图片验证码 */
    @Get('sms/captcha')
    getSmsCaptcha(@Session() session: any) {
        return this.authService.genSmsCaptcha().pipe(
            tap(res => (session.captchaToken = res.captchaToken)),
            map(res => res.captchaUrl),
        );
    }
}
