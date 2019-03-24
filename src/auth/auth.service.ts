import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    signJwt(user: User) {
        jwt.sign(user.id)
    }
}
