/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Injectable, HttpService } from '@nestjs/common';
import { User } from '../user/user.entity';
import * as jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../config.json';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppException, AppExceptionMap } from '../app.exception';
export interface JwtPayload {
    id: number;
    username: string;
}
@Injectable()
export class AuthService {
    constructor(private readonly httpService: HttpService) {}
    signJwt(user: User) {
        return jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            jwtSecretKey,
            {
                expiresIn: 3600 * 24 * 30,
            },
        );
    }
    verifyJwt(token: string) {
        return jwt.verify(token, jwtSecretKey) as JwtPayload;
    }
    sendSmsCode(
        mobilePhoneNumber: string,
        validateToken: string,
    ): Observable<string> {
        return this.httpService
            .post('https://api2.bmob.cn/1/requestSmsCode', {
                mobilePhoneNumber,
                validate_token: validateToken,
            })
            .pipe(
                map(res => res.data.smsId as string),
                catchError(err => {
                    throw new AppException(
                        AppExceptionMap.SMS_SEND_ERROR(err.response.data.error),
                    );
                }),
            );
    }
    genSmsCaptcha() {
        return this.httpService
            .post('https://api2.bmob.cn/1/requestCaptcha', {})
            .pipe(
                map(res => ({
                    captchaToken: res.data.captcha_token,
                    captchaUrl: res.data.captcha_url,
                })),
                catchError(err => {
                    throw new AppException(
                        AppExceptionMap.SMS_CAPTCHA_GEN_ERROR(
                            err.response.data.error,
                        ),
                    );
                }),
            );
    }
}
