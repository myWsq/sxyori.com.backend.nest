import { IsAlphanumeric, IsDefined, MaxLength, IsMobilePhone, IsEnum, Validate } from 'class-validator';
import { IsUserNotExist } from './user.validator';

/**
 * User 数据传输类型
 * @author wsq
 * @email wsq961@outlook.com
 */

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
