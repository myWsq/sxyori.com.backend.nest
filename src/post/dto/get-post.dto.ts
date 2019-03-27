/**
 * 获取文章列表 数据传输类型
 * @author wsq
 * @email wsq961@outlook.com
 */
import { IsOptional, Validate, IsNumberString } from 'class-validator';
import { IsPostTypeExist } from '../validator/is-post-type-exist.validator';

export class GetPostDto {
    @IsOptional()
    @IsNumberString()
    @Validate(IsPostTypeExist)
    typeId: number;
}
