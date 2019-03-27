import { Validate } from 'class-validator';
import { IsUserExist } from '../../auth/auth.validator';

/**
 * 用于验证用户ID是否存在的验证器
 * @author wsq
 * @email `wsq961@outlook.com`
 */
export class ValidateUserIdDto {
    @Validate(IsUserExist)
    id: number;
}
