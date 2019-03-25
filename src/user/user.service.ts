/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { getRepository } from 'typeorm';
@Injectable()
export class UserService {
    async getAllUser() {
        return User.find();
    }
    async findOneUser(username: string) {
        return getRepository(User).findOne({
            where: {
                username,
            },
            cache: true,
        });
    }
    createUser(vo: Partial<User>) {
        const user = User.create(vo);
        return user.save();
    }
}
