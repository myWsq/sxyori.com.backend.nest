/**
 * @author wsq
 * @email wsq961@outlook.com
 */

import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
    controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule {}
