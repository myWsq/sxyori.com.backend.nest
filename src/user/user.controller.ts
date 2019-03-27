/**
 * @author wsq
 * @email `wsq961@outlook.com`
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
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';
import { Auth, AuthUser } from '../app.decorator';
import { User } from './user.entity';
import { ValidateUserIdDto } from './dto/validate-user-id.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
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
    async resetPassword(@Body() body: ResetUserPasswordDto) {
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
    async updatePassword(@Body() body: UpdateUserPasswordDto) {
        const user = await this.userService.findOneUser(body.username);
        return this.userService.updateUser(user.id, {
            password: await bcrypt.hash(body.newPassword, 3),
        });
    }

    /** 超级管理员修改用户角色 */
    @Post('role')
    @Auth('SUPER_ADMIN')
    async updateUserRole(@Body() body: UpdateUserRoleDto) {
        return this.userService.updateUser(body.id, {
            role: body.role,
        });
    }

    /** 已登录用户修改基本信息 */
    @Put()
    @Auth()
    async updateInfo(@Body() body: UpdateUserInfoDto, @AuthUser() user: User) {
        return this.userService.updateUser(user.id, body);
    }

    /** 管理员强制修改基本信息 */
    @Auth('ADMIN', 'SUPER_ADMIN')
    @Put(':id')
    async updateInfoAdmin(
        @Param() param: ValidateUserIdDto,
        @Body() body: UpdateUserInfoDto,
    ) {
        return this.userService.updateUser(param.id, body);
    }
}
