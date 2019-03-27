import {
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidatorConstraint,
} from 'class-validator';
import { User } from './user.entity';

/**
 * 验证用户是否不存在
 * 可用于用户的任何字段
 * `@Validate(IsUserNotExist)`
 * @author wsq
 * @email `wsq961@outlook.com`
 */
@ValidatorConstraint({ async: true })
export class IsUserNotExist implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        const user = await User.findOne({
            where: {
                [args.property]: value,
            },
        });
        return !user;
    }
    defaultMessage(args: ValidationArguments) {
        return `$property $value aleady exist`;
    }
}
