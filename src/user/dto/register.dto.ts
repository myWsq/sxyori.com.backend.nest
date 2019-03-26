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
} from 'class-validator';
import { IsUserNotExist } from '../validator/is-user-exist.validator';

export enum Gender {
    male = 1,
    female = 0,
}

export class RegisterDto {
    @Validate(IsUserNotExist)
    @IsAlphanumeric()
    username: string;

    @IsDefined()
    @MaxLength(15)
    password: string;

    @MaxLength(10)
    nickName: string;

    @IsMobilePhone('zh-CN')
    @Validate(IsUserNotExist)
    mobile: string;

    @IsEnum(Gender)
    gender: number;
}
