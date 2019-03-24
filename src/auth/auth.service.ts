/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

export interface JwtPayload {
    id: number;
    username: string;
}
@Injectable()
export class AuthService {
    jwtKey: string;
    constructor() {
        this.jwtKey = readFileSync('jwt.key').toString();
    }
    signJwt(user: User) {
        return jwt.sign({
            id: user.id,
            username: user.username,
        }, this.jwtKey, {
            expiresIn: 3600 * 24 * 30,
        });
    }
    verifyJwt(token: string) {
        return jwt.verify(token, this.jwtKey) as JwtPayload;
    }
}
