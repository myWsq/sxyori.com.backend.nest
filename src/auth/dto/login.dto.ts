/**
 * 登录数据传输类型
 * @author wsq
 * @email wsq961@outlook.com
 */

import {
    Validate,
    IsNotEmpty,
} from 'class-validator';
import { IsUserExist, IsPasswordCorrect } from '../auth.validator';

export class LoginDto {
    @IsNotEmpty()
    @Validate(IsUserExist)
    username: string;

    @IsNotEmpty()
    @Validate(IsPasswordCorrect)
    password: string;
}
