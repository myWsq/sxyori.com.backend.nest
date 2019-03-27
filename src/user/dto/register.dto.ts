/**
 * 注册数据传输类型
 * @author wsq
 * @email wsq961@outlook.com
 */

import {
    IsAlphanumeric,
    IsDefined,
    MaxLength,
    IsMobilePhone,
    IsEnum,
    Validate,
    IsNumberString,
} from 'class-validator';
import { IsUserNotExist } from '../validator/is-user-not-exist.validator';
import { IsPasswordValid } from '../validator/is-password-valid.validator';

export enum Gender {
    male = 1,
    female = 0,
}

export class RegisterDto {
    @Validate(IsUserNotExist)
    @IsAlphanumeric()
    username: string;

    @IsDefined()
    @Validate(IsPasswordValid)
    password: string;

    @MaxLength(10)
    nickName: string;

    @IsMobilePhone('zh-CN')
    @Validate(IsUserNotExist)
    mobile: string;

    @IsEnum(Gender)
    gender: number;

    @IsNumberString()
    smsCode: string;

}
