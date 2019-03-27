/**
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { getRepository, DeepPartial } from 'typeorm';
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
    async findOneUserByMobile(mobile: string) {
        return User.findOne({
            where: {
                mobile,
            },
        });
    }
    createUser(vo: Partial<User>) {
        const user = User.create(vo);
        return user.save();
    }
    updateUser(id: number, vo: DeepPartial<User>) {
        return User.update(id, vo);
    }
}
