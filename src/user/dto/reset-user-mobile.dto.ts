import { IsUserNotExist } from '../user.validator';
import { IsMobilePhone, Validate, IsNumberString } from 'class-validator';
import { IsUserExist } from '../../auth/auth.validator';

/**
 * 重置用户手机号 数据传输类型
 * @author wsq
 * @email `wsq961@outlook.com`
 */
export class ResetUserMobileDto {
    @Validate(IsUserNotExist)
    @IsMobilePhone('zh-CN')
    mobile: string;

    @IsNumberString()
    smsCode: string;
}
