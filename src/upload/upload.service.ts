/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Injectable } from '@nestjs/common';
import { qiniu } from '../config.json';
import * as Qiniu from 'qiniu';
import { GenUploadTokenDto } from './dto/gen-upload-token.dto.js';

@Injectable()
export class UploadService {
    genUploadToken(options: GenUploadTokenDto) {
        const mac = new Qiniu.auth.digest.Mac(qiniu.accessKey, qiniu.secretKey);
        const putPolicy = new Qiniu.rs.PutPolicy({
            scope: qiniu.bucket,
            ...options,
            returnBody:
                '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
        });
        return putPolicy.uploadToken(mac);
    }
}
