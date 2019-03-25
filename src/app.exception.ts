/**
 * 自定义错误层次
 * @author wsq
 * @email wsq961@outlook.com
 * `throw new AppException(AppExceptionMap.USER_NOT_FOUND)`
 */
import { HttpException } from '@nestjs/common';

export class AppException extends HttpException {
    constructor(private readonly error: AppExceptionMapItemInterface) {
        super('AppException', 200);
    }
    getError() {
        return this.error;
    }
}

export interface AppExceptionMapItemInterface {
    code: number;
    message: string | any;
}

export const AppExceptionMap = {
    VALIDATION_ERROR(message: any) {
        return {
            code: 1,
            message,
        };
    },
};
