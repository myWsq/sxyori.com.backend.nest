import { IsEnum, IsIn, Validate, IsDefined, IsString } from 'class-validator';
import { IsUserExist } from '../../auth/auth.validator';

/**
 * 指定用户角色 数据传输类型
 * @author wsq
 * @email `wsq961@outlook.com`
 */

export class UpdateUserRoleDto {
    @Validate(IsUserExist)
    id: number;

    @IsString()
    @IsIn(['ADMIN', 'SUPER_ADMIN', 'PUBLIC'])
    role: string;
}
