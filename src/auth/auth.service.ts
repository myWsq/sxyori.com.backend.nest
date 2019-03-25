/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import * as jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../config.json';
export interface JwtPayload {
    id: number;
    username: string;
}
@Injectable()
export class AuthService {
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
}
