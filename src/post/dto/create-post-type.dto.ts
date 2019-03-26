/**
 * 新建文章类型 数据传输类型
 * @author wsq
 * @email wsq961@outlook.com
 */
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostTypeDto {
    @IsNotEmpty()
    @MaxLength(10)
    name: string;
}
