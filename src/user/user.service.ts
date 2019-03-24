import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserVo } from './user.vo';
@Injectable()
export class UserService {
    async getAllUser() {
        return User.find();
    }
    async findOneUser(username: string) {
        return User.findOne({
            where: {
                username,
            },
        });
    }
    createUser(vo: CreateUserVo) {
        const user = User.create();
        user.username = vo.username;
        user.password = vo.password;
        return user.save();
    }
}
