import { IsEnum, MaxLength, IsOptional, IsUrl } from 'class-validator';
import { Gender } from './register.dto';

/**
 * 更新用户基本信息 数据传输类型
 * @author wsq
 * @email `wsq961@outlook.com`
 */

export class UpdateInfoDto {
    @MaxLength(10)
    @IsOptional()
    nickName: string;

    @IsEnum(Gender)
    @IsOptional()
    gender: number;

    @IsUrl()
    @IsOptional()
    photo: string;

    @MaxLength(30)
    @IsOptional()
    wechat: string;

    @MaxLength(20)
    @IsOptional()
    qq: string;
}
