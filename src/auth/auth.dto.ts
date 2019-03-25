import { IsAlphanumeric, IsDefined, Validate } from 'class-validator';
import { IsUserExist, IsPasswordCorrect } from './auth.validator';

/**
 * Auth 数据传输类型
 * @author wsq
 * @email wsq961@outlook.com
 */
export class LoginDto {
    @IsAlphanumeric()
    @Validate(IsUserExist)
    username: string;
    @IsDefined()
    @Validate(IsPasswordCorrect)
    password: string;
}
