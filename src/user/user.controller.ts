/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import {
    Controller,
    Get,
    Put,
    Body,
    UseInterceptors,
    ClassSerializerInterceptor,
    Post,
    Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Auth, AuthUser } from '../app.decorator';
import { User } from './user.entity';
import { ValidateUserIdDto } from './dto/validate-user-id.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}
    @Get()
    @Auth('ADMIN', 'SUPER_ADMIN')
    @UseInterceptors(ClassSerializerInterceptor)
    async getAllUser() {
        return await this.userService.getAllUser();
    }

    /** 用户注册 */
    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body() body: RegisterDto) {
        body.password = await bcrypt.hash(body.password, 3);
        return this.authService
            .verifySmsCode(body.smsCode, body.mobile)
            .pipe(switchMap(_ => this.userService.createUser(body)));
    }

    /** 通过手机重置密码 */
    @Post('password')
    async resetPassword(@Body() body: ResetPasswordDto) {
        const user = await this.userService.findOneUserByMobile(body.mobile);
        return this.authService.verifySmsCode(body.smsCode, body.mobile).pipe(
            switchMap(async _ =>
                this.userService.updateUser(user.id, {
                    password: await bcrypt.hash(body.newPassword, 3),
                }),
            ),
        );
    }

    /** 通过旧密码修改密码 */
    @Put('password')
    async updatePassword(@Body() body: UpdatePasswordDto) {
        const user = await this.userService.findOneUser(body.username);
        return this.userService.updateUser(user.id, {
            password: await bcrypt.hash(body.newPassword, 3),
        });
    }

    /** 已登录用户修改基本信息 */
    @Put()
    @Auth()
    async updateInfo(@Body() body: UpdateInfoDto, @AuthUser() user: User) {
        return this.userService.updateUser(user.id, body);
    }

    /** 管理员强制修改基本信息 */
    @Auth('ADMIN', 'SUPER_ADMIN')
    @Put(':id')
    async updateInfoAdmin(
        @Param() param: ValidateUserIdDto,
        @Body() body: UpdateInfoDto,
    ) {
        return this.userService.updateUser(param.id, body);
    }
}
