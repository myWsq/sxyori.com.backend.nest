/**
 * 删除文章 数据传输类型
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { IsNumberString, IsNotEmpty, Validate } from 'class-validator';
import { IsPostExist } from '../validator/is-post-exist.validator';

export class DeletePostDto {
    @IsNumberString()
    @IsNotEmpty()
    @Validate(IsPostExist)
    id: number;
}
