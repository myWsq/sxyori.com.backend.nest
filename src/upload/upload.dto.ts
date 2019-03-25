import { IsOptional, IsNumber } from 'class-validator';

/**
 * @author wsq
 * @email wsq961@outlook.com
 */
export class GenUploadTokenDto {
    @IsNumber()
    @IsOptional()
    fileType?: number;

    @IsNumber()
    @IsOptional()
    fsizeLimit?: number;
}
