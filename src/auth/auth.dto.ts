import {
    IsAlphanumeric,
    IsDefined,
    Validate,
    IsMobilePhone,
    IsString,
} from 'class-validator';
import { IsUserExist, IsPasswordCorrect } from './auth.validator';

/**
 * Auth 数据传输类型
 * @author wsq
 * @email wsq961@outlook.com
 */
export class LoginDto {

    @IsDefined()
    @Validate(IsUserExist)
    username: string;

    @IsDefined()
    @Validate(IsPasswordCorrect)
    password: string;
}

export class SendSmsCodeDto {
    @IsDefined()
    @IsMobilePhone('zh-CN')
    mobile: string;

    @IsDefined()
    validateToken: string;
}
