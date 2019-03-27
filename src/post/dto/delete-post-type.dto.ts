import { IsBoolean, IsDefined, Validate, IsOptional } from 'class-validator';
import { IsPostTypeExist } from '../validator/is-post-type-exist.validator';

/**
 * 删除文章类型 数据传输类型
 * @author wsq
 * @email wsq961@outlook.com
 */

export class DeletePostTypeDto {
    @IsDefined()
    @Validate(IsPostTypeExist)
    id: number;

    /** 是否级联删除该类型下的所有文章 */
    @IsOptional()
    @IsBoolean()
    cascade: boolean;
}
