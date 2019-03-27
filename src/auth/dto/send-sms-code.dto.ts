/**
 * 发送短信验证码验证器
 * @author wsq
 * @email `wsq961@outlook.com`
 */

import {
    IsMobilePhone,
    IsNotEmpty,
    IsNumberString,
} from 'class-validator';

export class SendSmsCodeDto {
    @IsNotEmpty()
    @IsMobilePhone('zh-CN')
    mobile: string;

    @IsNumberString()
    captchaCode: string;
}
