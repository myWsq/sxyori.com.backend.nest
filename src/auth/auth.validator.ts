/**
 * 自定义验证器
 * @author wsq
 * @email wsq961@outlook.com
 */

import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

/**
 * 验证用户是否存在
 * 可用于用户的任何字段 `id` or `mobile` ...
 * `@Validate(IsUserExist)`
 */
@ValidatorConstraint({ async: true })
export class IsUserExist implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        const user = await getRepository(User).findOne({
            where: {
                [args.property]: value,
            },
            cache: true,
        });
        return !!user;
    }
    defaultMessage(args: ValidationArguments) {
        return 'User does not exist';
    }
}

@ValidatorConstraint({ async: true })
export class IsPasswordCorrect implements ValidatorConstraintInterface {
    async validate(password: any, args: ValidationArguments) {
        const { username } = args.object as LoginDto;
        const user = await getRepository(User).findOne({
            where: {
                username,
                cache: true,
            },
        });

        return !user || (await bcrypt.compare(password, user.password));
    }
    defaultMessage(args: ValidationArguments) {
        return 'Password error';
    }
}
