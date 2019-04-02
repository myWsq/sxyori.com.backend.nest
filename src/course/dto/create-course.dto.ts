/**
 * 创建课程 数据传输类型
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import {
    MaxLength,
    IsUrl,
    IsBoolean,
    IsArray,
    IsNotEmpty,
    IsOptional,
    Validate,
    IsNumber,
} from 'class-validator';
import { IsEachTeacherExist } from '../validator/is-each-teacher-exist.validator';

export class CreateCourseDto {
    @MaxLength(20)
    @IsNotEmpty()
    name: string;
    @IsUrl()
    img: string;
    @MaxLength(500)
    @IsNotEmpty()
    introduction: string;
    @IsBoolean()
    isShow: boolean;
    @IsArray()
    @IsOptional()
    @Validate(IsEachTeacherExist)
    @IsNumber(null, {
        each: true,
    })
    teachers: any[];
}
