import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
    async getAllUser() {
        return User.find();
    }
}
