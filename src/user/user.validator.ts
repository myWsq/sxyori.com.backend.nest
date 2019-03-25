/**
 * 自定义验证器
 * @author wsq
 * @email wsq961@outlook.com
 */
import {
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidationOptions,
    registerDecorator,
    ValidatorConstraint,
} from 'class-validator';
import { User } from './user.entity';

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
