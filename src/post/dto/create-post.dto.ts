import {
    IsNotEmpty,
    MaxLength,
    IsOptional,
    IsUrl,
    IsBoolean,
    Validate,
    IsNumberString,
} from 'class-validator';
import { IsPostTypeExist } from '../validator/is-post-type-exist.validator';

/**
 * 创建文章 数据传输类型
 * @author wsq
 * @email wsq961@outlook.com
 */

export class CreatePostDto {
    @IsNotEmpty()
    @MaxLength(20)
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @MaxLength(50)
    subTitle: string;

    @IsOptional()
    @MaxLength(10000)
    content: string;

    @IsUrl()
    @IsOptional()
    img: string;

    @IsBoolean()
    @IsOptional()
    isTop: boolean;

    @IsNumberString()
    @IsOptional()
    @Validate(IsPostTypeExist)
    typeId: number;
}
