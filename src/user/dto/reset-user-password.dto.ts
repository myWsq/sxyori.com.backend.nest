import { Validate, IsNumberString, IsMobilePhone } from 'class-validator';
import { IsPasswordCorrect, IsUserExist } from '../../auth/auth.validator';
import { IsPasswordValid } from '../validator/is-password-valid.validator';

/**
 * 修改密码 数据传输类型
 * @author wsq
 * @email `wsq961@outlook.com`
 */

export class ResetUserPasswordDto {
    @IsMobilePhone('zh-CN')
    @Validate(IsUserExist)
    mobile: string;

    @Validate(IsPasswordValid)
    newPassword: string;

    @IsNumberString()
    smsCode: string;
}
