/**
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { Controller, Post, Body } from '@nestjs/common';
import { UploadService } from './upload.service';
import { GenUploadTokenDto } from './dto/gen-upload-token.dto';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
    @Post()
    genUploadToken(@Body() genUploadTokenDto: GenUploadTokenDto) {
        return this.uploadService.genUploadToken(genUploadTokenDto);
    }
}
