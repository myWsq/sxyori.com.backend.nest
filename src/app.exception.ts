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
    message: string;
}

export const AppExceptionMap = {
    USER_NOT_FOUND: {
        code: 1,
        message: '用户不存在',
    },
    USER_ALREADY_EXISTS: {
        code: 3,
        message: '用户已存在',
    },
    PASSWORD_ERROR: {
        code: 3,
        message: '密码错误',
    },
};
