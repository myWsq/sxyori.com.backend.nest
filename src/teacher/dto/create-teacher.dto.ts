import {
    IsDefined,
    MaxLength,
    IsUrl,
    IsBoolean,
    IsOptional,
} from 'class-validator';

/**
 * 新增教师信息 数据传输类型
 * @author wsq
 * @email `wsq961@outlook.com`
 */
export class CreateTeacherDto {
    @IsDefined()
    @MaxLength(20)
    name: string;

    @IsUrl()
    img: string;

    @IsDefined()
    @MaxLength(200)
    introduction: string;

    @IsBoolean()
    @IsOptional()
    isShow: boolean;
}
