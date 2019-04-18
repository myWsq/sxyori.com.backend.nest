/**
 * 生成上传令牌 数据传输类型
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class GenUploadTokenDto {
    @IsString()
    @IsOptional()
    mimeLimit?: string;

    @IsNumber()
    @IsOptional()
    fsizeLimit?: number;
}
