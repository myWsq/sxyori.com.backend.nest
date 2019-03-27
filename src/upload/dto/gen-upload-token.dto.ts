/**
 * 生成上传令牌 数据传输类型
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { IsOptional, IsNumber } from 'class-validator';

export class GenUploadTokenDto {
    @IsNumber()
    @IsOptional()
    fileType?: number;

    @IsNumber()
    @IsOptional()
    fsizeLimit?: number;
}
